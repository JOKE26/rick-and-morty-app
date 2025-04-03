import { useGetCharactersQuery } from "../api/rickAndMorty";
import { useState, useEffect } from "react";
import CharacterTable from "../components/CharacterTable";

const Home = () => {
  const [filters, setFilters] = useState({ name: "", status: "", page: 1 });
  const { data, isLoading } = useGetCharactersQuery({
    page: filters.page,
    name: filters.name,
    status: filters.status,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, name: searchTerm, page: 1 }));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mr-2"
      />

      <select
        onChange={(e) =>
          setFilters({
            name: filters.name,
            status: e.target.value.toLowerCase(),
            page: 1,
          })
        }
        className="p-1"
      >
        <option value="">Select a status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
      </select>

      <CharacterTable
        data={data?.results || []}
        onPageChange={handlePageChange}
        total_pages={data?.info.pages || 1}
        currentPage={filters.page}
      ></CharacterTable>
    </div>
  );
};

export default Home;
