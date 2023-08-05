import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const session = await getServerSession();
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryName } = await req.json();

    if (!categoryName) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        categoryName,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
