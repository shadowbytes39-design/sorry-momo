"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// Note: To use your own photos, place them in the /public/photos folder
// and change the img paths here to "/photos/your_photo.jpg"
const memories = [
  { id: 1, text: "One of my favorite moments.", img: "/photos/1.jpeg", position: "object-center" },
  { id: 2, text: "One of the reasons I smile.", img: "/photos/momo1.jpeg", position: "object-top" },
  { id: 3, text: "A memory I will never forget.", img: "/photos/photo.jpeg", position: "object-top" },
  { id: 4, text: "The way time stops when we're together.", img: "/photos/1.jpeg", position: "object-top" },
  { id: 5, text: "All the little things I miss about us.", img: "/photos/2.jpeg", position: "object-top" },
  { id: 6, text: "Because you mean the world to me.", img: "/photos/3.jpeg", position: "object-top" }
]

function GalleryItem({ img, text, index, position }: { img: string, text: string, index: number, position: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  
  // Create a slight 3D rotation effect based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15])

  return (
    <div ref={ref} className="relative w-full h-[150vh] flex items-center justify-center perspective-[1000px]">
      <motion.div 
        style={{ opacity, scale, rotateX }}
        className="relative w-[90vw] md:w-[60vw] h-[60vh] md:h-[80vh] overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-zinc-900"
      >
        <motion.img 
          style={{ y }}
          src={img} 
          alt={`Memory ${index + 1}`} 
          className={`absolute inset-0 w-full h-[140%] object-cover ${position} -top-[20%] opacity-80`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-16">
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="text-3xl md:text-6xl font-light text-white tracking-wide text-center drop-shadow-xl"
          >
            {text}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default function MomoGallery() {
  return (
    <section className="relative w-full z-10 py-20 bg-transparent">
      {memories.map((m, i) => (
        <GalleryItem key={m.id} img={m.img} text={m.text} index={i} position={m.position} />
      ))}
    </section>
  )
}
