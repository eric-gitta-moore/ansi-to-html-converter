/**
 * 示例数据模块
 * 提供各种转换模式的示例数据
 */

// ANSI示例数据（用于ANSI → HTML 和 ANSI → 纯文本转换）
export const SAMPLE_OUTPUTS = [
  {
    name: '彩色日志输出',
    content: '\x1b[32m[INFO]\x1b[0m Server started successfully\n\x1b[33m[WARN]\x1b[0m Configuration file not found\n\x1b[31m[ERROR]\x1b[0m Database connection failed\n\x1b[36m[DEBUG]\x1b[0m Processing request...'
  },
  {
    name: 'Git状态输出',
    content: '\x1b[31mmodified:\x1b[0m   src/App.tsx\n\x1b[32mnew file:\x1b[0m   README.md\n\x1b[33mdeleted:\x1b[0m    old-file.js'
  },
  {
    name: 'npm安装输出',
    content: '\x1b[32m+ react@18.2.0\x1b[0m\n\x1b[33m+ typescript@4.9.5\x1b[0m\n\x1b[36minstalled 245 packages\x1b[0m'
  },
  {
    name: '测试结果输出',
    content: '\x1b[32m✓\x1b[0m should render correctly\n\x1b[32m✓\x1b[0m should handle user input\n\x1b[31m✗\x1b[0m should validate form\n\x1b[1m\x1b[32m2 passing\x1b[0m\n\x1b[1m\x1b[31m1 failing\x1b[0m'
  }
]



// 转换模式类型定义
export type ConversionMode = 'ansi-to-html' | 'ansi-to-plain'

// 转换模式配置
export const CONVERSION_MODE_CONFIG = {
  'ansi-to-html': {
    title: 'ANSI → HTML',
    description: '将带有ANSI颜色控制符的shell输出转换为彩色HTML显示',
    inputPlaceholder: "在这里粘贴你的shell输出...\n\n例如：\n\x1b[32m[INFO]\x1b[0m 服务器启动成功\n\x1b[31m[ERROR]\x1b[0m 连接失败",
    inputDescription: '粘贴包含ANSI颜色控制符的shell输出',
    outputDescription: '转换后的HTML预览和代码',
    outputTabLabel: 'HTML代码',
    copyLabel: 'HTML代码',
    sampleData: SAMPLE_OUTPUTS
  },

  'ansi-to-plain': {
    title: 'ANSI → 纯文本',
    description: '去除ANSI颜色控制符，转换为纯文本',
    inputPlaceholder: "在这里粘贴包含ANSI控制符的文本...\n\n例如：\n\x1b[32m[INFO]\x1b[0m 服务器启动成功\n\x1b[31m[ERROR]\x1b[0m 连接失败\n\n转换后将去除所有颜色控制符",
    inputDescription: '粘贴包含ANSI颜色控制符的文本',
    outputDescription: '去除颜色控制符后的纯文本',
    outputTabLabel: '纯文本代码',
    copyLabel: '纯文本',
    sampleData: SAMPLE_OUTPUTS
  }
}

// 获取转换模式配置
export function getConversionModeConfig(mode: ConversionMode) {
  return CONVERSION_MODE_CONFIG[mode]
}

// 获取下一个转换模式（用于循环切换）
export function getNextConversionMode(currentMode: ConversionMode): ConversionMode {
  switch (currentMode) {
    case 'ansi-to-html':
      return 'ansi-to-plain'
    case 'ansi-to-plain':
      return 'ansi-to-html'
    default:
      return 'ansi-to-html'
  }
}
