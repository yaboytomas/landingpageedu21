"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CursorFollowerProps {
  variant?: "default" | "hover" | "button"
}

export function CursorFollower({ variant = "default" }: CursorFollowerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const variants = {
    default: {
      height: 32,
      width: 32,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "rgba(139, 92, 246, 0.1)",
      border: "1px solid rgba(139, 92, 246, 0.2)",
      mixBlendMode: "normal",
    },
    hover: {
      height: 64,
      width: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      backgroundColor: "rgba(139, 92, 246, 0.1)",
      border: "1px solid rgba(139, 92, 246, 0.3)",
      mixBlendMode: "normal",
    },
    button: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "rgba(139, 92, 246, 0.15)",
      border: "1px solid rgba(139, 92, 246, 0.5)",
      mixBlendMode: "normal",
    },
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full backdrop-blur-sm"
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  )
}

