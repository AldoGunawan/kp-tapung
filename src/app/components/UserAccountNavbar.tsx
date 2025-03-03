'use client';

import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

const UserAccountNavbar = () => {
    const { data: session } = useSession(); // Ambil session
    const router = useRouter(); // Untuk redirect setelah sign out

    const handleSignOut = async () => {
        await signOut({ redirect: false }); // Sign out tanpa redirect default NextAuth
        router.push("/"); // Arahkan ke halaman home
    };

    return session ? (
        // Jika sudah login, tombol full hitam dengan teks putih
        <button
            onClick={handleSignOut}
            className="px-6 py-2 rounded-md bg-black text-white font-semibold shadow-md transition hover:opacity-80"
        >
            Sign Out
        </button>
    ) : (
        // Jika belum login, tombol transparan dengan border hitam
        <button
            onClick={() => signIn()}
            className="px-6 py-2 rounded-md border-2 border-black text-black font-semibold shadow-md transition hover:bg-black hover:text-white"
        >
            Sign In
        </button>
    );
};

export default UserAccountNavbar;
