"use client";

import { Session } from "next-auth";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { Separator } from "../ui/separator";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <div className={"fixed z-20 left-0 top-0 w-full bg-white"}>
      <nav className="flex py-4 items-center justify-between container mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src={"/favicon.png"} width={30} height={30} alt="" />
            <div className="text-xl font-medium">Minim</div>
          </Link>
          <div className="md:flex items-center space-x-4 lg:space-x-6 hidden ">
            <NavLinks />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#0F9D58] text-white text-xl flex items-center justify-center rounded-full font-medium w-8 h-8 select-none">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User Image"
                  width={30}
                  height={30}
                />
              ) : (
                session?.user?.name?.charAt(0)
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <span onClick={() => signOut()}>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-8 ">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <Separator />
    </div>
  );
}
