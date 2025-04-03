import { useParams, useNavigate } from "react-router-dom";
import { useGetCharacterQuery } from "../api/rickAndMorty";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Character = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCharacterQuery(id!);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Character</div>;

  console.log("ID reçu :", id);
  console.log("Data :", data);

  return (
    <div className="p-4">
      <Button
        className=" cursor-pointer mb-4 grid justify-items-start"
        onClick={() => navigate(-1)}
      >
        ← Back
      </Button>
      <Card className="max-w-md mx-auto">
        <div className="flex items-center px-4">
          <Avatar className="w-1/2 h-1/2 mx-auto">
            <AvatarImage className="" src={data.image} />
          </Avatar>
        </div>
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <div className="flex mx-auto gap-2 mt-2">
          <Badge
            variant={data.status === "Alive" ? "secondary" : "destructive"}
          >
            {data.status}
          </Badge>
          <span>{data.species}</span>
        </div>

        <div className="p-4 border-t">
          <h3 className="text-lg font-semibold">Informations</h3>
          <ul className="mt-2 space-y-1">
            <li>Type: {data.type || "N/A"}</li>
            <li>Gender: {data.gender}</li>
            <li>Origin: {data.origin.name}</li>
            <li>Location: {data.location.name}</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Character;
