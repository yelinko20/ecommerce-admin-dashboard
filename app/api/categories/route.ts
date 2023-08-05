import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { categoryName } = (await req.json()) as Category;

    if (!categoryName) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const existed = await prisma.category.findFirst({
      where: {
        categoryName,
      },
    });

    if (existed) {
      throw new Error("Category Name already exists");
    }

    const category = await prisma.category.create({
      data: {
        categoryName,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const category = await prisma.category.findMany();
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
