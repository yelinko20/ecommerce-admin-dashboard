import { prisma } from "@/lib/prisma";
import ProuctsClient from "./components/products-client";
import { format } from "date-fns";
import { priceFormatter } from "@/lib/utils";
import { ProductColumnProps } from "@/types/types";

export default async function ProuctsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumnProps[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: priceFormatter.format(item.price.toNumber()),
    color: item.color?.colorName,
    colorValue: item.color?.colorValue,
    category: item.category.categoryName,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6">
        <ProuctsClient products={formattedProducts} />
      </div>
    </div>
  );
}
