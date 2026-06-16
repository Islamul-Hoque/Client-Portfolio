'use client';

import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section 
      id="about" 
      className="py-24 md:py-32 relative px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
      >
        {/* Left Side: Header & Core Quote */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <motion.span 
            variants={itemVariants}
            className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-accent mb-4 block"
          >
            My Vision
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-tight"
          >
            The Storyteller Behind the Lens: <br />
            <span className="text-glow text-accent">Bringing Visions to Life</span>
          </motion.h2>

          {/* Core Quote Callout */}
          <motion.div 
            variants={itemVariants}
            className="relative p-6 md:p-8 bg-zinc-900/40 border-l-2 border-accent/80 glass-panel"
          >
            <span className="absolute -top-3 -left-3 font-serif text-6xl text-accent/15 select-none pointer-events-none">
              “
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-gray-200 leading-relaxed mb-4">
              &quot;A great story shouldn&apos;t just be told; it should be felt.&quot;
            </p>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold">
              — Core Belief
            </p>
          </motion.div>
        </div>

        {/* Right Side: Narrative Story paragraphs */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-gray-300 text-base md:text-lg font-light leading-relaxed">
          <motion.p variants={itemVariants}>
            I am a Film Director, Video Editor, and Photographer. In simpler words, I am a visual storyteller. The world behind the lens is my canvas, where I blend reality with imagination to create impactful visual experiences.
          </motion.p>
          
          <motion.p variants={itemVariants}>
            My journey began with capturing the ordinary world through a camera frame. That curiosity quickly evolved into a deep-rooted passion for photography. For me, freezing a moment in time, playing with light and shadow, and capturing raw human emotions is nothing short of magic.
          </motion.p>

          <motion.p variants={itemVariants}>
            However, the urge to make those stories move and breathe led me into the world of film direction. As a director, my ultimate goal is to ensure that every shot resonates with the audience. From conceptualization and framing to guiding the performance, I thrive on the challenge of turning a script into a cinematic reality.
          </motion.p>

          <motion.p variants={itemVariants}>
            But the true rhythm of a film is born on the editing table. This is why video editing and post-production are core pillars of my expertise. I see editing as a craft where pacing, precise cuts, advanced color grading, and meticulous sound design come together to give footage its soul. Ensuring the perfect balance of audio-visual elements and setting the right cinematic mood is my signature style.
          </motion.p>

          <motion.p variants={itemVariants}>
            I believe that every project is a fresh opportunity to innovate, experiment, and push creative boundaries. Whether you want to transform a concept into a cinematic masterpiece, polish a video with high-end editing, or capture a defining moment through photography—I am here to bring that vision to life.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="pt-6"
          >
            <a 
              href="#contact"
              className="inline-flex items-center space-x-3 text-accent font-semibold tracking-wider hover:text-white uppercase text-xs group transition-colors duration-300"
            >
              <span>Let’s collaborate and create something unforgettable</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
