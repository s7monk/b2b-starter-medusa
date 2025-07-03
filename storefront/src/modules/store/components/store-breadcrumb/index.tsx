import LocalizedClientLink from "@/modules/common/components/localized-client-link"

const StoreBreadcrumbItem = ({
  title,
  handle,
}: {
  title: string
  handle?: string
}) => {
  return (
    <li className="text-neutral-500 !font-jxd-regular" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
      <LocalizedClientLink
        className="hover:text-neutral-900 !font-jxd-regular transition-colors duration-200"
        style={{ fontFamily: 'JXD-Regular, sans-serif' }}
        href={handle ? `${handle}` : "/store"}
      >
        {title}
      </LocalizedClientLink>
    </li>
  )
}

const StoreBreadcrumb = () => {
  return (
    <ul className="flex items-center gap-x-3 text-sm !font-jxd-regular" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
      <StoreBreadcrumbItem title="Products" key="base" />
      <span className="text-neutral-500 !font-jxd-regular" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{">"}</span>
      <StoreBreadcrumbItem title="All products" handle="/store" />
    </ul>
  )
}

export default StoreBreadcrumb
