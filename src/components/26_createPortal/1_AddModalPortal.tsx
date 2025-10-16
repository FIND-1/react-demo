/*
  createPortal 是什么？
    * 是一个 API，用于将子组件渲染到指定的 DOM 节点中，而不是默认的父组件层级。
    * 类似于 Vue 3 的 Teleport。

  怎么使用？
    * 语法格式: `createPortal(children, domNode, key?)`

    参数:
      * children: 要渲染的 React 节点
      * domNode: 插入的目标 DOM 节点
      * key? (可选): 唯一标识符，用于 React diff 算法优化
    返回值:
      * 一个 React 元素 (JSX)，可以被渲染到任意 DOM 节点

  原理剖析：
    * React 在虚拟 DOM 树中仍然保留组件的父子关系，但实际渲染时会将该子节点挂载到指定的 DOM 节点。
    * 事件冒泡仍然遵循 React 的合成事件系统：即便组件被挂载到 DOM 树的别处，它的事件依然会冒泡到 React 组件树的父级。

  注意事项：
    * 必须保证目标 DOM 节点存在（一般通过 id 获取，如 document.getElementById("root-portal")）。
    * 不会破坏 React 的事件冒泡机制，事件仍然会冒泡到虚拟父级组件。
    * SSR 场景下注意目标 DOM 节点的创建时机。

  使用建议: 统一在页面挂一个 portal-root 节点，避免多个散乱的 DOM 节点。

 <典型应用>：
    * Modal 弹窗（避免被父组件 overflow:hidden 截断）
    * 下拉框（select、菜单需要跳出父级容器）
    * 全局提示（Toast/Notification）
    * 遮罩层（Mask/Overlay）
    * 全局 Loading 指示器
*/


// 封装弹框组件
// 有个问题是: 外层有position: relative 的样式，那么弹框会相对于外层进行定位，
//            如果外层没有position: relative 的样式，那么弹框会相对于body进行定位,故此这个Modal不稳定

import '../../assets/style/26_creatPortal.css';
//  const AddModalPortal = () => {
//     return <div className="modal">
//         <div className="modal-header">
//             <div className="modal-title">标题</div>
//         </div>
//         <div className="modal-content">
//             <h2>常规---Modal</h2>
//         </div>
//         <div className="modal-footer">
//             <button className="modal-close-button">关闭</button>
//             <button className="modal-confirm-button">确定</button>
//         </div>
//     </div>
// }
//解决办法 1: (推荐)创建一个 portal 节点，将弹框组件渲染到这个节点中，然后添加一个样式，将这个节点添加到 body 中，
import {createPortal} from 'react-dom';

const AddModalPortal = () => {
    return createPortal(
        <div className="modal">
            <div className="modal-header">
                <div className="modal-title">标题</div>
            </div>
            <div className="modal-content"><h2>creatPortal---Modal</h2></div>
            <div className="modal-footer">
                <button className="modal-close-button">关闭</button>
                <button className="modal-confirm-button">确定</button>
            </div>
        </div>,
        document.body) // portal 挂载到 body 中
}

export default AddModalPortal
// 解决办法2 : 使用position: fixed 固定定位,
