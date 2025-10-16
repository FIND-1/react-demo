/*
 props.children 特殊值
        function App() {
              return (
                <>
                <PropsReactNode>
              {/这个功能类似于: Vue的插槽，直接在子组件内部插入标签会自动一个参数props.children/}
              <div>
                  <p>这是插槽内容</p>
              </div>
              </PropsReactNode>
                 </>
          )
        }
    * 子组件使用children属性,  在之前的版本children是不需要手动定义的，
      但是在<React18>之后改为需要手动定义类型
      这样就会把父级(main.tsx)的 <p>这是插槽内容</p> 插入子组件的 <div> 里面
* */

import React from "react";

interface Props {
    children: React.ReactNode //手动声明children
}
// 使用 React.FC 声明函数组件 (在<React18> 后不推荐)
// const PropsReactNode: React.FC<Props> = (props) => {
//     return <div>{props.children}</div>
// }

// 使用 ReactElement 声明组件 (在<React18> 后推荐)
const PropsReactNode = (props: Props): React.ReactElement => {
    return (
        <div style={{
            border: '1px solid #333',
            padding: '16px',
            margin: '10px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3>PropsReactNode --手动加入的 children 组件</h3>
            <div>{props.children}</div>
        </div>
    )
}
export default PropsReactNode
