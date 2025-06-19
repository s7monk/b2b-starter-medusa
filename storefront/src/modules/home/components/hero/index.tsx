"use client"

import { useState } from "react"
import { Heading } from "@medusajs/ui"

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)

  const togglePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause()
      } else {
        videoRef.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="relative w-full h-[calc(100vh-115px)] overflow-hidden">
      {/* Video Background */}
      <video
        ref={setVideoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 right-0 bottom-0 left-px w-[calc(100%-1px)] h-full object-cover"
      >
        <source src="/video/jxd_banner_V2.mp4" type="video/mp4" />
        您的浏览器不支持视频播放。
      </video>
      

      
      {/* Pause/Play Button - Bottom Right */}
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
      
      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl">
          {/* Red Line Above Title */}
          <div className="w-16 h-2 mx-auto mb-8" style={{ backgroundColor: '#FF000F' }}></div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-jxd-bold text-white leading-tight mb-6">
            Helping industries outrun<br />leaner and cleaner
          </h1>
          
          <p className="text-lg md:text-xl text-white font-jxd-light mb-12 max-w-2xl mx-auto">
            with our technologies in electrification and automation
          </p>
          
          <div className="flex justify-center">
            <a
              href="/about"
              className="inline-block text-white font-jxd text-sm px-6 py-3 rounded-full transition-all duration-300 uppercase tracking-wide hover:opacity-90"
              style={{ backgroundColor: '#FF000F' }}
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
