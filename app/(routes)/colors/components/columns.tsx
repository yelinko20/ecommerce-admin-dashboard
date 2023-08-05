"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ColorColumnProps } from "@/types/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ColorColumnProps>[] = [
  {
    accessorKey: "colorName",
    header: "color",
  },
  {
    accessorKey: "colorValue",
    header: "hex code",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.colorValue}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.colorValue }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
