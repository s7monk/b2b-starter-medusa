"use client"

import { useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

const ProductCategories = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  return (
    <div className="bg-white py-20 small:py-24">
      <div className="content-container">
        <div className="grid grid-cols-1 large:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="mb-6">
              <div className="w-12 h-1 bg-[#FF000F] mb-4"></div>
              <span className="font-jxd-bold text-gray-600 text-sm tracking-wider">
                Products Categories
              </span>
            </div>

            <h2 className="font-jxd-bold text-[#0F0F0F] text-4xl leading-tight mb-6">
              Industrial Automation<br />
              Engineering Supply
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-jxd-light text-[#0F0F0F] leading-relaxed">
                We major in industrial PLC, DCS spare parts, IGBT power modules, computer accessories, electronic components, mechanical and electrical products, and instruments sales and service during the process of industrial automation engineering.
              </p>
              
              <p className="font-jxd-light text-[#0F0F0F] leading-relaxed">
                Especially we have large bailey infi90 & net90 dcs cards and AC800 series controller units in inventory.
              </p>
            </div>

            <LocalizedClientLink
              href="/store"
              className="font-jxd-regular text-white text-sm rounded-full transition-all duration-300 flex items-center justify-center px-8 py-3 inline-flex"
              style={{ 
                backgroundColor: isButtonHovered ? '#BB2924' : '#FF000F'
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span className="mr-2">View All Products</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </LocalizedClientLink>
          </div>

          {/* Right Side - Image */}
          <div>
            <Image
              src="/imgs/warehouse.png"
              alt="Industrial Warehouse and Products"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCategories