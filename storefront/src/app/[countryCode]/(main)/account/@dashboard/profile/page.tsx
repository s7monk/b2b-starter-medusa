import { retrieveCustomer } from "@/lib/data/customer"
import { listRegions } from "@/lib/data/regions"
import ProfileCard from "@/modules/account/components/profile-card"
import SecurityCard from "@/modules/account/components/security-card"
import { Heading } from "@medusajs/ui"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Medusa Store profile.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full space-y-8" data-testid="profile-page-wrapper">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
          <Heading level="h2" className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
            Personal Details
          </Heading>
        </div>
        <ProfileCard customer={customer} />
      </div>
      
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-slate-400 to-slate-500 rounded-full"></div>
          <Heading level="h2" className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
            Security Settings
          </Heading>
        </div>
        <SecurityCard customer={customer} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
