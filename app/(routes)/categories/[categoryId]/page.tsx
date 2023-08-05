import { prisma } from "@/lib/prisma";
import CategoryForm from "./components/category-form";

export default async function AddCategory({
  params,
}: {
  params: { categoryId: string };
}) {
  const category = await prisma.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
