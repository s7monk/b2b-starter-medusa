import { retrieveCustomer } from "@/lib/data/customer"
import { getRegion } from "@/lib/data/regions"
import AddressBook from "@/modules/account/components/address-book"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full space-y-8" data-testid="addresses-page-wrapper">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
          <h1 className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
            Shipping Addresses
          </h1>
        </div>
        <p className="!font-jxd-regular text-slate-600 leading-relaxed max-w-2xl" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
          Manage your shipping addresses for quick and easy checkout. You can add multiple addresses and they will be available during the ordering process.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
