/**
 * ANSI 转换工具库
 * 提供 ANSI 转义序列的解析和转换功能
 */

// ANSI颜色代码映射表
export const ANSI_COLORS: Record<string, string> = {
  // 标准颜色 (30-37, 40-47)
  '30': '#000000', '40': '#000000', // 黑色
  '31': '#cd0000', '41': '#cd0000', // 红色
  '32': '#00cd00', '42': '#00cd00', // 绿色
  '33': '#cdcd00', '43': '#cdcd00', // 黄色
  '34': '#0000ee', '44': '#0000ee', // 蓝色
  '35': '#cd00cd', '45': '#cd00cd', // 洋红
  '36': '#00cdcd', '46': '#00cdcd', // 青色
  '37': '#e5e5e5', '47': '#e5e5e5', // 白色
  
  // 亮色 (90-97, 100-107)
  '90': '#7f7f7f', '100': '#7f7f7f', // 亮黑色(灰色)
  '91': '#ff0000', '101': '#ff0000', // 亮红色
  '92': '#00ff00', '102': '#00ff00', // 亮绿色
  '93': '#ffff00', '103': '#ffff00', // 亮黄色
  '94': '#5c5cff', '104': '#5c5cff', // 亮蓝色
  '95': '#ff00ff', '105': '#ff00ff', // 亮洋红
  '96': '#00ffff', '106': '#00ffff', // 亮青色
  '97': '#ffffff', '107': '#ffffff', // 亮白色
}



/**
 * 转义HTML字符，防止XSS攻击
 * @param str 需要转义的字符串
 * @returns 转义后的字符串
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}



/**
 * ANSI转HTML解析器
 * 将包含ANSI转义序列的文本转换为HTML格式
 * @param text 包含ANSI转义序列的文本
 * @returns 转换后的HTML字符串
 */
export function parseAnsiToHtml(text: string): string {
  let result = escapeHtml(text)
  let openTags: string[] = []

  // 处理ANSI转义序列
  result = result.replace(/\x1b\[(\d+(;\d+)*)m/g, (_, codes) => {
    const codeList = codes.split(';').map((c: string) => parseInt(c))
    let html = ''

    for (const code of codeList) {
      if (code === 0) {
        // 重置所有样式
        html += openTags.reverse().map(() => '</span>').join('')
        openTags = []
      } else if (code === 1) {
        // 粗体
        html += '<span style="font-weight: bold;">'
        openTags.push('bold')
      } else if (code === 4) {
        // 下划线
        html += '<span style="text-decoration: underline;">'
        openTags.push('underline')
      } else if (code >= 30 && code <= 37) {
        // 前景色
        const color = ANSI_COLORS[code.toString()]
        if (color) {
          html += `<span style="color: ${color};">`
          openTags.push('fg')
        }
      } else if (code >= 40 && code <= 47) {
        // 背景色
        const color = ANSI_COLORS[code.toString()]
        if (color) {
          html += `<span style="background-color: ${color};">`
          openTags.push('bg')
        }
      } else if (code >= 90 && code <= 97) {
        // 亮前景色
        const color = ANSI_COLORS[code.toString()]
        if (color) {
          html += `<span style="color: ${color};">`
          openTags.push('fg')
        }
      } else if (code >= 100 && code <= 107) {
        // 亮背景色
        const color = ANSI_COLORS[code.toString()]
        if (color) {
          html += `<span style="background-color: ${color};">`
          openTags.push('bg')
        }
      }
    }

    return html
  })

  // 关闭所有未关闭的标签
  result += openTags.reverse().map(() => '</span>').join('')

  // 处理换行
  result = result.replace(/\n/g, '<br>')

  return result
}

/**
 * ANSI转纯文本解析器（去除所有ANSI转义序列）
 * 移除文本中的所有ANSI控制符，返回纯文本
 * @param text 包含ANSI转义序列的文本
 * @returns 去除ANSI控制符后的纯文本
 */
export function parseAnsiToPlainText(text: string): string {
  // 去除所有ANSI转义序列的正则表达式
  // 这个正则表达式匹配所有常见的ANSI转义序列：
  // - \x1b[ 或 \u001b[ (ESC序列开始)
  // - 后跟数字、分号、字母等字符
  // - 直到遇到字母结束符 (如 m, H, J, K, A, B, C, D 等)
  const ansiRegex = /\x1b\[[0-9;]*[a-zA-Z]/g
  
  // 也处理其他格式的转义序列
  const ansiRegexAlt = /\u001b\[[0-9;]*[a-zA-Z]/g
  
  let result = text
  
  // 移除所有ANSI转义序列
  result = result.replace(ansiRegex, '')
  result = result.replace(ansiRegexAlt, '')
  
  // 处理八进制格式的转义序列 (\033)
  // 先将八进制格式转换为十六进制格式，然后移除
  result = result.replace(/\\033\[/g, '\x1b[')
  result = result.replace(ansiRegex, '')
  
  // 移除其他控制字符（可选）
  // 移除退格符、回车符等可能影响显示的控制字符
  result = result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  
  return result
}




