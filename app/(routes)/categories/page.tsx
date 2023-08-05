import { prisma } from "@/lib/prisma";
import CategoriesClient from "./components/categories-client";
import { format } from "date-fns";
import { CategoryColumnProps } from "@/types/types";

export default async function CategoryPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumnProps[] = categories.map((item) => ({
    id: item.id,
    name: item.categoryName,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6">
        <CategoriesClient categories={formattedCategories} />
      </div>
    </div>
  );
}
