/*
* 什么是虚拟DOM (Virtual DOM)?
* 含义: 用JavaScript对象去描述一个DOM结构，虚拟DOM不是直接操作浏览器的真实DOM，
*      而是首先对 UI 的更新在虚拟 DOM 中进行，再将变更高效地同步到真实 DOM 中
*
*
*   优点
     *  性能优化：直接操作真实 DOM 是比较昂贵的，尤其是当涉及到大量节点更新时。虚拟 DOM 通过减少不必要的 DOM 操作，
                主要体现在diff算法的复用操作，其实也提升不了多少性能。
     *  跨平台性：虚拟 DOM 是一个与平台无关的概念，它可以映射到不同的渲染目标，
                比如浏览器的 DOM 或者移动端(React Native)的原生 UI

* */


// 定义虚拟 DOM 节点类型
interface VNode {
    type: string;
    props: {
        [key: string]: string | number | boolean | VNode[];
        children: VNode[];
    };
}
// --- 1. 构建一个极简的 React 核心 ---
const MiniReact = {
    /**
     * 创建虚拟 DOM 节点
     * @param type - 标签名，如 'div', 'span', 或特殊类型 'TEXT_ELEMENT'
     * @param props - 属性对象，如 { id: 'app', className: 'container' }
     * @param children - 子元素列表，可能是字符串或嵌套的虚拟 DOM
     * @returns 虚拟 DOM 对象
     */
    createElement(type: string, props: { [key: string]: string | number | boolean } = {}, ...children: (string | number | VNode)[]) {
        return {
            type, // 元素类型：'div', 'span', 'TEXT_ELEMENT' 等
            props: {
                ...props,
                children: children.map((child) => {
                    // 如果 child 是对象（说明是嵌套的虚拟 DOM 节点），直接返回
                    if (typeof child === 'object') {
                        return child;
                    }
                    // 如果是字符串/数字，转换为文本虚拟节点
                    return this.createTextElement(child);
                }),
            },
        };
    },

    /**
     * 创建文本类型的虚拟 DOM 节点
     * @param text - 文本内容
     * @returns 文本虚拟 DOM 节点
     */
    createTextElement(text: string | number) {
        return {
            type: 'TEXT_ELEMENT', // 统一用特殊类型表示文本节点
            props: {
                nodeValue: text, // 文本内容
                children: [], // 文本节点没有子节点
            },
        };
    },

    /**
     * 将虚拟 DOM 渲染为真实 DOM
     * @param vdom - 虚拟 DOM 节点
     * @param container - 挂载的真实 DOM 容器（如 div#root）
     */

    render(vdom: VNode, container: Text | HTMLElement) {
        // 1. 根据 type 创建真实 DOM 节点
        const dom =
            vdom.type === 'TEXT_ELEMENT'
                ? document.createTextNode(vdom.props.nodeValue as string)
                : document.createElement(vdom.type);

        // 2. 将 props 中的属性（除了 children）赋值给真实 DOM
        Object.keys(vdom.props)
            .filter((key) => key !== 'children')
            .forEach((key) => {
                // 使用类型守卫确保属性值类型正确
                const value = vdom.props[key];
                if (key === 'nodeValue') {
                    // 特殊处理 nodeValue 属性
                    (dom as Text).nodeValue = value as string;
                } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                    // 类型断言替代 any
                    (dom as HTMLElement).setAttribute(key, String(value));
                }
            });

        // 3. 递归渲染子节点
        vdom.props.children.forEach((child: VNode) => {
            MiniReact.render(child, dom); // 递归调用
        });

        // 4. 将构建好的 DOM 树插入容器
        container.appendChild(dom);
    },
};

// --- 2. 扩展测试：展示虚拟 DOM 创建过程 ---

// 测试 1: 创建一个简单的文本节点
console.log('1. 文本节点:');
console.log(
    MiniReact.createTextElement('Hello World')
);
// 输出:
// {
//     "type": "TEXT_ELEMENT",
//     "props": {
//     "nodeValue": "Hello World",
//         "children": []
//      }
// }

// 测试 2: 创建一个 div，包含文本
console.log('\n2. 包含文本的 div:');
console.log(
    MiniReact.createElement('div', { id: 'app' }, 'Hello')
);
// 输出结构：
// {
//     "type": "div",
//     "props": {
//     "id": "app",
//         "children": [
//         {
//             "type": "TEXT_ELEMENT",
//             "props": {
//                 "nodeValue": "Hello",
//                 "children": []
//             }
//         }
//     ]
// }
// }

// 测试 3: 创建嵌套结构（div > span > 文本）
console.log('\n3. 嵌套结构:');
const vdom = MiniReact.createElement(
    'div',
    { id: 'container', className: 'box' },
    MiniReact.createElement(
        'span',
        { style: 'color: red' },
        'CreateVdom'
    )
);
console.log(vdom);

// 输出结构（简化）：
// {
//   type: 'div',
//   props: {
//     id: 'container',
//     className: 'box',
//     children: [
//       {
//         type: 'span',
//         props: {
//           style: 'color: red',
//           children: [
//             { type: 'TEXT_ELEMENT', props: { nodeValue: 'CreateVdom', children: [] } }
//           ]
//         }
//       }
//     ]
//   }
// }

// --- 3. 模拟 JSX 的作用（JSX 会被编译成 createElement 调用）---

// 注意：下面的 JSX 会被 Babel/SWC 编译成上面的 createElement 调用
// <div id="container">
//   <span style="color: red">CreateVdom</span>
// </div>
//
// 等价于：
// MiniReact.createElement('div', { id: 'container' },
//   MiniReact.createElement('span', { style: 'color: red' }, 'CreateVdom')
// )

// --- 4. 实际渲染到页面（模拟 ReactDOM.render）---

// 将实际渲染的代码注释掉，避免在模块导入时执行
/*
// 创建一个挂载点（仅用于演示）
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// 使用 render 函数将虚拟 DOM 渲染到页面
console.log('\n4. 正在渲染到页面...');
MiniReact.render(vdom, root);

// 查看页面，你应该能看到一个红色的 "CreateVdom" 文字

// --- 5. 验证：打印真实 DOM 结构 ---
console.log('\n5. 真实 DOM 结构:');
console.log(root.innerHTML);
// 输出: <div id="container" class="box"><span style="color: red;">CreateVdom</span></div>
*/


// 导出 React 组件
export default function CreateVdom() {
    return (
        <div>
            <span>CreateVdom</span>
        </div>
    );
}