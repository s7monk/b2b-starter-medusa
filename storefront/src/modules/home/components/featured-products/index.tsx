"use client"

import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

const FeaturedProducts = () => {
  const categories = [
    {
      title: "PLCs & Controllers",
      description: "Programmable Logic Controllers from leading brands",
      brands: ["Allen-Bradley", "Siemens", "ABB"],
      link: "/categories/plcs",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: "Variable Frequency Drives",
      description: "Motor drives and speed controllers",
      brands: ["ABB", "Schneider", "Danfoss"],
      link: "/categories/drives",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "Sensors & Instrumentation",
      description: "Industrial sensors and measurement devices",
      brands: ["SICK", "Pepperl+Fuchs", "Balluff"],
      link: "/categories/sensors",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 13.5L8.5 16 12 18.5 15.5 16 12 13.5z"/>
        </svg>
      )
    },
    {
      title: "HMI & SCADA",
      description: "Human Machine Interface solutions",
      brands: ["Siemens", "Wonderware", "Rockwell"],
      link: "/categories/hmi",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/>
        </svg>
      )
    },
    {
      title: "Safety Systems",
      description: "Industrial safety and emergency stop systems",
      brands: ["Pilz", "SICK", "Banner"],
      link: "/categories/safety",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C14.8,12.4 14.4,13 13.5,13H10.5C9.6,13 9.2,12.4 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V10H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z"/>
        </svg>
      )
    },
    {
      title: "Power Supplies",
      description: "Industrial power supplies and UPS systems",
      brands: ["Phoenix Contact", "WAGO", "Mean Well"],
      link: "/categories/power",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8,2V4L6,6V8H4V16H6V18L8,20V22H10V20L12,18V16H14V18L16,20V22H18V20L20,18V16H22V8H20V6L18,4V2H16V4L14,6V8H12V6L10,4V2H8M8,4H10V6L12,8V10H14V8L16,6V4H18V6L20,8V16H18V18L16,20V18H14V16H12V18H10V20L8,18V16H6V8L8,6V4Z"/>
        </svg>
      )
    }
  ]

  return (
    <div className="py-16 bg-white">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Heading level="h2" className="text-3xl font-bold text-gray-900 mb-4">
            Product Categories
          </Heading>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive selection of industrial automation equipment organized by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <LocalizedClientLink
              key={index}
              href={category.link}
              className="group block"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.brands.map((brand, brandIndex) => (
                        <span
                          key={brandIndex}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <LocalizedClientLink href="/store">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              View All Products
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
