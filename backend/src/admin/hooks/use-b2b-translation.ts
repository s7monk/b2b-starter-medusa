import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

// 页面标题的即时翻译映射，避免显示翻译键
const PAGE_TITLE_TRANSLATIONS: Record<string, Record<string, string>> = {
  'en': {
    'routes.quotes.title': 'Quotes',
    'routes.companies.title': 'Companies',
    'routes.approvals.title': 'Approvals',
  },
  'zh': {
    'routes.quotes.title': '报价',
    'routes.companies.title': '公司',
    'routes.approvals.title': '审批',
  },
  'zhCN': {
    'routes.quotes.title': '报价',
    'routes.companies.title': '公司', 
    'routes.approvals.title': '审批',
  },
  'ja': {
    'routes.quotes.title': '見積もり',
    'routes.companies.title': '会社',
    'routes.approvals.title': '承認',
  },
  'ko': {
    'routes.quotes.title': '견적서',
    'routes.companies.title': '회사',
    'routes.approvals.title': '승인',
  }
}

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

/**
 * 专门用于页面标题的翻译hook，提供即时翻译避免显示翻译键
 */
export const usePageTitleTranslation = () => {
  const { t: originalT, i18n } = useTranslation()
  
  const t = (key: string, options?: any) => {
    // 获取当前语言
    const currentLang = i18n.language || 'en'
    
    // 首先尝试获取即时翻译（包括英文）
    let quickTranslation = PAGE_TITLE_TRANSLATIONS[currentLang]?.[key]
    
    // 如果当前语言没有找到，尝试相关语言
    if (!quickTranslation && currentLang.startsWith('zh')) {
      quickTranslation = PAGE_TITLE_TRANSLATIONS['zh']?.[key] || PAGE_TITLE_TRANSLATIONS['zhCN']?.[key]
    }
    
    // 如果还是没找到，使用英文作为基础回退
    if (!quickTranslation) {
      quickTranslation = PAGE_TITLE_TRANSLATIONS['en']?.[key]
    }
    
    // 如果i18next已初始化且有资源，尝试获取正式翻译
    if (i18n.isInitialized && i18n.hasResourceBundle(currentLang, 'b2b')) {
      const b2bKey = `b2b:${key}`
      const b2bTranslation = originalT(b2bKey, { ...options, defaultValue: null })
      if (b2bTranslation !== b2bKey && b2bTranslation !== null) {
        return b2bTranslation
      }
      
      // 尝试原始翻译
      const fallbackTranslation = originalT(key, options)
      if (fallbackTranslation !== key) {
        return fallbackTranslation
      }
    }
    
    // 如果有即时翻译，返回它
    if (quickTranslation) {
      return quickTranslation
    }
    
    // 最后的回退：从翻译键推导出友好的文本
    if (key.includes('.')) {
      const parts = key.split('.')
      const lastPart = parts[parts.length - 1]
      
      return lastPart
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim()
    }
    
    return key
  }
  
  return { t }
} 