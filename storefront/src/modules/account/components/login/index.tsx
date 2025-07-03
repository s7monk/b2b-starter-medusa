import { login } from "@/lib/data/customer"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import ErrorMessage from "@/modules/checkout/components/error-message"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import { useActionState, useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div
      className="w-full flex flex-col gap-6"
      data-testid="login-page"
    >
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-6">
          <Input
            label="Email Address"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <label
                htmlFor="remember-me"
                className="relative flex items-center cursor-pointer group"
              >
                <input
                  id="remember-me"
                  name="remember_me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                  data-testid="remember-me-checkbox"
                />
                
                <div className={`
                  relative w-5 h-5 rounded-md border-2 transition-all duration-300 
                  flex items-center justify-center
                  ${rememberMe 
                    ? 'bg-[#FF000F] border-[#FF000F] shadow-lg shadow-[#FF000F]/25' 
                    : 'bg-white border-gray-300 group-hover:border-gray-400'
                  }
                  group-focus-within:ring-2 group-focus-within:ring-[#FF000F]/20 group-focus-within:ring-offset-1
                `}>
                  {rememberMe && (
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
                  
                  {!rememberMe && (
                    <div className="w-full h-full rounded-sm bg-gradient-to-br from-gray-50 to-white opacity-50" />
                  )}
                </div>
                
                <span className="ml-3 text-gray-700 font-jxd text-sm select-none group-hover:text-gray-900 transition-colors duration-200">
                  Remember me
                </span>
              </label>
            </div>
            
            <button
              type="button"
              className="text-[#FF000F] font-jxd text-sm hover:underline transition-all duration-200 hover:text-[#D9000C] relative"
            >
              Forgot password?
            </button>
          </div>
        </div>
        
        <ErrorMessage error={message} data-testid="login-error-message" />
        
        <div className="flex flex-col gap-4 mt-8">
          <SubmitButton 
            data-testid="sign-in-button" 
            className="w-full !bg-[#FF000F] hover:!bg-[#D9000C] !text-white font-jxd-bold py-4 !rounded-full transition-colors duration-200 text-base !shadow-none border-none"
            variant="transparent"
          >
            Sign In
          </SubmitButton>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-6 text-gray-500 font-jxd">Don't have an account?</span>
            </div>
          </div>
          
          <Button
            variant="secondary"
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="w-full border-2 border-[#FF000F] text-[#FF000F] hover:bg-[#FF000F] hover:text-white font-jxd-bold py-4 rounded-xl transition-colors duration-200 text-base"
            data-testid="register-button"
          >
            Create Business Account
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
