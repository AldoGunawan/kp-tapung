import Image from 'next/image';
import { useState } from 'react';
import gam4 from './assets/gambarkeempat.jpg';
import gam5 from './assets/gambarkelima.jpg';

const Body = () => {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div>
      {/* Section pertama - Gambar kanan, teks kiri */}
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
            onClick={() => setShowFullText(!showFullText)}
          >
            {showFullText ? "Read Less" : "Read More"}
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

      {/* Section kedua - Gambar kiri, teks kanan */}
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
    </div>
  );
}

export default Body;