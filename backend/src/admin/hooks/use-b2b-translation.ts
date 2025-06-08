import { useTranslation } from "react-i18next"

export const useB2BTranslation = () => {
  const { t: originalT, ...rest } = useTranslation()
  
  const t = (key: string, options?: any) => {
    // 首先尝试使用 b2b namespace 的翻译
    const b2bKey = `b2b:${key}`
    const b2bTranslation = originalT(b2bKey, { ...options, defaultValue: null })
    
    // 如果 b2b namespace 中没有找到翻译，则使用原始的翻译
    if (b2bTranslation !== b2bKey) {
      return b2bTranslation
    }
    
    // 最后尝试直接使用key（这会使用medusa的默认翻译）
    return originalT(key, options)
  }

  return { t, ...rest }
} 