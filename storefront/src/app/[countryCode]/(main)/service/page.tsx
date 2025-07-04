import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Our Services - Beijing Jianxindi Technology",
  description: "Comprehensive industrial automation services including consulting, procurement, and technical support",
}

const mainServices = [
  {
    id: 1,
    title: "Industrial Control Consulting",
    description: "Whether it is consulting for automation systems or choosing the right control components, our team knows what's right and will offer you the best possible solution.",
    image: "/imgs/service_consulting.png",
    features: [
      "System Design & Architecture",
      "Component Selection & Optimization", 
      "Process Automation Analysis",
      "Performance Enhancement Strategies"
    ]
  },
  {
    id: 2,
    title: "Equipment Procurement", 
    description: "Whether you need emergency parts or you are planning a complete system upgrade, we can help with procurement and timely delivery of quality products.",
    image: "/imgs/service_procurement.png",
    features: [
      "Emergency Parts Supply",
      "Complete System Procurement",
      "Quality Assurance & Testing",
      "Global Supplier Network"
    ]
  },
  {
    id: 3,
    title: "Technical Support",
    description: "From installation to maintenance, we have the necessary equipment and training to provide top-quality technical services wherever you need them.",
    image: "/imgs/service_technical.png", 
    features: [
      "On-site Installation Services",
      "Preventive Maintenance Programs",
      "24/7 Technical Assistance",
      "Training & Knowledge Transfer"
    ]
  }
]



export default function ServicePage() {
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
              Our Services
            </h1>
            <p className="text-white font-jxd-light text-xl max-w-2xl mx-auto">
              Comprehensive industrial automation solutions tailored to your business needs
            </p>
          </div>
        </div>
      </div>

      {/* Main Services Section */}
      <div className="bg-white py-24 large:py-32 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#FF000F]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="content-container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
              <span className="font-jxd-bold text-gray-500 text-sm tracking-[0.2em] uppercase">
                CORE SERVICES
              </span>
              <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
            </div>
            <h2 className="font-jxd-bold text-[#0F0F0F] text-4xl large:text-5xl leading-tight mb-6">
              How We Can <span className="text-[#FF000F]">Help You</span>
            </h2>
            <p className="font-jxd-light text-gray-600 text-lg max-w-3xl mx-auto">
              Our comprehensive suite of industrial automation services covers every aspect of your operational needs, 
              from initial consultation to ongoing support.
            </p>
          </div>

          {/* Main Services Grid */}
          <div className="space-y-24">
            {mainServices.map((service, index) => (
              <div key={service.id} className={`grid grid-cols-1 large:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'large:grid-flow-col-dense' : ''}`}>
                {/* Service Image */}
                <div className={`relative ${index % 2 === 1 ? 'large:col-start-2' : ''}`}>
                  <div className="absolute -top-8 -left-8 w-full h-full border-2 border-[#FF000F]/10 rounded-2xl"></div>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Service Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'large:col-start-1' : ''}`}>
                  <div className="space-y-4">
                    <div className="inline-block">
                      <span className="bg-[#FF000F]/10 text-[#FF000F] font-jxd-bold text-sm px-4 py-2 rounded-full">
                        0{service.id}
                      </span>
                    </div>
                    <h3 className="font-jxd-bold text-[#0F0F0F] text-3xl large:text-4xl leading-tight">
                      {service.title}
                    </h3>
                    <p className="font-jxd-light text-gray-600 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <h4 className="font-jxd-bold text-[#0F0F0F] text-lg">Key Features:</h4>
                    <div className="grid grid-cols-1 medium:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#FF000F] rounded-full flex-shrink-0"></div>
                          <span className="font-jxd-light text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
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
              Let our experts help you design, implement, and optimize your automation systems 
              for maximum efficiency and reliability.
            </p>
            
            <div className="flex flex-col small:flex-row gap-6 justify-center">
              <a
                href="/contact"
                className="font-jxd-bold bg-[#FF000F] hover:bg-[#BB2924] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Free Consultation
              </a>
              <a
                href="/products"
                className="font-jxd-regular border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full transition-all duration-300"
              >
                View Our Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}