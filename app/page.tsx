"use client"

import React from "react"

import { useEffect, useRef, useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
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
  ArrowUp,
  Menu,
  X,
} from "lucide-react"
import { Particles } from "@/components/particles"
import { TextReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { CursorFollower } from "@/components/cursor-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"

// Global CSS for performance optimization
const mobileOptimizedClass = "transition-colors active:text-violet-600";

// Add new global style for reduced motion on mobile
const globalStyles = `
.reduce-motion * {
  transition-duration: 0.1s !important;
  animation-duration: 0.1s !important;
  transition-delay: 0s !important;
  animation-delay: 0s !important;
  animation-iteration-count: 1 !important;
}
`;

// Laptop image component
const LaptopImage = () => (
  <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
    <div className="relative h-[90%] w-[90%] overflow-hidden rounded-lg">
      <Image 
        src="/hero.jpg" 
        alt="EDU21 Software Educativo"
        fill
        className="object-cover object-center"
        priority
      />
    </div>
  </div>
);

// Animated Card Component with hover effects
const AnimatedCard = ({ icon: Icon, title, description, delay = 0, items = [] }) => {
  const [hovered, setHovered] = useState(false)
  const isMobileDevice = useMobile()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobileDevice ? 0.3 : 0.5, delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-violet-200 bg-white p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-violet-200/20 dark:border-violet-800/30 dark:bg-black/20 dark:backdrop-blur-lg"
      onHoverStart={() => {
        setHovered(true)
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
          className="mb-2 text-xl font-bold text-black dark:text-white"
          animate={{ color: hovered ? "#8B5CF6" : "" }}
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
  const isMobileDevice = useMobile()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: isMobileDevice ? 0.3 : 0.5, delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-violet-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-200/20 dark:border-violet-800/30 dark:bg-black/20 dark:backdrop-blur-lg"
      onHoverStart={() => {
        setHovered(true)
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
  return (
    <MagneticButton>
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

// Demo Request Modal Component
const DemoRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    escuela: "",
    numero: "",
    correo: "",
    mensaje: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    try {
      const response = await fetch('/api/send-demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar la solicitud')
      }
      
      // Set success and redirect to thank you page
      setIsSuccess(true)
      
      // Close modal and redirect after a short delay
      setTimeout(() => {
        onClose()
        // Use a relative URL instead of an absolute URL to avoid 404 errors
        // when running locally or in different environments
        window.location.href = '/gracias-solicitud-demo'
      }, 1000)
      
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(err.message || 'Error al enviar la solicitud. Intente de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
          className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="mb-6 text-center">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-white/50 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20 dark:text-violet-300">
              <Sparkles className="mr-1 h-3.5 w-3.5 text-violet-600" />
              Solicitud de Demo
            </div>
            <h2 className="mt-2 text-2xl font-bold">Solicite una demostración personalizada</h2>
            <p className="mt-2 text-muted-foreground">
              Complete el formulario y nos pondremos en contacto con usted a la brevedad.
            </p>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">¡Solicitud enviada!</h3>
              <p className="text-muted-foreground">
                Gracias por su interés. Nos pondremos en contacto con usted pronto.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium">
                  Nombre completo
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese su nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="escuela" className="text-sm font-medium">
                  Institución educativa
                </label>
                <Input
                  id="escuela"
                  name="escuela"
                  placeholder="Nombre de su institución"
                  value={formData.escuela}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="numero" className="text-sm font-medium">
                    Número de teléfono
                  </label>
                  <Input
                    id="numero"
                    name="numero"
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={formData.numero}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="correo" className="text-sm font-medium">
                    Correo electrónico
                  </label>
                  <Input
                    id="correo"
                    name="correo"
                    type="email"
                    placeholder="ejemplo@dominio.com"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-medium">
                  Mensaje (opcional)
                </label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Cuéntenos sobre sus necesidades específicas"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white transition-all hover:from-violet-600 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </div>
                ) : (
                  "Enviar solicitud"
                )}
              </Button>
            </form>
          )}
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
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const isMobile = useMobile()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle mounting for theme
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Parallax effect for hero section
  const y = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Optimize page performance based on device type
  useEffect(() => {
    // Only apply performance optimizations on mobile
    if (isMobile) {
      // Add class to reduce motion
      document.documentElement.classList.add('reduce-motion');
      
      // Use passive event listeners for all touch events
      const passiveOption = { passive: true };
      document.addEventListener('touchstart', () => {}, passiveOption);
      document.addEventListener('touchmove', () => {}, passiveOption);
    }
  }, [isMobile]);

  // Simplified scroll handler without throttling
  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        setShowBackToTop(window.scrollY > 500);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: isMobile ? 'auto' : 'smooth'
    });
  };

  const openDemoModal = () => setDemoModalOpen(true)

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  // Add styles to document head
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = globalStyles;
      document.head.appendChild(styleElement);
      
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-violet-50 dark:from-gray-950 dark:to-black">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg transition-all hover:scale-110"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] left-[20%] h-[500px] w-[500px] rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-900/20" />
        <div className="absolute -bottom-[10%] right-[10%] h-[300px] w-[300px] rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-900/20" />
        <div className="absolute left-[40%] top-[40%] h-[400px] w-[400px] rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-900/20" />

        {/* Animated particles */}
        <Particles className="absolute inset-0 z-0" quantity={isMobile ? 30 : 100} color="#8B5CF6" speed={0.5} />
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      
      {/* Demo Request Modal */}
      <DemoRequestModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/80 shadow-md backdrop-blur dark:bg-gray-950/80" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center">
              {!mounted ? (
                <div className="h-auto w-40"></div>
              ) : (
                <Image
                  src={theme === "dark" ? "/logo2.png" : "/logo.png"}
                  alt="EDU21 Logo"
                  width={160}
                  height={160}
                  className="h-auto w-40 object-contain"
                  priority
                />
              )}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {[
              { id: "características", label: "Características" },
              { id: "beneficios", label: "Beneficios" },
              { id: "testimonios", label: "Testimonios" }
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={`#${item.id}`}
                  className={`group relative text-sm font-medium transition-colors hover:text-violet-600 ${mobileOptimizedClass}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById(item.id);
                    if (section) {
                      section.scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth' });
                    }
                  }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden sm:block"
            >
              <AnimatedButton size="sm" onClick={openDemoModal}>
                Solicitar Demo
              </AnimatedButton>
            </motion.div>
            
            {/* Mobile Menu Button */}
            <button 
              className="flex md:hidden p-2"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm shadow-md overflow-hidden"
            >
              <div className="container py-4 px-4 flex flex-col space-y-4">
                {[
                  { id: "características", label: "Características" },
                  { id: "beneficios", label: "Beneficios" },
                  { id: "testimonios", label: "Testimonios" }
                ].map((item) => (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-base font-medium py-2 hover:text-violet-600 transition-colors ${mobileOptimizedClass}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        const section = document.getElementById(item.id);
                        if (section) {
                          section.scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth' });
                        }
                      }, 50);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className={`w-full bg-gradient-to-r from-violet-500 to-purple-600 ${mobileOptimizedClass}`}
                    onClick={() => {
                      openDemoModal();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Solicitar Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

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
                className="flex flex-col justify-center space-y-4 mx-auto text-center lg:text-left lg:mx-0"
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
                    className="max-w-[600px] text-lg text-muted-foreground md:text-xl mx-auto lg:mx-0"
                  >
                    Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.
                    Optimice procesos, mejore la comunicación y eleve la experiencia educativa.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col gap-3 sm:flex-row justify-center lg:justify-center"
                >
                  <div className="flex justify-center">
                    <AnimatedButton size="lg" className="group flex items-center justify-center" onClick={openDemoModal}>
                      Solicitar Demo
                    </AnimatedButton>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground justify-center lg:justify-start"
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

              <div className="relative flex items-center justify-center h-full lg:h-[650px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative h-[500px] w-full max-w-[600px] lg:h-[600px]"
                >
                  <div className="absolute inset-0 z-10 rounded-2xl border border-violet-200 bg-white/10 shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-violet-800/30 dark:bg-black/10 overflow-hidden">
                    <LaptopImage />
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
                  >
                    <div className="relative flex h-20 items-center justify-center overflow-hidden rounded-lg bg-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80">
                      <Image
                        src={`/school${i}.jpg`}
                        alt={`Logo de institución educativa ${i}`}
                        width={180}
                        height={60}
                        className="h-14 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                        loading="lazy"
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
                className="relative aspect-video w-full overflow-hidden rounded-2xl border border-violet-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20 cursor-pointer group"
                onClick={openDemoModal}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                
                <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/10 transition-all duration-500 z-0" />
                
                <Image
                  src="/lukas.png"
                  alt="EDU21 Software Educativo"
                  fill
                  className="object-cover object-center transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">Solicitar Demostración</h3>
                  <p className="text-white/90">Haga clic para programar una demostración personalizada</p>
                </div>
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
              >
                <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-400/30 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 blur-3xl" />

                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <Image
                    src="/xp.jpg"
                    alt="Estudiantes utilizando la plataforma EDU21"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
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
                  className="flex justify-center"
                >
                  <AnimatedButton size="lg" className="mt-4" onClick={openDemoModal}>
                    Descubrir más beneficios
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
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-white/50 px-3 py-1 text-sm font-medium text-violet-800 backdrop-blur-sm dark:border-violet-800/30 dark:bg-black/20 dark:text-violet-300">
                <Sparkles className="mr-1 h-3.5 w-3.5 text-violet-600" />
                Comience Hoy Mismo
              </div>

              <TextReveal>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">
                  Transforme su institución educativa{" "}
                  <span className="underline decoration-wavy decoration-violet-500/50 underline-offset-4">hoy</span>
                </h2>
              </TextReveal>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed"
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
                <div className="flex justify-center">
                  <Button 
                    variant="default" 
                    size="lg" 
                    className={`h-12 w-60 bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center ${mobileOptimizedClass}`}
                    onClick={openDemoModal}
                  >
                    Solicitar Demo
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  
                  Al solicitar una demo, acepta nuestros{" "}
                  <Link href="#" className="underline underline-offset-2 hover:text-violet-600">
                    Términos y Condiciones
                  </Link>
                  .
                </p>
              </motion.div>
            </motion.div>
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



