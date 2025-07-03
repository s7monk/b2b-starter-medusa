import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Radio from "@/modules/common/components/radio"
import SquareMinus from "@/modules/common/icons/square-minus"
import SquarePlus from "@/modules/common/icons/square-plus"
import { HttpTypes } from "@medusajs/types"
import { Container, Text } from "@medusajs/ui"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const CategoryList = ({
  categories,
  currentCategory,
}: {
  categories: HttpTypes.StoreProductCategory[]
  currentCategory?: HttpTypes.StoreProductCategory
}) => {
  const getCategoriesToExpand = useCallback(
    (category: HttpTypes.StoreProductCategory) => {
      const categoriesToExpand = [category.id]
      let current = category
      while (current.parent_category_id) {
        categoriesToExpand.push(current.parent_category_id)
        current = categories.find(
          (cat) => cat.id === current.parent_category_id
        ) as HttpTypes.StoreProductCategory
      }
      return categoriesToExpand
    },
    [categories]
  )

  const [expandedCategories, setExpandedCategories] = useState<string[]>(() =>
    currentCategory ? getCategoriesToExpand(currentCategory) : []
  )

  const pathname = usePathname()

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const searchParams = useSearchParams()

  const isCurrentCategory = (handle: string) =>
    pathname.split("/").slice(2).join("/") === `categories/${handle}`

  useEffect(() => {
    if (currentCategory) {
      const categoriesToExpand = getCategoriesToExpand(currentCategory)
      setExpandedCategories((prev) => {
        const newCategories = categoriesToExpand.filter(
          (cat) => !prev.includes(cat)
        )
        return newCategories.length ? [...prev, ...newCategories] : prev
      })
    }
  }, [currentCategory, getCategoriesToExpand])

  const getCategoryMarginLeft = useCallback(
    (category: HttpTypes.StoreProductCategory) => {
      let level = 0
      let currentCategory = category
      while (currentCategory.parent_category_id) {
        level++
        currentCategory = categories.find(
          (cat) => cat.id === currentCategory.parent_category_id
        ) as HttpTypes.StoreProductCategory
      }
      return level * 16
    },
    [categories]
  )

  const renderCategory = (category: HttpTypes.StoreProductCategory) => {
    const hasChildren = category.category_children.length > 0
    const isExpanded = expandedCategories.includes(category.id)
    const paddingLeft = getCategoryMarginLeft(category)
    const isCurrent = isCurrentCategory(category.handle)

    return (
      <li key={category.id}>
        <div className="flex items-center gap-2 mb-2" style={{ paddingLeft: `${paddingLeft}px` }}>
          {hasChildren ? (
            <div className="flex items-center gap-2 w-full">
              <button 
                onClick={() => toggleCategory(category.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {isExpanded ? (
                  <SquareMinus className="h-3 w-3 text-gray-600" />
                ) : (
                  <SquarePlus className="h-3 w-3 text-gray-600" />
                )}
              </button>
              <LocalizedClientLink
                href={`/categories/${category.handle}${
                  searchParams.size ? `?${searchParams.toString()}` : ""
                }`}
                className={`flex-1 flex items-center justify-between py-1 transition-colors ${
                  isCurrent ? 'text-[#FF000F]' : 'text-gray-700 hover:text-[#FF000F]'
                }`}
              >
                <span className="!font-jxd-medium" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                  {category.name}
                </span>
                <span className="!font-jxd-light text-xs text-gray-500" style={{ fontFamily: 'JXD-Light, sans-serif' }}>
                  ({category.products?.length})
                </span>
              </LocalizedClientLink>
            </div>
          ) : (
            <LocalizedClientLink
              href={`/categories/${category.handle}${
                searchParams.size ? `?${searchParams.toString()}` : ""
              }`}
              className={`flex items-center gap-2 w-full py-1 transition-colors ${
                isCurrent ? 'text-[#FF000F]' : 'text-gray-700 hover:text-[#FF000F]'
              }`}
            >
              <Radio checked={isCurrent} />
              <div className="flex-1 flex items-center justify-between">
                <span className="!font-jxd-medium" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                  {category.name}
                </span>
                <span className="!font-jxd-light text-xs text-gray-500" style={{ fontFamily: 'JXD-Light, sans-serif' }}>
                  ({category.products?.length})
                </span>
              </div>
            </LocalizedClientLink>
          )}
        </div>
        {hasChildren && isExpanded && (
          <ul>
            {category.category_children
              .map((childId) => {
                const childCategory = categories.find(
                  (cat) => cat.id === childId.id
                )
                return childCategory
              })
              .filter(Boolean)
              .sort((a, b) => {
                const rankA = a!.rank !== undefined && a!.rank !== null ? a!.rank : 999999;
                const rankB = b!.rank !== undefined && b!.rank !== null ? b!.rank : 999999;
                
                if (rankA !== rankB) {
                  return rankA - rankB;
                }
                
                return new Date(a!.created_at || 0).getTime() - new Date(b!.created_at || 0).getTime();
              })
              .map((childCategory) => renderCategory(childCategory!))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <Container className="flex flex-col p-0 divide-y divide-neutral-200">
      <div className="flex justify-between items-center p-3">
        <Text className="!font-jxd-bold text-gray-800" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>Categories</Text>
        {pathname.includes("/categories") && (
          <LocalizedClientLink
            href="/store"
            className="text-xs !font-jxd-regular text-[#FF000F] hover:text-[#CC0000]"
            style={{ fontFamily: 'JXD-Regular, sans-serif' }}
          >
            Clear
          </LocalizedClientLink>
        )}
      </div>
      <ul className="flex flex-col gap-1 text-sm p-3">
        {categories
          .filter((cat) => cat.parent_category_id === null)
          .sort((a, b) => {
            const rankA = a.rank !== undefined && a.rank !== null ? a.rank : 999999;
            const rankB = b.rank !== undefined && b.rank !== null ? b.rank : 999999;
            
            if (rankA !== rankB) {
              return rankA - rankB;
            }
            
            return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
          })
          .map(renderCategory)}
      </ul>
    </Container>
  )
}

export default CategoryList
