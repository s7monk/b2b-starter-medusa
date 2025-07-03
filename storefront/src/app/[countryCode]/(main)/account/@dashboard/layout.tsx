import { retrieveCustomer } from "@/lib/data/customer"
import AccountLayout from "@/modules/account/templates/account-layout"
import Image from "next/image"

export default async function AccountPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部横幅 */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src="/account-block.jpg"
          alt="Account dashboard banner"
          className="object-cover w-full h-full"
          width={2000}
          height={200}
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-8">
          <div className="w-16 h-1 bg-gradient-to-r from-[#FF000F] to-[#CC0000] rounded-full mb-3"></div>
          <h1 className="!font-jxd-bold text-2xl text-white tracking-tight" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
            Account Dashboard
          </h1>
        </div>
      </div>
      
      <AccountLayout customer={customer}>{children}</AccountLayout>
    </div>
  )
}
