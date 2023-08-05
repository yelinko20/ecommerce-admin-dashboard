import Image from "next/image";
import { cn, priceFormatter } from "@/lib/utils";
import { Product } from "@/types/types";
import Link from "next/link";

export default function SingleProduct({
  id,
  name,
  price,
  color,
  images,
  category,
}: Product) {
  return (
    <Link href={`/product-lists/${id}`}>
      <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 w-96 sm:w-72">
        <div className="rounded-xl flex items-center justify-center relative h-56 sm:h-40">
          <Image
            src={images?.[0]?.url}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="text-left sm:h-20">
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-sm text-gray-500">{category?.categoryName}</p>
        </div>
        <div className="flex  items-center justify-between">
          <p className="text-sm">{priceFormatter.format(price)}</p>
          <div className="flex items-center space-x-1">
            {color.colorValue && (
              <div
                style={{ backgroundColor: color.colorValue }}
                className={`h-4 w-4 sm:h-6 sm:w-6 rounded-full border`}
              ></div>
            )}
            <p className="text-sm">{color?.colorName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
