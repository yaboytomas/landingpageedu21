"use client"

import { useCallback, useRef, useState } from "react"

export function useAudio() {
  const [initialized, setInitialized] = useState(false)
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const popSoundRef = useRef<HTMLAudioElement | null>(null)

  const initAudio = useCallback(() => {
    if (typeof window === "undefined") return

    if (!initialized) {
      try {
        // Create audio elements but don't require the files to exist
        hoverSoundRef.current = new Audio()
        clickSoundRef.current = new Audio()
        popSoundRef.current = new Audio()

        // Set sources but don't force loading
        if (hoverSoundRef.current) hoverSoundRef.current.src = "/sounds/hover.mp3"
        if (clickSoundRef.current) clickSoundRef.current.src = "/sounds/click.mp3"
        if (popSoundRef.current) popSoundRef.current.src = "/sounds/pop.mp3"

        setInitialized(true)
      } catch (error) {
        console.warn("Audio initialization failed:", error)
        // Continue without audio
        setInitialized(true)
      }
    }
  }, [initialized])

  const playHover = useCallback(() => {
    if (hoverSoundRef.current) {
      try {
        hoverSoundRef.current.currentTime = 0
        hoverSoundRef.current.volume = 0.2
        const playPromise = hoverSoundRef.current.play()
        if (playPromise) playPromise.catch(() => {})
      } catch (error) {
        // Silently fail if audio can't play
      }
    }
  }, [])

  const playClick = useCallback(() => {
    if (clickSoundRef.current) {
      try {
        clickSoundRef.current.currentTime = 0
        clickSoundRef.current.volume = 0.3
        const playPromise = clickSoundRef.current.play()
        if (playPromise) playPromise.catch(() => {})
      } catch (error) {
        // Silently fail if audio can't play
      }
    }
  }, [])

  const playPop = useCallback(() => {
    if (popSoundRef.current) {
      try {
        popSoundRef.current.currentTime = 0
        popSoundRef.current.volume = 0.2
        const playPromise = popSoundRef.current.play()
        if (playPromise) playPromise.catch(() => {})
      } catch (error) {
        // Silently fail if audio can't play
      }
    }
  }, [])

  return { initAudio, playHover, playClick, playPop }
}

