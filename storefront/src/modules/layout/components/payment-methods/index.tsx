import React from "react"

const PaymentMethods = () => {
  return (
    <div className="flex gap-2 items-center">
      {/* Visa */}
      <div className="w-12 h-7 bg-white rounded border border-gray-300 flex items-center justify-center shadow-sm">
        <span className="text-blue-700 font-bold text-xs tracking-wider">VISA</span>
      </div>

      {/* Mastercard */}
      <div className="w-12 h-7 bg-white rounded border border-gray-300 flex items-center justify-center shadow-sm">
        <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="10" r="6" fill="#EB001B"/>
          <circle cx="20" cy="10" r="6" fill="#F79E1B"/>
          <path d="M16 6c1.4 1.1 2.3 2.8 2.3 4.5s-.9 3.4-2.3 4.5c-1.4-1.1-2.3-2.8-2.3-4.5s.9-3.4 2.3-4.5z" fill="#FF5F00"/>
        </svg>
      </div>

      {/* PayPal */}
      <div className="w-12 h-7 bg-white rounded border border-gray-300 flex items-center justify-center shadow-sm">
        <span className="text-blue-600 font-bold text-xs">PayPal</span>
      </div>

      {/* Stripe */}
      <div className="w-12 h-7 bg-white rounded border border-gray-300 flex items-center justify-center shadow-sm">
        <span className="text-purple-600 font-bold text-xs">stripe</span>
      </div>
    </div>
  )
}

export default PaymentMethods 