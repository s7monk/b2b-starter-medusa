import { listCategories } from "@/lib/data/categories"
import { listCollections } from "@/lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import MedusaCTA from "@/modules/layout/components/medusa-cta"
import SocialLinks from "@/modules/layout/components/social-links"
import PaymentMethods from "@/modules/layout/components/payment-methods"

export default async function Footer() {
  const { collections } = await listCollections({
    offset: "0",
    limit: "6",
  })
  const product_categories = await listCategories({
    offset: 0,
    limit: 6,
  })

  return (
    <footer className="w-full" style={{ backgroundColor: '#696969' }}>
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-12">
          <div className="flex-1 max-w-sm">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-white hover:text-gray-200 uppercase mb-4 block"
              style={{ fontFamily: 'JXD-Bold' }}
            >
              jxd automation
            </LocalizedClientLink>
            
            <div className="mt-12">
              <SocialLinks />
            </div>
          </div>
          <div className="text-small-regular gap-6 md:gap-x-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 flex-1 ml-8">
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-white font-semibold" style={{ fontFamily: 'JXD-Bold', fontSize: '16px' }}>
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    return (
                      <li
                        className="flex flex-col gap-2 text-gray-200 txt-small"
                        key={c.id}
                        style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}
                      >
                        <LocalizedClientLink
                          className="hover:text-white"
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                          style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-white font-semibold" style={{ fontFamily: 'JXD-Bold', fontSize: '16px' }}>
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-gray-200 txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-white"
                        href={`/collections/${c.handle}`}
                        style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-white font-semibold" style={{ fontFamily: 'JXD-Bold', fontSize: '16px' }}>Company</span>
              <ul className="grid grid-cols-1 gap-y-2 text-gray-200 txt-small">
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="hover:text-white"
                    style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}
                  >
                    Who we are
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/service"
                    className="hover:text-white"
                    style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}
                  >
                    Services
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/news"
                    className="hover:text-white"
                    style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}
                  >
                    News
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-y-2 lg:w-56">
              <span className="txt-small-plus text-white font-semibold" style={{ fontFamily: 'JXD-Bold', fontSize: '16px' }}>
                Subscribe Newsletter
              </span>
              <p className="text-gray-200 mb-3" style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}>
                Get updates on automation solutions
              </p>
              <form className="flex flex-col gap-y-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 rounded-md focus:outline-none focus:border-[#FF000F] focus:ring-1 focus:ring-[#FF000F] transition-all duration-200"
                  style={{ fontFamily: 'JXD-Light', fontSize: '14px' }}
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-[#FF000F] text-white hover:bg-[#E6000D] rounded-md transition-all duration-200 hover:shadow-md"
                  style={{ fontFamily: 'JXD-Bold', fontSize: '14px' }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 pb-6" style={{ borderTopColor: '#a0a0a0' }}>
          <div className="flex flex-col small:flex-row w-full justify-between items-center gap-4 text-gray-200">
            <Text className="txt-compact-small" style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}>
              © {new Date().getFullYear()} JXD Automation. All rights reserved.
            </Text>
            
            <div>
              <PaymentMethods />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
