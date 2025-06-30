"use client"

import { useState } from "react"

const features = [
  {
    id: 1,
    title: "20+ Years Experience",
    description: "Over two decades of expertise in industrial automation, providing reliable products and services for our customers.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Global Supply Chain",
    description: "Extensive network of trusted suppliers and partners ensuring fast delivery and competitive pricing for all your industrial needs.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L9.99 16v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.89-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "24/7 Professional Service",
    description: "Round-the-clock professional support team ready to assist with technical inquiries and problem resolution.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Quality Assurance",
    description: "We guarantee the quality of all our products and provide comprehensive warranty coverage for your peace of mind.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    )
  }
]

const WhyChooseUs = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="bg-white py-12 small:py-16">
      <div className="content-container">
        {/* Header Section - more compact */}
        <div className="text-center mb-10">
          <div className="w-12 h-1 bg-[#FF000F] mx-auto mb-3"></div>
          <h2 className="font-jxd-bold text-[#0F0F0F] text-3xl mb-4">
            Why Choose Us?
          </h2>
          <p className="font-jxd-light text-[#0F0F0F] max-w-xl mx-auto leading-relaxed">
            Trusted expertise and reliable solutions for your industrial automation needs.
          </p>
        </div>

        {/* Features Grid - 4 columns, more compact */}
        <div className="grid grid-cols-1 small:grid-cols-2 large:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group text-center transition-all duration-300"
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-6 rounded-lg transition-all duration-300 hover:shadow-md">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === feature.id 
                    ? 'bg-[#FF000F] text-white' 
                    : 'bg-gray-100 text-[#FF000F]'
                }`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-jxd-bold text-[#0F0F0F] text-lg mb-3 group-hover:text-[#FF000F] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="font-jxd-light text-[#0F0F0F] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle decorative element */}
                <div className={`w-8 h-0.5 mx-auto mt-4 transition-all duration-300 ${
                  hoveredCard === feature.id 
                    ? 'bg-[#FF000F]' 
                    : 'bg-gray-200'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs 