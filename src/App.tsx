import { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Switch } from './components/ui/switch'
import { Label } from './components/ui/label'
import { Copy, Trash2, Sun, Moon, Terminal, Code, Eye, ArrowLeftRight } from 'lucide-react'
import { toast } from 'sonner'
import './App.css'

// 导入模块化的转换函数和示例数据
import {
  parseAnsiToHtml,
  parseAnsiToPlainText
} from './lib/ansi-parser'
import {
  ConversionMode,
  getConversionModeConfig,
  getNextConversionMode
} from './lib/sample-data'

function App() {
  const [input, setInput] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')
  const [conversionMode, setConversionMode] = useState<ConversionMode>('ansi-to-html')

  // 获取当前转换模式的配置
  const modeConfig = getConversionModeConfig(conversionMode)

  // 转换后的结果
  const convertedResult = useMemo(() => {
    if (!input.trim()) return ''
    if (conversionMode === 'ansi-to-html') {
      return parseAnsiToHtml(input)
    } else {
      return parseAnsiToPlainText(input)
    }
  }, [input, conversionMode])

  // 复制功能
  const copyToClipboard = useCallback(async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast(`${type}已复制到剪贴板`)
    } catch (err) {
      toast(`复制失败: ${err}`)
    }
  }, [])

  // 清空输入
  const clearInput = useCallback(() => {
    setInput('')
  }, [])

  // 加载示例
  const loadSample = useCallback((sample: { name: string; content: string }) => {
    setInput(sample.content)
  }, [])

  // 切换转换模式
  const toggleConversionMode = useCallback(() => {
    setConversionMode(prev => getNextConversionMode(prev))
    setInput('') // 清空输入
  }, [])

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 max-w-7xl">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                ANSI 多功能转换器
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {modeConfig.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 dark:text-zinc-50">
            {/* 转换模式切换 */}
            <Button
              variant="outline"
              onClick={toggleConversionMode}
              className="flex items-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              {modeConfig.title}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 输入区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                输入区域
              </CardTitle>
              <CardDescription>
                {modeConfig.inputDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  placeholder={modeConfig.inputPlaceholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-80 font-mono text-sm"
                />
                {input && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearInput}
                    className="absolute top-2 right-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {/* 示例按钮 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">快速示例：</Label>
                <div className="flex flex-wrap gap-2">
                  {modeConfig.sampleData.map((sample, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => loadSample(sample)}
                    >
                      {sample.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 输出区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                输出区域
              </CardTitle>
              <CardDescription>
                {modeConfig.outputDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">预览</TabsTrigger>
                  <TabsTrigger value="html">
                    {modeConfig.outputTabLabel}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview" className="space-y-4">
                  <div className="relative">
                    {conversionMode === 'ansi-to-html' ? (
                      <div 
                        className={`min-h-80 p-4 rounded-md border font-mono text-sm whitespace-pre-wrap ${
                          darkMode ? 'bg-black text-white' : 'bg-white text-black'
                        }`}
                        dangerouslySetInnerHTML={{ __html: convertedResult || '<span class="text-gray-400">在左侧输入区域粘贴shell输出以查看预览...</span>' }}
                      />
                    ) : (
                      <pre className={`min-h-80 p-4 rounded-md border font-mono text-sm whitespace-pre-wrap ${
                        darkMode ? 'bg-black text-white' : 'bg-white text-black'
                      }`}>
                        {convertedResult || `在左侧输入区域粘贴ANSI文本以查看预览...`}
                      </pre>
                    )}
                    {convertedResult && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(convertedResult, modeConfig.copyLabel)}
                        className="absolute top-2 right-2"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="html" className="space-y-4">
                  <div className="relative">
                    <pre className={`min-h-80 p-4 rounded-md border text-sm overflow-auto ${
                      darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-900'
                    }`}>
                      <code>
                        {convertedResult || `// 在左侧输入区域粘贴内容以查看${modeConfig.outputTabLabel}...`}
                      </code>
                    </pre>
                    {convertedResult && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(convertedResult, modeConfig.copyLabel)}
                        className="absolute top-2 right-2"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 使用说明 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">支持的{conversionMode === 'ansi-to-html' ? 'ANSI' : 'ANSI去除'}代码：</h3>
                {conversionMode === 'ansi-to-html' ? (
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• <Badge variant="secondary">\x1b[0m</Badge> 重置所有样式</li>
                    <li>• <Badge variant="secondary">\x1b[1m</Badge> 粗体文本</li>
                    <li>• <Badge variant="secondary">\x1b[4m</Badge> 下划线</li>
                    <li>• <Badge variant="secondary">\x1b[30-37m</Badge> 前景色</li>
                    <li>• <Badge variant="secondary">\x1b[40-47m</Badge> 背景色</li>
                    <li>• <Badge variant="secondary">\x1b[90-97m</Badge> 亮前景色</li>
                    <li>• <Badge variant="secondary">\x1b[100-107m</Badge> 亮背景色</li>
                  </ul>
                ) : (
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• <Badge variant="secondary">\x1b[*m</Badge> 所有ANSI转义序列</li>
                    <li>• <Badge variant="secondary">\u001b[*</Badge> Unicode转义序列</li>
                    <li>• <Badge variant="secondary">\033[*</Badge> 八进制转义序列</li>
                    <li>• <Badge variant="secondary">控制字符</Badge> 退格、回车等</li>
                    <li>• <Badge variant="secondary">光标控制</Badge> 移动、清屏等</li>
                    <li>• <Badge variant="secondary">样式重置</Badge> 所有格式化代码</li>
                  </ul>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">颜色对照：</h3>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {Object.entries({
                    '黑色': '#000000',
                    '红色': '#cd0000', 
                    '绿色': '#00cd00',
                    '黄色': '#cdcd00',
                    '蓝色': '#0000ee',
                    '洋红': '#cd00cd',
                    '青色': '#00cdcd',
                    '白色': '#e5e5e5'
                  }).map(([name, color]) => (
                    <div key={name} className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded border"
                        style={{ backgroundColor: color }}
                      />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">如何获取带颜色的shell输出：</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>1. 在终端中运行命令时，确保启用颜色输出（大多数工具默认启用）</p>
                  <p>2. 使用 <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">script</code> 命令记录终端会话：</p>
                  <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                    script -c "your-command" /dev/null
                  </code>
                  <p>3. 或者直接从终端复制粘贴输出内容</p>
                </div>
              </div>

              
              <div>
                <h3 className="font-semibold mb-2">如何使用ANSI去色功能：</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>1. 将包含ANSI转义序列的文本粘贴到输入框</p>
                  <p>2. 系统会自动识别并移除所有ANSI控制符</p>
                  <p>3. 输出干净的纯文本，适合用于日志分析、文本处理</p>
                  <p>4. 支持所有格式的ANSI转义序列（\x1b、\u001b、\033）</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App