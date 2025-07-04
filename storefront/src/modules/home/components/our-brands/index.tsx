"use client"

import { useState } from "react"
import Image from "next/image"

const brands = [
  {
    id: 1,
    name: "ABB",
    description: "Pioneer in industrial technology with advanced robotics, automation, and electrical solutions that drive productivity and sustainability across industries.",
    image: "/imgs/abb.png"
  },
  {
    id: 2,
    name: "Honeywell",
    description: "Leading provider of industrial automation and control solutions, specializing in process control systems and safety technologies for industrial applications.",
    image: "/imgs/honeywell.png"
  },
  {
    id: 3,
    name: "Siemens", 
    description: "Global technology powerhouse in industrial automation, digitalization, and electrification, offering comprehensive solutions for manufacturing and infrastructure.",
    image: "/imgs/siemens.png"
  }
]

const OurBrands = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  return (
    <div className="bg-neutral-100 py-20 small:py-24">
      <div className="content-container">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-12 h-1 bg-[#FF000F] mx-auto mb-4"></div>
            <h2 className="font-jxd-bold text-[#0F0F0F] text-4xl">
              Our Partner Brands
            </h2>
          </div>
        </div>

        {/* Brands Grid - 3 columns */}
        <div className="grid grid-cols-1 medium:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <div key={brand.id} className="transition-all duration-300">
              {/* Brand Logo - separate from text content */}
              <div className="mb-6 overflow-hidden rounded-lg">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content - separate from image */}
              <div>
                <h3 className="font-jxd-bold text-[#0F0F0F] text-xl mb-4">
                  {brand.name}
                </h3>
                <p className="font-jxd-light text-[#0F0F0F] leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/brands"
            className="font-jxd-regular text-white text-sm rounded-full transition-all duration-300 inline-flex items-center justify-center px-8 py-3"
            style={{ 
              backgroundColor: isButtonHovered ? '#BB2924' : '#FF000F'
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>View All Brands</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default OurBrands