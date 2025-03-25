"use client"

import React from "react"

import { useEffect, useRef, useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  School,
  BarChart,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Shield,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Laptop,
  Zap,
  Database,
  Lock,
  Play,
} from "lucide-react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  Float,
  Environment,
  Text,
  PerspectiveCamera,
  MeshDistortMaterial,
  RoundedBox,
  MeshWobbleMaterial,
  MeshReflectorMaterial,
  Cloud,
} from "@react-three/drei"
import * as THREE from "three"
import { Particles } from "@/components/particles"
import { TextReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { CursorFollower } from "@/components/cursor-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { useAudio } from "@/hooks/use-audio"
import { useMobile } from "@/hooks/use-mobile"
// Import the fallback component at the top of the file
import { Fallback3D } from "@/components/fallback-3d"

// At the top of the file, add:
const isBrowser = typeof window !== "undefined"

// Simple error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// 3D Models
function FloatingLaptop(props) {
  const { viewport } = useThree()
  const group = useRef(null)

  // Animate laptop based on mouse position
  useFrame(({ mouse, clock }) => {
    if (!group.current) return

    const x = (mouse.x * viewport.width) / 50
    const y = (mouse.y * viewport.height) / 50

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.1, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.1, 0.1)

    // Add subtle floating animation
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
  })

  return (
    <group ref={group} {...props}>
      <RoundedBox args={[2, 0.1, 1.5]} radius={0.05} smoothness={4} position={[0, -0.1, 0]}>
        <MeshReflectorMaterial color="#222" metalness={0.9} roughness={0.1} mirror={0.75} resolution={1024} />
      </RoundedBox>
      <RoundedBox args={[2, 1.2, 0.1]} radius={0.05} smoothness={4} position={[0, 0.6, -0.65]} rotation={[0, 0, 0]}>
        <MeshReflectorMaterial color="#333" metalness={0.8} roughness={0.2} mirror={0.5} resolution={1024} />
      </RoundedBox>
      <RoundedBox args={[1.8, 1.1, 0.01]} radius={0.02} smoothness={4} position={[0, 0.6, -0.6]}>
        <MeshWobbleMaterial
          color="#7C3AED"
          factor={0.05}
          speed={2}
          metalness={0.8}
          roughness={0.2}
          emissive="#7C3AED"
          emissiveIntensity={0.5}
        />
      </RoundedBox>
      <Text position={[0, 0.6, -0.59]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        EDU21
      </Text>
      <Text position={[0, 0.3, -0.59]} fontSize={0.06} color="white" anchorX="center" anchorY="middle">
        Software Educativo
      </Text>

      {/* Add floating particles around the laptop */}
      <Cloud
        position={[0, 0.5, 0]}
        speed={0.4}
        opacity={0.2}
        color="#8B5CF6"
        segments={20}
        width={3}
        depth={1.5}
        factor={2}
      />
    </group>
  )
}

// 3D Floating Sphere
function FloatingSphere({ position, color, speed = 1, wobble = 0.5, size = 1 }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (!ref.current) return

    ref.current.position.y = Math.sin(clock.getElapsedTime() * speed) * 0.1
    ref.current.rotation.z = clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial color={color} speed={wobble} distort={0.3} radius={1} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

// 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <FloatingLaptop position={[0, 0, 0]} />
      <FloatingSphere position={[-2, 1, -1]} color="#8B5CF6" speed={1.5} size={0.3} />
      <FloatingSphere position={[2, -0.5, -1]} color="#EC4899" speed={1} size={0.2} />
      <FloatingSphere position={[1.5, 1.5, -2]} color="#3B82F6" speed={2} size={0.25} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} autoRotate={false} enablePan={false} />
    </>
  )
}

