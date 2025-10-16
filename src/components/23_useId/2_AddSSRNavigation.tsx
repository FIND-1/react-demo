// 一个常见的 SSR 场景：带有工具提示的导航栏组件

import { useId } from 'react';

const NavItemWithId = ({ text, tooltip }: { text: string; tooltip: string }) => {
    // ❌ 错误做法：使用 Math.random()
    // 服务端生成: tooltip-0.123456
    // 客户端生成: tooltip-0.789012
    // → ID 不一致 → hydration mismatch！
    // const id = `tooltip-${Math.random()}`;

    // ✅ 正确做法：使用 useId()
    // useId() 会生成稳定、唯一的 ID
    // 服务端生成: :r1:-tooltip
    // 客户端生成: :r1:-tooltip
    // → ID 一致 → hydration 成功！
    const id = useId();
    const tooltipId = `${id}-tooltip`;

    return (
        <li style={{ margin: '10px 0', position: 'relative' }}>
            <a
                href="#"
                aria-describedby={tooltipId}  // ← 关键：关联描述
            >
                {text}
            </a>
            <div
                id={tooltipId} // ← 被引用的描述元素
                role="tooltip"
            >
                {tooltip}
            </div>
        </li>
    );
};

// 使用示例
const AddSSRNavigation = () => {
    return (
        <nav>
            <ul>
                <NavItemWithId
                    text="首页"
                    tooltip="返回首页"
                />
                <NavItemWithId
                    text="设置"
                    tooltip="系统设置"
                />
                <NavItemWithId
                    text="个人中心"
                    tooltip="查看个人信息"
                />
            </ul>
        </nav>
    )
}
/*
  aria-describedby 是什么 ?
    *  是一个“无障碍”工具，它能让屏幕阅读器为用户读出额外的提示信息。

  ARIA 是什么？（全称：Accessible Rich Internet Applications）
   *   是一套 HTML 属性标准，由 W3C 制定，用来提升网页对残障人士（如视障、听障）的可访问性（Accessibility）

  哪些元素会用到 aria-describedby？
   *   任何需要“额外说明信息”的交互元素都可能用到它。

  常用的使用场景和元素:
    <input> / <textarea>	输入提示、错误信息、格式要求	“密码需包含数字和字母”
    <button>	按钮的详细功能说明	“打开设置面板（快捷键 Ctrl+,）”
    <a>（链接）	链接的额外上下文	“外部链接，将在新窗口打开”
    <img>	图片的详细描述（配合 alt）	对复杂图表的补充说明
    自定义组件（如 div 模拟的控件）	所有非原生语义的 UI	弹窗、下拉菜单、标签页

  总结:
   因此 使用aria-describedby 属性，它通过引用其他元素的 id，让屏幕阅读器在读取该元素时，一并朗读描述内容，提升无障碍体验。

*
*
* */
export default AddSSRNavigation