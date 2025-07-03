"use client"

import { signout } from "@/lib/data/customer"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import ChevronDown from "@/modules/common/icons/chevron-down"
import FilePlus from "@/modules/common/icons/file-plus"
import MapPin from "@/modules/common/icons/map-pin"
import Package from "@/modules/common/icons/package"
import User from "@/modules/common/icons/user"
import { B2BCustomer } from "@/types/global"
import { ArrowRightOnRectangle, BuildingStorefront } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useParams, usePathname } from "next/navigation"

const AccountNav = ({
  customer,
  numPendingApprovals,
}: {
  customer: B2BCustomer | null
  numPendingApprovals: number
}) => {
  const route = usePathname()

  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode, customer?.id as string)
  }

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/company"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="company-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <BuildingStorefront width={20} />
                        <span>Company</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                {customer?.employee?.is_admin && (
                  <li>
                    <LocalizedClientLink
                      href="/account/approvals"
                      className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                      data-testid="approvals-link"
                    >
                      <div className="flex items-center gap-x-2">
                        <FilePlus size={16} />
                        <span>Approvals</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </LocalizedClientLink>
                  </li>
                )}
                <li>
                  <LocalizedClientLink
                    href="/account/quotes"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="quotes-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <FilePlus size={16} />
                      <span>Quotes</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50 overflow-hidden backdrop-blur-sm">
          <div className="p-6 bg-gradient-to-r from-slate-50/50 to-white border-b border-slate-100">
            <div className="flex items-center gap-x-3">
              <div className="w-10 h-1.5 bg-gradient-to-r from-[#FF000F] via-[#FF000F] to-[#CC0000] rounded-full shadow-sm"></div>
              <h2 className="!font-jxd-bold text-xl text-slate-900 tracking-tight" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                Account
              </h2>
            </div>
          </div>
          
          <nav className="p-5">
            <ul className="space-y-1">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                >
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                >
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/company"
                  route={route!}
                  data-testid="company-link"
                >
                  Company
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                >
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                >
                  Orders
                </AccountNavLink>
              </li>
              {customer?.employee?.is_admin && (
                <li>
                  <AccountNavLink
                    href="/account/approvals"
                    route={route!}
                    data-testid="approvals-link"
                  >
                    <span>Approvals</span>
                    {numPendingApprovals > 0 && (
                      <span className="bg-[#FF000F] text-white text-xs px-2 py-1 rounded-full !font-jxd-bold ml-2" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                        {numPendingApprovals}
                      </span>
                    )}
                  </AccountNavLink>
                </li>
              )}
              <li>
                <AccountNavLink
                  href="/account/quotes"
                  route={route!}
                  data-testid="quotes-link"
                >
                  Quotes
                </AccountNavLink>
              </li>
            </ul>
            
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-x-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors duration-200 !font-jxd-medium"
                style={{ fontFamily: 'JXD-Medium, sans-serif' }}
                data-testid="logout-button"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m0 0l3-3m0 0l-3-3m3 3H3" />
                </svg>
                <span>Log out</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "relative flex items-center gap-x-3 px-4 py-3 rounded-xl transition-all duration-300 !font-jxd-medium group",
        {
          "bg-gradient-to-r from-[#FF000F] to-[#E6000E] text-white shadow-lg shadow-[#FF000F]/20 transform scale-[1.02]": active,
          "text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-[#FF000F]/80 hover:to-[#E6000E]/80 hover:shadow-md hover:scale-[1.01] hover:shadow-[#FF000F]/10": !active,
        }
      )}
      style={{ fontFamily: 'JXD-Medium, sans-serif' }}
      data-testid={dataTestId}
    >
      {/* 右侧装饰点 - 只在选中时显示 */}
      {active && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
      )}
      
      <span className="relative z-10">{children}</span>
    </LocalizedClientLink>
  )
}

export default AccountNav
