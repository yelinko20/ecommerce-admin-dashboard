// "use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import Products from "./components/Products";
import { Separator } from "@/components/ui/separator";

export default function ProductPage() {
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <Heading title="Products" description="hello products" />
      </div>
      <Separator />
      <Products />
    </>
  );
}
