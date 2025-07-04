'use client'

import React from 'react'

interface BusinessLocation {
  x: number
  y: number
  label: string
  country: string
  value: number
}

const WorldMapCanvas: React.FC = () => {
  const businessLocations: BusinessLocation[] = [
    { x: 200, y: 120, label: 'North America', country: 'USA', value: 45 },
    { x: 520, y: 100, label: 'Europe', country: 'Germany', value: 38 },
    { x: 720, y: 140, label: 'Asia', country: 'China', value: 52 },
    { x: 280, y: 280, label: 'South America', country: 'Brazil', value: 28 },
    { x: 540, y: 220, label: 'Africa', country: 'South Africa', value: 22 },
    { x: 780, y: 320, label: 'Oceania', country: 'Australia', value: 15 },
  ]

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl overflow-hidden shadow-2xl">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      
      {/* 世界地图SVG */}
      <svg
        viewBox="0 0 1000 400"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))' }}
      >
        {/* 定义渐变和滤镜 */}
        <defs>
          {/* 大陆渐变 */}
          <linearGradient id="continentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          
          {/* 海洋渐变 */}
          <radialGradient id="oceanGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </radialGradient>
          
          {/* 网格图案 */}
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          
          {/* 光晕效果 */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
        
        {/* 海洋背景 */}
        <rect width="1000" height="400" fill="url(#oceanGradient)" />
        
        {/* 网格背景 */}
        <rect width="1000" height="400" fill="url(#gridPattern)" />
        
        {/* 更精确的大陆轮廓 */}
        
        {/* 北美洲 */}
        <g className="continent-group">
          <path
            d="M50 80 Q80 60 120 70 Q180 65 240 80 Q280 90 300 120 Q320 150 310 180 Q290 200 260 190 Q220 185 180 180 Q140 175 100 170 Q70 160 50 140 Q40 110 50 80Z"
            fill="url(#continentGradient)"
            stroke="#0f172a"
            strokeWidth="1.5"
            className="transition-all duration-500 hover:fill-slate-600 cursor-pointer"
            filter="url(#glow)"
          />
          {/* 格陵兰 */}
          <path
            d="M280 40 Q300 35 320 45 Q325 60 320 75 Q310 80 295 75 Q280 70 275 55 Q275 45 280 40Z"
            fill="url(#continentGradient)"
            stroke="#0f172a"
            strokeWidth="1"
            className="transition-all duration-500 hover:fill-slate-600"
          />
        </g>
        
        {/* 南美洲 */}
        <path
          d="M220 220 Q250 210 280 230 Q300 260 295 300 Q290 340 280 370 Q270 390 250 385 Q230 380 215 360 Q200 340 195 320 Q190 300 195 280 Q200 260 210 240 Q215 230 220 220Z"
          fill="url(#continentGradient)"
          stroke="#0f172a"
          strokeWidth="1.5"
          className="transition-all duration-500 hover:fill-slate-600 cursor-pointer"
          filter="url(#glow)"
        />
        
        {/* 欧洲 */}
        <path
          d="M450 70 Q480 65 520 75 Q560 80 580 95 Q590 110 585 125 Q575 140 555 135 Q535 130 515 125 Q495 120 475 115 Q455 110 445 95 Q440 80 450 70Z"
          fill="url(#continentGradient)"
          stroke="#0f172a"
          strokeWidth="1.5"
          className="transition-all duration-500 hover:fill-slate-600 cursor-pointer"
          filter="url(#glow)"
        />
        
        {/* 非洲 */}
        <path
          d="M480 140 Q520 130 560 145 Q590 160 600 190 Q605 220 600 250 Q595 280 585 310 Q575 340 560 355 Q540 365 520 360 Q500 355 485 340 Q470 325 465 310 Q460 295 465 280 Q470 265 475 250 Q480 235 485 220 Q490 205 495 190 Q500 175 505 160 Q510 145 480 140Z"
          fill="url(#continentGradient)"
          stroke="#0f172a"
          strokeWidth="1.5"
          className="transition-all duration-500 hover:fill-slate-600 cursor-pointer"
          filter="url(#glow)"
        />
        
        {/* 亚洲 */}
        <g className="continent-group">
          {/* 俄罗斯 */}
          <path
            d="M600 50 Q680 40 760 55 Q840 65 900 80 Q950 95 970 110 Q980 125 975 140 Q965 155 945 150 Q925 145 905 140 Q885 135 865 130 Q845 125 825 120 Q805 115 785 110 Q765 105 745 100 Q725 95 705 90 Q685 85 665 80 Q645 75 625 70 Q605 65 590 60 Q580 55 585 50 Q590 45 600 50Z"
            fill="url(#continentGradient)"
            stroke="#0f172a"
            strokeWidth="1.5"
            className="transition-all duration-500 hover:fill-slate-600 cursor-pointer"
            filter="url(#glow)"
          />
          {/* 中国/印度 */}
          <path
            d="M650 120 Q700 110 750 125 Q800 140 820 160 Q825 180 820 200 Q810 220 790 215 Q770 210 750 205 Q730 200 710 195 Q690 190 670 185 Q650 180 640 165 Q635 150 640 135 Q645 120 650 120Z"
            fill="url(#continentGradient)"
            stroke="#0f172a"
            strokeWidth="1.5"
            className="transition-all duration-500 hover:fill-slate-600 cursor-pointer"
            filter="url(#glow)"
          />
          {/* 东南亚 */}
          <path
            d="M720 220 Q750 215 780 225 Q800 235 805 250 Q800 265 785 270 Q770 275 755 270 Q740 265 730 255 Q720 245 715 235 Q715 225 720 220Z"
            fill="url(#continentGradient)"
            stroke="#0f172a"
            strokeWidth="1.5"
            className="transition-all duration-500 hover:fill-slate-600 cursor-pointer"
            filter="url(#glow)"
          />
        </g>
        
        {/* 澳洲 */}
        <path
          d="M750 300 Q800 290 850 305 Q880 320 885 340 Q880 360 860 365 Q840 370 820 365 Q800 360 780 355 Q760 350 745 345 Q735 340 735 330 Q735 320 740 310 Q745 300 750 300Z"
          fill="url(#continentGradient)"
          stroke="#0f172a"
          strokeWidth="1.5"
          className="transition-all duration-500 hover:fill-slate-600 cursor-pointer"
          filter="url(#glow)"
        />
        
        {/* 新西兰 */}
        <path
          d="M880 350 Q890 345 900 355 Q905 365 900 375 Q895 380 885 375 Q880 370 875 365 Q875 355 880 350Z"
          fill="url(#continentGradient)"
          stroke="#0f172a"
          strokeWidth="1"
          className="transition-all duration-500 hover:fill-slate-600"
        />
        
        {/* 业务标记点 */}
        {businessLocations.map((location, index) => {
          const size = Math.max(8, location.value / 3)
          
          return (
            <g key={index} className="business-marker">
              {/* 外圈脉冲 */}
              <circle
                cx={location.x}
                cy={location.y}
                r={size + 12}
                fill="#ef4444"
                opacity="0.1"
                className="animate-ping"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
              
              {/* 中圈脉冲 */}
              <circle
                cx={location.x}
                cy={location.y}
                r={size + 6}
                fill="#f87171"
                opacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${index * 0.3}s` }}
              />
              
              {/* 主标记点 */}
              <circle
                cx={location.x}
                cy={location.y}
                r={size}
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="3"
                className="drop-shadow-lg cursor-pointer transition-transform hover:scale-110"
                filter="url(#glow)"
              />
              
              {/* 内部高光 */}
              <circle
                cx={location.x - 2}
                cy={location.y - 2}
                r={size * 0.4}
                fill="#ffffff"
                opacity="0.9"
              />
              
              {/* 数值显示 */}
              <text
                x={location.x}
                y={location.y + 2}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="700"
                className="font-mono"
              >
                {location.value}
              </text>
              
              {/* 标签卡片 */}
              <g className="label-card" transform={`translate(${location.x + size + 8}, ${location.y - 15})`}>
                <rect
                  width={location.label.length * 7 + 20}
                  height="30"
                  rx="15"
                  fill="#1f2937"
                  opacity="0.95"
                  className="drop-shadow-xl"
                />
                
                <text
                  x="10"
                  y="12"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="600"
                  className="font-sans"
                >
                  {location.label}
                </text>
                
                <text
                  x="10"
                  y="24"
                  fill="#9ca3af"
                  fontSize="9"
                  className="font-sans"
                >
                  {location.country}
                </text>
              </g>
              
              {/* 连接线 */}
              <line
                x1={location.x + size}
                y1={location.y}
                x2={location.x + size + 8}
                y2={location.y}
                stroke="#374151"
                strokeWidth="2"
                opacity="0.8"
              />
            </g>
          )
        })}
        
        {/* 装饰性连接线 */}
        <g className="connection-lines" opacity="0.2">
          {businessLocations.map((location, index) => {
            if (index < businessLocations.length - 1) {
              const nextLocation = businessLocations[index + 1]
              return (
                <line
                  key={index}
                  x1={location.x}
                  y1={location.y}
                  x2={nextLocation.x}
                  y2={nextLocation.y}
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
              )
            }
            return null
          })}
        </g>
        
        {/* 装饰性星星 */}
        {[...Array(15)].map((_, i) => {
          const x = Math.random() * 1000
          const y = Math.random() * 400
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <path
                d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z"
                fill="#60a5fa"
                opacity="0.6"
                className="animate-pulse"
                style={{
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            </g>
          )
        })}
      </svg>
      
      {/* 信息面板 */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20">
        <div className="text-lg font-bold text-gray-800 mb-2">Global Network</div>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>Active Locations:</span>
            <span className="font-semibold text-blue-600">{businessLocations.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Coverage:</span>
            <span className="font-semibold text-green-600">{businessLocations.reduce((sum, loc) => sum + loc.value, 0)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Continents:</span>
            <span className="font-semibold text-purple-600">6</span>
          </div>
        </div>
      </div>
      
      {/* 图例 */}
      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20">
        <div className="text-sm font-semibold text-gray-800 mb-3">Legend</div>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-600 rounded-full shadow-lg"></div>
            <span className="text-xs text-gray-600">Business Hub</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-2 bg-gradient-to-r from-slate-700 to-slate-500 rounded"></div>
            <span className="text-xs text-gray-600">Continents</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-0.5 bg-blue-500 opacity-50"></div>
            <span className="text-xs text-gray-600">Connections</span>
          </div>
        </div>
      </div>
      
      {/* 动态背景效果 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-green-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  )
}

export default WorldMapCanvas