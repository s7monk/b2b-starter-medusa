import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Our Partner Brands - Beijing Jianxindi Technology",
  description: "Discover our trusted partner brands in industrial automation - ABB, Honeywell, Siemens and more",
}

const allBrands = [
  {
    id: 1,
    name: "ABB",
    description: "Pioneer in industrial technology with advanced robotics, automation, and electrical solutions that drive productivity and sustainability across industries.",
    image: "/imgs/abb.png",
    founded: "1988",
    headquarters: "Zurich, Switzerland",
    specialties: ["Industrial Automation", "Robotics", "Power Grids", "Electrification"]
  },
  {
    id: 2,
    name: "Honeywell",
    description: "Leading provider of industrial automation and control solutions, specializing in process control systems and safety technologies for industrial applications.",
    image: "/imgs/honeywell.png",
    founded: "1906",
    headquarters: "Charlotte, North Carolina",
    specialties: ["Process Control", "Safety Systems", "Industrial IoT", "Building Technologies"]
  },
  {
    id: 3,
    name: "Siemens", 
    description: "Global technology powerhouse in industrial automation, digitalization, and electrification, offering comprehensive solutions for manufacturing and infrastructure.",
    image: "/imgs/siemens.png",
    founded: "1847",
    headquarters: "Munich, Germany",
    specialties: ["Digital Industries", "Smart Infrastructure", "Mobility", "Healthcare"]
  },
  {
    id: 4,
    name: "Schneider Electric",
    description: "Global specialist in energy management and automation, providing integrated efficiency solutions combining energy, automation and software.",
    image: "/imgs/company.png",
    founded: "1836",
    headquarters: "Rueil-Malmaison, France",
    specialties: ["Energy Management", "Industrial Automation", "Data Centers", "Smart Buildings"]
  },
  {
    id: 5,
    name: "Rockwell Automation",
    description: "Leading provider of industrial automation and digital transformation solutions, helping manufacturers be more productive and sustainable.",
    image: "/imgs/warehouse.png",
    founded: "1903",
    headquarters: "Milwaukee, Wisconsin",
    specialties: ["Industrial Automation", "Information Solutions", "Connected Services", "Digital Transformation"]
  },
  {
    id: 6,
    name: "Emerson",
    description: "Global technology and software company providing innovative solutions for customers in industrial, commercial and residential markets.",
    image: "/imgs/service_consulting.png",
    founded: "1890",
    headquarters: "St. Louis, Missouri",
    specialties: ["Process Automation", "Climate Technologies", "Tools & Home Products", "Commercial Solutions"]
  }
]

export default function BrandsPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-4xl">
            <div className="w-16 h-2 mx-auto mb-8 bg-[#FF000F] shadow-lg shadow-red-500/50"></div>
            <h1 className="font-jxd-bold text-white text-5xl large:text-6xl leading-tight mb-6">
              Our Partner Brands
            </h1>
            <p className="text-white font-jxd-light text-xl max-w-2xl mx-auto">
              Trusted partnerships with world-leading industrial automation brands
            </p>
          </div>
        </div>
      </div>

      {/* Brands Grid Section */}
      <div className="bg-white py-24 large:py-32 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#FF000F]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="content-container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
              <span className="font-jxd-bold text-gray-500 text-sm tracking-[0.2em] uppercase">
                TRUSTED PARTNERS
              </span>
              <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
            </div>
            <h2 className="font-jxd-bold text-[#0F0F0F] text-4xl large:text-5xl leading-tight mb-6">
              Industry <span className="text-[#FF000F]">Leading Brands</span>
            </h2>
            <p className="font-jxd-light text-gray-600 text-lg max-w-3xl mx-auto">
              We partner with the world's most trusted industrial automation brands to deliver 
              cutting-edge solutions that meet your specific operational needs.
            </p>
          </div>

          {/* Brands Grid */}
          <div className="space-y-20">
            {allBrands.map((brand, index) => (
              <div key={brand.id} className={`grid grid-cols-1 large:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'large:grid-flow-col-dense' : ''}`}>
                {/* Brand Image */}
                <div className={`relative ${index % 2 === 1 ? 'large:col-start-2' : ''}`}>
                  <div className="absolute -top-8 -left-8 w-full h-full border-2 border-[#FF000F]/10 rounded-2xl"></div>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Floating CTA Button */}
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <button className="font-jxd-bold bg-[#FF000F] hover:bg-[#BB2924] text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                        Explore Products
                      </button>
                    </div>
                  </div>
                </div>

                {/* Brand Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'large:col-start-1' : ''}`}>
                  <div className="space-y-4">
                    {/* Brand Badge */}
                    <div className="inline-block">
                      <span className="bg-[#FF000F]/10 text-[#FF000F] font-jxd-bold text-sm px-4 py-2 rounded-full">
                        {String(brand.id).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Brand Name */}
                    <h3 className="font-jxd-bold text-[#0F0F0F] text-3xl large:text-4xl leading-tight">
                      {brand.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-jxd-light text-gray-600 text-lg leading-relaxed">
                      {brand.description}
                    </p>
                  </div>

                  {/* Company Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-jxd-bold text-[#0F0F0F] text-sm uppercase tracking-wide">Founded</h4>
                      <p className="font-jxd-light text-gray-700 text-lg">{brand.founded}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-jxd-bold text-[#0F0F0F] text-sm uppercase tracking-wide">Headquarters</h4>
                      <p className="font-jxd-light text-gray-700 text-lg">{brand.headquarters}</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="space-y-4">
                    <h4 className="font-jxd-bold text-[#0F0F0F] text-sm uppercase tracking-wide">Core Specialties</h4>
                    <div className="grid grid-cols-1 medium:grid-cols-2 gap-3">
                      {brand.specialties.slice(0, 4).map((specialty, specialtyIndex) => (
                        <div key={specialtyIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#FF000F] rounded-full flex-shrink-0"></div>
                          <span className="font-jxd-light text-gray-700">{specialty}</span>
                        </div>
                      ))}
                      {brand.specialties.length > 4 && (
                        <div className="flex items-center space-x-3 text-gray-500">
                          <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                          <span className="font-jxd-light">+{brand.specialties.length - 4} more specialties</span>
                        </div>
                      )}
                    </div>
                  </div>


                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* CTA Section - Ready to Transform Your Business */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="content-container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-16 h-2 mx-auto mb-8 bg-[#FF000F] shadow-lg shadow-red-500/50"></div>
            <h2 className="font-jxd-bold text-white text-4xl large:text-5xl leading-tight mb-6">
              Ready to Transform Your
              <br />
              <span className="text-[#FF000F]">Industrial Operations?</span>
            </h2>
            <p className="text-white/80 font-jxd-light text-xl mb-12 max-w-2xl mx-auto">
              Partner with us to access the world's leading industrial automation brands 
              and transform your operations with cutting-edge technology.
            </p>
            
            <div className="flex flex-col small:flex-row gap-6 justify-center">
              <a
                href="/contact"
                className="font-jxd-bold bg-[#FF000F] hover:bg-[#BB2924] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Free Consultation
              </a>
              <a
                href="/store"
                className="font-jxd-regular border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full transition-all duration-300"
              >
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}