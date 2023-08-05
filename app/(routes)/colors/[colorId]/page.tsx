import { prisma } from "@/lib/prisma";
import ColorForm from "./components/color-form";

export default async function AddCategory({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await prisma.color.findFirst({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}

// export default function page() {
//   return <div>page</div>;
// }
