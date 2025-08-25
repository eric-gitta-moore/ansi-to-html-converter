[中文说明](README.md) | **English**

# ANSI Dual-Function Converter

A powerful online tool that supports bidirectional conversion between ANSI escape sequences and HTML, plain text.

## 🌟 Features

### Bidirectional Conversion Support
- **ANSI → HTML**: Convert terminal output with ANSI color codes to colorful HTML display
- **ANSI → Plain Text**: Remove all ANSI color codes to get clean plain text

### Rich ANSI Support
- ✅ Standard colors (30-37, 40-47): Black, Red, Green, Yellow, Blue, Magenta, Cyan, White
- ✅ Bright series (90-97, 100-107): High-brightness color variants
- ✅ Style control: Bold (1m), Underline (4m), Reset (0m)
- ✅ Complete foreground and background color support

### User-Friendly Interface
- 🎨 Modern design with dark/light theme switching
- 🔄 One-click conversion mode switching
- 📋 One-click copy of conversion results
- 🚀 Real-time preview of conversion effects
- 📝 Built-in sample data

## 🚀 Quick Start

### Online Use
- **Online Tool**: [https://eric-gitta-moore.github.io/ansi-to-html-converter](https://eric-gitta-moore.github.io/ansi-to-html-converter)

### Local Development

#### Environment Requirements
- Node.js 18+
- pnpm 8+

#### Install Dependencies
```bash
pnpm install
```

#### Start Development Server
```bash
pnpm run dev
```

#### Build Production Version
```bash
pnpm run build
```

#### Preview Production Version
```bash
pnpm run preview
```

## 📖 Usage Guide

### ANSI → HTML Conversion

1. **Select Conversion Mode**: Ensure the toggle button shows "ANSI → HTML"
2. **Input ANSI Text**: Paste text containing ANSI escape sequences in the left input area
3. **View Conversion Results**:
   - **Preview Tab**: View the rendered colorful effect
   - **HTML Code Tab**: Get the converted HTML source code
4. **Copy Results**: Click the copy button to get HTML code

#### Sample Input
```bash
\x1b[32m[INFO]\x1b[0m Server started successfully
\x1b[33m[WARN]\x1b[0m Configuration file not found
\x1b[31m[ERROR]\x1b[0m Database connection failed
```

#### Sample Output
```html
<span style="color: #00cd00;">[INFO]</span> Server started successfully<br>
<span style="color: #cdcd00;">[WARN]</span> Configuration file not found<br>
<span style="color: #cd0000;">[ERROR]</span> Database connection failed
```

### ANSI → Plain Text Conversion

1. **Switch Conversion Mode**: Click the toggle button to select "ANSI → Plain Text" mode
2. **Input ANSI Text**: Paste text containing ANSI escape sequences in the left input area
3. **View Conversion Results**: View plain text with color codes removed on the right
4. **Copy Results**: Click the copy button to get plain text

#### Sample Input
```bash
\x1b[32m[INFO]\x1b[0m Server started successfully
\x1b[33m[WARN]\x1b[0m Configuration file not found
\x1b[31m[ERROR]\x1b[0m Database connection failed
```

#### Sample Output
```
[INFO] Server started successfully
[WARN] Configuration file not found
[ERROR] Database connection failed
```

## 🎯 Application Scenarios

### Developer Tools
- **Log Beautification**: Convert terminal logs to web-friendly HTML format
- **Documentation**: Display colorful command line output in technical documentation
- **Blog Posts**: Embed beautiful terminal demonstration effects in articles

### Operations Scenarios
- **Monitoring Dashboards**: Convert server logs to Web interface display
- **Report Generation**: Create HTML reports containing colorful terminal output
- **Troubleshooting**: Save and share colored error logs

### Teaching & Training
- **Programming Tutorials**: Show colorful effects of terminal operations
- **Online Courses**: Demonstrate command-line tool usage in web pages
- **Technical Sharing**: Create presentations containing terminal output

## 🔧 Technical Architecture

### Frontend Technology Stack
- **React 18**: Modern user interface framework
- **TypeScript**: Type-safe JavaScript superset
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React component library
- **Lucide React**: Beautiful icon library

### Core Algorithms
- **ANSI Parser**: Regular expression matching and state management
- **Plain Text Processing**: Efficient ANSI control code removal algorithm
- **Style Stack**: Proper handling of nested styles

## 📚 ANSI Color Code Reference

### Standard Colors (Foreground 30-37, Background 40-47)
| Color | Foreground | Background | Hex Value |
|-------|------------|------------|-----------|
| Black | 30 | 40 | #000000 |
| Red | 31 | 41 | #cd0000 |
| Green | 32 | 42 | #00cd00 |
| Yellow | 33 | 43 | #cdcd00 |
| Blue | 34 | 44 | #0000ee |
| Magenta | 35 | 45 | #cd00cd |
| Cyan | 36 | 46 | #00cdcd |
| White | 37 | 47 | #e5e5e5 |

### Bright Series (Foreground 90-97, Background 100-107)
| Color | Foreground | Background | Hex Value |
|-------|------------|------------|-----------|
| Bright Black (Gray) | 90 | 100 | #7f7f7f |
| Bright Red | 91 | 101 | #ff0000 |
| Bright Green | 92 | 102 | #00ff00 |
| Bright Yellow | 93 | 103 | #ffff00 |
| Bright Blue | 94 | 104 | #5c5cff |
| Bright Magenta | 95 | 105 | #ff00ff |
| Bright Cyan | 96 | 106 | #00ffff |
| Bright White | 97 | 107 | #ffffff |

### Style Control Codes
| Function | Code | Description |
|----------|------|-------------|
| Reset | 0m | Clear all styles |
| Bold | 1m | Bold text |
| Underline | 4m | Add underline |

## 🛠️ Getting Colored Shell Output

### Method 1: Using script command
```bash
# Record terminal session (with colors)
script -c "your-command" /dev/null

# Example: Record colored output of ls command
script -c "ls --color=always" /dev/null
```

### Method 2: Force enable color output
```bash
# Git commands
git status --color=always
git log --color=always --oneline

# ls commands
ls --color=always

# grep commands
grep --color=always "pattern" file.txt
```

### Method 3: Direct copy and paste
Most modern terminals support directly copying text containing ANSI codes, which can be pasted directly into the converter.

## 🤝 Contribution Guidelines

Welcome to submit Issues and Pull Requests to improve this project!

### Development Process
1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Standards
- Use TypeScript for type checking
- Follow ESLint-configured code standards
- Add appropriate comments and documentation
- Ensure all features have corresponding tests

## 📄 License

This project uses the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Links

- **ANSI Standard Reference**: [ANSI Escape Codes - Wikipedia](https://en.wikipedia.org/wiki/ANSI_escape_code)
- **HTML Color Reference**: [MDN CSS Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color)

## ❓ FAQ

### Q: Why do some colors look different after conversion?
A: The ANSI standard only supports 16 basic colors, while HTML supports millions of colors. The tool maps input colors to the closest ANSI standard colors.

### Q: How to handle nested styles?
A: The tool supports proper handling of nested styles and maintains a style stack to ensure matching open and close tags.

### Q: Does it support 256-color or RGB color modes?
A: The current version focuses on 16-color standard mode. Future versions will consider supporting extended color modes.

### Q: Can the converted HTML be used directly in web pages?
A: Yes, the converted HTML uses standard inline styles and can be embedded directly into any web page.

### Q: What escape sequence formats does ANSI decolorization support?
A: Supports all common formats: \x1b, \u001b, \033, etc., and various ANSI control sequences.

---

**Made with ❤️ for developers who love colorful terminals!**