
/*
* 什么是 Babel ?
* Babel 是一个 JavaScript 编译器，
* 主要用于将现代 JavaScript 代码转换为向后兼容的版本，以便在旧版浏览器或环境中运行。
*
*
* 核心功能
*    语法转换：将新版本的 JavaScript 语法转换为旧版本的语法
*    Polyfill：通过引入额外的代码，使新功能在旧浏览器中可用
*    JSX: 将JSX语法转换成普通的JavaScript语法
*    插件: 为Babel提供自定义功能
*    预设: 一组插件的集合，用于支持特定的语言特性或环境 如: @babel/preset-react @babel/preset-env
*    过程: AST -> Transform -> Generate -> Code
*
* 下载指令: npm install --save-dev @babel/core @babel/cli @babel/preset-env
*
* */

import Babel from '@babel/core'
import presetEnv from '@babel/preset-env'
import fs from 'node:fs'

// 新旧语法转换, 需要 core-js 配合提供 polyfill。    指令: npm install core-js -D
// const file = fs.readFileSync('./1_testBabel.js', 'utf8')
// // 记录开始时间
// const startTime = performance.now();
// const result = Babel.transform(file, {
//     // useBuiltIns entry表示手动引入
//     // useBuiltIns usage表示按需引入
//     //usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
//     //corejs 3 是corejs的版本
//     presets: [
//         [presetEnv, { useBuiltIns: "usage", corejs: 3 }],
//         //支持react
//         react
//     ]
// })
// // 记录结束时间
// const endTime = performance.now();
// // 计算并显示执行时间
// const executionTime = endTime - startTime;
// //Babel 转换耗时: 47.04 毫秒
// console.log(`Babel 转换耗时: ${executionTime.toFixed(2)} 毫秒`);
// console.log(result.code)

// 支持react tsx
import react from '@babel/preset-react'
// jsx代码转换react, 需要加  @babel/preset-react (预设)。  指令:npm install @babel/preset-react -D
const file = fs.readFileSync('./2_transformReact.tsx', 'utf8')
// 记录开始时间
console.time()
const result = Babel.transform(file, {
    presets: [
        [presetEnv, { useBuiltIns: "usage", corejs: 3 }],
        //支持react
        react
    ]
})
// 记录结束时间
console.log(result.code)
console.timeEnd()

