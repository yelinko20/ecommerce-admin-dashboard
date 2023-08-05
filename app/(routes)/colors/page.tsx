import { prisma } from "@/lib/prisma";
import ColorsClient from "./components/colors-client";
import { format } from "date-fns";
import { ColorColumnProps } from "@/types/types";

export default async function CategoryPage() {
  const colors = await prisma.color.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumnProps[] = colors.map((item) => ({
    id: item.id,
    colorName: item.colorName,
    colorValue: item.colorValue,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6">
        <ColorsClient colors={formattedColors} />
      </div>
    </div>
  );
}
