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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 简洁的背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 主要的背景渐变 - 更自然的色调 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50/50 to-white"></div>
        
        {/* 工业主题的几何元素 - 更加微妙 */}
        <div className="absolute top-0 right-0 w-96 h-96 transform translate-x-48 -translate-y-48">
          <div className="w-full h-full bg-gradient-to-bl from-[#FF000F]/3 via-[#FF000F]/1 to-transparent rounded-full"></div>
        </div>
        
        {/* 左下角的装饰 */}
        <div className="absolute bottom-0 left-0 w-80 h-80 transform -translate-x-40 translate-y-40">
          <div className="w-full h-full bg-gradient-to-tr from-slate-100/40 via-slate-50/20 to-transparent rounded-full"></div>
        </div>
        
        {/* 精致的网格图案 - 更加微妙 */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #64748b 1px, transparent 1px),
              linear-gradient(180deg, #64748b 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
        
        {/* 工业感的线条装饰 - 重新设计为更自然的形状 */}
        <div className="absolute top-1/4 right-12 w-0.5 h-16 bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-60"></div>
        <div className="absolute bottom-1/3 left-16 w-0.5 h-20 bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-60"></div>
        
        {/* 精致的装饰点 */}
        <div className="absolute top-1/3 left-1/5 w-1 h-1 bg-slate-300/60 rounded-full"></div>
        <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-[#FF000F]/8 rounded-full"></div>
        <div className="absolute top-1/2 right-1/6 w-0.5 h-0.5 bg-slate-400/40 rounded-full"></div>
      </div>

      {/* 主内容区域 */}
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-lg">
          {/* 品牌区域 - 更加精致 */}
          <div className="text-center mb-12">
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF000F] via-[#FF000F] to-[#CC0000] mx-auto mb-6 rounded-full shadow-sm"></div>
            <h1 className="font-jxd-bold text-slate-900 text-3xl mb-3 tracking-tight">
              {currentView === LOGIN_VIEW.LOG_IN ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="font-jxd text-slate-600 text-base leading-relaxed">
              {currentView === LOGIN_VIEW.LOG_IN 
                ? "Access your industrial automation account" 
                : "Join our industrial automation platform"
              }
            </p>
          </div>

          {/* 表单区域 - 更加现代和自然 */}
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 p-8 relative backdrop-blur-sm">
            {/* 顶部装饰线 - 更加精致 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#FF000F]/30 to-transparent rounded-b-full"></div>
            
            {currentView === LOGIN_VIEW.LOG_IN ? (
              <Login setCurrentView={updateView} />
            ) : (
              <Register setCurrentView={updateView} regions={regions} />
            )}
          </div>

          {/* 底部信息 - 更加精致 */}
          <div className="text-center mt-8">
            <p className="font-jxd text-xs text-slate-400 tracking-wide">
              © 2025 Beijing Jianxindi Technology Co., Ltd
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
