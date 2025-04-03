import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { useGetCharactersQuery } from "../api/rickAndMorty";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Character = ReturnType<typeof useGetCharactersQuery>["data"]["results"][0];

type Props = {
  data: Character[];
  onPageChange: (page: number) => void;
  currentPage: number;
  total_pages: number;
};

const CharacterTable = ({
  data,
  onPageChange,
  currentPage,
  total_pages,
}: Props) => {
  const navigate = useNavigate();
  const columns = React.useMemo<ColumnDef<Character>[]>(
    () => [
      { header: "Name", accessorKey: "name" },
      { header: "Status", accessorKey: "status" },
      { header: "Species", accessorKey: "species" },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    pageCount: total_pages,
    state: { pagination: { pageIndex: currentPage - 1, pageSize: 20 } },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="rounded-md border overflow-hidden">
        <Table className="justify-start">
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.column.columnDef.header as React.ReactNode}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer text-left"
                onClick={() => navigate(`/character/${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.getValue() as React.ReactNode}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="p-2 hover:bg-accent rounded-full"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {total_pages}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="p-2 hover:bg-accent rounded-full"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === total_pages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange(total_pages)}
          disabled={currentPage === total_pages}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default CharacterTable;
