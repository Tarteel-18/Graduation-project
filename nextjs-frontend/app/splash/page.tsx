'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashVideo() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    timeoutRef.current = setTimeout(() => {
      router.replace('/')
    }, 6000)

    if (videoRef.current) {
      videoRef.current.onended = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        router.replace('/')
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      document.body.style.overflow = ''
    }
  }, [router])

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/assets/videos/splash.mp4"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
      />
    </div>
  )
}

