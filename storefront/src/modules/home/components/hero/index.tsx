"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Heading } from "@medusajs/ui"

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // 优化的播放/暂停函数，添加错误处理
  const togglePlayPause = useCallback(async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        await videoRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.warn("Video play/pause error:", error)
      setIsPlaying(videoRef.current.paused ? false : true)
    }
  }, [isPlaying])

  const handleVideoError = useCallback(() => {
    console.error("Video failed to load")
    setVideoError(true)
  }, [])

  const handleVideoPlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  // 在组件卸载时清理视频
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [])

  // 当页面变为不可见时暂停视频，可见时恢复
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!videoRef.current) return

      if (document.hidden) {
        if (!videoRef.current.paused) {
          videoRef.current.pause()
        }
      } else {
        if (videoRef.current.paused && isPlaying) {
          videoRef.current.play().catch(console.warn)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isPlaying])

  return (
    <div className="relative w-full h-[calc(100vh-115px)] overflow-hidden">
      {/* Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 right-0 bottom-0 left-px w-[calc(100%-1px)] h-full object-cover"
          onError={handleVideoError}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        >
          <source src="/video/jxd_banner_V2.mp4" type="video/mp4" />
          您的浏览器不支持视频播放。
        </video>
      )}

      {/* Pause/Play Button */}
      {!videoError && (
        <button
          onClick={togglePlayPause}
          className="absolute bottom-8 right-8 z-20 bg-black bg-opacity-60 hover:bg-opacity-80 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      )}
      
      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4" style={{ transform: 'translateY(-8vh)' }}>
        <div className="max-w-4xl">
          {/* Red Line Above Title */}
          <div className="w-16 h-2 mx-auto mb-8" style={{ backgroundColor: '#FF000F' }}></div>
          
          <h1 className="font-jxd-bold text-white leading-tight mb-12" style={{ fontSize: '64px' }}>
            Helping industries outrun<br />leaner and cleaner
          </h1>
          
          <p className="text-white font-jxd-light mb-12 max-w-2xl mx-auto" style={{ fontSize: '24px' }}>
            with our technologies in electrification and automation
          </p>
          
          <div className="flex justify-center">
            <a
              href="/about"
              className="text-white font-jxd-regular text-sm rounded-full transition-all duration-300 uppercase tracking-wide flex items-center justify-center"
              style={{ 
                backgroundColor: isButtonHovered ? '#BB2924' : '#FF000F',
                width: '156px',
                height: '48px'
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Discover more
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            })
          }}
          className="text-white hover:text-gray-300 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <div className="animate-bounce">
            <svg 
              className="w-8 h-8" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Hero
