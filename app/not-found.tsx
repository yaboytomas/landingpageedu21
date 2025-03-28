"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Particles } from '@/components/particles'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

export default function NotFound() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  // Handle mounting for theme
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex flex-col">
      {/* Background particles */}
      <Particles className="absolute inset-0 z-0" quantity={60} color="#8B5CF6" speed={0.5} />
      
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
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-500 dark:to-purple-400">
            Error 404 - Página no encontrada
          </h1>

          <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>

          <Button 
            asChild
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 group transition-all"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 relative z-10">
        <p>© {new Date().getFullYear()} EDU21. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
} 