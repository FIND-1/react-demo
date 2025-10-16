
/*
* 什么是 SWC ?
* SWC 既可用于编译，也可用于打包。对于编译，
* 它使用现代 JavaScript 功能获取 JavaScript / TypeScript 文件并输出所有主流浏览器支持的有效代码。
     SWC 在单线程上比 Babel 快 20 倍，在四核上快 70 倍。
* 总之: SWC 实现了和babel一样的功能，但是它比babel快。
*
*
*   为什么快?
*   先导知识 : 什么是编译语言 ? 什么是解释语言 ?
*   <编译语言>: 代码在执行前需要先编译成机器码, 典型的编译语言有: C/C++/Rust/Go/Swift/Kotlin/Java
*   <解释语言>: 代码在执行时逐行解释执行, 典型的解释语言有: JavaScript/Python/Ruby/PHP/Perl
*
*   1. SWC 使用 Rust 编写，而 Babel 使用 JavaScript 编写。
*      Rust 是一种编译语言，通常比解释语言（如 JavaScript）更快。
*   2. SWC 设计为并行处理任务，充分利用多核处理器的能力。
*
*   核心功能

    1: JavaScript/TypeScript 转换  可以将现代 JavaScript（ES6+）和 TypeScript 代码转换为兼容旧版 JavaScript 环境的代码。
    这包括语法转换（如箭头函数、解构赋值等）以及一些 polyfill 的处理 , 模块打包 SWC 提供了基础的打包功能，可以将多个模块捆绑成一个单独的文件
    2: SWC 支持代码压缩和优化功能，类似于 Terser。它可以对 JavaScript 代码进行压缩，去除不必要的空白、注释，并对代码进行优化以减小文件大小，提高加载速度
    3: SWC 原生支持 TypeScript，可以将 TypeScript 编译为 JavaScript
    4: SWC 支持 React 和 JSX 语法，可以将 JSX 转换为标准的 JavaScript 代码。它还支持一些现代的 React 特性

* 下载指令: npm install -D @swc/core
*   Terser : Terser 是一个用于“压缩（Minify）和混淆（Mangle）JavaScript 代码”的工具，常用于生产环境构建阶段。
*   详情可见 : 4_whatTerser.md
* */

import swc from '@swc/core'
// 记录开始时间
// const startTime = performance.now();
// const result = swc.transformFileSync('./1_testSWC.js', {
//     jsc: {
//         target: "es5", //代码转换es5
//         parser: {
//             syntax: 'ecmascript'
//         }
//     }
// })
// // 记录结束时间
// const endTime = performance.now();
//
// // 计算并显示执行时间
// const executionTime = endTime - startTime;
// //SWC 转换耗时: 1.07 毫秒
// console.log(`SWC 转换耗时: ${executionTime.toFixed(2)} 毫秒`);
// console.log(result.code);

// 支持react jsx
// 记录开始时间
console.time()
const result = swc.transformFileSync('./2_transformReact.jsx', {
    jsc: {
        target: "es5", //代码转换es5
        parser: {
            syntax: 'ecmascript', //语法转换
            jsx: true
        },
        transform:{
            react: {
                runtime: 'automatic'
            }
        }
    }
})
// 记录结束时间
console.log(result.code)
console.timeEnd()






