import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Color } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { colorName, colorValue } = (await req.json()) as Color;

    if (!colorName) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    if (!colorValue) {
      return new NextResponse("color hex code is required!");
    }

    const color = await prisma.color.create({
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

export async function GET() {
  try {
    const colors = await prisma.color.findMany();
    return NextResponse.json(colors);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
