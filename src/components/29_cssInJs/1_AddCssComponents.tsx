/*
  CSS-in-JS 是什么？
    * 也就是将 CSS 代码 跟 JS 代码 混合在一起，通过 JS 来动态地生成 CSS 样式。
    * 它是一种思想，而不是一个具体的实现方式。

  怎么使用？
    * 语法格式（以常见库为例）:
        const StyledButton = styled.button`
          color: ${props => props.theme.color};
          padding: 8px 16px
          ; `

    * 也可以通过对象形式：
        const style = { color: 'red', fontSize: '14px' };
        <div style={style}>内容</div>

    * 优点:
        1: 可以让 CSS 拥有独立的作用域，阻止 CSS 泄露到组件外部，防止冲突。
        2: 可以动态生成 CSS 样式，根据组件的状态或 props 实时调整样式。
        3: CSS-in-JS 可以方便地实现主题切换功能，只需更改主题变量即可改变整个应用的样式。

    * 缺点:
        1: CSS-in-JS 是基于运行时生成样式，会带来轻微性能开销（现代设备通常可忽略）。
        2: 调试困难，浏览器开发者工具中看到的是动态插入的 <style> 标签，不易定位原始代码。

  原理剖析：
    * 在运行时，CSS-in-JS 库会将 JS 中定义的样式转换为 CSS 字符串，
      然后动态插入到页面的 <head> 中的 <style> 标签里。
    * 每个组件的样式通常会生成唯一的类名（如 .css-1a2b3c），避免命名冲突。

  注意事项：
    * 避免在渲染函数中直接定义样式对象（如 <div style={{...}} /> 中写复杂逻辑），
      否则可能导致不必要的重渲染。
    * 生产环境下建议使用支持 SSR（服务端渲染）的 CSS-in-JS 库，避免首屏样式闪烁。
    * 不要过度使用内联样式（style 属性），它无法使用伪类（:hover）或媒体查询。

  使用建议:
    * 小型项目或需要高度动态样式的场景（如主题切换、状态驱动样式）推荐使用。
    * 大型项目建议选择成熟库（如 Emotion、styled-components），并配合缓存和 SSR 优化。
    * 若团队习惯传统 CSS 或对性能极度敏感，可考虑 CSS Modules 等替代方案。

  典型应用：
    * Ant Design（v5+）内置使用 CSS-in-JS 实现动态主题和按需样式注入。
    * 组件样式的封装/继承
    * 通过 attrs 来给组件添加属性，然后通过 props 来获取属性值。\
    * 全局样式 / 动画
*/


// 以 styled-components 为例，来实现一个简单的 css-in-js 案例
// 1:安装 : npm install styled-components

// 2:引入
import React, {} from 'react';
import styled from 'styled-components';
// 注意：使用加 $ 前缀, 而不是直接拼 primary,否则会出控制台警告
const Button = styled.button<{$primary?: boolean}>`
   ${props => props.$primary ? 'background: #6160F2;' : 'background: red;'}
       padding: 10px 20px;
       border-radius: 5px;
       color: white;
       cursor: pointer;
       margin: 10px;
       border: none;
   &:hover {
     color: black;
   }
`;
const AddCssComponents: React.FC = () => {
    return (

        <div>
            <h2>CSS-in-JS--:使用styled-components</h2>
            {/*注意（加 $ 前缀）*/}
            <Button $primary>
                按钮
            </Button>
            <br/>
            <i> 注意: 每次页面更新时,会生成唯一的类名，避免命名冲突</i>
        </div>
    );
}

export default AddCssComponents
