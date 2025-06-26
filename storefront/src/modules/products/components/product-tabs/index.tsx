"use client"

import { HttpTypes } from "@medusajs/types"
import { Text, Table } from "@medusajs/ui"
import Markdown from "react-markdown"
import { useState } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("Description")
  
  const tabs = [
    {
      label: "Description",
      component: <ProductSpecsTab product={product} />,
    },
    {
      label: "Specifications",
      component: <ProductSpecificationsTab product={product} />,
    },
  ]

  return (
    <div className="w-full">
      {/* 标签页导航 */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`py-4 px-2 relative transition-colors duration-200 ${
                activeTab === tab.label
                  ? "text-[#0F0F0F] font-jxd-bold"
                  : "text-gray-500 font-jxd hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.label && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF000F]"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* 标签页内容 */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {tabs.find(tab => tab.label === activeTab)?.component}
      </div>
    </div>
  )
}

const ProductSpecsTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <Markdown
        components={{
          p: ({ children }) => (
            <Text className="text-[#0F0F0F] font-jxd mb-4 leading-relaxed text-base">
              {children}
            </Text>
          ),
          h2: ({ children }) => (
            <Text className="text-xl font-jxd-bold text-[#0F0F0F] my-6 first:mt-0">
              {children}
            </Text>
          ),
          h3: ({ children }) => (
            <Text className="text-lg font-jxd-bold text-[#0F0F0F] mb-4 mt-6">
              {children}
            </Text>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="text-[#0F0F0F] font-jxd">
              {children}
            </li>
          ),
        }}
      >
        {product.description || "No description available for this product."}
      </Markdown>
    </div>
  )
}

const ProductSpecificationsTab = ({ product }: ProductTabsProps) => {
  const hasSpecs = product.weight || product.height || product.width || product.length || 
                   (product.metadata && Object.keys(product.metadata).length > 0)
  
  if (!hasSpecs) {
    return (
      <Text className="text-gray-500 font-jxd italic">
        No specifications available for this product.
      </Text>
    )
  }

  return (
    <div>
      <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <Table.Body>
          {product.weight && (
            <Table.Row className="border-b border-gray-100 last:border-b-0">
              <Table.Cell className="bg-gray-50 border-r border-gray-200 px-6 py-4 w-1/3">
                <Text className="font-jxd-bold text-[#0F0F0F]">Weight</Text>
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <Text className="font-jxd text-[#0F0F0F]">{product.weight} grams</Text>
              </Table.Cell>
            </Table.Row>
          )}
          
          {(product.height || product.width || product.length) && (
            <Table.Row className="border-b border-gray-100 last:border-b-0">
              <Table.Cell className="bg-gray-50 border-r border-gray-200 px-6 py-4 w-1/3">
                <Text className="font-jxd-bold text-[#0F0F0F]">Dimensions (H×W×L)</Text>
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <Text className="font-jxd text-[#0F0F0F]">
                  {product.height}mm × {product.width}mm × {product.length}mm
                </Text>
              </Table.Cell>
            </Table.Row>
          )}

          {product.metadata &&
            Object.entries(product.metadata).map(([key, value]) => (
              <Table.Row key={key} className="border-b border-gray-100 last:border-b-0">
                <Table.Cell className="bg-gray-50 border-r border-gray-200 px-6 py-4 w-1/3">
                  <Text className="font-jxd-bold text-[#0F0F0F] capitalize">
                    {key.replace(/_/g, ' ')}
                  </Text>
                </Table.Cell>
                <Table.Cell className="px-6 py-4">
                  <Text className="font-jxd text-[#0F0F0F]">{value as string}</Text>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ProductTabs
