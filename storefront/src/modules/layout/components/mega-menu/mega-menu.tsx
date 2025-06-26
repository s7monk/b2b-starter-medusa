"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const MegaMenu = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<
    HttpTypes.StoreProductCategory["id"] | null
  >(null)

  const pathname = usePathname()

  const mainCategories = categories.filter(
    (category) => !category.parent_category_id
  )

  const getSubCategories = (categoryId: string) => {
    return categories.filter(
      (category) => category.parent_category_id === categoryId
    )
  }

  let menuTimeout: NodeJS.Timeout | null = null

  const handleMenuHover = () => {
    if (menuTimeout) {
      clearTimeout(menuTimeout)
    }
    setIsHovered(true)
  }

  const handleMenuLeave = () => {
    menuTimeout = setTimeout(() => {
      setIsHovered(false)
      setSelectedCategory(null) // 重置选中的分类
    }, 300)

    return () => {
      if (menuTimeout) {
        clearTimeout(menuTimeout)
      }
    }
  }

  let categoryTimeout: NodeJS.Timeout | null = null

  const handleCategoryHover = (categoryId: string) => {
    categoryTimeout = setTimeout(() => {
      setSelectedCategory(categoryId)
    }, 200)

    return () => {
      if (categoryTimeout) {
        clearTimeout(categoryTimeout)
      }
    }
  }

  const handleCategoryLeave = () => {
    if (categoryTimeout) {
      clearTimeout(categoryTimeout)
    }
  }

  useEffect(() => {
    setIsHovered(false)
  }, [pathname])

  return (
    <>
      <div
        onMouseEnter={handleMenuHover}
        onMouseLeave={handleMenuLeave}
        className="z-50"
      >
        <LocalizedClientLink
          className="relative text-[#0f0f0f] text-base font-medium font-jxd px-2 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          href="/store"
        >
          Products
        </LocalizedClientLink>
        {isHovered && (
          <div 
            className="fixed top-[60px] flex gap-20 py-10 px-4 bg-white border-b border-neutral-200 transition-all duration-300 mr-24"
            style={{
              width: 'max-content',
              minWidth: selectedCategory && getSubCategories(selectedCategory).length > 0 ? '400px' : '130px',
              maxWidth: 'calc(100vw - 640px)', // 动态宽度：屏幕宽度减去边距
              left: 'calc(50% - 130px)', // 调整对齐Products菜单项
            }}
          >
            <div className="flex flex-col gap-2 min-w-[130px]">
              {mainCategories.map((category) => (
                <LocalizedClientLink
                  key={category.id}
                  href={`/categories/${category.handle}`}
                  className={clx(
                    "relative px-3 py-2 w-fit font-medium font-jxd transition-all duration-300 cursor-pointer after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
                    selectedCategory === category.id && "after:scale-x-100"
                  )}
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  onMouseLeave={handleCategoryLeave}
                >
                  {category.name}
                </LocalizedClientLink>
              ))}
            </div>
            {selectedCategory && getSubCategories(selectedCategory).length > 0 && (
              <div className="flex flex-wrap gap-3">
                {getSubCategories(selectedCategory).map((category) => (
                  <div key={category.id} className="flex flex-col gap-2 min-w-[130px] flex-shrink-0">
                    <LocalizedClientLink
                      className="relative font-medium font-jxd text-zinc-500 w-fit py-1 transition-all duration-300 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                      href={`/categories/${category.handle}`}
                    >
                      {category.name}
                    </LocalizedClientLink>
                    <div className="flex flex-col gap-2">
                      {getSubCategories(category.id).map((subCategory) => (
                                                  <LocalizedClientLink
                            key={subCategory.id}
                            className="relative w-fit max-w-[160px] py-1 font-jxd text-zinc-400 transition-all duration-300 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-zinc-600 break-words"
                            href={`/categories/${subCategory.handle}`}
                          >
                          {subCategory.name}
                        </LocalizedClientLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {isHovered && (
        <div className="fixed inset-0 mt-[60px] blur-sm backdrop-blur-sm z-[-1]" />
      )}
    </>
  )
}

export default MegaMenu
