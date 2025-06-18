import { SVGProps } from "react"

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="16"
    viewBox="0 0 48 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* J */}
    <path
      d="M4 0H7V10C7 12.7614 4.76142 15 2 15C-0.761424 15 -3 12.7614 -3 10H0C0 10.5523 0.447715 11 1 11C1.55228 11 2 10.5523 2 10V0H4Z"
      fill="#DC2626"
      transform="translate(3, 0)"
    />
    
    {/* X */}
    <path
      d="M0 0L3 4L6 0H9L5 6L9 12H6L3 8L0 12H-3L1 6L-3 0H0Z"
      fill="#DC2626"
      transform="translate(19, 2)"
    />
    
    {/* D */}
    <path
      d="M0 0H4C7.31371 0 10 2.68629 10 6C10 9.31371 7.31371 12 4 12H0V0ZM3 3V9H4C5.65685 9 7 7.65685 7 6C7 4.34315 5.65685 3 4 3H3Z"
      fill="#DC2626"
      transform="translate(38, 2)"
    />
  </svg>
)

export default LogoIcon
