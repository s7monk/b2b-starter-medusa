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
          <div className="flex-1">
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
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 flex-1">
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
              <span className="txt-small-plus text-white font-semibold" style={{ fontFamily: 'JXD-Bold', fontSize: '16px' }}>Medusa</span>
              <ul className="grid grid-cols-1 gap-y-2 text-gray-200 txt-small">
                <li>
                  <a
                    href="https://github.com/medusajs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                    style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.medusajs.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                    style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/medusajs/b2b-starter-medusa"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                    style={{ fontFamily: 'JXD-Light', fontSize: '16px' }}
                  >
                    Source code
                  </a>
                </li>
              </ul>
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
