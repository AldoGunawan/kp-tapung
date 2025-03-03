'use client';

import gam4 from '@/app/assets/gambarkeempat.jpg';
import gam5 from '@/app/assets/gambarkelima.jpg';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
const Body = () => {
  const [showFullText, setShowFullText] = useState(false);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  
    useEffect(() => {
      const fetchLatestPosts = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
          const json = await res.json();
          setLatestPosts(json.posts?.slice(0, 2) || []);
        } catch (error) {
          console.error("Error fetching latest posts:", error);
        }
      };
  
      fetchLatestPosts();
    }, []);

  const router = useRouter();
  return (
    <div>
      <div className="max-w-7xl mx-auto my-16 p-10 flex flex-col md:flex-row items-center gap-8 min-h-[300px]">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold">About</h2>
          <h3 className="text-gray-500 text-xl">Tentang sekolah ini</h3>
          <p className="mt-4 text-lg text-gray-700">
            Di Upt SMPN 10 Tapung ini, total kelas yang ada yaitu 21 kelas, lalu di dalam sekolah ini ada beberapa eskul seperti
            pramuka, volly, futsal, drumband, dan sebagainya. Sekolah ini memiliki akreditasi yang bagus yaitu A.
          </p>
          {showFullText && (
            <p className="mt-4 text-lg text-gray-700">
              Saat ini UPT SMPN 10 Tapung dipimpin oleh Bapak Nasrun Wagiman dan operatornya yaitu Bapak Raza Novriandi.
              Menurut data yang ada, total siswa laki - laki saat ini 306 dan total siswa perempuan itu 344 siswa. Kurikulum yang digunakan yaitu Kurikulum Merdeka dan sekolah diselenggarakan 6 hari dalam seminggu.
              Sekolah ini juga memiliki laboratorium dan perpustakaan yang bagus.
            </p>
          )}
          <button 
            className="mt-4 text-blue-500 hover:underline focus:outline-none" 
            onClick={() => router.push('/about')}
            >
            Read More
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image 
            src={gam4} 
            alt="Placeholder" 
            width={600} 
            height={300} 
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-16 p-10 flex flex-col md:flex-row items-center gap-8 min-h-[300px]">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image 
            src={gam5} 
            alt="Placeholder" 
            width={600} 
            height={300} 
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold">Heading</h2>
          <h3 className="text-gray-500 text-xl">Subheading</h3>
          <p className="mt-4 text-lg text-gray-700">
            Body text for your whole article or post. Well put in some lorem ipsum to show how a filled-out page might look.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate content. 
            Qui international first-class nulla ut. Punctual adipiscing, essential lovely queen tempor eiusmod irure.
          </p>
        </div>
      </div>
      {/* Berita Terbaru */}
      <div className="max-w-7xl mx-auto my-16 px-5">
        <h2 className="text-2xl font-bold text-center mb-6">Berita Terbaru</h2>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/event/${post.id}`} className="block">
                <div className="border rounded-lg shadow-lg bg-white overflow-hidden hover:scale-105 transition-transform">
                  {post.imageUrl && (
                    <div className="relative w-full h-40 bg-gray-200">
                      <Image
                        src={post.imageUrl}
                        alt={`Gambar berita ${post.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold line-clamp-2">
                      {truncateText(post.title, 50)}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(post.createdAt))}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Belum ada berita tersedia.</p>
        )}

        {latestPosts.length > 0 && (
          <div className="text-right mt-4">
            <Link href="/event" className="text-blue-500 font-semibold hover:underline">
              Lihat lebih banyak →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;