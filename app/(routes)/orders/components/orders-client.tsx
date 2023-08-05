"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumnProps } from "@/types/types";
export default function OrderClient({
  orders,
}: {
  orders: OrderColumnProps[];
}) {
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <Heading title="Orders" description="hello order-lists" />
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={orders} />
    </>
  );
}
