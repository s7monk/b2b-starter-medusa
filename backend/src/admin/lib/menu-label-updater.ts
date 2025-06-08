import { useEffect } from "react"
import { useTranslation } from "react-i18next"

// 菜单标签映射
const MENU_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    Companies: "Companies",
    Quotes: "Quotes", 
    Approvals: "Approvals"
  },
  zh: {
    Companies: "公司",
    Quotes: "报价",
    Approvals: "审批"
  },
  zhCN: {
    Companies: "公司", 
    Quotes: "报价",
    Approvals: "审批"
  }
}

/**
 * 更新DOM中的菜单标签
 */
const updateMenuLabels = (language: string) => {
  const translations = MENU_TRANSLATIONS[language] || MENU_TRANSLATIONS.en
  
  // 查找扩展菜单项并更新标签
  setTimeout(() => {
    const menuItems = document.querySelectorAll('nav a[href^="/"], nav button')
    
    menuItems.forEach((item) => {
      const textElement = item.querySelector('span, p')
      if (textElement) {
        const currentText = textElement.textContent?.trim()
        if (currentText && translations[currentText]) {
          textElement.textContent = translations[currentText]
        }
      }
    })
  }, 100)
}

/**
 * 菜单标签更新Hook
 */
export const useMenuLabelUpdater = () => {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    // 初始更新
    updateMenuLabels(i18n.language)
    
    // 监听语言变化
    const handleLanguageChange = (lng: string) => {
      updateMenuLabels(lng)
    }
    
    i18n.on('languageChanged', handleLanguageChange)
    
    // 监听DOM变化（当菜单重新渲染时）
    const observer = new MutationObserver(() => {
      updateMenuLabels(i18n.language)
    })
    
    // 观察侧边栏变化
    const sidebar = document.querySelector('aside')
    if (sidebar) {
      observer.observe(sidebar, {
        childList: true,
        subtree: true
      })
    }
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
      observer.disconnect()
    }
  }, [i18n])
} 