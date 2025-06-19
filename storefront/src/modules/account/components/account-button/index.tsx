import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import User from "@/modules/common/icons/user"
import { B2BCustomer } from "@/types/global"

export default async function AccountButton({
  customer,
}: {
  customer: B2BCustomer | null
}) {
  return (
    <LocalizedClientLink className="hover:text-ui-fg-base" href="/account">
      <button className="flex gap-1.5 items-center rounded-2xl bg-none shadow-none border-none hover:bg-neutral-100 px-2 py-1 text-[#0f0f0f]">
        <User />
        <span className="hidden small:inline-block text-base font-medium font-jxd">
          {customer ? customer.first_name : "Log in"}
        </span>
      </button>
    </LocalizedClientLink>
  )
}
