import { extendI18nResources } from "../i18n"
import i18next from "i18next"

/**
 * 获取当前语言
 */
const getCurrentLanguage = (): string => {
  if (typeof i18next !== 'undefined' && i18next.language) {
    return i18next.language
  }
  
  // 尝试从localStorage获取
  try {
    const stored = localStorage.getItem('i18nextLng')
    if (stored) return stored
  } catch (e) {
    // 静默处理
  }
  
  return 'en' // 默认语言
}

/**
 * 使用i18next动态获取翻译
 */
const getMenuTranslation = (originalText: string): string => {
  if (typeof i18next === 'undefined' || !i18next.isInitialized) {
    // 如果i18next还没初始化，使用本地翻译映射作为后备
    const currentLang = getCurrentLanguage()
    const localTranslations: Record<string, Record<string, string>> = {
      'zh': {
        'Companies': '公司',
        'Quotes': '报价', 
        'Approvals': '审批'
      },
      'zhCN': {
        'Companies': '公司',
        'Quotes': '报价',
        'Approvals': '审批'
      }
    }
    
    if (localTranslations[currentLang] && localTranslations[currentLang][originalText]) {
      return localTranslations[currentLang][originalText]
    }
    return originalText
  }

  // 菜单项到翻译键的映射
  const menuKeyMap: Record<string, string> = {
    'Companies': 'b2b:nav.companies',
    'Quotes': 'b2b:nav.quotes',
    'Approvals': 'b2b:nav.approvals'
  }

  const translationKey = menuKeyMap[originalText]
  if (translationKey) {
    const translation = i18next.t(translationKey, { defaultValue: originalText })
    return translation !== translationKey ? translation : originalText
  }

  return originalText
}

/**
 * 使用i18next动态获取页面标题翻译
 */
const getPageTitleTranslation = (originalText: string): string => {
  if (typeof i18next === 'undefined' || !i18next.isInitialized) {
    return originalText
  }

  // 检查是否是翻译键
  if (originalText.startsWith('routes.')) {
    const translationKey = `b2b:${originalText}`
    const translation = i18next.t(translationKey, { defaultValue: originalText })
    return translation !== translationKey ? translation : originalText
  }

  return originalText
}

/**
 * 更新DOM中的菜单标签和页面标题
 */
const updateMenuLabels = () => {
  // 更精确的菜单项选择器
  const menuSelectors = [
    'nav a[href^="/"]',
    'nav button',
    'aside a[href^="/"]', 
    'aside button',
    '[role="navigation"] a',
    '[role="navigation"] button',
    '.sidebar a',
    '.sidebar button',
    '.navigation a',
    '.navigation button'
  ]
  
  menuSelectors.forEach(selector => {
    const menuItems = document.querySelectorAll(selector)
    
    menuItems.forEach((item) => {
      // 查找文本元素（span, p, 或直接文本内容）
      const textElement = item.querySelector('span, p') || item
      if (textElement && textElement.textContent) {
        const currentText = textElement.textContent.trim()
        if (currentText && (currentText === 'Companies' || currentText === 'Quotes' || currentText === 'Approvals')) {
          const translatedText = getMenuTranslation(currentText)
          if (translatedText !== currentText) {
            textElement.textContent = translatedText
          }
        }
      }
    })
  })
  
  // 更新页面标题
  updatePageTitles()
}

/**
 * 更新页面标题
 */
const updatePageTitles = () => {
  // 查找页面标题元素 - 通常是 Heading 组件或 h1, h2 等标签
  const titleSelectors = [
    'h1', 'h2', 'h3', 
    '[class*="h1-core"]', 
    '[class*="heading"]',
    '.heading',
    '[data-testid*="heading"]',
    '[role="heading"]'
  ]
  
  titleSelectors.forEach(selector => {
    const titleElements = document.querySelectorAll(`main ${selector}, article ${selector}, section ${selector}, .container ${selector}`)
    
    titleElements.forEach((element) => {
      const currentText = element.textContent?.trim()
      if (currentText && currentText.startsWith('routes.')) {
        const translatedText = getPageTitleTranslation(currentText)
        if (translatedText !== currentText) {
          element.textContent = translatedText
        }
      }
    })
  })
}

/**
 * 设置全局菜单更新器
 */
