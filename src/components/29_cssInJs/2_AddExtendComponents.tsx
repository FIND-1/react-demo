/*
*  styled-components的原理解析:
    * 本质是利用Es6的模板字符串，将样式定义在JS中，然后通过JS代码生成CSS代码，最后插入到HTML中。
* */
//先建立基础的 Button 组件，然后通过继承来实现更多的按钮样式
import React, { } from 'react';
import styled from 'styled-components';
const ButtonBase = styled.button`
       padding: 10px 20px;
       border-radius: 5px;
       color: white;
       cursor: pointer;
       margin: 10px;
       border: none;
   &:hover {
     color: red;
   }
`;

//圆角蓝色按钮
const BlueButton = styled(ButtonBase)`
   background-color: blue;
   border-radius: 20px;
    &:hover {
        color: white;
    }
`;
//失败按钮
const FailButton = styled(ButtonBase)`
   background-color: red;
    &:hover {
        color: white;
    }
`;
//文字按钮
const TextButton = styled(ButtonBase)`
   background-color: transparent;
   color: blue;
`;
const AddExtendComponents: React.FC = () => {
    return (
        <>
            <h2>CSS-in-JS--:继承基础组件进而创建新的组件</h2>
            <BlueButton>普通按钮</BlueButton>
            <FailButton>失败按钮</FailButton>
            <TextButton>文字按钮</TextButton>
        </>
    );
}

export default AddExtendComponents;
