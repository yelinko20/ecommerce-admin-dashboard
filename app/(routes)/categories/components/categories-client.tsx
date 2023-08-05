"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { CategoryColumnProps } from "@/types/types";
export default function CategoriesClient({
  categories,
}: {
  categories: CategoryColumnProps[];
}) {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <Heading title="Categories" description="hello categories" />
        <Button onClick={() => router.push("/categories/add-category")}>
          <Plus className="mr-2" size={16} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={categories} />
    </>
  );
}
