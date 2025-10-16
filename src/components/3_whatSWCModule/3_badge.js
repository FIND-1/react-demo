/*
* 截止到目前2025-9 :SWC 打包 和 Babel 比较:
        🔹 Babel 支持 commonjs、es6（false）、amd、umd、systemjs 五种模块格式，但 不支持 node16 / nodenext。
        🔹 SWC 支持全部 7 种，包括现代 Node.js 的模块解析策略。
        🔹 在模块化支持上，SWC 功能更全、性能更强，尤其适合现代 Node.js 和前端项目。
        🔹 Babel 依然可靠，但在新模块系统支持上已略显滞后
*
* */

/*
    ✅ 一、SWC 支持的 React 版本范围
    React 版本	SWC 是否支持	说明
    React 16.8+	✅ 支持	支持 Hooks、函数组件、Fragment 等
    React 17	✅ 支持	支持新 JSX 转换（runtime: automatic）
    React 18	✅ 支持	支持并发模式、自动批处理、createRoot
    React 19	✅ 完全支持	支持新特性如 use、actions、编译时优化等
    📌 结论：SWC 支持所有现代 React 版本（16.8+），不限于 React 19。
*/
//  npx spack打包
// TODO:  npx spack 还不能正确打包,需要等待更新

