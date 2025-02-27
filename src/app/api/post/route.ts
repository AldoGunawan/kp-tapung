import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error GET posts:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("imageUrl") as Blob | null;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Judul dan konten harus diisi!" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (imageFile) {
      const fileExt = "jpg"; // Anggap jpg sementara
      const fileName = `images/${Date.now()}.${fileExt}`;
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data, error } = await supabase.storage
        .from("uploads")
        .upload(fileName, buffer, { contentType: "image/jpeg" });

      if (error) {
        console.error("Upload gagal:", error);
        return NextResponse.json(
          { message: "Gagal mengunggah gambar" },
          { status: 500 }
        );
      }

      imageUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${fileName}`;
    }

    const post = await prisma.post.create({
      data: { title, content, imageUrl },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error POST post:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));

    if (!id) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "Post berhasil dihapus" });
  } catch (error) {
    console.error("Error DELETE post:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, imageUrl } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, imageUrl },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error PUT post:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
