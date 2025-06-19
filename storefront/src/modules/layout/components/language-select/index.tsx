"use client"

import { Listbox, Transition } from "@headlessui/react"
import { ChevronDownMini } from "@medusajs/icons"
import { Fragment, useState } from "react"
import ReactCountryFlag from "react-country-flag"

type LanguageOption = {
  code: string
  label: string
  countryCode: string
}

// 基于后端支持的语言，选择主要的几种语言
const languages: LanguageOption[] = [
  { code: "EN", label: "English", countryCode: "US" },
  { code: "中文", label: "中文", countryCode: "CN" },
  { code: "日本語", label: "日本語", countryCode: "JP" },
  { code: "한국어", label: "한국어", countryCode: "KR" },
  { code: "Español", label: "Español", countryCode: "ES" },
  { code: "Français", label: "Français", countryCode: "FR" },
  { code: "Deutsch", label: "Deutsch", countryCode: "DE" },
  { code: "Italiano", label: "Italiano", countryCode: "IT" },
  { code: "Português", label: "Português", countryCode: "PT" },
  { code: "Русский", label: "Русский", countryCode: "RU" },
]

const LanguageSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language)
    console.log("Language changed to:", language.code)
  }

  return (
    <div className="relative">
      <Listbox value={selectedLanguage} onChange={handleLanguageChange}>
        <div className="relative">
          <Listbox.Button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
            <ReactCountryFlag
              countryCode={selectedLanguage.countryCode}
              svg
              style={{
                width: "18px",
                height: "18px",
              }}
            />
            <span className="text-[#0f0f0f] text-base font-medium font-jxd">
              {selectedLanguage.code}
            </span>
            <ChevronDownMini className="w-4 h-4 text-gray-400 ml-1" />
          </Listbox.Button>
          
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 focus:outline-none overflow-hidden">
              {languages.map((language) => (
                <Listbox.Option
                  key={language.code}
                  value={language}
                  className={({ active, selected }) =>
                    `relative cursor-pointer select-none py-3 px-4 transition-colors duration-150 ${
                      active ? "bg-blue-50" : ""
                    } ${
                      selected ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-3">
                      <ReactCountryFlag
                        countryCode={language.countryCode}
                        svg
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                      <span className={`block text-sm ${selected ? "font-semibold" : "font-normal"}`}>
                        {language.label}
                      </span>
                      {selected && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default LanguageSelect 