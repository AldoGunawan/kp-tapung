import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { prisma } from "../lib/prisma";

// ✅ Cek apakah user sudah login
export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
};

// ✅ POST: Tambahkan validasi data
export const POST = async (req: NextRequest) => {
  try {
    const { title, content, imageUrl } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title dan Content wajib diisi!" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: { title, content, imageUrl },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error POST:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

// ✅ DELETE: Cek dulu apakah post ada sebelum menghapus
export const DELETE = async (req: NextRequest) => {
  try {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id"));

    if (!id) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      return NextResponse.json(
        { message: "Post tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ message: "Post berhasil dihapus" });
  } catch (error) {
    console.error("Error DELETE:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

// ✅ PUT: Update data dengan validasi
export const PUT = async (req: NextRequest) => {
  try {
    const { id, title, content, imageUrl } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: "Post tidak ditemukan" },
        { status: 404 }
      );
    }

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, imageUrl },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error PUT:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
