"use client"

import { useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

const services = [
  {
    id: 1,
    title: "Industrial Control Consulting",
    description: "Whether it is consulting for automation systems or choosing the right control components, our team knows what's right and will offer you the best possible solution.",
    image: "/imgs/service_consulting.png"
  },
  {
    id: 2,
    title: "Equipment Procurement",
    description: "Whether you need emergency parts or you are planning a complete system upgrade, we can help with procurement and timely delivery of quality products.",
    image: "/imgs/service_procurement.png"
  },
  {
    id: 3,
    title: "Technical Support",
    description: "From installation to maintenance, we have the necessary equipment and training to provide top-quality technical services wherever you need them.",
    image: "/imgs/service_technical.png"
  }
]

const HowWeHelp = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  return (
    <div className="bg-neutral-100 py-20 small:py-24">
      <div className="content-container">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-12 h-1 bg-[#FF000F] mx-auto mb-4"></div>
            <h2 className="font-jxd-bold text-[#0F0F0F] text-4xl">
              How can we help you?
            </h2>
          </div>
        </div>

        {/* Services Grid - 3 columns like the reference image */}
        <div className="grid grid-cols-1 medium:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="transition-all duration-300">
              {/* Service Image - separate from text content */}
              <div className="mb-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content - separate from image */}
              <div>
                <h3 className="font-jxd-bold text-[#0F0F0F] text-xl mb-4">
                  {service.title}
                </h3>
                <p className="font-jxd-light text-[#0F0F0F] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button - matching your brand style */}
        <div className="text-center mt-12">
          <LocalizedClientLink
            href="/service"
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
            <span>View All Services</span>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default HowWeHelp