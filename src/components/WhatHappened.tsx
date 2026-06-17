"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HeartCrack } from "lucide-react"

export default function WhatHappened() {
  const containerRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  })

  // Staggered opacity for each line
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.4, 1], [0, 1, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.6, 1], [0, 1, 1, 0])
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 1], [0, 1, 1, 0])
  
  // Heart animation
  const heartOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [0, 0.5, 0, 0])
  const heartScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1.5])
  const heartBlur = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(10px)", "blur(0px)", "blur(20px)"])

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] z-10 flex flex-col items-center justify-start bg-transparent">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-6">
        
        <motion.div 
          style={{ opacity: heartOpacity, scale: heartScale, filter: heartBlur }}
          className="absolute top-[20%] md:top-[15%] z-0"
        >
          <HeartCrack className="w-32 h-32 md:w-48 md:h-48 text-red-800/40" strokeWidth={0.5} />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center gap-32 text-center mt-20">
          <motion.h2 
            style={{ opacity: opacity1 }}
            className="text-4xl md:text-6xl font-light tracking-wide text-white drop-shadow-md"
          >
            Yesterday I got angry.
          </motion.h2>

          <motion.h2 
            style={{ opacity: opacity2 }}
            className="text-4xl md:text-6xl font-light tracking-wide text-white drop-shadow-md"
          >
            I said things I shouldn't have.
          </motion.h2>

          <motion.h2 
            style={{ opacity: opacity3 }}
            className="text-4xl md:text-6xl font-light tracking-wide text-white drop-shadow-md"
          >
            And if I could go back, I would.
          </motion.h2>
        </div>

      </div>
    </section>
  )
}
