'use client';

import { motion } from 'framer-motion';
import { Camera, Sliders, Eye, Volume2 } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Cinematography & Direction',
      icon: Camera,
      description:
        'Bringing scripts to life with cinematic framing and purposeful lighting. I direct narratives and camera movements to build a powerful connection with the audience.',
      tag: '01 / Direction',
    },
    {
      title: 'Advanced Video Editing & Color Grading',
      icon: Sliders,
      description:
        "Crafting seamless cuts and advanced color grading to define the story's mood. I transform raw footage into high-impact, professional cinematic pieces.",
      tag: '02 / Post-Prod',
    },
    {
      title: 'Visual Storytelling',
      icon: Eye,
      description:
        'Capturing raw emotions and untold narratives through films and photography. I focus on unique angles and fine details that leave a lasting impression.',
      tag: '03 / Visuals',
    },
    {
      title: 'Audio Design & Foley',
      icon: Volume2,
      description:
        'Designing immersive soundscapes and custom Foley effects to elevate the visuals. I ensure a balanced, realistic, and cinematic audio experience.',
      tag: '04 / Audio',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section 
      id="services" 
      className="py-24 md:py-32 relative px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
    >
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-accent mb-4 block"
        >
          Areas of Expertise
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
        >
          Crafting Cinematic <span className="text-glow text-accent">Experiences</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 font-light text-base md:text-lg"
        >
          A comprehensive suite of production and post-production capabilities aimed at bringing story depth and aesthetic polish to every single frame.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="relative p-8 md:p-10 bg-zinc-950/40 border border-white/5 hover:border-accent/30 transition-all duration-300 flex flex-col justify-between group overflow-hidden glass-panel"
            >
              {/* Backglow accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/2 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/5 transition-all duration-500" />
              
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="p-3.5 bg-zinc-900 border border-white/10 group-hover:border-accent/40 group-hover:text-accent transition-all duration-300">
                    <IconComponent size={24} className="stroke-[1.5]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
                    {service.tag}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>

              {/* Decorative bottom bar indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
