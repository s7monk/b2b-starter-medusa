"use client"

import Login from "@/modules/account/components/login"
import Register from "@/modules/account/components/register"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export enum LOGIN_VIEW {
  LOG_IN = "log-in",
  REGISTER = "register",
}

const LoginTemplate = ({ regions }: { regions: HttpTypes.StoreRegion[] }) => {
  const route = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(() => {
    const viewFromUrl = searchParams.get("view") as LOGIN_VIEW
    return viewFromUrl && Object.values(LOGIN_VIEW).includes(viewFromUrl)
      ? viewFromUrl
      : LOGIN_VIEW.LOG_IN
  })

  useEffect(() => {
    if (searchParams.has("view")) {
      const newParams = new URLSearchParams(searchParams)
      newParams.delete("view")
      router.replace(
        `${route}${newParams.toString() ? `?${newParams.toString()}` : ""}`,
        { scroll: false }
      )
    }
  }, [searchParams, route, router])

  const updateView = (view: LOGIN_VIEW) => {
    setCurrentView(view)
    router.push(`/account?view=${view}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 大的几何图形 - 左上角 */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#FF000F]/5 to-transparent rounded-full"></div>
        
        {/* 网格图案 */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #FF000F 1px, transparent 1px),
              linear-gradient(180deg, #FF000F 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        {/* 右下角装饰 */}
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-gray-200/30 to-transparent rounded-full"></div>
        
        {/* 工业感的线条 */}
        <div className="absolute top-1/4 right-0 w-px h-32 bg-gradient-to-b from-transparent via-[#FF000F]/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-px h-24 bg-gradient-to-b from-transparent via-[#FF000F]/20 to-transparent"></div>
        
        {/* 小的装饰点 */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#FF000F]/10 rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-[#FF000F]/15 rounded-full"></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-gray-300/50 rounded-full"></div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-lg">
          {/* 品牌区域 */}
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-[#FF000F] mx-auto mb-6 shadow-lg shadow-red-500/20"></div>
            <h1 className="font-jxd-bold text-[#0F0F0F] text-3xl mb-2">
              {currentView === LOGIN_VIEW.LOG_IN ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="font-jxd text-gray-600 text-base">
              {currentView === LOGIN_VIEW.LOG_IN 
                ? "Access your industrial automation account" 
                : "Join our industrial automation platform"
              }
            </p>
          </div>

          {/* 表单区域 */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-2xl p-10 relative">
            {/* 卡片内的装饰线 */}
            <div className="absolute top-0 left-8 w-12 h-0.5 bg-gradient-to-r from-[#FF000F] to-transparent"></div>
            
            {currentView === LOGIN_VIEW.LOG_IN ? (
              <Login setCurrentView={updateView} />
            ) : (
              <Register setCurrentView={updateView} regions={regions} />
            )}
          </div>

          {/* 底部信息 */}
          <div className="text-center mt-8">
            <p className="font-jxd text-xs text-gray-500">
              © 2025 Beijing Jianxindi Technology Co., Ltd
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
