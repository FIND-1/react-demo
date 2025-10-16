//通过 attrs 来给组件添加属性 ,然后通过 props 来获取属性值
import React, {Fragment} from 'react';
import styled from 'styled-components';
interface DivComponentProps {
    defaultValue: string;
}
const InputComponent = styled.input.attrs<DivComponentProps>((props) => ({
    type: 'text',
    defaultValue: props.defaultValue,
}))`
    border:1px solid blue;
    margin:20px;
`

const AddAttrsValue: React.FC = () => {
    const defaultValue = 'css-in-js'
    return (
        <>
            <h2>CSS-in-JS--:通过 attrs 来给组件添加属性</h2>
            <label>
                <InputComponent defaultValue={defaultValue}></InputComponent>
                <Fragment></Fragment>
            </label>
        </>
    );
}


export default AddAttrsValue;
