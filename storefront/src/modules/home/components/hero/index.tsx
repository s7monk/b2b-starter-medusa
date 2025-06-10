"use client"

import { Heading } from "@medusajs/ui"
import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { useState, useEffect } from "react"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "ABB Drives & Motors",
      subtitle: "Variable Frequency Drives",
      description: "Complete range of ABB drives for industrial applications. Energy efficient solutions for motor control.",
      image: "/api/placeholder/1200/500",
      cta: "View ABB Products",
      link: "/brands/abb"
    },
    {
      title: "Allen-Bradley PLCs",
      subtitle: "Programmable Logic Controllers", 
      description: "Rockwell Automation's industry-leading PLC systems. CompactLogix, ControlLogix, and MicroLogix series.",
      image: "/api/placeholder/1200/500",
      cta: "Shop Allen-Bradley",
      link: "/brands/allen-bradley"
    },
    {
      title: "Siemens SIMATIC",
      subtitle: "Industrial Automation Systems",
      description: "Complete automation solutions from Siemens. HMI, SCADA, and industrial communication systems.",
      image: "/api/placeholder/1200/500", 
      cta: "Explore Siemens",
      link: "/brands/siemens"
    },
    {
      title: "Schneider Electric",
      subtitle: "Power & Control Solutions",
      description: "Energy management and automation solutions. Modicon PLCs, PowerLogic meters, and more.",
      image: "/api/placeholder/1200/500",
      cta: "View Products",
      link: "/brands/schneider"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[400px] w-full bg-gray-100 overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-gray-200"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.8)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0wIDUwSDE2LjY2NjdWNjYuNjY2N0gwVjUwWiIgZmlsbD0iI0U1RTdFQiIvPgo8cGF0aCBkPSJNMTYuNjY2NyA1MEgzMy4zMzMzVjY2LjY2NjdIMTYuNjY2N1Y1MFoiIGZpbGw9IiNFNUU3RUIiLz4KPHA+\')`,
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center content-container">
              <div className="flex items-center justify-between w-full">
                {/* Left Content */}
                <div className="flex-1 max-w-2xl text-white">
                  <p className="text-blue-200 text-sm uppercase tracking-wider font-medium mb-3">
                    {slide.subtitle}
                  </p>
                  
                  <Heading
                    level="h1"
                    className="text-3xl small:text-5xl font-bold mb-4 leading-tight"
                  >
                    {slide.title}
                  </Heading>

                  <p className="text-lg small:text-xl text-blue-100 mb-6 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  <LocalizedClientLink href={slide.link}>
                    <Button 
                      variant="secondary"
                      className="bg-white hover:bg-gray-100 text-blue-600 border-white px-8 py-3 text-base font-semibold rounded-md transition-all duration-300"
                    >
                      {slide.cta}
                    </Button>
                  </LocalizedClientLink>
                </div>

                {/* Right Side - Product Image Placeholder */}
                <div className="hidden large:block flex-shrink-0 ml-8">
                  <div className="w-80 h-60 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                    <div className="text-center text-white/80">
                      <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 13.5L8.5 16 12 18.5 15.5 16 12 13.5z"/>
                        </svg>
                      </div>
                      <p className="text-sm">Product Image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
export default Hero

