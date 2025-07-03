import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us - Beijing Jianxindi Technology",
  description: "Learn about Beijing Jianxindi Technology Co., Ltd - 20 years of excellence in industrial automation solutions",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
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
              About Us
            </h1>
            <p className="text-white font-jxd-light text-xl max-w-2xl mx-auto">
              20 years of excellence in industrial automation solutions
            </p>
          </div>
        </div>
      </div>

      {/* Company Story Section */}
      <div className="bg-white py-24 large:py-32 relative">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#FF000F]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="content-container relative z-10">
          <div className="grid grid-cols-1 large:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
                  <span className="font-jxd-bold text-gray-500 text-sm tracking-[0.2em] uppercase">
                    OUR STORY
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#FF000F]/30 to-transparent"></div>
                </div>

                <h2 className="font-jxd-bold text-[#0F0F0F] text-5xl large:text-6xl leading-tight">
                  Pioneering Industrial
                  <br />
                  <span className="text-[#FF000F]">Automation Since 2004</span>
                </h2>
              </div>

              <div className="space-y-6 font-jxd-light text-[#0F0F0F] text-lg leading-relaxed">
                <p className="pl-6 border-l-4 border-[#FF000F]/20">
                  Beijing Jianxindi Technology Co., Ltd was founded with a <span className="font-jxd-bold text-[#FF000F]">revolutionary vision</span> to 
                  transform industrial automation in China. What started as a small team of passionate engineers 
                  has grown into a leading provider of comprehensive automation solutions.
                </p>
                <p>
                  Over the past two decades, we've helped countless businesses optimize their operations 
                  through cutting-edge electrification and automation technologies, always staying ahead 
                  of industry trends and technological advancements.
                </p>
                <p>
                  Today, we continue to push boundaries, helping industries become leaner, cleaner, 
                  and more efficient through innovative automation solutions.
                </p>
              </div>

              {/* 重要数据展示 */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="group relative overflow-hidden text-center p-6 bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 left-2 w-16 h-0.5 bg-white/30 rounded-full group-hover:w-20 group-hover:bg-white/50 transition-all duration-1000"></div>
                    <div className="absolute bottom-2 right-2 w-12 h-0.5 bg-white/20 rounded-full group-hover:w-16 group-hover:bg-white/40 transition-all duration-1200"></div>
                  </div>
                  <div className="relative">
                    <div className="text-3xl font-jxd-bold text-[#FF000F] group-hover:scale-105 transition-transform duration-300">2004</div>
                    <div className="text-sm font-jxd-light text-gray-600 mt-1">Founded</div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden text-center p-6 bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 right-2 w-14 h-0.5 bg-white/25 rounded-full group-hover:w-18 group-hover:bg-white/45 transition-all duration-1100"></div>
                    <div className="absolute bottom-2 left-2 w-10 h-0.5 bg-white/20 rounded-full group-hover:w-14 group-hover:bg-white/35 transition-all duration-1300"></div>
                  </div>
                  <div className="relative">
                    <div className="text-3xl font-jxd-bold text-[#FF000F] group-hover:scale-105 transition-transform duration-300">500+</div>
                    <div className="text-sm font-jxd-light text-gray-600 mt-1">Projects</div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden text-center p-6 bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white/30 rounded-full group-hover:w-12 group-hover:bg-white/50 transition-all duration-1000"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-0.5 bg-white/25 rounded-full group-hover:w-10 group-hover:bg-white/40 transition-all duration-1200"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-0.5 bg-white/20 rounded-full group-hover:w-8 group-hover:bg-white/35 transition-all duration-1400"></div>
                  </div>
                  <div className="relative">
                    <div className="text-3xl font-jxd-bold text-[#FF000F] group-hover:scale-105 transition-transform duration-300">50+</div>
                    <div className="text-sm font-jxd-light text-gray-600 mt-1">Experts</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-8 -left-8 w-full h-full border-2 border-[#FF000F]/10 rounded-2xl"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                <Image
                  src="/imgs/company.png"
                  alt="Our Company History"
                  width={700}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24 large:py-32 relative">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#FF000F]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="content-container relative z-10">
          <div className="grid grid-cols-1 large:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
                  <span className="font-jxd-bold text-gray-500 text-sm tracking-[0.2em] uppercase">
                    WHAT WE DO
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#FF000F]/30 to-transparent"></div>
                </div>

                <h2 className="font-jxd-bold text-[#0F0F0F] text-5xl large:text-6xl leading-tight">
                  Industrial Automation
                  <br />
                  <span className="text-[#FF000F]">Solutions</span>
                </h2>
              </div>

              <div className="space-y-6 font-jxd-light text-[#0F0F0F] text-lg leading-relaxed">
                <p className="pl-6 border-l-4 border-[#FF000F]/20">
                  Our dedicated sales team provides <span className="font-jxd-bold text-[#FF000F]">comprehensive services</span> including quality 
                  control, competitive pricing, timely industry information, and reliable after-sales support 
                  to customers worldwide.
                </p>
                <p>
                  We serve shipbuilding and renewable energy sectors in Europe, textile and sugar 
                  industries in Asia, and port shipping operations in South America. Our industrial 
                  control products reach customers across six continents.
                </p>
                <p>
                  With over two decades of experience, we continue to push boundaries, helping 
                  industries become more efficient through innovative automation technologies.
                </p>
              </div>


            </div>

            <div className="relative">
              <div className="space-y-8">
                {/* 密集点阵世界地图 */}
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="relative w-full h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="absolute inset-0 p-4 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
                        
                        {/* 北美洲 - 大幅扩大 */}
                        <g fill="#CBD5E1" opacity="0.9">
                          {/* 加拿大北部 */}
                          <circle cx="40" cy="30" r="2.5"/><circle cx="45" cy="30" r="2.5"/><circle cx="50" cy="30" r="2.5"/><circle cx="55" cy="30" r="2.5"/><circle cx="60" cy="30" r="2.5"/><circle cx="65" cy="30" r="2.5"/><circle cx="70" cy="30" r="2.5"/><circle cx="75" cy="30" r="2.5"/><circle cx="80" cy="30" r="2.5"/><circle cx="85" cy="30" r="2.5"/><circle cx="90" cy="30" r="2.5"/><circle cx="95" cy="30" r="2.5"/><circle cx="100" cy="30" r="2.5"/><circle cx="105" cy="30" r="2.5"/><circle cx="110" cy="30" r="2.5"/><circle cx="115" cy="30" r="2.5"/><circle cx="120" cy="30" r="2.5"/>
                          <circle cx="35" cy="35" r="2.5"/><circle cx="40" cy="35" r="2.5"/><circle cx="45" cy="35" r="2.5"/><circle cx="50" cy="35" r="2.5"/><circle cx="55" cy="35" r="2.5"/><circle cx="60" cy="35" r="2.5"/><circle cx="65" cy="35" r="2.5"/><circle cx="70" cy="35" r="2.5"/><circle cx="75" cy="35" r="2.5"/><circle cx="80" cy="35" r="2.5"/><circle cx="85" cy="35" r="2.5"/><circle cx="90" cy="35" r="2.5"/><circle cx="95" cy="35" r="2.5"/><circle cx="100" cy="35" r="2.5"/><circle cx="105" cy="35" r="2.5"/><circle cx="110" cy="35" r="2.5"/><circle cx="115" cy="35" r="2.5"/><circle cx="120" cy="35" r="2.5"/><circle cx="125" cy="35" r="2.5"/>
                          <circle cx="30" cy="40" r="2.5"/><circle cx="35" cy="40" r="2.5"/><circle cx="40" cy="40" r="2.5"/><circle cx="45" cy="40" r="2.5"/><circle cx="50" cy="40" r="2.5"/><circle cx="55" cy="40" r="2.5"/><circle cx="60" cy="40" r="2.5"/><circle cx="65" cy="40" r="2.5"/><circle cx="70" cy="40" r="2.5"/><circle cx="75" cy="40" r="2.5"/><circle cx="80" cy="40" r="2.5"/><circle cx="85" cy="40" r="2.5"/><circle cx="90" cy="40" r="2.5"/><circle cx="95" cy="40" r="2.5"/><circle cx="100" cy="40" r="2.5"/><circle cx="105" cy="40" r="2.5"/><circle cx="110" cy="40" r="2.5"/><circle cx="115" cy="40" r="2.5"/><circle cx="120" cy="40" r="2.5"/><circle cx="125" cy="40" r="2.5"/><circle cx="130" cy="40" r="2.5"/>
                          <circle cx="30" cy="45" r="2.5"/><circle cx="35" cy="45" r="2.5"/><circle cx="40" cy="45" r="2.5"/><circle cx="45" cy="45" r="2.5"/><circle cx="50" cy="45" r="2.5"/><circle cx="55" cy="45" r="2.5"/><circle cx="60" cy="45" r="2.5"/><circle cx="65" cy="45" r="2.5"/><circle cx="70" cy="45" r="2.5"/><circle cx="75" cy="45" r="2.5"/><circle cx="80" cy="45" r="2.5"/><circle cx="85" cy="45" r="2.5"/><circle cx="90" cy="45" r="2.5"/><circle cx="95" cy="45" r="2.5"/><circle cx="100" cy="45" r="2.5"/><circle cx="105" cy="45" r="2.5"/><circle cx="110" cy="45" r="2.5"/><circle cx="115" cy="45" r="2.5"/><circle cx="120" cy="45" r="2.5"/><circle cx="125" cy="45" r="2.5"/><circle cx="130" cy="45" r="2.5"/>
                          
                          {/* 加拿大中南部 */}
                          <circle cx="35" cy="50" r="2.5"/><circle cx="40" cy="50" r="2.5"/><circle cx="45" cy="50" r="2.5"/><circle cx="50" cy="50" r="2.5"/><circle cx="55" cy="50" r="2.5"/><circle cx="60" cy="50" r="2.5"/><circle cx="65" cy="50" r="2.5"/><circle cx="70" cy="50" r="2.5"/><circle cx="75" cy="50" r="2.5"/><circle cx="80" cy="50" r="2.5"/><circle cx="85" cy="50" r="2.5"/><circle cx="90" cy="50" r="2.5"/><circle cx="95" cy="50" r="2.5"/><circle cx="100" cy="50" r="2.5"/><circle cx="105" cy="50" r="2.5"/><circle cx="110" cy="50" r="2.5"/><circle cx="115" cy="50" r="2.5"/><circle cx="120" cy="50" r="2.5"/><circle cx="125" cy="50" r="2.5"/>
                          <circle cx="40" cy="55" r="2.5"/><circle cx="45" cy="55" r="2.5"/><circle cx="50" cy="55" r="2.5"/><circle cx="55" cy="55" r="2.5"/><circle cx="60" cy="55" r="2.5"/><circle cx="65" cy="55" r="2.5"/><circle cx="70" cy="55" r="2.5"/><circle cx="75" cy="55" r="2.5"/><circle cx="80" cy="55" r="2.5"/><circle cx="85" cy="55" r="2.5"/><circle cx="90" cy="55" r="2.5"/><circle cx="95" cy="55" r="2.5"/><circle cx="100" cy="55" r="2.5"/><circle cx="105" cy="55" r="2.5"/><circle cx="110" cy="55" r="2.5"/><circle cx="115" cy="55" r="2.5"/><circle cx="120" cy="55" r="2.5"/>
                          
                          {/* 美国 */}
                          <circle cx="40" cy="60" r="2.5"/><circle cx="45" cy="60" r="2.5"/><circle cx="50" cy="60" r="2.5"/><circle cx="55" cy="60" r="2.5"/><circle cx="60" cy="60" r="2.5"/><circle cx="65" cy="60" r="2.5"/><circle cx="70" cy="60" r="2.5"/><circle cx="75" cy="60" r="2.5"/><circle cx="80" cy="60" r="2.5"/><circle cx="85" cy="60" r="2.5"/><circle cx="90" cy="60" r="2.5"/><circle cx="95" cy="60" r="2.5"/><circle cx="100" cy="60" r="2.5"/><circle cx="105" cy="60" r="2.5"/><circle cx="110" cy="60" r="2.5"/><circle cx="115" cy="60" r="2.5"/>
                          <circle cx="45" cy="65" r="2.5"/><circle cx="50" cy="65" r="2.5"/><circle cx="55" cy="65" r="2.5"/><circle cx="60" cy="65" r="2.5"/><circle cx="65" cy="65" r="2.5"/><circle cx="70" cy="65" r="2.5"/><circle cx="75" cy="65" r="2.5"/><circle cx="80" cy="65" r="2.5"/><circle cx="85" cy="65" r="2.5"/><circle cx="90" cy="65" r="2.5"/><circle cx="95" cy="65" r="2.5"/><circle cx="100" cy="65" r="2.5"/><circle cx="105" cy="65" r="2.5"/><circle cx="110" cy="65" r="2.5"/>
                          <circle cx="50" cy="70" r="2.5"/><circle cx="55" cy="70" r="2.5"/><circle cx="60" cy="70" r="2.5"/><circle cx="65" cy="70" r="2.5"/><circle cx="70" cy="70" r="2.5"/><circle cx="75" cy="70" r="2.5"/><circle cx="80" cy="70" r="2.5"/><circle cx="85" cy="70" r="2.5"/><circle cx="90" cy="70" r="2.5"/><circle cx="95" cy="70" r="2.5"/><circle cx="100" cy="70" r="2.5"/><circle cx="105" cy="70" r="2.5"/>
                          <circle cx="55" cy="75" r="2.5"/><circle cx="60" cy="75" r="2.5"/><circle cx="65" cy="75" r="2.5"/><circle cx="70" cy="75" r="2.5"/><circle cx="75" cy="75" r="2.5"/><circle cx="80" cy="75" r="2.5"/><circle cx="85" cy="75" r="2.5"/><circle cx="90" cy="75" r="2.5"/><circle cx="95" cy="75" r="2.5"/><circle cx="100" cy="75" r="2.5"/>
                          
                          {/* 墨西哥 */}
                          <circle cx="60" cy="80" r="2.5"/><circle cx="65" cy="80" r="2.5"/><circle cx="70" cy="80" r="2.5"/><circle cx="75" cy="80" r="2.5"/><circle cx="80" cy="80" r="2.5"/><circle cx="85" cy="80" r="2.5"/><circle cx="90" cy="80" r="2.5"/>
                          <circle cx="65" cy="85" r="2.5"/><circle cx="70" cy="85" r="2.5"/><circle cx="75" cy="85" r="2.5"/><circle cx="80" cy="85" r="2.5"/><circle cx="85" cy="85" r="2.5"/>
                          <circle cx="70" cy="90" r="2.5"/><circle cx="75" cy="90" r="2.5"/><circle cx="80" cy="90" r="2.5"/>
                          <circle cx="75" cy="95" r="2.5"/>
                        </g>
                        
                        {/* 南美洲 - 大幅扩大 */}
                        <g fill="#CBD5E1" opacity="0.9">
                          <circle cx="85" cy="110" r="2.5"/><circle cx="90" cy="110" r="2.5"/><circle cx="95" cy="110" r="2.5"/><circle cx="100" cy="110" r="2.5"/>
                          <circle cx="80" cy="115" r="2.5"/><circle cx="85" cy="115" r="2.5"/><circle cx="90" cy="115" r="2.5"/><circle cx="95" cy="115" r="2.5"/><circle cx="100" cy="115" r="2.5"/><circle cx="105" cy="115" r="2.5"/>
                          <circle cx="80" cy="120" r="2.5"/><circle cx="85" cy="120" r="2.5"/><circle cx="90" cy="120" r="2.5"/><circle cx="95" cy="120" r="2.5"/><circle cx="100" cy="120" r="2.5"/><circle cx="105" cy="120" r="2.5"/><circle cx="110" cy="120" r="2.5"/>
                          <circle cx="85" cy="125" r="2.5"/><circle cx="90" cy="125" r="2.5"/><circle cx="95" cy="125" r="2.5"/><circle cx="100" cy="125" r="2.5"/><circle cx="105" cy="125" r="2.5"/><circle cx="110" cy="125" r="2.5"/><circle cx="115" cy="125" r="2.5"/>
                          <circle cx="85" cy="130" r="2.5"/><circle cx="90" cy="130" r="2.5"/><circle cx="95" cy="130" r="2.5"/><circle cx="100" cy="130" r="2.5"/><circle cx="105" cy="130" r="2.5"/><circle cx="110" cy="130" r="2.5"/><circle cx="115" cy="130" r="2.5"/><circle cx="120" cy="130" r="2.5"/>
                          <circle cx="85" cy="135" r="2.5"/><circle cx="90" cy="135" r="2.5"/><circle cx="95" cy="135" r="2.5"/><circle cx="100" cy="135" r="2.5"/><circle cx="105" cy="135" r="2.5"/><circle cx="110" cy="135" r="2.5"/><circle cx="115" cy="135" r="2.5"/><circle cx="120" cy="135" r="2.5"/>
                          <circle cx="85" cy="140" r="2.5"/><circle cx="90" cy="140" r="2.5"/><circle cx="95" cy="140" r="2.5"/><circle cx="100" cy="140" r="2.5"/><circle cx="105" cy="140" r="2.5"/><circle cx="110" cy="140" r="2.5"/><circle cx="115" cy="140" r="2.5"/>
                          <circle cx="90" cy="145" r="2.5"/><circle cx="95" cy="145" r="2.5"/><circle cx="100" cy="145" r="2.5"/><circle cx="105" cy="145" r="2.5"/><circle cx="110" cy="145" r="2.5"/>
                          <circle cx="90" cy="150" r="2.5"/><circle cx="95" cy="150" r="2.5"/><circle cx="100" cy="150" r="2.5"/><circle cx="105" cy="150" r="2.5"/><circle cx="110" cy="150" r="2.5"/>
                          <circle cx="90" cy="155" r="2.5"/><circle cx="95" cy="155" r="2.5"/><circle cx="100" cy="155" r="2.5"/><circle cx="105" cy="155" r="2.5"/>
                          <circle cx="90" cy="160" r="2.5"/><circle cx="95" cy="160" r="2.5"/><circle cx="100" cy="160" r="2.5"/><circle cx="105" cy="160" r="2.5"/>
                          <circle cx="90" cy="165" r="2.5"/><circle cx="95" cy="165" r="2.5"/><circle cx="100" cy="165" r="2.5"/>
                          <circle cx="90" cy="170" r="2.5"/><circle cx="95" cy="170" r="2.5"/><circle cx="100" cy="170" r="2.5"/>
                          <circle cx="90" cy="175" r="2.5"/><circle cx="95" cy="175" r="2.5"/>
                          <circle cx="90" cy="180" r="2.5"/><circle cx="95" cy="180" r="2.5"/>
                          <circle cx="92" cy="185" r="2.5"/>
                        </g>
                        
                        {/* 欧洲 - 大幅扩大 */}
                        <g fill="#CBD5E1" opacity="0.9">
                          <circle cx="280" cy="25" r="2.5"/><circle cx="285" cy="25" r="2.5"/><circle cx="290" cy="25" r="2.5"/><circle cx="295" cy="25" r="2.5"/>
                          <circle cx="275" cy="30" r="2.5"/><circle cx="280" cy="30" r="2.5"/><circle cx="285" cy="30" r="2.5"/><circle cx="290" cy="30" r="2.5"/><circle cx="295" cy="30" r="2.5"/><circle cx="300" cy="30" r="2.5"/><circle cx="305" cy="30" r="2.5"/>
                          <circle cx="270" cy="35" r="2.5"/><circle cx="275" cy="35" r="2.5"/><circle cx="280" cy="35" r="2.5"/><circle cx="285" cy="35" r="2.5"/><circle cx="290" cy="35" r="2.5"/><circle cx="295" cy="35" r="2.5"/><circle cx="300" cy="35" r="2.5"/><circle cx="305" cy="35" r="2.5"/><circle cx="310" cy="35" r="2.5"/><circle cx="315" cy="35" r="2.5"/>
                          <circle cx="265" cy="40" r="2.5"/><circle cx="270" cy="40" r="2.5"/><circle cx="275" cy="40" r="2.5"/><circle cx="280" cy="40" r="2.5"/><circle cx="285" cy="40" r="2.5"/><circle cx="290" cy="40" r="2.5"/><circle cx="295" cy="40" r="2.5"/><circle cx="300" cy="40" r="2.5"/><circle cx="305" cy="40" r="2.5"/><circle cx="310" cy="40" r="2.5"/><circle cx="315" cy="40" r="2.5"/><circle cx="320" cy="40" r="2.5"/>
                          <circle cx="265" cy="45" r="2.5"/><circle cx="270" cy="45" r="2.5"/><circle cx="275" cy="45" r="2.5"/><circle cx="280" cy="45" r="2.5"/><circle cx="285" cy="45" r="2.5"/><circle cx="290" cy="45" r="2.5"/><circle cx="295" cy="45" r="2.5"/><circle cx="300" cy="45" r="2.5"/><circle cx="305" cy="45" r="2.5"/><circle cx="310" cy="45" r="2.5"/><circle cx="315" cy="45" r="2.5"/>
                          <circle cx="270" cy="50" r="2.5"/><circle cx="275" cy="50" r="2.5"/><circle cx="280" cy="50" r="2.5"/><circle cx="285" cy="50" r="2.5"/><circle cx="290" cy="50" r="2.5"/><circle cx="295" cy="50" r="2.5"/><circle cx="300" cy="50" r="2.5"/>
                          <circle cx="275" cy="55" r="2.5"/><circle cx="280" cy="55" r="2.5"/><circle cx="285" cy="55" r="2.5"/><circle cx="290" cy="55" r="2.5"/><circle cx="295" cy="55" r="2.5"/>
                        </g>
                        
                        {/* 非洲 - 大幅扩大 */}
                        <g fill="#CBD5E1" opacity="0.9">
                          <circle cx="275" cy="65" r="2.5"/><circle cx="280" cy="65" r="2.5"/><circle cx="285" cy="65" r="2.5"/><circle cx="290" cy="65" r="2.5"/><circle cx="295" cy="65" r="2.5"/><circle cx="300" cy="65" r="2.5"/>
                          <circle cx="270" cy="70" r="2.5"/><circle cx="275" cy="70" r="2.5"/><circle cx="280" cy="70" r="2.5"/><circle cx="285" cy="70" r="2.5"/><circle cx="290" cy="70" r="2.5"/><circle cx="295" cy="70" r="2.5"/><circle cx="300" cy="70" r="2.5"/><circle cx="305" cy="70" r="2.5"/>
                          <circle cx="270" cy="75" r="2.5"/><circle cx="275" cy="75" r="2.5"/><circle cx="280" cy="75" r="2.5"/><circle cx="285" cy="75" r="2.5"/><circle cx="290" cy="75" r="2.5"/><circle cx="295" cy="75" r="2.5"/><circle cx="300" cy="75" r="2.5"/><circle cx="305" cy="75" r="2.5"/>
                          <circle cx="270" cy="80" r="2.5"/><circle cx="275" cy="80" r="2.5"/><circle cx="280" cy="80" r="2.5"/><circle cx="285" cy="80" r="2.5"/><circle cx="290" cy="80" r="2.5"/><circle cx="295" cy="80" r="2.5"/><circle cx="300" cy="80" r="2.5"/><circle cx="305" cy="80" r="2.5"/>
                          <circle cx="270" cy="85" r="2.5"/><circle cx="275" cy="85" r="2.5"/><circle cx="280" cy="85" r="2.5"/><circle cx="285" cy="85" r="2.5"/><circle cx="290" cy="85" r="2.5"/><circle cx="295" cy="85" r="2.5"/><circle cx="300" cy="85" r="2.5"/><circle cx="305" cy="85" r="2.5"/>
                          <circle cx="270" cy="90" r="2.5"/><circle cx="275" cy="90" r="2.5"/><circle cx="280" cy="90" r="2.5"/><circle cx="285" cy="90" r="2.5"/><circle cx="290" cy="90" r="2.5"/><circle cx="295" cy="90" r="2.5"/><circle cx="300" cy="90" r="2.5"/><circle cx="305" cy="90" r="2.5"/>
                          <circle cx="270" cy="95" r="2.5"/><circle cx="275" cy="95" r="2.5"/><circle cx="280" cy="95" r="2.5"/><circle cx="285" cy="95" r="2.5"/><circle cx="290" cy="95" r="2.5"/><circle cx="295" cy="95" r="2.5"/><circle cx="300" cy="95" r="2.5"/>
                          <circle cx="275" cy="100" r="2.5"/><circle cx="280" cy="100" r="2.5"/><circle cx="285" cy="100" r="2.5"/><circle cx="290" cy="100" r="2.5"/><circle cx="295" cy="100" r="2.5"/>
                          <circle cx="280" cy="105" r="2.5"/><circle cx="285" cy="105" r="2.5"/>
                          <circle cx="285" cy="110" r="2.5"/>
                        </g>
                        
                        {/* 亚洲 - 大幅扩大 */}
                        <g fill="#CBD5E1" opacity="0.9">
                          {/* 俄罗斯 */}
                          <circle cx="320" cy="20" r="2.5"/><circle cx="325" cy="20" r="2.5"/><circle cx="330" cy="20" r="2.5"/><circle cx="335" cy="20" r="2.5"/><circle cx="340" cy="20" r="2.5"/><circle cx="345" cy="20" r="2.5"/><circle cx="350" cy="20" r="2.5"/><circle cx="355" cy="20" r="2.5"/><circle cx="360" cy="20" r="2.5"/><circle cx="365" cy="20" r="2.5"/><circle cx="370" cy="20" r="2.5"/><circle cx="375" cy="20" r="2.5"/><circle cx="380" cy="20" r="2.5"/>
                          <circle cx="315" cy="25" r="2.5"/><circle cx="320" cy="25" r="2.5"/><circle cx="325" cy="25" r="2.5"/><circle cx="330" cy="25" r="2.5"/><circle cx="335" cy="25" r="2.5"/><circle cx="340" cy="25" r="2.5"/><circle cx="345" cy="25" r="2.5"/><circle cx="350" cy="25" r="2.5"/><circle cx="355" cy="25" r="2.5"/><circle cx="360" cy="25" r="2.5"/><circle cx="365" cy="25" r="2.5"/><circle cx="370" cy="25" r="2.5"/><circle cx="375" cy="25" r="2.5"/><circle cx="380" cy="25" r="2.5"/><circle cx="385" cy="25" r="2.5"/>
                          <circle cx="315" cy="30" r="2.5"/><circle cx="320" cy="30" r="2.5"/><circle cx="325" cy="30" r="2.5"/><circle cx="330" cy="30" r="2.5"/><circle cx="335" cy="30" r="2.5"/><circle cx="340" cy="30" r="2.5"/><circle cx="345" cy="30" r="2.5"/><circle cx="350" cy="30" r="2.5"/><circle cx="355" cy="30" r="2.5"/><circle cx="360" cy="30" r="2.5"/><circle cx="365" cy="30" r="2.5"/><circle cx="370" cy="30" r="2.5"/><circle cx="375" cy="30" r="2.5"/><circle cx="380" cy="30" r="2.5"/><circle cx="385" cy="30" r="2.5"/>
                          
                          {/* 中国 */}
                          <circle cx="340" cy="35" r="2.5"/><circle cx="345" cy="35" r="2.5"/><circle cx="350" cy="35" r="2.5"/><circle cx="355" cy="35" r="2.5"/><circle cx="360" cy="35" r="2.5"/><circle cx="365" cy="35" r="2.5"/><circle cx="370" cy="35" r="2.5"/>
                          <circle cx="340" cy="40" r="2.5"/><circle cx="345" cy="40" r="2.5"/><circle cx="350" cy="40" r="2.5"/><circle cx="355" cy="40" r="2.5"/><circle cx="360" cy="40" r="2.5"/><circle cx="365" cy="40" r="2.5"/><circle cx="370" cy="40" r="2.5"/>
                          <circle cx="345" cy="45" r="2.5"/><circle cx="350" cy="45" r="2.5"/><circle cx="355" cy="45" r="2.5"/><circle cx="360" cy="45" r="2.5"/><circle cx="365" cy="45" r="2.5"/>
                          <circle cx="350" cy="50" r="2.5"/><circle cx="355" cy="50" r="2.5"/><circle cx="360" cy="50" r="2.5"/>
                          
                          {/* 印度 */}
                          <circle cx="330" cy="50" r="2.5"/><circle cx="335" cy="50" r="2.5"/><circle cx="340" cy="50" r="2.5"/>
                          <circle cx="325" cy="55" r="2.5"/><circle cx="330" cy="55" r="2.5"/><circle cx="335" cy="55" r="2.5"/><circle cx="340" cy="55" r="2.5"/>
                          <circle cx="325" cy="60" r="2.5"/><circle cx="330" cy="60" r="2.5"/><circle cx="335" cy="60" r="2.5"/><circle cx="340" cy="60" r="2.5"/>
                          <circle cx="330" cy="65" r="2.5"/><circle cx="335" cy="65" r="2.5"/>
                          
                          {/* 东南亚 */}
                          <circle cx="365" cy="60" r="2.5"/><circle cx="370" cy="60" r="2.5"/><circle cx="375" cy="60" r="2.5"/>
                          <circle cx="360" cy="65" r="2.5"/><circle cx="365" cy="65" r="2.5"/><circle cx="370" cy="65" r="2.5"/>
                          <circle cx="365" cy="70" r="2.5"/><circle cx="370" cy="70" r="2.5"/>
                          
                          {/* 日本 */}
                          <circle cx="390" cy="40" r="2.5"/><circle cx="395" cy="40" r="2.5"/>
                          <circle cx="390" cy="45" r="2.5"/><circle cx="395" cy="45" r="2.5"/>
                        </g>
                        
                        {/* 澳洲 - 大幅扩大 */}
                        <g fill="#CBD5E1" opacity="0.9">
                          <circle cx="400" cy="120" r="2.5"/><circle cx="405" cy="120" r="2.5"/><circle cx="410" cy="120" r="2.5"/><circle cx="415" cy="120" r="2.5"/><circle cx="420" cy="120" r="2.5"/>
                          <circle cx="395" cy="125" r="2.5"/><circle cx="400" cy="125" r="2.5"/><circle cx="405" cy="125" r="2.5"/><circle cx="410" cy="125" r="2.5"/><circle cx="415" cy="125" r="2.5"/><circle cx="420" cy="125" r="2.5"/><circle cx="425" cy="125" r="2.5"/>
                          <circle cx="395" cy="130" r="2.5"/><circle cx="400" cy="130" r="2.5"/><circle cx="405" cy="130" r="2.5"/><circle cx="410" cy="130" r="2.5"/><circle cx="415" cy="130" r="2.5"/><circle cx="420" cy="130" r="2.5"/><circle cx="425" cy="130" r="2.5"/>
                          <circle cx="400" cy="135" r="2.5"/><circle cx="405" cy="135" r="2.5"/><circle cx="410" cy="135" r="2.5"/><circle cx="415" cy="135" r="2.5"/><circle cx="420" cy="135" r="2.5"/>
                        </g>
                        
                        {/* 业务标记点 */}
                        <g>
                          <circle cx="290" cy="40" r="6" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" opacity="0.9">
                            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="355" cy="40" r="8" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" opacity="0.9">
                            <animate attributeName="r" values="8;12;8" dur="2.5s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="75" cy="60" r="7" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" opacity="0.9">
                            <animate attributeName="r" values="7;11;7" dur="3s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="100" cy="130" r="6" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" opacity="0.9">
                            <animate attributeName="r" values="6;10;6" dur="2.2s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="285" cy="80" r="5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" opacity="0.9">
                            <animate attributeName="r" values="5;9;5" dur="2.8s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="410" cy="130" r="6" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" opacity="0.9">
                            <animate attributeName="r" values="6;10;6" dur="3.2s" repeatCount="indefinite"/>
                          </circle>
                        </g>
                      </svg>
                    </div>
                  </div>
                  
                  {/* 业务覆盖数据 */}
                  <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                    <div className="group">
                      <div className="text-2xl font-jxd-bold text-[#FF000F] group-hover:scale-110 transition-transform duration-300">6</div>
                      <div className="text-sm font-jxd text-gray-600">Continents</div>
                    </div>
                    <div className="group">
                      <div className="text-2xl font-jxd-bold text-[#FF000F] group-hover:scale-110 transition-transform duration-300">50+</div>
                      <div className="text-sm font-jxd text-gray-600">Countries</div>
                    </div>
                    <div className="group">
                      <div className="text-2xl font-jxd-bold text-[#FF000F] group-hover:scale-110 transition-transform duration-300">200+</div>
                      <div className="text-sm font-jxd text-gray-600">Cities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white py-24 large:py-32 relative">
        <div className="content-container">
          <div className="text-center mb-20 space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#FF000F]"></div>
              <div className="w-6 h-px bg-[#FF000F]"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#FF000F]"></div>
            </div>
            <span className="font-jxd-bold text-gray-500 text-sm tracking-[0.2em] uppercase">
              OUR ACHIEVEMENTS
            </span>
            <h2 className="font-jxd-bold text-[#0F0F0F] text-5xl large:text-6xl leading-tight">
              <span className="text-[#FF000F]">Numbers</span> That Tell Our Story
            </h2>
          </div>

          <div className="grid grid-cols-1 medium:grid-cols-2 large:grid-cols-4 gap-8">
            <div className="group text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF000F] to-[#CC1100] rounded-2xl transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-xl"></div>
              <div className="relative p-10 text-white">
                <div className="text-5xl font-jxd-bold mb-3 group-hover:scale-110 transition-transform duration-300">20+</div>
                <div className="font-jxd-light text-lg opacity-90">Years Experience</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-white/30"></div>
              </div>
            </div>

            <div className="group text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-2xl transform transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2 shadow-xl"></div>
              <div className="relative p-10 text-white">
                <div className="text-5xl font-jxd-bold mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="font-jxd-light text-lg opacity-90">Projects Completed</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-white/30"></div>
              </div>
            </div>

            <div className="group text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF000F] to-[#CC1100] rounded-2xl transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 shadow-xl"></div>
              <div className="relative p-10 text-white">
                <div className="text-5xl font-jxd-bold mb-3 group-hover:scale-110 transition-transform duration-300">200+</div>
                <div className="font-jxd-light text-lg opacity-90">Happy Clients</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-white/30"></div>
              </div>
            </div>

            <div className="group text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-2xl transform transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-1 shadow-xl"></div>
              <div className="relative p-10 text-white">
                <div className="text-5xl font-jxd-bold mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="font-jxd-light text-lg opacity-90">Support Available</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-white/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24 large:py-32 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF000F]/3 rounded-full blur-3xl"></div>
        
        <div className="content-container relative z-10">
          <div className="grid grid-cols-1 large:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 large:order-1">
              <div className="absolute -top-8 -right-8 w-full h-full border-2 border-[#FF000F]/10 rounded-2xl"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                <Image
                  src="/imgs/company.png"
                  alt="Our Professional Team"
                  width={700}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="font-jxd-bold text-xl mb-2">Expert Professionals</div>
                  <div className="font-jxd-light text-sm opacity-90">Dedicated to Your Success</div>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 large:order-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
                  <span className="font-jxd-bold text-gray-500 text-sm tracking-[0.2em] uppercase">
                    OUR TEAM
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#FF000F]/30 to-transparent"></div>
                </div>

                <h2 className="font-jxd-bold text-[#0F0F0F] text-5xl large:text-6xl leading-tight">
                  Expert Professionals
                  <br />
                  <span className="text-[#FF000F]">Dedicated to Your Success</span>
                </h2>
              </div>

              <div className="space-y-6 font-jxd-light text-[#0F0F0F] text-lg leading-relaxed">
                <p className="pl-6 border-l-4 border-[#FF000F]/20">
                  Our team consists of <span className="font-jxd-bold text-[#FF000F]">highly skilled</span> engineers, 
                  project managers, and support specialists who bring decades of combined experience in industrial automation.
                </p>
                <p>
                  From system integration to component replacement, our experts are equipped 
                  with the knowledge and tools to handle projects of any complexity.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="text-3xl font-jxd-bold text-[#FF000F] mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                  <div className="font-jxd-light text-gray-600">Expert Engineers</div>
                  <div className="w-full h-px bg-gradient-to-r from-[#FF000F]/30 to-transparent mt-3"></div>
                </div>
                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="text-3xl font-jxd-bold text-[#FF000F] mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
                  <div className="font-jxd-light text-gray-600">Certified Specialists</div>
                  <div className="w-full h-px bg-gradient-to-r from-[#FF000F]/30 to-transparent mt-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-24 large:py-32 overflow-hidden">
        {/* 背景效果 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FF000F]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#FF000F]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative content-container text-center z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 装饰线 */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-[#FF000F]"></div>
              <div className="w-8 h-0.5 bg-[#FF000F] shadow-lg shadow-red-500/50"></div>
              <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-[#FF000F]"></div>
            </div>
            
            <h2 className="font-jxd-bold text-white text-5xl large:text-6xl leading-tight">
              Ready to <span className="text-[#FF000F]">Transform</span> Your Business?
            </h2>
            
            <p className="text-white/90 font-jxd-light text-xl large:text-2xl max-w-3xl mx-auto leading-relaxed">
              Let's discuss how our industrial automation solutions can help your business 
              become more efficient, reliable, and profitable.
            </p>
            
            <div className="flex flex-col small:flex-row gap-6 justify-center items-center pt-8">
              <a
                href="/contact"
                className="group font-jxd-bold text-white text-lg rounded-2xl transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-[#FF000F] to-[#CC1100] hover:from-[#CC1100] hover:to-[#AA0E00] px-10 py-5 shadow-2xl hover:shadow-red-500/25 hover:scale-105"
              >
                <span>Get In Touch</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                </svg>
              </a>
              <a
                href="/store"
                className="group font-jxd-bold text-white text-lg rounded-2xl transition-all duration-300 flex items-center justify-center border-2 border-white/30 hover:bg-white hover:text-black px-10 py-5 hover:scale-105"
              >
                <span>Browse Products</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 装饰性工业元素 */}
        <div className="absolute top-10 left-10 w-16 h-16 border border-[#FF000F]/20 rotate-45"></div>
        <div className="absolute bottom-20 right-16 w-12 h-12 border border-[#FF000F]/15 rotate-12"></div>
        <div className="absolute top-1/3 right-20 w-1 h-24 bg-gradient-to-b from-[#FF000F]/30 to-transparent"></div>
        <div className="absolute bottom-1/3 left-20 w-1 h-20 bg-gradient-to-t from-[#FF000F]/20 to-transparent"></div>
      </div>
    </div>
  )
} 