// Animated Card Component with hover effects
const AnimatedCard = ({ icon: Icon, title, description, delay = 0, items = [] }) => {
  const [hovered, setHovered] = useState(false)
  const { playHover } = useAudio()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-violet-200 bg-white p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-violet-200/20 dark:border-violet-800/30 dark:bg-black/20 dark:backdrop-blur-lg"
      onHoverStart={() => {
        setHovered(true)
        playHover()
      }}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="absolute -right-10 -top-10 z-0 h-24 w-24 rounded-full bg-violet-500/20 transition-all duration-500 group-hover:scale-[2.5] group-hover:bg-violet-500/30" />

      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-violet-500/10 to-purple-600/10 opacity-0 transition-opacity duration-500"
        animate={{ opacity: hovered ? 1 : 0 }}
      />

      <div className="relative z-10">
        <motion.div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>

        <motion.h3
          className="mb-2 text-xl font-bold"
          animate={{ color: hovered ? "#8B5CF6" : "#000000" }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <p className="mb-4 text-muted-foreground">{description}</p>

        {items.length > 0 && (
          <ul className="space-y-2 text-sm">
            {items.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: hovered ? 1 : 0.7, x: hovered ? 0 : -5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.div
                  animate={{ scale: hovered ? 1.2 : 1, color: hovered ? "#8B5CF6" : "#8B5CF6" }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CheckCircle className="h-4 w-4 text-violet-500" />
                </motion.div>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600"
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 opacity-0"
        animate={{ opacity: hovered ? 0.8 : 0, scale: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

// Testimonial Card Component with advanced effects
const TestimonialCard = ({ name, role, content, initials, delay = 0 }) => {
  const [hovered, setHovered] = useState(false)
  const { playPop } = useAudio()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-violet-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-200/20 dark:border-violet-800/30 dark:bg-black/20 dark:backdrop-blur-lg"
      onHoverStart={() => {
        setHovered(true)
        playPop()
      }}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-600/5 opacity-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="mb-4 flex items-center gap-4">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-lg font-bold">{initials}</span>
        </motion.div>
        <div>
          <motion.h3
            className="text-lg font-bold"
            animate={{ color: hovered ? "#8B5CF6" : "#000000" }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>

      <motion.p
        className="text-muted-foreground"
        animate={{ opacity: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.p>

      <motion.div
        className="absolute -left-2 -top-2 h-16 w-16 rotate-12 rounded-lg bg-violet-500/10"
        animate={{ rotate: hovered ? 0 : 12, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute -bottom-2 -right-2 h-16 w-16 -rotate-12 rounded-lg bg-purple-500/10"
        animate={{ rotate: hovered ? 0 : -12, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute bottom-3 right-3 text-violet-500 opacity-0"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// Magnetic Button Component
const AnimatedButton = ({ children, variant = "default", className = "", ...props }) => {
  const { playClick } = useAudio()

  return (
    <MagneticButton onClick={playClick}>
      <Button variant={variant} className={`group relative overflow-hidden ${className}`} {...props}>
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </Button>
    </MagneticButton>
  )
}

// Gradient Text Component with animation
const GradientText = ({ children, className = "", animate = false }) => {
  return animate ? (
    <motion.span
      className={`bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      style={{ backgroundSize: "200% 200%" }}
    >
      {children}
    </motion.span>
  ) : (
    <span className={`bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

// Video Modal Component
const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-4xl rounded-xl bg-black overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="EDU21 Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            ></iframe>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/80"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Feature Highlight Component
const FeatureHighlight = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 opacity-30 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl" />
      <div className="relative flex items-center gap-4 rounded-lg border border-violet-200 bg-white/80 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white dark:border-violet-800/30 dark:bg-black/20 dark:hover:bg-black/30">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ value, title, icon: Icon, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const end = Number.parseInt(value)
          const duration = 2000
          const increment = Math.ceil(end / (duration / 16))

          const timer = setInterval(() => {
            start += increment
            if (start > end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [value])

  return (
    <motion.div
      ref={countRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center text-center"
    >
      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-purple-600/20 text-violet-600 dark:text-violet-400">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-3xl font-bold">{count}+</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </motion.div>
  )
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const isMobile = useMobile()
  const { initAudio } = useAudio()

  // Parallax effect for hero section
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // Initialize audio
  useEffect(() => {
    initAudio()
  }, [initAudio])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cursor functions
  const handleCursorEnter = () => setCursorVariant("hover")
  const handleCursorLeave = () => setCursorVariant("default")
  const handleCursorButton = () => setCursorVariant("button")
  const handleCursorButtonLeave = () => setCursorVariant("default")

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-violet-50 dark:from-gray-950 dark:to-black">
      {/* Custom Cursor */}
      {!isMobile && <CursorFollower variant={cursorVariant} />}

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] left-[20%] h-[500px] w-[500px] rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-900/20" />
        <div className="absolute -bottom-[10%] right-[10%] h-[300px] w-[300px] rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-900/20" />
        <div className="absolute left-[40%] top-[40%] h-[400px] w-[400px] rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-900/20" />

        {/* Animated particles */}
        <Particles className="absolute inset-0 z-0" quantity={100} color="#8B5CF6" speed={0.5} />
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* Header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-950/80" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
              <School className="h-5 w-5" />
              <div className="absolute -inset-0.5 -z-10 animate-pulse rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 opacity-50 blur" />
            </div>
            <span className="text-xl font-bold">EDU21</span>
          </motion.div>

          <nav className="hidden md:flex gap-6">
            {["Características", "Beneficios", "Testimonios", "Contacto"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="group relative text-sm font-medium transition-colors hover:text-violet-600"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={handleCursorButton}
            onMouseLeave={handleCursorButtonLeave}
          >
            <AnimatedButton size="sm">
              Solicitar Demo <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </motion.div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section ref={heroRef} className="relative overflow-hidden pt-20 lg:pt-0">
          <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0">
            <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-400/30 blur-3xl" />
            <div className="absolute right-[10%] top-[30%] h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 blur-3xl" />
          </motion.div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid min-h-screen items-center gap-6 py-12 md:py-24 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="inline-flex items-center rounded-full border border-violet-200 bg-white/50 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20 dark:text-violet-300"
                  >
                    <Sparkles className="mr-1 h-3.5 w-3.5 text-violet-600" />
                    Software Educativo de Última Generación
                  </motion.div>

                  <TextReveal>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                      Transforme su <GradientText animate={true}>institución</GradientText> con tecnología avanzada
                    </h1>
                  </TextReveal>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="max-w-[600px] text-lg text-muted-foreground md:text-xl"
                  >
                    Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.
                    Optimice procesos, mejore la comunicación y eleve la experiencia educativa.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <div onMouseEnter={handleCursorButton} onMouseLeave={handleCursorButtonLeave}>
                    <AnimatedButton size="lg" className="group">
                      Solicitar Demo
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </AnimatedButton>
                  </div>

                  <div onMouseEnter={handleCursorButton} onMouseLeave={handleCursorButtonLeave}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="group relative overflow-hidden border-violet-200 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50 dark:border-violet-800/30 dark:hover:border-violet-700/50 dark:hover:bg-violet-900/20"
                      onClick={() => setVideoOpen(true)}
                    >
                      <span className="relative z-10 flex items-center">
                        <Play className="mr-2 h-4 w-4" />
                        Ver Video
                      </span>
                      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-100 to-purple-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-violet-900/20 dark:to-purple-900/20" />
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
                >
                  {[
                    { icon: Zap, text: "Implementación rápida" },
                    { icon: Shield, text: "Seguridad avanzada" },
                    { icon: Laptop, text: "Acceso multiplataforma" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                        <item.icon className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                      </div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <div className="relative flex items-center justify-center lg:h-[600px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative h-[400px] w-full max-w-[600px] lg:h-full"
                >
                  // Then find the 3D canvas section in the hero and update it to:
                  <div className="absolute inset-0 z-10 rounded-2xl border border-violet-200 bg-white/30 shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-violet-800/30 dark:bg-black/20">
                    {isBrowser && (
                      <Suspense fallback={<Fallback3D />}>
                        <ErrorBoundary fallback={<Fallback3D />}>
                          <Canvas>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                            <Scene />
                          </Canvas>
                        </ErrorBoundary>
                      </Suspense>
                    )}
                  </div>
                  <div className="absolute -bottom-6 -right-6 z-0 h-full w-full rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 opacity-20 blur-xl" />
                </motion.div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-violet-50 to-transparent dark:from-gray-950 dark:to-transparent" />
        </section>

        {/* Stats Section */}
        <section className="relative py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedCounter value="500" title="Instituciones Educativas" icon={School} delay={0.1} />
              <AnimatedCounter value="50000" title="Usuarios Activos" icon={Users} delay={0.2} />
              <AnimatedCounter value="10" title="Años de Experiencia" icon={Calendar} delay={0.3} />
              <AnimatedCounter value="99" title="Satisfacción del Cliente" icon={CheckCircle} delay={0.4} />
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="relative py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <h2 className="text-xl font-medium tracking-tight md:text-2xl">
                Confiado por <GradientText animate={true}>instituciones educativas líderes</GradientText>
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                    onMouseEnter={handleCursorEnter}
                    onMouseLeave={handleCursorLeave}
                  >
                    <div className="relative flex h-16 items-center justify-center overflow-hidden rounded-lg bg-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80">
                      <Image
                        src={`/placeholder.svg?height=60&width=180&text=LOGO+${i}`}
                        alt={`Logo de cliente ${i}`}
                        width={180}
                        height={60}
                        className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute -inset-px -z-10 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-70" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="características" ref={featuresRef} className="relative py-12 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-[20%] top-[10%] h-64 w-64 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-900/20" />
            <div className="absolute bottom-[10%] right-[10%] h-64 w-64 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-900/20" />
          </div>

          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-white/50 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20 dark:text-violet-300">
                <Sparkles className="mr-1 h-3.5 w-3.5 text-violet-600" />
                Características Avanzadas
              </div>

              <TextReveal>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">
                  Soluciones <GradientText animate={true}>integrales</GradientText> para su institución
                </h2>
              </TextReveal>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-[900px] text-muted-foreground md:text-xl/relaxed"
              >
                Nuestra plataforma ofrece todas las herramientas que necesita para gestionar eficientemente su
                institución educativa.
              </motion.p>
            </motion.div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedCard
                icon={BarChart}
                title="Gestión Académica"
                description="Control completo de calificaciones, asistencia y planificación curricular."
                delay={0.1}
                items={["Registro de calificaciones", "Control de asistencia", "Planificación curricular"]}
              />

              <AnimatedCard
                icon={Users}
                title="Intranet Escolar"
                description="Plataforma centralizada para toda la comunidad educativa."
                delay={0.2}
                items={["Portal para estudiantes", "Portal para profesores", "Portal para apoderados"]}
              />

              <AnimatedCard
                icon={Calendar}
                title="Administración Escolar"
                description="Herramientas para la gestión eficiente de recursos y procesos."
                delay={0.3}
                items={["Gestión de matrículas", "Control financiero", "Administración de recursos"]}
              />

              <AnimatedCard
                icon={MessageSquare}
                title="Comunicación Efectiva"
                description="Canales de comunicación integrados para toda la comunidad."
                delay={0.4}
                items={["Mensajería interna", "Notificaciones automáticas", "Comunicados oficiales"]}
              />

              <AnimatedCard
                icon={FileText}
                title="Gestión Documental"
                description="Organización y acceso a todos los documentos institucionales."
                delay={0.5}
                items={["Repositorio centralizado", "Control de versiones", "Permisos personalizados"]}
              />

              <AnimatedCard
                icon={Database}
                title="Análisis de Datos"
                description="Información valiosa para la toma de decisiones estratégicas."
                delay={0.6}
                items={["Dashboards personalizados", "Reportes automáticos", "Indicadores de desempeño"]}
              />
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="relative py-12 md:py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-black" />

          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <div className="inline-flex items-center rounded-full border border-violet-200 bg-white/50 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20 dark:text-violet-300">
                  <Sparkles className="mr-1 h-3.5 w-3.5 text-violet-600" />
                  Experiencia Interactiva
                </div>

                <TextReveal>
                  <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Descubra cómo <GradientText animate={true}>funciona</GradientText> nuestra plataforma
                  </h2>
                </TextReveal>

                <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                  Explore las principales características de nuestra solución de software educativo
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative aspect-video w-full overflow-hidden rounded-2xl border border-violet-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20"
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg"
                    onClick={() => setVideoOpen(true)}
                  >
                    <Play className="h-8 w-8" />
                  </motion.button>
                </div>
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Demo de la plataforma EDU21"
                  width={1200}
                  height={600}
                  className="h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureHighlight
                  icon={Users}
                  title="Gestión de Usuarios"
                  description="Administre perfiles de estudiantes, profesores y personal administrativo."
                  index={0}
                />
                <FeatureHighlight
                  icon={BarChart}
                  title="Reportes Avanzados"
                  description="Visualice datos clave para la toma de decisiones estratégicas."
                  index={1}
                />
                <FeatureHighlight
                  icon={Calendar}
                  title="Calendario Integrado"
                  description="Organice eventos, clases y actividades en un solo lugar."
                  index={2}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="relative py-12 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-black" />

          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl border border-violet-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20"
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
              >
                <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-400/30 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 blur-3xl" />

                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Estudiantes utilizando la plataforma EDU21"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:bg-black/50 dark:text-violet-300">
                    Plataforma Intuitiva
                  </div>
                </div>

                <div className="relative p-6">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
                    <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                      Experiencia de Usuario
                    </span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">Diseñada para todos los usuarios</h3>
                  <p className="mt-2 text-muted-foreground">
                    Nuestra plataforma está diseñada pensando en todos los usuarios, desde estudiantes hasta
                    administradores, con interfaces intuitivas y accesibles.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-violet-200 bg-white/50 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20 dark:text-violet-300">
                    <Sparkles className="mr-1 h-3.5 w-3.5 text-violet-600" />
                    Beneficios Exclusivos
                  </div>

                  <TextReveal>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Ventajas que <GradientText animate={true}>transforman</GradientText> su institución
                    </h2>
                  </TextReveal>

                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Nuestras soluciones de software están diseñadas para optimizar procesos, mejorar la comunicación y
                    elevar la calidad educativa.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: "Ahorro de tiempo significativo",
                      description:
                        "Automatice tareas administrativas y enfóquese en lo que realmente importa: la educación.",
                      icon: Zap,
                    },
                    {
                      title: "Comunicación sin barreras",
                      description:
                        "Facilite la interacción entre todos los miembros de la comunidad educativa en tiempo real.",
                      icon: MessageSquare,
                    },
                    {
                      title: "Decisiones basadas en datos",
                      description:
                        "Acceda a estadísticas y análisis avanzados para tomar decisiones estratégicas informadas.",
                      icon: BarChart,
                    },
                    {
                      title: "Seguridad de primer nivel",
                      description:
                        "Proteja la información sensible con los más altos estándares de seguridad y privacidad.",
                      icon: Lock,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex items-start gap-4"
                      onMouseEnter={handleCursorEnter}
                      onMouseLeave={handleCursorLeave}
                    >
                      <motion.div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20 transition-all duration-300 group-hover:scale-110"
                        whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="h-6 w-6" />
                      </motion.div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  onMouseEnter={handleCursorButton}
                  onMouseLeave={handleCursorButtonLeave}
                >
                  <AnimatedButton size="lg" className="mt-4">
                    Descubrir más beneficios
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </AnimatedButton>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="relative py-12 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-900/20" />
            <div className="absolute bottom-[10%] right-[20%] h-64 w-64 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-900/20" />
          </div>

          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-white/50 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20 dark:text-violet-300">
                <Sparkles className="mr-1 h-3.5 w-3.5 text-violet-600" />
                Testimonios
              </div>

              <TextReveal>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">
                  Lo que dicen <GradientText animate={true}>nuestros clientes</GradientText>
                </h2>
              </TextReveal>

              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Descubra cómo nuestras soluciones han transformado la gestión de instituciones educativas.
              </p>
            </motion.div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                name="Juan Martínez"
                role="Director, Colegio San José"
                initials="JM"
                content="La implementación del sistema de gestión de EDU21 ha sido transformadora para nuestra institución. Hemos reducido el tiempo dedicado a tareas administrativas en un 40% y mejorado significativamente la comunicación con los apoderados."
                delay={0.1}
              />

              <TestimonialCard
                name="María Rodríguez"
                role="Coordinadora Académica, Instituto Técnico"
                initials="MR"
                content="La intranet escolar ha revolucionado nuestra forma de trabajar. Los profesores pueden gestionar sus cursos de manera eficiente, y los estudiantes tienen acceso a todos sus materiales en un solo lugar. Una herramienta indispensable."
                delay={0.2}
              />

              <TestimonialCard
                name="Carlos Pérez"
                role="Administrador, Liceo Municipal"
                initials="CP"
                content="El módulo de gestión financiera nos ha permitido tener un control preciso de nuestros recursos. La generación automática de informes y la visualización de datos en tiempo real son características que valoramos enormemente."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-12 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-500 to-purple-600" />
          <div className="absolute inset-0 -z-10 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-10 mix-blend-overlay" />

          <div className="container relative z-10 px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center text-white"
            >
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Comience Hoy Mismo
              </div>

              <TextReveal>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">
                  Transforme su institución educativa{" "}
                  <span className="underline decoration-wavy decoration-white/50 underline-offset-4">hoy</span>
                </h2>
              </TextReveal>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[600px] md:text-xl/relaxed"
              >
                Solicite una demostración personalizada y descubra cómo nuestras soluciones pueden adaptarse a sus
                necesidades específicas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mx-auto mt-6 w-full max-w-md space-y-2"
              >
                <form className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    className="h-12 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white/30"
                  />
                  <Button variant="secondary" size="lg" className="h-12 bg-white text-violet-600 hover:bg-white/90">
                    Solicitar Demo
                  </Button>
                </form>
                <p className="text-xs text-white/70">
                  Al enviar este formulario, acepta nuestros{" "}
                  <Link href="#" className="underline underline-offset-2 hover:text-white">
                    Términos y Condiciones
                  </Link>
                  .
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="relative py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-violet-200 bg-white/50 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20 dark:text-violet-300">
                    <Sparkles className="mr-1 h-3.5 w-3.5 text-violet-600" />
                    Contacto
                  </div>

                  <TextReveal>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Estamos aquí para <GradientText animate={true}>ayudarle</GradientText>
                    </h2>
                  </TextReveal>

                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Nuestro equipo está listo para responder a sus preguntas y ayudarle a encontrar la solución perfecta
                    para su institución.
                  </p>
                </div>

                <div className="mt-8 space-y-6">
                  {[
                    {
                      icon: "phone",
                      title: "Teléfono",
                      content: "+56 2 2123 4567",
                      href: "tel:+56221234567",
                    },
                    {
                      icon: "mail",
                      title: "Correo Electrónico",
                      content: "contacto@edu21.cl",
                      href: "mailto:contacto@edu21.cl",
                    },
                    {
                      icon: "map-pin",
                      title: "Dirección",
                      content: "Av. Providencia 1234, Santiago, Chile",
                      href: "https://maps.google.com",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex items-start gap-4"
                      onMouseEnter={handleCursorEnter}
                      onMouseLeave={handleCursorLeave}
                    >
                      <motion.div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20 transition-all duration-300 group-hover:scale-110"
                        whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {item.icon === "phone" && (
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.11-1.11a2 2 0 0 1 2.12-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          )}
                          {item.icon === "mail" && (
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM20 6l-8 5-8-5h16z" />
                          )}
                          {item.icon === "map-pin" && (
                            <path d="M3 7v11a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zM16 7v11a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1zM9.004 8.464 9 9 7 10.17V18a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7.83L11 9c-.006-.005-.013-.009-.019-.014A2.001 2.001 0 0 0 9.004 8.464zM12 13.5l-3-2.25V12l3 2.25 3-2.25v-.25L12 13.5z" />
                          )}
                        </svg>
                      </motion.div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground">
                          <Link href={item.href} className="underline underline-offset-2 hover:text-violet-600">
                            {item.content}
                          </Link>
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl border border-violet-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20"
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
              >
                <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-400/30 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 blur-3xl" />

                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.899297244486!2d-70.6094469234262!3d-33.43722998704137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c58654ca9dfd%3A0x64a3c93144992f74!2sAv.%20Providencia%201234%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1686942318741!5m2!1ses-419!2scl"
                    width="800"
                    height="600"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:bg-black/50 dark:text-violet-300">
                    Ubicación
                  </div>
                </div>

                <div className="relative p-6">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
                    <span className="text-sm font-medium text-violet-600 dark:text-violet-400">Visítenos</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">Encuéntrenos en Santiago</h3>
                  <p className="mt-2 text-muted-foreground">
                    Estamos ubicados en el corazón de Providencia, listos para atenderle.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-violet-200 py-8 text-center text-sm text-muted-foreground dark:border-violet-800/30">
        <div className="container px-4 md:px-6">© {new Date().getFullYear()} EDU21. Todos los derechos reservados.</div>
      </footer>
    </div>
  )
}

