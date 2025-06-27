"use client"

import { useState } from "react"

const CompanyInfo = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <div className="relative">
      {/* Gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-gray-900 to-black"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="relative bg-black/90 text-white py-20 small:py-24">
        <div className="content-container">
          <div className="grid grid-cols-1 large:grid-cols-3 gap-8 items-stretch">
            {/* Left Side - Company Information */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <div className="w-12 h-1 bg-[#FF000F] mb-4 shadow-lg shadow-red-500/50"></div>
                  <h3 className="font-jxd-bold text-white text-lg leading-tight">
                    Beijing Jianxindi Technology<br />
                    Co., Ltd
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#FF000F]/30 backdrop-blur-sm flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                      <svg className="w-5 h-5 text-[#FF000F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <span className="font-jxd-light text-white">+86 13436661375</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#FF000F]/30 backdrop-blur-sm flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                      <svg className="w-5 h-5 text-[#FF000F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <span className="font-jxd-light text-white">della101@163.com</span>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#FF000F]/30 backdrop-blur-sm flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                      <svg className="w-5 h-5 text-[#FF000F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <span className="font-jxd-light text-white">
                      No.15, Datun road, 100101, Chaoyang district, Beijing, China.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle - Business Hours */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 min-h-[280px] flex flex-col justify-between text-center">
              <div>
                <div className="mb-8">
                  <div className="w-12 h-1 bg-[#FF000F] mx-auto mb-4 shadow-lg shadow-red-500/50"></div>
                  <h3 className="font-jxd-bold text-white text-lg">
                    Business Hours
                  </h3>
                </div>

                <div className="space-y-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#FF000F]/30 backdrop-blur-sm flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                        <svg className="w-6 h-6 text-[#FF000F]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-jxd-light text-white text-sm">
                          Open Monday – Friday
                        </p>
                        <p className="font-jxd-bold text-white">
                          7:30 AM To 5:30 PM EST
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#FF000F]/30 backdrop-blur-sm flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                        <svg className="w-6 h-6 text-[#FF000F]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <p className="font-jxd-bold text-white">
                        Order Online Anytime
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Social Media */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 min-h-[280px] flex flex-col justify-between text-center large:text-right">
              <div>
                <div className="mb-8">
                  <div className="w-12 h-1 bg-[#FF000F] mx-auto large:ml-auto large:mr-0 mb-4 shadow-lg shadow-red-500/50"></div>
                  <h3 className="font-jxd-bold text-white text-lg">
                    Follow Our Activity
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="font-jxd-light text-white text-sm">
                    Connect with us on social media for the latest updates, industry insights, and product announcements.
                  </p>
                  
                  <div className="flex justify-center large:justify-end space-x-4">
                    {/* WhatsApp */}
                    <button
                      className="w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-xl shadow-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: hoveredSocial === 'whatsapp' ? '#25D366' : '#FF000F'
                      }}
                      onMouseEnter={() => setHoveredSocial('whatsapp')}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.894 3.488"/>
                      </svg>
                    </button>

                    {/* Email */}
                    <button
                      className="w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-xl shadow-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: hoveredSocial === 'email' ? '#34495e' : '#FF000F'
                      }}
                      onMouseEnter={() => setHoveredSocial('email')}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </button>

                    {/* LinkedIn */}
                    <button
                      className="w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-xl shadow-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: hoveredSocial === 'linkedin' ? '#0077b5' : '#FF000F'
                      }}
                      onMouseEnter={() => setHoveredSocial('linkedin')}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyInfo 