'use client';

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/Imamul.Hoque.Ishmam.71',
      icon: FaFacebookF,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/ishmam_777',
      icon: FaInstagram,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/ishmam_777',
      icon: FaTwitter,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#08080a] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand / Copyright */}
        <div className="text-center md:text-left">
          <p className="font-serif text-lg font-bold tracking-wider text-white mb-2">
            Ishmam
          </p>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            &copy; {currentYear} Imamul Hoque Ishmam. All rights reserved.
          </p>
        </div>

        {/* Center: Social Media Icons */}
        <div className="flex items-center space-x-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-accent text-gray-400 hover:text-accent transition-all duration-300 rounded-none bg-zinc-950/20 active:scale-95"
                aria-label={`Visit Ishmam on ${social.name}`}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

        {/* Right: Back to top action */}
        <button
          onClick={scrollToTop}
          className="group flex items-center justify-center w-10 h-10 border border-white/10 hover:border-accent hover:text-accent text-gray-400 transition-all duration-300 rounded-none bg-zinc-950/20 active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>

      </div>
    </footer>
  );
}
