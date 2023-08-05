import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("color id is required", { status: 400 });
    }

    const color = await prisma.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const { colorId } = params;

    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    const deletedColor = await prisma.color.delete({
      where: {
        id: colorId,
      },
    });

    // Check if the color was successfully deleted
    if (!deletedColor) {
      return new NextResponse("Color not found", { status: 404 });
    }

    return NextResponse.json(deletedColor);
  } catch (error) {
    console.error("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const { colorName, colorValue } = await req.json();

    if (!colorName) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!colorValue) {
      return new NextResponse("Color hex code is required");
    }

    if (!params.colorId) {
      return new NextResponse("color id is required", { status: 400 });
    }

    const color = await prisma.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        colorName,
        colorValue,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
