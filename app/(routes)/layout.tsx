import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Navbar from "@/components/navbar/Navbar";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/register");
  }

  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
