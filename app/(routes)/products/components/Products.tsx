import { prisma } from "@/lib/prisma";
import SingleProduct from "./SingleProduct";
export default async function Products() {
  const products = await prisma.product.findMany({
    include: {
      color: true,
      images: true,
      category: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return (
    <div className="flex gap-4 flex-wrap justify-center  my-8">
      {products.map((product) => {
        // @ts-ignore
        return <SingleProduct key={product.id} {...product} />;
      })}
    </div>
  );
}
