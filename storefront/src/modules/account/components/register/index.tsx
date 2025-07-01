"use client"

import { currencySymbolMap } from "@/lib/constants"
import { signup } from "@/lib/data/customer"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import ErrorMessage from "@/modules/checkout/components/error-message"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Input from "@/modules/common/components/input"
import { HttpTypes } from "@medusajs/types"
import { Select } from "@medusajs/ui"
import { ChangeEvent, useActionState, useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  regions: HttpTypes.StoreRegion[]
}

interface FormData {
  email: string
  first_name: string
  last_name: string
  company_name: string
  password: string
  company_address: string
  company_city: string
  company_state: string
  company_zip: string
  company_country: string
  currency_code: string
}

const initialFormData: FormData = {
  email: "",
  first_name: "",
  last_name: "",
  company_name: "",
  password: "",
  company_address: "",
  company_city: "",
  company_state: "",
  company_zip: "",
  company_country: "",
  currency_code: "",
}

const placeholder = ({
  placeholder,
  required,
}: {
  placeholder: string
  required: boolean
}) => {
  return (
    <span className="text-gray-500 font-jxd">
      {placeholder}
      {required && <span className="text-[#FF000F]">*</span>}
    </span>
  )
}

const Register = ({ setCurrentView, regions }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isValid =
    termsAccepted &&
    !!formData.email &&
    !!formData.first_name &&
    !!formData.last_name &&
    !!formData.company_name &&
    !!formData.password &&
    !!formData.company_address &&
    !!formData.company_city &&
    !!formData.company_zip &&
    !!formData.company_country &&
    !!formData.currency_code

  const countryNames = regions
    .flatMap((region) =>
      region.countries?.map((country) => country?.display_name || country?.name)
    )
    .filter((country) => country !== undefined)

  const currencies = regions.map((region) => region.currency_code)

  return (
    <div
      className="w-full flex flex-col gap-6"
      data-testid="register-page"
    >
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-5">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
              value={formData.first_name}
              onChange={handleChange}
            />
            <Input
              label="Last Name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          
          <Input
            label="Email Address"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
            value={formData.email}
            onChange={handleChange}
          />
          
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Company Information Section */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-6 text-gray-500 font-jxd-bold">Company Information</span>
            </div>
          </div>
          
          <Input
            label="Company Name"
            name="company_name"
            required
            autoComplete="organization"
            data-testid="company-name-input"
            value={formData.company_name}
            onChange={handleChange}
          />
          
          <Input
            label="Company Address"
            name="company_address"
            required
            autoComplete="address"
            data-testid="company-address-input"
            value={formData.company_address}
            onChange={handleChange}
          />
          
          <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
            <Input
              label="City"
              name="company_city"
              required
              autoComplete="city"
              data-testid="company-city-input"
              value={formData.company_city}
              onChange={handleChange}
            />
            <Input
              label="State / Province"
              name="company_state"
              autoComplete="state"
              data-testid="company-state-input"
              value={formData.company_state}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
            <Input
              label="ZIP / Postal Code"
              name="company_zip"
              required
              autoComplete="postal-code"
              data-testid="company-zip-input"
              value={formData.company_zip}
              onChange={handleChange}
            />
            
            {/* Country Select - 优化后的样式 */}
            <div className="relative w-full group">
              <div className="absolute inset-0 rounded-2xl transition-all duration-300 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 p-[1px] group-hover:from-gray-300 group-hover:via-gray-300 group-hover:to-gray-300 group-focus-within:from-[#FF000F]/60 group-focus-within:via-[#FF000F]/30 group-focus-within:to-[#FF000F]/60">
                <div className="h-full w-full bg-white rounded-2xl" />
              </div>
              
              <Select
                name="company_country"
                required
                autoComplete="country"
                data-testid="company-country-input"
                value={formData.company_country}
                onValueChange={handleSelectChange("company_country")}
              >
                <Select.Trigger className="relative z-10 w-full h-14 px-4 bg-transparent text-gray-900 rounded-2xl border-0 outline-none transition-all duration-300 font-jxd text-base data-[placeholder]:text-gray-500 focus:ring-0">
                  <Select.Value
                    placeholder={placeholder({
                      placeholder: "Country *",
                      required: false,
                    })}
                  />
                </Select.Trigger>
                <Select.Content className="bg-white border border-gray-200 rounded-xl shadow-xl">
                  {countryNames?.map((country) => (
                    <Select.Item 
                      key={country} 
                      value={country} 
                      className="font-jxd hover:bg-gray-50 focus:bg-[#FF000F]/5 px-4 py-2"
                    >
                      {country}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
              
              {/* 底部装饰线 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 bg-gradient-to-r from-transparent via-[#FF000F] to-transparent group-focus-within:w-full group-focus-within:opacity-100 w-0 opacity-0" />
            </div>
          </div>
          
          {/* Currency Select - 优化后的样式 */}
          <div className="relative w-full group">
            <div className="absolute inset-0 rounded-2xl transition-all duration-300 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 p-[1px] group-hover:from-gray-300 group-hover:via-gray-300 group-hover:to-gray-300 group-focus-within:from-[#FF000F]/60 group-focus-within:via-[#FF000F]/30 group-focus-within:to-[#FF000F]/60">
              <div className="h-full w-full bg-white rounded-2xl" />
            </div>
            
            <Select
              name="currency_code"
              required
              autoComplete="currency"
              data-testid="company-currency-input"
              value={formData.currency_code}
              onValueChange={handleSelectChange("currency_code")}
            >
              <Select.Trigger className="relative z-10 w-full h-14 px-4 bg-transparent text-gray-900 rounded-2xl border-0 outline-none transition-all duration-300 font-jxd text-base data-[placeholder]:text-gray-500 focus:ring-0">
                <Select.Value
                  placeholder={placeholder({
                    placeholder: "Currency *",
                    required: false,
                  })}
                />
              </Select.Trigger>
              <Select.Content className="bg-white border border-gray-200 rounded-xl shadow-xl">
                {[...new Set(currencies)].map((currency) => (
                  <Select.Item 
                    key={currency} 
                    value={currency} 
                    className="font-jxd hover:bg-gray-50 focus:bg-[#FF000F]/5 px-4 py-2"
                  >
                    {currency.toUpperCase()} ({currencySymbolMap[currency]})
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
            
            {/* 底部装饰线 */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 bg-gradient-to-r from-transparent via-[#FF000F] to-transparent group-focus-within:w-full group-focus-within:opacity-100 w-0 opacity-0" />
          </div>
        </div>
        
        <ErrorMessage error={message} data-testid="register-error" />
        
        {/* 自定义条款复选框 - 与登录页面保持一致 */}
        <div className="flex items-start gap-3 mt-8">
          <label
            htmlFor="terms-checkbox"
            className="relative flex items-start cursor-pointer group pt-1"
          >
            <input
              id="terms-checkbox"
              name="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="sr-only"
              data-testid="terms-checkbox"
            />
            
            {/* 复选框容器 */}
            <div className={`
              relative w-5 h-5 rounded-md border-2 transition-all duration-300 
              flex items-center justify-center flex-shrink-0
              ${termsAccepted 
                ? 'bg-[#FF000F] border-[#FF000F] shadow-lg shadow-[#FF000F]/25' 
                : 'bg-white border-gray-300 group-hover:border-gray-400'
              }
              group-focus-within:ring-2 group-focus-within:ring-[#FF000F]/20 group-focus-within:ring-offset-1
            `}>
              {/* 选中状态的勾选图标 */}
              {termsAccepted && (
                <svg
                  className="w-3 h-3 text-white transform transition-transform duration-200 scale-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              
              {/* 未选中状态的内部装饰 */}
              {!termsAccepted && (
                <div className="w-full h-full rounded-sm bg-gradient-to-br from-gray-50 to-white opacity-50" />
              )}
            </div>
          </label>
          
          <label
            htmlFor="terms-checkbox"
            className="text-gray-700 font-jxd text-sm leading-relaxed cursor-pointer select-none group-hover:text-gray-900 transition-colors duration-200 mt-0.5"
          >
            I agree to the{" "}
            <button
              type="button"
              className="text-[#FF000F] hover:underline transition-all duration-200 hover:text-[#D9000C] font-medium"
            >
              Terms and Conditions
            </button>
            {" "}and{" "}
            <button
              type="button"
              className="text-[#FF000F] hover:underline transition-all duration-200 hover:text-[#D9000C] font-medium"
            >
              Privacy Policy
            </button>
            .
          </label>
        </div>
        
        <SubmitButton
          className={`
            w-full mt-6 font-jxd-bold py-4 rounded-xl transition-all duration-200 text-base
            ${isValid 
              ? 'bg-[#FF000F] hover:bg-[#D9000C] text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          data-testid="register-button"
          disabled={!isValid}
        >
          Create Business Account
        </SubmitButton>
      </form>
      
      <div className="text-center mt-6">
        <span className="text-gray-600 font-jxd text-sm">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.LOG_IN)}
            className="text-[#FF000F] font-jxd-bold hover:underline transition-colors duration-200 hover:text-[#D9000C]"
          >
            Sign In
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
