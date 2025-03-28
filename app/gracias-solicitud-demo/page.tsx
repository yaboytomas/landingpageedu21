"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { 
  ArrowLeft, 
  CheckCircle 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Particles } from "@/components/particles"

export default function GraciasSolicitudDemo() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  // Handle mounting for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex flex-col">
      {/* Background particles */}
      <Particles className="absolute inset-0 z-0" quantity={80} color="#8B5CF6" speed={0.5} />
      
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] left-[20%] h-[300px] w-[300px] rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-900/20" />
        <div className="absolute -bottom-[10%] right-[10%] h-[200px] w-[200px] rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-900/20" />
      </div>
      
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-10">
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
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden z-10">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-5">
              <CheckCircle className="h-14 w-14 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-500 dark:to-purple-400"
          >
            ¡Gracias por tu solicitud!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 text-lg text-gray-700 dark:text-gray-300"
          >
            Hemos recibido correctamente tu solicitud de demostración. Un miembro de nuestro equipo se pondrá en contacto contigo a la brevedad para coordinar los detalles.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10 p-6 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Mientras tanto, síguenos en redes sociales</h2>
            
            <div className="flex flex-wrap justify-center gap-3">
              {/* Instagram - With actual logo */}
              <a 
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/edu21software"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-4 py-2 text-white transition-transform hover:scale-105"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/social/instagram.svg" 
                    alt="Instagram"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <span>Instagram</span>
              </a>
              
              {/* Facebook - With actual logo */}
              <a 
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/edu21software"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#1877F2] px-4 py-2 text-white transition-transform hover:scale-105"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/social/facebook.svg" 
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <span>Facebook</span>
              </a>
              
              {/* YouTube - With actual logo */}
              <a 
                href={process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/edu21software"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#FF0000] px-4 py-2 text-white transition-transform hover:scale-105"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/social/youtube.svg" 
                    alt="YouTube"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <span>YouTube</span>
              </a>
              
              {/* Website - With globe icon */}
              <a 
                href={process.env.NEXT_PUBLIC_WEBSITE_URL || "https://edu21.cl"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-white transition-transform hover:scale-105"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/social/globe.svg" 
                    alt="Website"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <span>Sitio Web</span>
              </a>
              
              {/* WhatsApp - With actual logo */}
              <a 
                href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/56948504588?text=Hola%20me%20interesan%20los%20servicios%20de%20Edu21.cl!"}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-white transition-transform hover:scale-105"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/social/whatsapp.svg" 
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button 
              asChild
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 group transition-all"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Volver al inicio
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 relative z-10">
        <p>© {new Date().getFullYear()} EDU21. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
} 