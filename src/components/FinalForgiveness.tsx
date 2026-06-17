"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Heart } from "lucide-react"

export default function FinalForgiveness() {
  const [clicked, setClicked] = useState(false)

  const handleForgive = () => {
    if (clicked) return
    
    setClicked(true)
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff99cc', '#ffb3d9', '#ffffff'] })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff99cc', '#ffb3d9', '#ffffff'] })
    }, 250)
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black z-20 py-32 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-16">
          <Heart className="w-32 h-32 md:w-48 md:h-48 text-red-500 fill-red-500/20 drop-shadow-[0_0_50px_rgba(239,68,68,0.5)] animate-[pulse_3s_ease-in-out_infinite]" strokeWidth={0.5} />
        </div>
        
        <div className="text-center space-y-6 mb-20 max-w-2xl">
          <p className="text-xl md:text-3xl font-light text-white/80">
            I know one website can't fix everything.
          </p>
          <p className="text-xl md:text-3xl font-light text-white/80">
            But I wanted you to know...
          </p>
          <p className="text-xl md:text-3xl font-light text-white/80">
            You matter to me.
          </p>
          <p className="text-4xl md:text-6xl font-light text-white mt-8 drop-shadow-lg pt-4">
            And I'm truly sorry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
          <button 
            onClick={handleForgive}
            className="flex-1 px-8 py-5 rounded-full bg-red-600/90 hover:bg-red-500 text-white font-medium tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.6)] hover:-translate-y-1"
          >
            {clicked ? "Thank you Momo ❤️" : "Let's Be Okay Again"}
          </button>
          
          <button className="flex-1 px-8 py-5 rounded-full border border-white/20 hover:bg-white/10 text-white/80 font-medium tracking-wide transition-all duration-300">
            I Need More Time
          </button>
        </div>
      </motion.div>
    </section>
  )
}
