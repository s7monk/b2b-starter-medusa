"use client"

import { useState } from "react"
import Image from "next/image"

const WhoWeAre = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  return (
    <div className="bg-white py-20 small:py-24">
      <div className="content-container">
        <div className="grid grid-cols-1 large:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image */}
          <div>
            <Image
              src="/imgs/company.png"
              alt="Industrial Automation Company"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>

          {/* Right Side - Content */}
          <div>
            <div className="mb-6">
              <div className="w-12 h-1 bg-[#FF000F] mb-4"></div>
              <span className="font-jxd-bold text-gray-600 text-sm tracking-wider">
                Who Are We?
              </span>
            </div>

            <h2 className="font-jxd-bold text-[#0F0F0F] text-4xl leading-tight mb-6">
              A Team of Full-service<br />
              Reliable Industrial<br />
              Automation Professionals<br />
              for Your Business Needs.
            </h2>

            <p className="font-jxd-light text-[#0F0F0F] leading-relaxed mb-8">
              With 20 years of experience in industrial automation services and supplies,
              our team of experts are here to help you with all your automation needs.
              Whether it is a complicated system integration or one that just needs
              a quick component replacement, we'll help you figure it out and fix it at the
              most affordable cost.
            </p>

            <button
              className="font-jxd-regular text-white text-sm rounded-full transition-all duration-300 flex items-center justify-center px-8 py-3"
              style={{ 
                backgroundColor: isButtonHovered ? '#BB2924' : '#FF000F'
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span className="mr-2">Know More About Us</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoWeAre 