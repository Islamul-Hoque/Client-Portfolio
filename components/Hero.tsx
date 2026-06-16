'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profileImg from '@/public/imamul_Hoque_Ishmam.jpeg';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative pt-24 pb-16 overflow-hidden px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center z-10">
        
        {/* Left Side: Typography & CTAs */}
        <div className="md:col-span-7 flex flex-col justify-center text-left order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-accent mb-4 block">
              Film Director / Editor / Photographer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.15]"
          >
            Imamul Hoque <br className="hidden sm:inline" />
            <span className="text-glow text-accent">Ishmam</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10 border-l border-accent/30 pl-4 py-1"
          >
            &quot;Storyteller behind the lens – Film Director, Editor & Photographer | Transforming creative concepts into high-quality cinematic reality.&quot;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-[#08080a] font-semibold tracking-wider rounded-none uppercase text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
            >
              Let&apos;s collaborate
            </a>
            <a
              href="#about"
              className="px-8 py-3.5 border border-white/20 hover:border-accent hover:text-accent text-white font-semibold tracking-wider rounded-none uppercase text-xs transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Discover More
            </a>
          </motion.div>
        </div>

        {/* Right Side: Image with Frame & Parallax Effect */}
        <div className="md:col-span-5 flex justify-center order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-[350px] aspect-[4/5] md:max-w-none group"
          >
            {/* Cinematic Camera Frame Corners */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-accent/60 z-20" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-accent/60 z-20" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-accent/60 z-20" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-accent/60 z-20" />
            
            {/* Image Container with Shadow */}
            <div className="relative w-full h-full overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-accent/40 bg-zinc-900/50">
              <Image
                src={profileImg}
                alt="Imamul Hoque Ishmam"
                fill
                priority
                className="object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 z-10" />
            </div>

            {/* Background design elements */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-white/5 z-[-1] translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
            
            {/* Focal indicator lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-accent/30 rounded-full z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-6 bg-accent/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-[1px] bg-accent/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </motion.div>
        </div>

      </div>

      {/* Decorative background typography */}
      <div className="absolute bottom-4 left-6 hidden lg:block pointer-events-none select-none z-0">
        <span className="font-serif text-9xl text-white/[0.02] font-black uppercase tracking-widest leading-none">
          STORYTELLER
        </span>
      </div>
    </section>
  );
}
