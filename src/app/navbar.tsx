"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Gunakan usePathname()
import UserAccountNavbar from "./components/UserAccountNavbar";

const NavbarPage = () => {
  const { data: session } = useSession();
  const pathname = usePathname(); // ✅ Ambil pathname dari Next.js

  // ✅ Sembunyikan navbar di halaman sign-in dan sign-up
  if (pathname === "/api/auth/sign-in" || pathname === "/api/auth/sign-up") return null;

  const isKepsek = session?.user?.role === "KepalaSekolah";

  return (
    <header className="p-4 border-b flex items-center justify-between text-gray-900 bg-[#99DDA1]">
      <div className="text-xl font-bold">
        <Link href="/">UPT SMP Negeri 10 TAPUNG</Link>
      </div>

      <div className="flex items-center space-x-8">
        <nav className="flex space-x-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/event" className="hover:text-white transition">School News</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
          {isKepsek && ( 
            <Link href="/admin" className="hover:text-white transition">Admin</Link>
          )}
        </nav>
        <UserAccountNavbar />
      </div>
    </header>
  );
};

export default NavbarPage;
