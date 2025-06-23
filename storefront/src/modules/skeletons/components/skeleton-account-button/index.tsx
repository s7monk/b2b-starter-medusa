import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export default function SkeletonAccountButton() {
  return (
    <LocalizedClientLink className="hover:text-ui-fg-base" href="/account">
      {/* 骨架加载状态 - 显示加载中的按钮 */}
      <div className="cursor-pointer px-3 py-2 relative ease-out duration-300 transition-all flex items-center gap-2 h-[40px] rounded-full border-[1px] border-gray-600 hover:border-gray-700 hover:shadow-md animate-pulse">
        <div className="relative">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_user_icon)">
              <path
                d="M7 5.825C8.6569 5.825 10 4.48188 10 2.825C10 1.16812 8.6569 -0.175 7 -0.175C5.34315 -0.175 4 1.16812 4 2.825C4 4.48188 5.34315 5.825 7 5.825Z"
                fill="#9CA3AF"
                className="duration-300"
              />
              <path
                d="M12.2884 10.078C11.2009 8.179 9.1747 7 7.0002 7C4.8257 7 2.7984 8.179 1.7119 10.078C1.4209 10.585 1.3549 11.191 1.5319 11.744C1.7079 12.295 2.1109 12.751 2.6384 12.995C4.0844 13.666 5.5424 14 7.0002 14C8.4579 14 9.9159 13.666 11.3619 12.995C11.8894 12.751 12.2914 12.295 12.4684 11.744C12.6454 11.191 12.5794 10.585 12.2884 10.078Z"
                fill="#9CA3AF"
                className="duration-300"
              />
            </g>
            <defs>
              <clipPath id="clip0_user_icon">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        {/* 加载中的文字占位符 */}
        <div className="h-3 w-12 bg-gray-300 rounded hidden small:block animate-pulse"></div>
      </div>
    </LocalizedClientLink>
  )
}
