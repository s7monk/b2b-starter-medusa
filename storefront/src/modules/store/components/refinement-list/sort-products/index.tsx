"use client"

import { ChevronUpDown } from "@medusajs/icons"
import { useState, useRef, useEffect } from "react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low -> High",
  },
  {
    value: "price_desc",
    label: "Price: High -> Low",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
    setIsOpen(false)
  }

  const selectedOption = sortOptions.find(option => option.value === sortBy)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm p-2 justify-between">
      <span className="text-neutral-600 !font-jxd-medium" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Sort by:</span>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 py-1 px-2 !font-jxd-regular text-gray-700 hover:text-[#FF000F] transition-colors duration-200 cursor-pointer focus:outline-none"
          style={{ fontFamily: 'JXD-Regular, sans-serif' }}
          onClick={() => setIsOpen(!isOpen)}
          data-testid={dataTestId}
        >
          <span>{selectedOption?.label}</span>
          <ChevronUpDown className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 overflow-hidden min-w-[160px]">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`w-full px-3 py-2 text-left !font-jxd-regular transition-colors duration-150 ${
                  option.value === sortBy 
                    ? 'bg-[#FF000F] text-white' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#FF000F]'
                }`}
                style={{ fontFamily: 'JXD-Regular, sans-serif' }}
                onClick={() => handleChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SortProducts
