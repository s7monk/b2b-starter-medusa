"use client"

import ReactCountryFlag from "react-country-flag"
import { useState, useRef, useEffect } from "react"

type LanguageOption = {
  code: string
  label: string
  countryCode: string
}

// 基于后端支持的语言，选择主要的几种语言
const languages: LanguageOption[] = [
  { code: "EN", label: "English", countryCode: "GB" },
  { code: "BE", label: "Français", countryCode: "BE" },
  { code: "NL", label: "Nederlands", countryCode: "NL" },
  { code: "CN", label: "中文", countryCode: "CN" },
  { code: "JP", label: "日本語", countryCode: "JP" },
  { code: "KR", label: "한국어", countryCode: "KR" },
  { code: "ES", label: "Español", countryCode: "ES" },
  { code: "DE", label: "Deutsch", countryCode: "DE" },
  { code: "IT", label: "Italiano", countryCode: "IT" },
  { code: "PT", label: "Português", countryCode: "PT" },
  { code: "RU", label: "Русский", countryCode: "RU" },
]

const LanguageSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    console.log("Language changed to:", language.code)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div 
      ref={containerRef}
      className="relative z-[1100] mr-2" 
    >
      {/* 主按钮 - 统一高度，无悬停效果 */}
      <div 
        className="flex items-center gap-1.5 h-5 cursor-pointer"
        onClick={handleToggle}
      >
        <ReactCountryFlag
          countryCode={selectedLanguage.countryCode}
          svg
          style={{
            width: "14px",
            height: "14px",
          }}
          className="w-3.5 h-3.5 flex-shrink-0"
        />
        <span className="font-medium leading-none font-jxd" style={{ fontSize: '13px', color: '#0f0f0f' }}>
          {selectedLanguage.code}
        </span>
        <svg 
          width="10" 
          height="6" 
          viewBox="0 0 12 8" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={`transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <path 
            d="M1 1.5L6 6.5L11 1.5" 
            stroke="#6B7280" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 下拉菜单 - 简洁设计 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[180px]">
          {/* 当前选中的语言选项 - 显示在顶部 */}
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <ReactCountryFlag
                countryCode={selectedLanguage.countryCode}
                svg
                style={{
                  width: "16px",
                  height: "16px",
                }}
                className="w-4 h-4"
              />
              <span className="font-medium text-gray-900 font-jxd" style={{ fontSize: '13px' }}>
                {selectedLanguage.label}
              </span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="ml-auto"
              >
                <path 
                  d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" 
                  fill="#FF000F"
                />
              </svg>
            </div>
          </div>
          
          {/* 其他语言选项 */}
          <div className="max-h-48 overflow-y-auto">
            {languages
              .filter((lang) => lang.code !== selectedLanguage.code)
              .map((language) => (
                <button
                  key={language.code}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => handleLanguageChange(language)}
                >
                  <ReactCountryFlag
                    countryCode={language.countryCode}
                    svg
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 font-jxd" style={{ fontSize: '13px' }}>
                    {language.label}
                  </span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSelect 