import React from "react"
import Facebook from "@/modules/common/icons/facebook"
import Instagram from "@/modules/common/icons/instagram"
import LinkedIn from "@/modules/common/icons/linkedin"
import TwitterX from "@/modules/common/icons/twitter-x"
import YouTube from "@/modules/common/icons/youtube"

const SocialLinks = () => {
  return (
    <div className="flex gap-2 items-center">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        className="w-7 h-7 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
      >
        <Facebook size="16" color="white" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        className="w-7 h-7 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
      >
        <Instagram size="14" color="white" />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noreferrer"
        className="w-7 h-7 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
      >
        <LinkedIn size="16" color="white" />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noreferrer"
        className="w-7 h-7 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
      >
        <TwitterX size="12" color="white" />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noreferrer"
        className="w-7 h-7 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
      >
        <YouTube size="14" color="white" />
      </a>
    </div>
  )
}

export default SocialLinks 