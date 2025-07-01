import { clx, Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@/modules/common/icons/eye"
import EyeOff from "@/modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
  colSpan?: 1 | 2
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      touched,
      required,
      topLabel,
      colSpan = 1,
      className,
      value,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const placeholderText = `${label}${required ? ' *' : ''}`

    return (
      <div className={`flex flex-col w-full`}>
        {topLabel && (
          <Label className="mb-2 txt-compact-medium-plus">{topLabel}</Label>
        )}
        <div className="relative w-full group">
          {/* 背景层 - 创建渐变边框效果 */}
          <div 
            className={clx(
              "absolute inset-0 rounded-2xl transition-all duration-300",
              "bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 p-[1px]",
              isFocused && "from-[#FF000F]/60 via-[#FF000F]/30 to-[#FF000F]/60",
              "group-hover:from-gray-300 group-hover:via-gray-300 group-hover:to-gray-300"
            )}
          >
            <div className="h-full w-full bg-white rounded-2xl" />
          </div>

          {/* 内部容器 */}
          <div className="relative z-10">
            <input
              type={inputType}
              name={name}
              placeholder={placeholderText}
              required={required}
              className={clx(
                "w-full h-14 px-4 bg-transparent text-gray-900",
                "rounded-2xl border-0 outline-none font-jxd text-base",
                "placeholder:text-gray-500 placeholder:font-jxd",
                "focus:placeholder:text-gray-400 transition-all duration-200",
                type === "password" ? "pr-12" : "",
                className
              )}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
              {...(value !== undefined && { value })}
              ref={inputRef}
            />

            {/* 密码显示/隐藏按钮 */}
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={clx(
                  "absolute right-4 top-1/2 -translate-y-1/2",
                  "text-gray-400 hover:text-gray-600 focus:text-[#FF000F]",
                  "transition-colors duration-200 outline-none",
                  "w-5 h-5 flex items-center justify-center"
                )}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            )}
          </div>

          {/* 底部装饰线 */}
          <div 
            className={clx(
              "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300",
              "bg-gradient-to-r from-transparent via-[#FF000F] to-transparent",
              isFocused ? "w-full opacity-100" : "w-0 opacity-0"
            )}
          />

          {/* 微妙的内阴影效果 */}
          <div 
            className={clx(
              "absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300",
              "shadow-inner opacity-0",
              isFocused && "opacity-5"
            )}
          />
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
