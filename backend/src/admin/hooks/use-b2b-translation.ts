import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

export const useB2BTranslation = () => {
  const { t: originalT, i18n, ...rest } = useTranslation()
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    // 检查i18next是否已初始化并且资源已加载
    const checkReady = () => {
      if (i18n.isInitialized && i18n.hasResourceBundle(i18n.language, 'b2b')) {
        setIsReady(true)
      } else {
        // 如果还没准备好，稍后再检查
        setTimeout(checkReady, 100)
      }
    }
    
    checkReady()
    
    // 监听初始化完成事件
    const handleInitialized = () => {
      setIsReady(true)
    }
    
    i18n.on('initialized', handleInitialized)
    i18n.on('loaded', handleInitialized)
    i18n.on('languageChanged', handleInitialized)
    
    return () => {
      i18n.off('initialized', handleInitialized)
      i18n.off('loaded', handleInitialized)
      i18n.off('languageChanged', handleInitialized)
    }
  }, [i18n])
  
  const t = (key: string, options?: any) => {
    // 如果i18next还没有初始化，返回key作为回退
    if (!i18n.isInitialized) {
      return key
    }
    
    // 首先尝试使用 b2b namespace 的翻译
    const b2bKey = `b2b:${key}`
    const b2bTranslation = originalT(b2bKey, { ...options, defaultValue: null })
    
    // 如果 b2b namespace 中没有找到翻译，则使用原始的翻译
    if (b2bTranslation !== b2bKey && b2bTranslation !== null) {
      return b2bTranslation
    }
    
    // 最后尝试直接使用key（这会使用medusa的默认翻译）
    const fallbackTranslation = originalT(key, options)
    
    // 如果仍然返回key，且不是ready状态，可能需要等待
    if (fallbackTranslation === key && !isReady) {
      // 返回一个更友好的占位符而不是翻译键
      return key.split('.').pop() || key
    }
    
    return fallbackTranslation
  }

  return { t, isReady, ...rest }
} 