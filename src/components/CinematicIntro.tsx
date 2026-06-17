"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CinematicIntro() {
  const containerRef = useRef<HTMLElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll-based fading out of the intro
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      })

      tl.to([text1Ref.current, text2Ref.current, text3Ref.current], {
        opacity: 0,
        y: -50,
        stagger: 0.1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] z-10">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        
        <motion.div
          ref={text1Ref}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute text-center"
        >
          <p className="text-2xl md:text-4xl text-white/60 font-light tracking-wide">
            Before you continue...
          </p>
        </motion.div>

        <motion.div
          ref={text2Ref}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 4 }}
          className="absolute text-center bg-black"
        >
          <p className="text-2xl md:text-4xl text-white/80 font-light tracking-wide">
            There's someone very important I need to talk about.
          </p>
        </motion.div>

        <motion.div
          ref={text3Ref}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 3, delay: 8 }}
          className="absolute text-center bg-black/50 backdrop-blur-sm p-8 rounded-full"
        >
          <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Her name is Momo <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">❤️</span>
          </h1>
          <p className="text-white/40 text-xs md:text-sm tracking-[0.3em] uppercase animate-pulse">
            Scroll gently to continue
          </p>
        </motion.div>

      </div>
    </section>
  )
}
