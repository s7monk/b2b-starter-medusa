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
const updateMenuLabels = (language?: string) => {
  // 如果没有传入语言，获取当前语言
  const currentLang = language || getCurrentLanguage()
  const translations = MENU_TRANSLATIONS[currentLang] || MENU_TRANSLATIONS.en
  
  console.log('Updating menu labels to language:', currentLang)
  
  // 立即更新，不使用setTimeout
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
  
  // 也检查直接包含文本的菜单项
  const allMenuElements = document.querySelectorAll('nav span, nav p, nav a')
  allMenuElements.forEach((element) => {
    const currentText = element.textContent?.trim()
    if (currentText && translations[currentText] && currentText !== translations[currentText]) {
      element.textContent = translations[currentText]
    }
  })
}

/**
 * 获取当前语言
 */
const getCurrentLanguage = () => {
  // 尝试从i18next实例获取当前语言
  if (typeof window !== 'undefined' && (window as any).i18next) {
    return (window as any).i18next.language || 'en'
  }
  return 'en'
}

/**
 * 设置全局菜单更新器
 */
const setupGlobalMenuUpdater = () => {
  // 立即更新一次，使用当前语言
  updateMenuLabels(getCurrentLanguage())
  
  // 监听语言变化 - 这是关键！
  if (typeof window !== 'undefined' && (window as any).i18next) {
    (window as any).i18next.on('languageChanged', (lng: string) => {
      console.log('Global menu updater: Language changed to', lng)
      updateMenuLabels(lng)
      // 多次尝试确保更新成功
      setTimeout(() => updateMenuLabels(lng), 50)
      setTimeout(() => updateMenuLabels(lng), 200)
    })
  }
  
  // 监听路由变化
  let lastUrl = location.href
  
  // 更精确的MutationObserver，特别关注菜单区域的变化
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false
    
    // 检查URL变化
    const currentUrl = location.href
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl
      shouldUpdate = true
    }
    
    // 检查是否有菜单相关的DOM变化
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // 检查是否是导航菜单区域的变化
        const target = mutation.target as Element
        if (target.tagName === 'NAV' || 
            target.closest('nav') || 
            target.querySelector('nav') ||
            target.classList?.contains('navigation') ||
            target.classList?.contains('sidebar')) {
          shouldUpdate = true
        }
        
        // 检查新添加的节点是否包含我们关心的菜单项
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const text = element.textContent?.trim()
            if (text && (text === 'Companies' || text === 'Quotes' || text === 'Approvals')) {
              shouldUpdate = true
            }
          }
        })
      }
    })
    
    if (shouldUpdate) {
      // 立即更新
      updateMenuLabels()
      // 再延迟一点点再次更新，确保DOM完全渲染
      setTimeout(updateMenuLabels, 10)
    }
  })
  
  // 观察整个文档的变化，但重点关注子树和属性变化
  observer.observe(document, { 
    subtree: true, 
    childList: true, 
    attributes: true,
    attributeFilter: ['class', 'style'] // 监听样式变化（比如展开/折叠）
  })
  
  // 更频繁的定期更新（作为后备方案）
  setInterval(updateMenuLabels, 500)
  
  // 监听点击事件，特别是可能导致菜单展开/折叠的点击
  document.addEventListener('click', (e) => {
    const target = e.target as Element
    // 如果点击的是菜单相关元素，延迟一点更新
    if (target.closest('nav') || 
        target.classList?.contains('expand') ||
        target.classList?.contains('collapse') ||
        target.closest('[role="button"]')) {
      setTimeout(updateMenuLabels, 50)
      setTimeout(updateMenuLabels, 150)
    }
  })
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
  // 等待i18next初始化完成后再执行
  const waitForI18next = () => {
    if ((window as any).i18next && (window as any).i18next.isInitialized) {
      initB2BI18n()
    } else {
      setTimeout(waitForI18next, 100)
    }
  }
  
  // 延迟执行，确保medusa的i18next已经初始化
  setTimeout(waitForI18next, 200)
} else {
  // 在服务器环境中立即执行
  initB2BI18n()
} 