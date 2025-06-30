import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export default function SkeletonAccountButton() {
  return (
    <LocalizedClientLink className="cursor-pointer" href="/account">
      <div className="flex items-center justify-center w-6 h-6">
        <svg className="w-6 h-6 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path fill="#000000" fillRule="evenodd" d="M12 4.125a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5Zm-5.75 4.25a5.75 5.75 0 1 1 11.5 0 5.75 5.75 0 0 1-11.5 0Z" clipRule="evenodd"></path>
          <path fill="#000000" fillRule="evenodd" d="M5.813 15.188a8.75 8.75 0 0 1 14.937 6.187h-1.5a7.25 7.25 0 1 0-14.5 0h-1.5a8.75 8.75 0 0 1 2.563-6.187Z" clipRule="evenodd"></path>
        </svg>
      </div>
    </LocalizedClientLink>
  )
}
