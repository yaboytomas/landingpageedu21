"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BeneficiosPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/#beneficios')
  }, [router])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-pulse text-center">
        <h1 className="text-xl font-medium">Redirigiendo a Beneficios...</h1>
      </div>
    </div>
  )
} 