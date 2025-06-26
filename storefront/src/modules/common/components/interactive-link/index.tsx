import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
  textClassName?: string
  iconColor?: string
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  textClassName = "text-neutral-600",
  iconColor = "rgb(82 82 82)",
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex gap-x-1 items-center group"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className={textClassName}>{children}</Text>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        color={iconColor}
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
