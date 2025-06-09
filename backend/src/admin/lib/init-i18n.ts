import { extendI18nResources } from "../i18n"

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
const updateMenuLabels = (language: string = 'zh') => {
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
 * 设置全局菜单更新器
 */
const setupGlobalMenuUpdater = () => {
  // 立即更新一次
  updateMenuLabels()
  
  // 监听路由变化
  let lastUrl = location.href
  new MutationObserver(() => {
    const url = location.href
    if (url !== lastUrl) {
      lastUrl = url
      // 路由变化时更新菜单
      updateMenuLabels()
    }
  }).observe(document, { subtree: true, childList: true })
  
  // 定期更新（作为后备方案）
  setInterval(updateMenuLabels, 2000)
}

// 在应用启动时初始化B2B翻译
export const initB2BI18n = () => {
  try {
    extendI18nResources()
    console.log("B2B translations loaded successfully")
    
    // 设置全局菜单更新器
    if (typeof window !== "undefined") {
      setupGlobalMenuUpdater()
    }
  } catch (error) {
    console.error("Failed to load B2B translations:", error)
  }
}

// 自动执行初始化
if (typeof window !== "undefined") {
  // 在浏览器环境中延迟执行
  setTimeout(initB2BI18n, 100)
} else {
  // 在服务器环境中立即执行
  initB2BI18n()
} 