import { prisma } from "@/lib/prisma";
import OrderClient from "./components/orders-client";
import { format } from "date-fns";
import { priceFormatter } from "@/lib/utils";
import { OrderColumnProps } from "@/types/types";

export default async function ProuctsPage() {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumnProps[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(","),
    totalPrice: priceFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + item.product.price.toNumber();
      }, 0)
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6">
        <OrderClient orders={formattedOrders} />
      </div>
    </div>
  );
}
