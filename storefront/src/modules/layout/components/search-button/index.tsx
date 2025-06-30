"use client"

import { useState, useRef, useEffect } from "react"

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSearchClick = () => {
    setIsOpen(!isOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // TODO: 实现真正的搜索功能
      console.log("搜索:", searchQuery)
      // 这里可以添加路由跳转到搜索页面
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setSearchQuery("")
  }

  // 点击外部关闭搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // 聚焦输入框
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* 搜索框 - ABB精致设计 */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'w-72 opacity-100' : 'w-0 opacity-0'
      }`}>
        <div className="relative flex items-center bg-white border border-black rounded-full h-10 px-4">
          {/* 主输入框 */}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="type search"
            className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none pr-16"
          />
          
          {/* 右侧按钮区域 */}
          <div className="absolute right-3 flex items-center">
            {/* 灰色关闭按钮 */}
            <button
              type="button"
              onClick={handleClose}
              className="w-4 h-4 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#9CA3AF"/>
                <path d="M10.5 5.5L5.5 10.5M5.5 5.5L10.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* 分割线 */}
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            
            {/* 红色搜索图标 */}
            <button
              onClick={handleSearch}
              className="flex items-center justify-center"
              type="submit"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M7.33334 14C10.8851 14 13.6667 11.2184 13.6667 7.66667C13.6667 4.11486 10.8851 1.33334 7.33334 1.33334C3.78153 1.33334 1 4.11486 1 7.66667C1 11.2184 3.78153 14 7.33334 14Z" 
                  stroke="#EF4444" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M15 15L12.375 12.375" 
                  stroke="#EF4444" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 触发搜索的图标按钮 - 搜索框展开时隐藏 */}
      {!isOpen && (
        <button 
          className="cursor-pointer flex items-center justify-center w-6 h-6 flex-shrink-0"
          onClick={handleSearchClick}
          aria-label="Search"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M10.875 2.25C6.525 2.25 3 5.775 3 10.125C3 14.475 6.525 18 10.875 18C12.63 18 14.235 17.385 15.525 16.35L20.33 21.155C20.765 21.59 21.485 21.59 21.92 21.155C22.355 20.72 22.355 20 21.92 19.565L17.115 14.76C18.15 13.47 18.75 11.865 18.75 10.125C18.75 5.775 15.225 2.25 10.875 2.25ZM10.875 3.75C14.385 3.75 17.25 6.615 17.25 10.125C17.25 13.635 14.385 16.5 10.875 16.5C7.365 16.5 4.5 13.635 4.5 10.125C4.5 6.615 7.365 3.75 10.875 3.75Z" 
              fill="#000000"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchButton 