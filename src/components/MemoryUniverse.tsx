"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Using a 2D approach for the memory universe for better layout control and performance,
// since clicking 3D stars to open rich HTML content is often clunky on mobile.
// We simulate a 3D starfield layout.
const memories = [
  { id: 1, x: 20, y: 30, size: 4, title: "That funny day", text: "Remember when we couldn't stop laughing at...", date: "Summer 2023", img: "/photos/4.jpeg" },
  { id: 2, x: 70, y: 20, size: 6, title: "Late night talks", text: "We stayed up until 4 AM just talking about the universe.", date: "Winter 2023", img: "/photos/5.jpeg" },
  { id: 3, x: 40, y: 60, size: 5, title: "Our favorite place", text: "Eating at that corner café. We ordered way too much food.", date: "Spring 2024", img: "/photos/6.jpeg" },
  { id: 4, x: 80, y: 70, size: 3, title: "The silly fight", text: "We argued over something so dumb and laughed about it later.", date: "Last month", img: "/photos/7.jpeg" },
]

export default function MemoryUniverse() {
  const [activeMemory, setActiveMemory] = useState<number | null>(null)

  return (
    <section className="relative w-full h-[150vh] flex items-center justify-center bg-transparent z-20">
      <div className="absolute top-10 left-0 w-full text-center">
        <h2 className="text-3xl font-light text-white tracking-widest mb-2">Memory Universe</h2>
        <p className="text-white/50 text-sm">Click a star to reveal a memory</p>
      </div>

      <div className="relative w-full h-[80vh] max-w-6xl mx-auto border border-white/5 rounded-3xl bg-black/20 backdrop-blur-sm overflow-hidden">
        {memories.map((mem) => (
          <motion.div
            key={mem.id}
            className="absolute cursor-pointer"
            style={{ left: `${mem.x}%`, top: `${mem.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: mem.id * 0.2 }}
            onClick={() => setActiveMemory(mem.id)}
          >
            <div 
              className="rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)] hover:scale-150 transition-transform"
              style={{ width: `${mem.size}px`, height: `${mem.size}px` }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-white/10 rounded-full animate-ping pointer-events-none" />
          </motion.div>
        ))}

        <AnimatePresence>
          {activeMemory && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-30 p-6"
              onClick={() => setActiveMemory(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-2xl shadow-2xl relative"
              >
                {(() => {
                  const m = memories.find(x => x.id === activeMemory)
                  return m ? (
                    <>
                      <div className="absolute top-4 right-6 text-white/30 text-xs z-10">{m.date}</div>
                      <h3 className="text-2xl font-light text-white mb-4">{m.title}</h3>
                      {m.img && <img src={m.img} alt={m.title} className="w-full h-48 object-cover rounded-xl mb-4 opacity-90 border border-white/10" />}
                      <p className="text-white/70 leading-relaxed">
                        {m.text}
                      </p>
                      <button 
                        onClick={() => setActiveMemory(null)}
                        className="mt-8 text-sm text-white/50 hover:text-white transition-colors uppercase tracking-widest"
                      >
                        Close
                      </button>
                    </>
                  ) : null
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
