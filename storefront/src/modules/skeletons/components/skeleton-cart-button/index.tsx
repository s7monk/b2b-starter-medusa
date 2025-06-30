import React from "react"

export default function SkeletonCartButton() {
  return (
    <button className="relative cursor-pointer flex items-center justify-center w-6 h-6 animate-pulse">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="21" r="1" stroke="#000000" strokeWidth="1.5" fill="none"/>
        <circle cx="20" cy="21" r="1" stroke="#000000" strokeWidth="1.5" fill="none"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </button>
  )
}
