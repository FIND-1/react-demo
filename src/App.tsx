
// import '../../assets/style/App.css'

// 基础用法
// function App() {
//     const num: string = 'kjkhdkh'
//     const fn = (nmsnm: string) => console.log(nmsnm)
//     return (
//         <>
//             {'11' /** 字符串用法 */}
//             {num /** 变量用法 */}
//             {fn('nmsnm') /** 函数用法 */}
//             {new Date().getTime().toFixed(2) /** 日期用法 */}
//         </>
//     )
// }

//绑定class(className) id 属性等等 都是一样的
function App() {
    const value:string = 'A'
    return (
        <>
            <div data-index={value} className={value} id={value}>{value}</div>
        </>
    )
}


//绑定多个class(className)
// function App() {
//     const a:string = 'A'
//     return (
//         <>
//             <div className={`${a} class2`}>{value}</div>
//         </>
//     )
// }

// 事件绑定
// function App() {
//     const value: string = 'React TS'
//     let count :number = 0
//     const clickTap = (params: string) => {
//         count++
//         console.log(params + '被点击了' + count)
//     }
//     return (
//         <>
//             <div className={'pointer'} onClick={() => clickTap(value)}>{value}</div>
//         </>
//     )
// }

//tsx如何使用泛型
// function App() {
//     const value: string = 'React TS'
//     const clickTap = <T,>(params: T) => console.log(params)
//     return (
//         <>
//             <div onClick={() => clickTap(value)}>{value}</div>
//         </>
//     )
// }


//tsx如何渲染html代码片段(dangerouslySetInnerHTML)
/*
* dangerouslySetInnerHTML 的值是一个对象，
* 该对象包含一个名为 __html 的属性，且值为你想要插入的 HTML 字符串
*
*   dangerouslySetInnerHTML 是不是像 v-html？
  	✅ 是的，功能几乎一样
    为什么名字这么奇怪？
     ⚠️ 提醒你：有安全风险
    能不能用？
      ✅ 能，但只用于可信内容
    如何更安全？
      用 DOMPurify 等工具过滤 HTML
 */

// function App() {
//     const value: string = '<section style="color:red">dangerouslySetInnerHTML</section>'
//     return (
//         <>
//             <div dangerouslySetInnerHTML={{ __html: value }}></div>
//         </>
//     )
// }

// tsx如何遍历dom元素 ? 使用map遍历返回html标签即可
/*   其他数组方法可以用吗？
     方法	   能用于渲染？	说明
    .map()	    ✅ 必须用它	转换为 JSX 数组
    .forEach()	❌ 不行	    返回 undefined
    .filter()	✅ 可以	    通常和 map 配合
    .sort()	    ✅ 可以	    先排序再 map
    .slice()	✅ 可以	    截取部分再 map
    .reduce()	✅ 可以	    复杂操作时用它

    总结: 因为 TSX 本质是 JavaScript 表达式，而 JSX 列表必须是一个包含 React 元素的数组。
    { [ <li>1</li>, <li>2</li>, <li>3</li> ] } 是合法的，而 { undefined } 不是合法的。
* */

// function App() {
//     const arr: string[] = ["VUE","REACT","ANGULAR","NPM","YARN"]
//     return (
//         <>
//             {
//                 arr.map((item) => {
//                     {/* 推荐用唯一 ID，不用 index 如果可能 */}
//                     return <div key={item}>{item}</div>
//                 })
//             }
//         </>
//     )
// }

// tsx如何编写条件语句 ? 使用三元表达式就可以了
/*
* 📌 TSX 中的花括号 {} 里只能放表达式，不能放语句（如 if、for）
* 插值语句内不允许编写switch if 变量声明 或者直接放入对象本体
* */
// function App() {
//     const flag:boolean = true
//     return (
//         <>
//
//             {
//                 flag ? <div>真的</div> : <div>假的</div>
//             }
//         </>
//     )
// }
//错误用法
// function App() {
//     const obj = { name: 'REACT' }
//     return (
//         <>
//             {obj}
//         </>
//     )
// }
//正确用法
// function App() {
//     const obj = { name: 'REACT' }
//     return (
//         <>
//             {/*{obj.name}*/}
//             {JSON.stringify(obj)}
//         </>
//     )
// }


export default App
