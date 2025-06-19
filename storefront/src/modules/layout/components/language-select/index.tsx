"use client"

import { useState } from "react"
import ReactCountryFlag from "react-country-flag"

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

  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    console.log("Language changed to:", language.code)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  return (
    <div 
      className="relative z-[1100] justify-center mr-[10px] lg:mr-0" 
      onMouseLeave={handleMouseLeave}
    >
      {/* 主按钮 */}
      <div 
        className="h-10 flex space-between xl:px-3 duration-300 items-center w-10 xl:w-fit border border-gray-300 rounded-full cursor-pointer hover:border-gray-400"
        onClick={handleToggle}
      >
        <div className="select-none mx-auto lg:mx-0">
          <ReactCountryFlag
            countryCode={selectedLanguage.countryCode}
            svg
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
            }}
            className="w-5 h-5 max-w-none"
          />
        </div>
        <div className="hidden xl:flex ml-3 items-center">
          <span className="select-none duration-300 text-rg uppercase text-blue-900">
            {selectedLanguage.code}
          </span>
          <svg 
            width="9" 
            height="7" 
            viewBox="0 0 9 7" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={`pointer-events-none z-20 ml-5 [&>path]:duration-300 transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          >
            <path 
              d="M0.832031 1.53027L4.59836 5.29674L8.36482 1.53027" 
              stroke="#2B2D41" 
              strokeWidth="1.208" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="lg:w-fit px-[9px] xl:px-3 bg-white gap-2 absolute top-0 left-0 border border-gray-300 py-2 rounded-[20px] flex flex-col shadow-lg">
          {/* 当前选中的语言选项 - 显示在顶部并有下边框 */}
          <div className="flex items-center justify-between">
            <div className="h-[33px] w-fit hover:opacity-100 opacity-100 duration-300 flex items-center pb-2 border-b !opacity-100">
              <div className="select-none lg:mx-0">
                <ReactCountryFlag
                  countryCode={selectedLanguage.countryCode}
                  svg
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                  }}
                  className="w-5 h-5 max-w-none"
                />
              </div>
              <span className="select-none ml-[12px] uppercase mr-[10px] xl:mr-[20px] text-rg">
                {selectedLanguage.code}
              </span>
            </div>
            <svg 
              width="9" 
              height="7" 
              viewBox="0 0 9 7" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="hidden xl:block opacity-0"
            >
              <path 
                d="M0.832031 1.53027L4.59836 5.29674L8.36482 1.53027" 
                stroke="#2B2D41" 
                strokeWidth="1.208" 
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          {/* 其他语言选项 */}
          {languages
            .filter(lang => lang.code !== selectedLanguage.code)
            .map((language, index, filteredArray) => (
              <div
                key={language.code}
                className="flex items-center justify-between"
                onClick={() => handleLanguageChange(language)}
              >
                <div 
                  className={`
                    h-[33px] w-fit hover:opacity-100 opacity-50 duration-300 
                    flex items-center cursor-pointer
                    ${index < filteredArray.length - 1 ? 'pb-2 border-b' : ''}
                  `}
                >
                  <div className="select-none lg:mx-0">
                    <ReactCountryFlag
                      countryCode={language.countryCode}
                      svg
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                      }}
                      className="w-5 h-5 max-w-none"
                    />
                  </div>
                  <span className="select-none ml-[12px] uppercase mr-[10px] xl:mr-[20px] text-rg">
                    {language.code}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelect 