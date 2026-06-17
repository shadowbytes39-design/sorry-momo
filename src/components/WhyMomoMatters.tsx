"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const reasons = [
  "Because you listen.",
  "Because you care.",
  "Because life feels lighter when you're around."
]

function Card({ text, index }: { text: string, index: number }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  })

  // CSS 3D rotation effect mimicking opening a book or card
  const rotateY = useTransform(scrollYProgress, [0, 1], [90, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
  const z = useTransform(scrollYProgress, [0, 1], [-500, 0])

  return (
    <div ref={cardRef} className="w-full h-screen flex items-center justify-center perspective-[1500px]">
      <motion.div
        style={{ rotateY, opacity, z }}
        className="relative w-[80vw] md:w-[40vw] aspect-[3/4] rounded-xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center p-8 transform-gpu"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl pointer-events-none" />
        
        <p className="text-3xl md:text-5xl text-center font-light text-white leading-relaxed">
          {text}
        </p>
      </motion.div>
    </div>
  )
}

export default function WhyMomoMatters() {
  return (
    <section className="relative w-full z-10 py-32 bg-transparent flex flex-col items-center overflow-hidden">
      <div className="w-full flex flex-col items-center gap-10">
        {reasons.map((reason, i) => (
          <Card key={i} text={reason} index={i} />
        ))}
      </div>
    </section>
  )
}
