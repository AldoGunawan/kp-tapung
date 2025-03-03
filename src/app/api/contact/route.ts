import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        {
          message:
            "Unauthorized: Anda belum login atau email tidak tersedia dalam sesi",
        },
        { status: 401 }
      );
    }

    // Ambil email dari sesi user
    const { email } = session.user;

    console.log("User Email:", email); // DEBUG: Cek apakah email tersedia

    // Periksa apakah email valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Periksa apakah email ini ada dalam database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email tidak terdaftar. Silakan daftar terlebih dahulu." },
        { status: 404 }
      );
    }

    const { name, message } = await req.json();
    if (!name || !message) {
      return NextResponse.json(
        { message: "Nama dan pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    // Kirim email ke Gmail
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "dokai11124@gmail.com",
        subject: "Pesan Baru dari Website",
        text: `Dari: ${name} (${email})\n\nPesan:\n${message}`,
      });
    } catch (mailError) {
      console.error("Gagal mengirim email:", mailError);
      return NextResponse.json(
        { message: "Gagal mengirim email. Coba lagi nanti." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Pesan berhasil dikirim!" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server. Silakan coba lagi nanti." },
      { status: 500 }
    );
  }
}