const setupGlobalMenuUpdater = () => {
  // 立即更新多次，确保快速生效
  updateMenuLabels()
  setTimeout(updateMenuLabels, 10)
  setTimeout(updateMenuLabels, 50)
  setTimeout(updateMenuLabels, 100)
  
  // 监听i18next语言变化事件
  if (typeof i18next !== 'undefined') {
    const handleLanguageChange = () => {
      updateMenuLabels() // 立即更新
      setTimeout(updateMenuLabels, 10)
      setTimeout(updateMenuLabels, 50)
      setTimeout(updateMenuLabels, 100)
    }
    
    i18next.on('languageChanged', handleLanguageChange)
  }
  
  // 监听localStorage变化（手动切换语言时的后备方案）
  window.addEventListener('storage', (e) => {
    if (e.key === 'i18nextLng') {
      updateMenuLabels()
      setTimeout(updateMenuLabels, 10)
      setTimeout(updateMenuLabels, 50)
    }
  })
  
  // 监听路由变化
  let lastUrl = location.href
  
  // 监听DOM变化
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false
    
    // 检查URL变化
    const currentUrl = location.href
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl
      shouldUpdate = true
    }
    
    // 检查菜单相关的DOM变化
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const target = mutation.target as Element
        if (target.tagName === 'NAV' || 
            target.closest('nav') || 
            target.querySelector('nav') ||
            target.classList?.contains('navigation') ||
            target.classList?.contains('sidebar') ||
            target.tagName === 'MAIN' ||
            target.closest('main') ||
            target.querySelector('main') ||
            target.classList?.contains('container')) {
          shouldUpdate = true
        }
        
        // 检查新添加的节点是否包含菜单项或标题
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const text = element.textContent?.trim()
            if (text && (text === 'Companies' || text === 'Quotes' || text === 'Approvals' ||
                        text.startsWith('routes.') ||
                        text.includes('公司') || text.includes('报价') || text.includes('审批') ||
                        text.includes('企業') || text.includes('見積もり') || text.includes('承認') ||
                        text.includes('Kompanije') || text.includes('Ponude') || text.includes('Odobravanja') ||
                        text.includes('Společnosti') || text.includes('Nabídky') || text.includes('Schválení') ||
                        text.includes('Unternehmen') || text.includes('Angebote') || text.includes('Genehmigungen') ||
                        text.includes('Empresas') || text.includes('Cotizaciones') || text.includes('Aprobaciones') ||
                        text.includes('Entreprises') || text.includes('Devis') || text.includes('Approbations') ||
                        text.includes('Aziende') || text.includes('Preventivi') || text.includes('Approvazioni') ||
                        text.includes('Įmonės') || text.includes('Pasiūlymai') || text.includes('Patvirtinimai') ||
                        text.includes('Vállalatok') || text.includes('Ajánlatok') || text.includes('Jóváhagyások') ||
                        text.includes('Bedrijven') || text.includes('Offertes') || text.includes('Goedkeuringen') ||
                        text.includes('Firmy') || text.includes('Oferty') || text.includes('Zatwierdzenia') ||
                        text.includes('Cotações') || text.includes('Aprovações') ||
                        text.includes('Companii') || text.includes('Oferte') || text.includes('Aprobări') ||
                        text.includes('Công ty') || text.includes('Báo giá') || text.includes('Phê duyệt') ||
                        text.includes('Şirketler') || text.includes('Teklifler') || text.includes('Onaylar') ||
                        text.includes('Εταιρείες') || text.includes('Προσφορές') || text.includes('Εγκρίσεις') ||
                        text.includes('Компании') || text.includes('Оферти') || text.includes('Одобрения') ||
                        text.includes('Понуди') || text.includes('Одобрувања') ||
                        text.includes('Компаниуд') || text.includes('Үнийн санал') || text.includes('Зөвшөөрөл') ||
                        text.includes('Предложения') || text.includes('Одобрения') ||
                        text.includes('Компанії') || text.includes('Пропозиції') || text.includes('Затвердження') ||
                        text.includes('الشركات') || text.includes('عروض الأسعار') || text.includes('الموافقات') ||
                        text.includes('شرکت‌ها') || text.includes('قیمت‌ها') || text.includes('تأییدیه‌ها') ||
                        text.includes('บริษัท') || text.includes('ใบเสนอราคา') || text.includes('การอนุมัติ') ||
                        text.includes('회사') || text.includes('견적서') || text.includes('승인'))) {
              shouldUpdate = true
            }
          }
        })
      }
    })
    
    if (shouldUpdate) {
      updateMenuLabels() // 立即更新
      setTimeout(updateMenuLabels, 1) // 1ms 极速更新
      setTimeout(updateMenuLabels, 10)
      setTimeout(updateMenuLabels, 50)
    }
  })
  
  // 观察整个文档
  observer.observe(document, { 
    subtree: true, 
    childList: true, 
    attributes: true,
    attributeFilter: ['class', 'style']
  })
  
  // 更频繁的定期更新作为后备方案
  setInterval(updateMenuLabels, 1000)
  
  // 监听点击事件，特别是菜单展开/折叠
  document.addEventListener('click', (e) => {
    const target = e.target as Element
    if (target.closest('nav') || 
        target.classList?.contains('expand') ||
        target.classList?.contains('collapse') ||
        target.closest('[role="button"]') ||
        target.closest('button') ||
        target.tagName === 'BUTTON') {
      updateMenuLabels() // 立即更新
      setTimeout(updateMenuLabels, 1)
      setTimeout(updateMenuLabels, 10)
      setTimeout(updateMenuLabels, 50)
      setTimeout(updateMenuLabels, 100)
    }
  })
  
  // 监听鼠标进入菜单区域
  document.addEventListener('mouseenter', (e) => {
    const target = e.target as Element
    if (target.closest('nav') || target.closest('aside') || target.closest('[role="navigation"]')) {
      updateMenuLabels()
      setTimeout(updateMenuLabels, 10)
    }
  }, true)
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
  // 立即执行初始化，不等待任何事件
  initB2BI18n()
  
  // 等待DOM加载完成和i18next初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initB2BI18n, 10) // 大幅减少延迟
    })
  } else {
    setTimeout(initB2BI18n, 10) // 大幅减少延迟
  }
  
  // 页面完全加载后再次执行
  window.addEventListener('load', () => {
    setTimeout(initB2BI18n, 10)
  })
} else {
  initB2BI18n()
} 