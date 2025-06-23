"use client"

import { useCart } from "@/lib/context/cart-context"
import { B2BCustomer } from "@/types/global"
import { RequestQuoteConfirmation } from "@/modules/quotes/components/request-quote-confirmation"
import { RequestQuotePrompt } from "@/modules/quotes/components/request-quote-prompt"
import Tooltip from "@/modules/common/components/tooltip"

type QuoteButtonProps = {
  customer: B2BCustomer | null
}

export default function QuoteButton({ customer }: QuoteButtonProps) {
  const { cart } = useCart()

  if (customer && cart?.items && cart.items.length > 0) {
    return (
      <Tooltip text="Quote" position="bottom">
        <RequestQuoteConfirmation>
          <button className="cursor-pointer px-[4px] md:overflow-hidden relative ease-out duration-300 transition-all flex items-center justify-center h-[40px] rounded-full border-[1px] w-[40px] border-gray-600 hover:border-gray-700 hover:shadow-md"
          >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_quote_icon)">
                <path
                  d="M12.166 3.344L9.488 0.667C9.064 0.243 8.477 0 7.876 0H4.375C2.606 0 1.167 1.439 1.167 3.208V5.652C1.648 5.052 2.382 4.667 3.208 4.667C4.562 4.667 5.679 5.697 5.817 7.014C7.136 7.152 8.167 8.269 8.167 9.625C8.167 10.981 7.136 12.098 5.817 12.236C5.742 12.951 5.375 13.574 4.840 14H9.625C11.394 14 12.833 12.561 12.833 10.792V4.958C12.833 4.349 12.595 3.776 12.166 3.344ZM8.167 4.667V1.848C8.195 1.868 8.226 1.881 8.249 1.906L10.927 4.583C10.951 4.608 10.964 4.639 10.984 4.667H8.167Z"
                  fill="#2B2D41"
                  className="duration-300"
                />
                <path
                  d="M5.542 8.75H4.083V7.292C4.083 6.806 3.689 6.417 3.208 6.417C2.728 6.417 2.333 6.806 2.333 7.292V8.75H0.875C0.394 8.75 0 9.139 0 9.625C0 10.111 0.394 10.5 0.875 10.5H2.333V11.958C2.333 12.444 2.728 12.833 3.208 12.833C3.689 12.833 4.083 12.444 4.083 11.958V10.5H5.542C6.023 10.5 6.417 10.111 6.417 9.625C6.417 9.139 6.023 8.75 5.542 8.75Z"
                  fill="#2B2D41"
                  className="duration-300"
                />
              </g>
              <defs>
                <clipPath id="clip0_quote_icon">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </button>
      </RequestQuoteConfirmation>
        </Tooltip>
    )
  }

  return (
    <Tooltip text="Quote" position="bottom">
      <RequestQuotePrompt>
        <button className="cursor-pointer px-[4px] md:overflow-hidden relative ease-out duration-300 transition-all flex items-center justify-center h-[40px] rounded-full border-[1px] w-[40px] border-gray-600 hover:border-gray-700 hover:shadow-md"
        >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_quote_icon_prompt)">
              <path
                d="M12.166 3.344L9.488 0.667C9.064 0.243 8.477 0 7.876 0H4.375C2.606 0 1.167 1.439 1.167 3.208V5.652C1.648 5.052 2.382 4.667 3.208 4.667C4.562 4.667 5.679 5.697 5.817 7.014C7.136 7.152 8.167 8.269 8.167 9.625C8.167 10.981 7.136 12.098 5.817 12.236C5.742 12.951 5.375 13.574 4.840 14H9.625C11.394 14 12.833 12.561 12.833 10.792V4.958C12.833 4.349 12.595 3.776 12.166 3.344ZM8.167 4.667V1.848C8.195 1.868 8.226 1.881 8.249 1.906L10.927 4.583C10.951 4.608 10.964 4.639 10.984 4.667H8.167Z"
                fill="#2B2D41"
                className="duration-300"
              />
              <path
                d="M5.542 8.75H4.083V7.292C4.083 6.806 3.689 6.417 3.208 6.417C2.728 6.417 2.333 6.806 2.333 7.292V8.75H0.875C0.394 8.75 0 9.139 0 9.625C0 10.111 0.394 10.5 0.875 10.5H2.333V11.958C2.333 12.444 2.728 12.833 3.208 12.833C3.689 12.833 4.083 12.444 4.083 11.958V10.5H5.542C6.023 10.5 6.417 10.111 6.417 9.625C6.417 9.139 6.023 8.75 5.542 8.75Z"
                fill="#2B2D41"
                className="duration-300"
              />
            </g>
            <defs>
              <clipPath id="clip0_quote_icon_prompt">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </button>
    </RequestQuotePrompt>
      </Tooltip>
  )
} 