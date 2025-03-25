"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface TextRevealProps {
  children: React.ReactNode
  threshold?: number
  delay?: number
}

export function TextReveal({ children, threshold = 0.5, delay = 0 }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold })
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (isInView && !hasPlayed) {
      setHasPlayed(true)
    }
  }, [isInView, hasPlayed])

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <div ref={ref} className="overflow-hidden">
      {isInView && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {React.Children.map(children, (child, i) => (
            <motion.div custom={i} variants={childVariants} className="inline-block">
              {child}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

