import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

interface User {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, email, password } = (await req.json()) as User;

  if (!name || !email || !password) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const existed = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existed) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
