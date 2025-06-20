import React from "react"

export default function SkeletonCartButton() {
  return (
    <button className="cursor-pointer px-[4px] md:overflow-hidden relative ease-out duration-300 transition-all flex items-center justify-center h-[40px] rounded-full border-[1px] w-[40px] border-gray-600 hover:border-gray-700 hover:shadow-md animate-pulse">
      <div className="absolute left-[13px] top-1/2 transform -translate-y-1/2">
        <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_234_1944)">
            <path d="M10.692 14.257H1.188C0.5346 14.257 0 13.7224 0 13.069V3.56495C0 2.91155 0.5346 2.37695 1.188 2.37695H10.692C11.3454 2.37695 11.88 2.91155 11.88 3.56495V13.069C11.88 13.7224 11.3454 14.257 10.692 14.257ZM1.188 3.56495V13.069H10.692V3.56495H1.188Z" fill="#1a1c29" className="duration-300"></path>
            <path d="M7.7205 4.752C7.3938 4.752 7.1265 4.4847 7.1265 4.158V1.782C7.1265 1.4553 6.8592 1.188 6.5325 1.188H5.3445C5.0178 1.188 4.7505 1.4553 4.7505 1.782V4.158C4.7505 4.4847 4.4832 4.752 4.1565 4.752C3.8298 4.752 3.5625 4.4847 3.5625 4.158V1.782C3.5625 0.8019 4.3644 0 5.3445 0H6.5325C7.5126 0 8.3145 0.8019 8.3145 1.782V4.158C8.3145 4.4847 8.0472 4.752 7.7205 4.752Z" fill="#1a1c29" className="duration-300"></path>
          </g>
          <defs>
            <clipPath id="clip0_234_1944">
              <rect width="11.88" height="14.256" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="-top-[6px] -right-[6px] absolute w-6 h-6 text-white bg-gray-300 rounded-full flex items-center justify-center">
        <span className="select-none text-[10px] font-medium">
          0
        </span>
      </div>
    </button>
  )
}
