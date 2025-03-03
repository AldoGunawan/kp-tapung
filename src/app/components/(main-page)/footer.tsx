import { Facebook, Instagram, Mail, Twitter } from 'lucide-react';

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 font-segoe">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div>
          <img src="/logo.png" alt="Logo Sekolah"  />
          <p className="mt-3 text-gray-400 text-sm">
            UPT SMPN 10 Tapung, sekolah berkualitas dengan berbagai kegiatan akademik dan ekstrakurikuler.
          </p>
        </div>

        <div>
        <h3 className="font-semibold text-sm">Contact Us</h3>
        <ul className="mt-2 text-gray-400 text-xs space-y-1">
          <li className="hover:text-white cursor-pointer flex items-center space-x-2">
          <Mail size={20} />
            <span>esmpn10tapung@gmail.com</span>
          </li>
        </ul>
          </div>
          
        <div>
          <h3 className="font-semibold text-sm">Follow Us</h3>
          <div className="mt-2 text-gray-400 text-xs space-y-3">
            <div className="flex flex-col items-start space-y-2">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white flex items-center space-x-2">
                <Facebook size={20} />
                <span>Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white flex items-center space-x-2">
                <Twitter size={20} />
                <span>Twitter</span>
              </Link>
              <Link href="https://www.instagram.com/pramuka.smpn10.tapung/" className="text-gray-400 hover:text-white flex items-center space-x-2">
                <Instagram size={20} />
                <span>Instagram</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-6 text-center border-t border-gray-700 pt-4">
        <p className="text-gray-400 text-xs">© 2025 UPT SMPN 10 Tapung. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
