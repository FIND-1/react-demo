// 设置全局样式
import React, { } from 'react';
import styled, { createGlobalStyle,keyframes } from 'styled-components';
const GlobalStyle = createGlobalStyle`
    body {
        background-color: #568bbf;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ul, ol {
        list-style: none;
    }
`
// 动画效果
const move = keyframes`
  0%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(100px);
  }
`
const InfiniteBox = styled.div`
    width: 100px;
    height: 100px;
    background-color: #cfc37e;
    animation: ${move} 1s linear infinite;
`

const AddGlobalStyle: React.FC = () => {
    return (
        <>
            <h2>CSS-in-JS--:配置全局样式/动画</h2>
            <GlobalStyle/>
            <InfiniteBox/>
        </>
    );
}

export default AddGlobalStyle;
