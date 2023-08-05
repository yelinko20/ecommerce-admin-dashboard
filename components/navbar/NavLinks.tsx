import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type routeProps = {
  href: string;
  label: string;
  active: boolean;
};

export default function NavLinks() {
  const pathname = usePathname();
  const routes: routeProps[] = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
    },
    {
      href: "/products",
      label: "Products",
      active: pathname === "/products",
    },
    {
      href: "/product-lists",
      label: "ProductLists",
      active: pathname === "/product-lists",
    },
    {
      href: "/categories",
      label: "Categories",
      active: pathname === "/categories",
    },
    {
      href: "/colors",
      label: "Colors",
      active: pathname === "/colors",
    },
    {
      href: "/orders",
      label: "Orders",
      active: pathname === "/orders",
    },
  ];
  return (
    <>
      {routes.map((route) => (
        <Link href={route.href} key={route.href}>
          <span
            className={cn(
              !route.active && "text-slate-600",
              "font-medium text-[0.925rem]"
            )}
          >
            {route.label}
          </span>
        </Link>
      ))}
    </>
  );
}
