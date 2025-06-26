import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { listCategories } from "@/lib/data/categories"
import { HttpTypes } from "@medusajs/types"

type ProductBreadcrumbProps = {
  product: HttpTypes.StoreProduct
}

const ProductBreadcrumbItem = ({
  title,
  href,
  isLast = false,
}: {
  title: string
  href?: string
  isLast?: boolean
}) => {
  const content = (
    <span className={`font-jxd text-sm transition-colors duration-200 ${
      isLast 
        ? "text-[#0F0F0F] font-jxd-medium" 
        : "text-gray-600 hover:text-[#FF000F]"
    }`}>
      {title}
    </span>
  )

  if (href && !isLast) {
    return (
      <LocalizedClientLink href={href}>
        {content}
      </LocalizedClientLink>
    )
  }

  return content
}

const ProductBreadcrumb = async ({ product }: ProductBreadcrumbProps) => {
  // 获取产品的第一个类别
  const primaryCategory = product.categories?.[0]
  const primaryCollection = product.collections?.[0]
  
  // 调试日志 - 在开发环境中打印产品分类信息
  if (process.env.NODE_ENV === 'development') {
    console.log('Product categories:', product.categories)
    console.log('Primary category:', primaryCategory)
    console.log('Product collections:', product.collections)
  }
  
  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/store" },
  ]
  
  // 构建分类层级
  if (primaryCategory) {
    try {
      // 获取所有分类数据以构建完整路径
      const allCategories = await listCategories()
      
      // 构建分类层级路径
      const categoryPath: HttpTypes.StoreProductCategory[] = []
      let currentCategory: HttpTypes.StoreProductCategory | undefined = primaryCategory
      
      // 从当前分类开始，向上遍历到根分类
      while (currentCategory) {
        categoryPath.unshift(currentCategory)
        
        // 查找父分类
        if (currentCategory.parent_category_id) {
          currentCategory = allCategories.find(
            cat => cat.id === currentCategory!.parent_category_id
          )
        } else {
          currentCategory = undefined
        }
      }
      
      // 调试日志
      if (process.env.NODE_ENV === 'development') {
        console.log('Category path:', categoryPath)
      }
      
      // 如果成功构建了路径，添加每个分类层级到面包屑
      if (categoryPath.length > 0) {
        categoryPath.forEach(category => {
          breadcrumbItems.push({
            title: category.name,
            href: `/categories/${category.handle}`,
          })
        })
      } else {
        // 备用方案：直接添加当前分类
        breadcrumbItems.push({
          title: primaryCategory.name,
          href: `/categories/${primaryCategory.handle}`,
        })
      }
    } catch (error) {
      // 如果获取分类失败，仍然显示当前分类
      console.error('Failed to load categories for breadcrumb:', error)
      breadcrumbItems.push({
        title: primaryCategory.name,
        href: `/categories/${primaryCategory.handle}`,
      })
    }
  } else if (primaryCollection) {
    // 如果没有分类但有集合，添加集合链接
    breadcrumbItems.push({
      title: primaryCollection.title,
      href: `/collections/${primaryCollection.handle}`,
    })
  } else {
    // 如果既没有分类也没有集合，显示通用分类
    if (process.env.NODE_ENV === 'development') {
      console.warn('Product has no categories or collections:', product.title)
    }
  }
  
  // 添加当前产品（不可点击）
  breadcrumbItems.push({
    title: product.title,
    href: undefined,
  })

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="content-container py-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className="text-gray-400 mx-3 font-jxd text-sm">
                    &gt;
                  </span>
                )}
                <ProductBreadcrumbItem
                  title={item.title}
                  href={item.href}
                  isLast={index === breadcrumbItems.length - 1}
                />
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default ProductBreadcrumb 