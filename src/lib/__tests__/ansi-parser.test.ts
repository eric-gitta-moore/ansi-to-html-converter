/**
 * ANSI解析器测试文件
 * 测试所有ANSI转换功能
 */

import { describe, it, expect } from 'vitest'
import {
  parseAnsiToHtml,
  parseAnsiToPlainText,
  escapeHtml,
  ANSI_COLORS
} from '../ansi-parser'

describe('ANSI Parser', () => {
  describe('escapeHtml', () => {
    it('应该正确转义HTML特殊字符', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;')
      expect(escapeHtml('Hello & World')).toBe('Hello &amp; World')
      expect(escapeHtml("It's a 'test'")).toBe('It&#39;s a &#39;test&#39;')
    })
  })



  describe('parseAnsiToHtml', () => {
    it('应该转换基本的ANSI颜色代码', () => {
      const input = '\x1b[31mRed text\x1b[0m'
      const expected = '<span style="color: #cd0000;">Red text</span>'
      expect(parseAnsiToHtml(input)).toBe(expected)
    })

    it('应该转换粗体文本', () => {
      const input = '\x1b[1mBold text\x1b[0m'
      const expected = '<span style="font-weight: bold;">Bold text</span>'
      expect(parseAnsiToHtml(input)).toBe(expected)
    })

    it('应该转换下划线文本', () => {
      const input = '\x1b[4mUnderlined text\x1b[0m'
      const expected = '<span style="text-decoration: underline;">Underlined text</span>'
      expect(parseAnsiToHtml(input)).toBe(expected)
    })

    it('应该转换背景色', () => {
      const input = '\x1b[41mRed background\x1b[0m'
      const expected = '<span style="background-color: #cd0000;">Red background</span>'
      expect(parseAnsiToHtml(input)).toBe(expected)
    })

    it('应该转换亮色', () => {
      const input = '\x1b[91mBright red\x1b[0m'
      const expected = '<span style="color: #ff0000;">Bright red</span>'
      expect(parseAnsiToHtml(input)).toBe(expected)
    })

    it('应该处理复合样式', () => {
      const input = '\x1b[1;31mBold red text\x1b[0m'
      const result = parseAnsiToHtml(input)
      expect(result).toContain('font-weight: bold')
      expect(result).toContain('color: #cd0000')
      expect(result).toContain('Bold red text')
    })

    it('应该处理换行符', () => {
      const input = 'Line 1\nLine 2'
      const expected = 'Line 1<br>Line 2'
      expect(parseAnsiToHtml(input)).toBe(expected)
    })

    it('应该转义HTML字符', () => {
      const input = '<script>alert("test")</script>'
      const result = parseAnsiToHtml(input)
      expect(result).toContain('&lt;script&gt;')
      expect(result).toContain('&quot;test&quot;')
    })

    it('应该正确关闭未关闭的标签', () => {
      const input = '\x1b[31mRed text without reset'
      const result = parseAnsiToHtml(input)
      expect(result).toBe('<span style="color: #cd0000;">Red text without reset</span>')
    })
  })

  describe('parseAnsiToPlainText', () => {
    it('应该移除基本的ANSI转义序列', () => {
      const input = '\x1b[31mRed text\x1b[0m Normal text'
      const expected = 'Red text Normal text'
      expect(parseAnsiToPlainText(input)).toBe(expected)
    })

    it('应该移除复杂的ANSI转义序列', () => {
      const input = '\x1b[1;31;42mComplex formatting\x1b[0m'
      const expected = 'Complex formatting'
      expect(parseAnsiToPlainText(input)).toBe(expected)
    })

    it('应该移除Unicode格式的转义序列', () => {
      const input = '\u001b[32mGreen text\u001b[0m'
      const expected = 'Green text'
      expect(parseAnsiToPlainText(input)).toBe(expected)
    })

    it('应该处理八进制格式的转义序列', () => {
      const input = '\\033[31mRed text\\033[0m'
      const expected = 'Red text'
      expect(parseAnsiToPlainText(input)).toBe(expected)
    })

    it('应该移除控制字符', () => {
      const input = 'Hello\x08\x1b[31mWorld\x1b[0m\x7f'
      const expected = 'HelloWorld'
      expect(parseAnsiToPlainText(input)).toBe(expected)
    })

    it('应该保留普通文本', () => {
      const input = 'This is normal text without any ANSI codes'
      expect(parseAnsiToPlainText(input)).toBe(input)
    })

    it('应该处理多行文本', () => {
      const input = '\x1b[32m[INFO]\x1b[0m Server started\n\x1b[31m[ERROR]\x1b[0m Connection failed'
      const expected = '[INFO] Server started\n[ERROR] Connection failed'
      expect(parseAnsiToPlainText(input)).toBe(expected)
    })
  })





  describe('ANSI_COLORS 常量', () => {
    it('应该包含所有标准颜色', () => {
      expect(ANSI_COLORS['30']).toBe('#000000') // 黑色
      expect(ANSI_COLORS['31']).toBe('#cd0000') // 红色
      expect(ANSI_COLORS['32']).toBe('#00cd00') // 绿色
      expect(ANSI_COLORS['33']).toBe('#cdcd00') // 黄色
      expect(ANSI_COLORS['34']).toBe('#0000ee') // 蓝色
      expect(ANSI_COLORS['35']).toBe('#cd00cd') // 洋红
      expect(ANSI_COLORS['36']).toBe('#00cdcd') // 青色
      expect(ANSI_COLORS['37']).toBe('#e5e5e5') // 白色
    })

    it('应该包含所有亮色', () => {
      expect(ANSI_COLORS['90']).toBe('#7f7f7f') // 亮黑色
      expect(ANSI_COLORS['91']).toBe('#ff0000') // 亮红色
      expect(ANSI_COLORS['97']).toBe('#ffffff') // 亮白色
    })
  })



  describe('边界情况测试', () => {
    it('应该处理空字符串', () => {
      expect(parseAnsiToHtml('')).toBe('')
      expect(parseAnsiToPlainText('')).toBe('')
    })

    it('应该处理只包含ANSI代码的字符串', () => {
      expect(parseAnsiToPlainText('\x1b[31m\x1b[0m')).toBe('')
    })

    it('应该处理不完整的ANSI序列', () => {
      const input = '\x1b[31incomplete sequence'
      const result = parseAnsiToPlainText(input)
      // 不完整的ANSI序列应该被保留或部分处理
      expect(result).toContain('ncomplete sequence')
    })
  })
})