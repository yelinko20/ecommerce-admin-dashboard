import { prisma } from "@/lib/prisma";
import CategoryForm from "./components/product-form";

export default async function AddCategory({
  params,
}: {
  params: { productId: string };
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      color: true,
    },
  });

  const categories = await prisma.category.findMany();

  const colors = await prisma.color.findMany();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          initialData={product}
          colors={colors}
          categories={categories}
        />
      </div>
    </div>
  );
}
