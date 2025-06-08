import i18next from "i18next"
import translations from "./translations"

// 扩展现有的翻译资源
const extendI18nResources = () => {
  Object.entries(translations).forEach(([lang, resources]) => {
    // 添加b2b命名空间的翻译（用于菜单）
    i18next.addResourceBundle(lang, "b2b", resources.b2b, true, true)
    
    // 添加页面内容翻译到默认命名空间
    const { b2b, ...contentTranslations } = resources
    i18next.addResourceBundle(lang, "translation", contentTranslations, true, true)
  })
}

export { extendI18nResources }
export { useB2BTranslation } from "../hooks/use-b2b-translation" 