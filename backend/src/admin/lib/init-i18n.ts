import { extendI18nResources } from "../i18n"

// 在应用启动时初始化B2B翻译
export const initB2BI18n = () => {
  try {
    extendI18nResources()
    console.log("B2B translations loaded successfully")
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