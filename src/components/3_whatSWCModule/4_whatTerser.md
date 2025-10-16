🧩 Terser 是什么?

> **它是一个用于“压缩（Minify）和混淆（Mangle）JavaScript 代码”的工具，常用于生产环境构建阶段。**

---

#### 🔍 Terser 的核心功能

#### 1. **压缩（Minification）**
将 JS 代码变小，去除不必要的字符：

```js
// 压缩前
function hello(name) {
  console.log("Hello " + name);
}

// 压缩后（terser 输出）
function hello(n){console.log("Hello "+n)}
```

- 去除空格、换行、注释
- 缩短变量名（`name` → `n`）
- 简化表达式

#### 2. **混淆（Obfuscation）**
让代码难以阅读和逆向工程（可选）：
让代码难以阅读和逆向工程（可选）：

```js
// 更极端的混淆示例（可配置）
!function(n){console.log("Hello "+n)}("world")
```

#### 3. **语法降级与 Tree Shaking 支持**
- 支持 ES6+ 语法（如箭头函数、解构等）
- 能处理模块化代码（CommonJS、ESM）
- 配合打包器实现 **Tree Shaking**（标记无用代码）

#### 4. **保留 License 注释**
支持通过注释指令保留版权信息：

```js
/*! @license Copyright (c) 2025 MyCompany */
```

---

#### 🛠️ Terser 在前端编译中的位置

在现代前端构建流程中，Terser 通常出现在 **打包之后、输出之前**：

```
源代码 (JS/TSX)
   ↓
[ 打包器：Webpack / Vite / Rollup ]
   ↓
生成 bundle.js（未压缩）
   ↓
[ Terser ] ← 压缩 JS 代码
   ↓
bundle.min.js（生产环境发布）
```

#### ✅ 典型使用场景：

| 工具 | 是否默认集成 Terser |
|------|------------------|
| **Webpack** | ✅ 默认使用 `terser-webpack-plugin` |
| **Vite** | ✅ 生产构建时使用 `esbuild` 或 `terser`（可选） |
| **Rollup** | ✅ 可通过 `rollup-plugin-terser` 使用 |
| **Parcel** | ✅ 内置支持 |

💡 Webpack 示例：

```javascript
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
optimization: {
   minimize: true,
   minimizer: [new TerserPlugin()],
  },
};
```

#### ⚙️ Terser 常见配置选项

```javascript
new TerserPlugin({
  terserOptions: {
    compress: {
      drop_console: true,  // 删除所有 console.log
      drop_debugger: true, // 删除 debugger
      pure_funcs: ['console.log'] // 指定要删除的函数
    },
    format: {
      comments: /@license/i, // 仅保留带 @license 的注释
    },
    mangle: true,           // 混淆变量名
    toplevel: false,        // 是否混淆顶层变量
  },
  extractComments: false,   // 是否将注释提取到单独文件
});
```
#### 常用优化：

- `drop_console: true` → 移除所有 `console.xxx`
- `drop_debugger: true` → 移除 `debugger` 语句
- `mangle: true` → 缩短变量名提升压缩率

---

#### 🆚 Terser vs esbuild vs SWC

| 工具        | 语言       | 速度   | 功能  | 用途                            |
| ----------- | ---------- | ------ | ----- | ------------------------------- |
| **Terser**  | JavaScript | 中等   | ⭐⭐⭐⭐☆ | 最成熟，Webpack 默认            |
| **esbuild** | Go         | ⚡ 极快 | ⭐⭐⭐☆☆ | 构建快，压缩也不错（Vite 默认） |
| **SWC**     | Rust       | ⚡ 很快 | ⭐⭐⭐⭐☆ | 类似 Babel + Terser，Rust 实现  |

> - 开发环境推荐 `esbuild` / `SWC`（快）
> - 生产环境仍可用 `Terser`（压缩更精细）

---

#### ✅ 为什么需要 Terser？

| 目的                   | 效果                  |
| ---------------------- | --------------------- |
| 📦 减小 JS 文件体积     | 加载更快，节省带宽    |
| ⚡ 提升页面性能         | 解析执行更快          |
| 🔐 保护源码             | 防止轻易被阅读或复制  |
| 🌐 优化 Lighthouse 分数 | 更小的资源 = 更高评分 |

例如：
- 原始文件：`app.js` 300KB
- 经过 Terser 压缩后：`app.min.js` 90KB（减少 70%！）

---

#### ✅ 总结

| 项目         | 内容                           |
| ------------ | ------------------------------ |
| **名字**     | Terser                         |
| **作用**     | 压缩、混淆 JavaScript 代码     |
| **使用时机** | 生产环境构建阶段               |
| **常见集成** | Webpack、Rollup、Vite（可选）  |
| **核心优势** | 减小体积、提升性能、保护代码   |
| **关键配置** | `compress`, `mangle`, `format` |

---

🎯 **一句话记住**：
> **Terser 就是前端世界的"瘦身大师"——把你的 JS 代码压得又小又快，专为上线而生！**

在每次 `npm run build` 时，很可能已经有 Terser 在默默工作了 💪