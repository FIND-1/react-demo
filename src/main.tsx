import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//引入 tailwind.css
import './tailwind.css'
// import './index.css'
// import App from './App.tsx'
// import WhatTsxModule from './components/1_whatTsxModule';
// import CreateVdom from './components/4_createVdom';
// import Card from './components/8_whatComponent/Card';
// import Message from './components/8_whatComponent/Message';
// import PropsTest from './components/9_parentProps/1_PropsTest.tsx';
// import PropsDefault from './components/9_parentProps/2_PropsDefault.tsx';

// import PropsReactFC from './components/9_parentProps/3_PropsReactFC.tsx';
// import PropsReactNode from './components/9_parentProps/4_PropsReactNode.tsx';
// import ChildByFunction from './components/9_parentProps/5_ChildByFunction.tsx';

// import BrotherOlder from './components/9_parentProps/6_BrotherOlder.tsx';
// import BrotherYounger from './components/9_parentProps/6_BrotherYounger.tsx';
// import ContextCommunication from "./components/9_parentProps/7_ContextCommunication.tsx";

// import AddState from './components/10_useState/1_AddState.tsx'
// import AddArrayState from './components/10_useState/2_ChangeArrayState.tsx'
// import AddReducerCount from './components/11_useReducer/1_AddReducerCount.tsx'
// import AddReducerCart from './components/11_useReducer/2_AddReducerCart.tsx'
// import TodoPage from './components/12_useSyncExternalStore/3_TodoPage.tsx'
// import NavigationPage from './components/12_useSyncExternalStore/5_NavigationPage.tsx'

// import AddTransition from './components/13_useTransition/1_AddTransition.tsx'
// import AddDeferredValue from './components/14_useDeferredValue/1_AddDeferredValue.tsx'

// import AddEffectDOM from './components/15_useEffect/1_AddEffectDOM.tsx'
// import AddEffectFetch from './components/15_useEffect/2_AddEffectFetch.tsx'
// import AddEffectComponentDidMount from "./components/15_useEffect/3_AddEffectComponentDidMount.tsx";
// import AddEffectComponentDidUpdate from "./components/15_useEffect/4_AddEffectComponentDidUpdate.tsx";
// import AddEffectComponentWillUnmount from "./components/15_useEffect/5_AddEffectComponentWillUnmount.tsx";
// import AddEffectFunction from "./components/15_useEffect/6_AddEffectFunction.tsx";

// import AddLayoutEffectContent from "./components/16_useLayoutEffect/1_AddLayoutEffectContent.tsx";
// import { BrowserRouter } from "react-router-dom";
// import AddLayoutEffectScroll from './components/16_useLayoutEffect/2_AddLayoutEffectScroll.tsx';

// import AddDOMRef from "./components/17_useRef/1_AddDOMRef.tsx";
// import AddDataStorageRef from "./components/17_useRef/2_AddDataStorageRef.tsx";
// import AddTimerRef from "./components/17_useRef/3_AddTimerRef.tsx";

// import AddImperativeHandle18 from "./components/18_useImperativeHandle/1_AddImperativeHandle18.tsx";
// import AddImperativeHandle19 from "./components/18_useImperativeHandle/2_AddImperativeHandle19.tsx";
// import AddImperativeHandleFrom from "./components/18_useImperativeHandle/3_AddImperativeHandleFrom.tsx";
// import AddContext18 from "./components/19_useContext/1_AddContext18.tsx";
// import AddContext19 from "./components/19_useContext/2_AddContext19.tsx";

// import AddReactMemo from "./components/20_useMemo/1_AddReactMemo.tsx";
// import AddUseMemo    from "./components/20_useMemo/2_AddUseMemo.tsx";
// import AddFunctionCallback from "./components/21_useCallback/1_AddFunctionCallback.tsx";
// import AddTodoListCallback from "./components/21_useCallback/2_AddTodoListCallback.tsx";

// import AddDebugValue from "./components/22_useDebugValue/1_AddDebugValue.tsx";
// import AddComponentId from "./components/23_useId/1_AddComponentId.tsx";
// import AddSSRNavigation from "./components/23_useId/2_AddSSRNavigation.tsx";

// import AddHook from "./components/24_customHook/1_AddHook.tsx";
// import AddHOCComponent from "./components/24_customHook/2_AddHOCComponent.tsx";


// import AddControlled from "./components/25_controlledComponent/1_AddControlled.tsx";
// import AddUncontrolled from "./components/25_controlledComponent/2_AddUncontrolled.tsx";
// import AddControlUncontrolled from "./components/25_controlledComponent/3_AddControlUncontrolled.tsx";

// import AddModalPortal from "./components/26_createPortal/1_AddModalPortal.tsx";
// import AddSuspenseComponent from "./components/27_suspense/2_AddSuspenseComponent.tsx";
// import AddSuspenseCard from "./components/27_suspense/5_AddSuspenseCard.tsx";
// import AddAsyncModal from "./components/27_suspense/7_AddAsyncModal.tsx";
// import AddCssCard from "./components/28_cssModule/1_AddCssCard.tsx";

// import AddCssComponents from "./components/29_cssInJs/1_AddCssComponents.tsx";
// import AddExtendComponents from "./components/29_cssInJs/2_AddExtendComponents.tsx";
// import AddAttrsValue from "./components/29_cssInJs/3_AddAttrsValue.tsx";
// import AddGlobalStyle from "./components/29_cssInJs/4_AddGlobalStyle.tsx";

// import AddCssAtomization from "./components/30_CSSAtomization/1_AddCssAtomization.tsx";

// import ZustandPrice from "./pages/1_whatZustand/1_zustandPrice.tsx";
// import ZustandAsync from "./pages/1_whatZustand/2_zustandAsync.tsx";
// import ZustandPersist from "./pages/1_whatZustand/3_zustandPersist.tsx";
// import ZustandSplit from "./pages/1_whatZustand/4_zustandSplit.tsx";


// import ShallowMerge from "./pages/2_mergeZustand/1_shallowMerge.tsx";
// import TwoDeepUpdate from "./pages/2_mergeZustand/2_twoDeepUpdate.tsx";
// import StoreWithImmer from "./pages/2_mergeZustand/3_storeWithImmer.tsx";
// import StorePartialize from "./pages/2_mergeZustand/4_storePartialize.tsx";
// import StateSlicing from "./pages/2_mergeZustand/5_stateSlicing.tsx";

// import PersistMiddleware from "./pages/3_middlewaresZustand/1_persistMiddleware.tsx";
// import ImmerMiddleware from "./pages/3_middlewaresZustand/2_immerMiddleware.tsx";
// import DevtoolsMiddleware from "./pages/3_middlewaresZustand/3_devToolsMiddleware.tsx";
// import CombinedMiddleware from "./pages/3_middlewaresZustand/4_combinedMiddleware.tsx";

// import AuthProtectedDashboard from "./pages/4_whatHOC/1_authDashboard.tsx";
// import TrackedProductDetailPage from "./pages/4_whatHOC/2_trackedProductDetail.tsx";

// import UseImmerUser from "./pages/5_whatUseImmer/1_useImmerUser.tsx";
// import UseImmerTaskList from "./pages/5_whatUseImmer/2_useImmerTaskList.tsx";
// import UseImmerDashboard from "./pages/5_whatUseImmer/3_useImmerDashboard.tsx";
// import UseImmerDraggable from "./pages/5_whatUseImmer/4_useImmerDraggable.tsx";

import ImmerComparison from "./pages/5_whatUseImmer/5_immerComparison.tsx";

//!是非空断言，告诉ts这个值不可能为空
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/*<App />*/}
        {/*<WhatTsxModule />*/}
        {/*<CreateVdom />*/}
        {/*  <Card />*/}
        {/*<Message />*/}


        {/*<PropsTest*/}
        {/*    title={'PropsTest组件'}*/}
        {/*    id={1}*/}
        {/*    obj={{a: 1, b: 2}}*/}
        {/*    arr={[1, 2, 3]}*/}
        {/*    cb={(a: number, b: number) => a + b}*/}
        {/*    empty={null}*/}
        {/*    element={<div style={{color: 'red'}}>测试element</div>} */}
        {/*    isGirl={false}      */}
        {/*/>*/}

        {/*<PropsDefault*/}
        {/*    title={''}*/}
        {/*    id={1}*/}
        {/*    obj={{ a: 1, b: 2 }}*/}
        {/*    arr={[1, 2, 3]}*/}
        {/*    cb={(a: number, b: number) => a + b}*/}
        {/*    empty={null}*/}
        {/*    element={<div>测试</div>}*/}
        {/*>*/}
        {/*</PropsDefault>*/}

        {/*<PropsReactFC*/}
        {/*    name={'张三'}*/}
        {/*    age={18}*/}
        {/*    isActive={true}*/}
        {/*    avatar={'https://avatars.githubusercontent.com/u/1024025?v=4'}*/}
        {/*    onProfileClick={() => alert('点击了用户卡片')}*/}
        {/*>*/}
        {/*</PropsReactFC>*/}

        {/*<PropsReactNode>*/}
        {/*    <div style={{marginTop: '10px', padding: '10px', backgroundColor: '#e0e0e0'}}>*/}
        {/*        <h4>这是通过 children 传递的内容</h4>*/}
        {/*        <p>children 可以是任何 JSX 元素</p>*/}
        {/*        <button onClick={(e) => {*/}
        {/*            e.stopPropagation();*/}
        {/*            alert('子组件中的按钮被点击了');*/}
        {/*        }}>子组件中的按钮*/}
        {/*        </button>*/}
        {/*    </div>*/}
        {/*</PropsReactNode>*/}

        {/*<ChildByFunction*/}
        {/*    callback={( (params:string) => {*/}
        {/*        console.log('触发了 父组件的事件',params)*/}
        {/*    })}*/}
        {/*></ChildByFunction>*/}

        {/*<BrotherOlder></BrotherOlder>*/}
        {/*<BrotherYounger></BrotherYounger>*/}
        {/*<ContextCommunication/>*/}

        {/*<AddState></AddState>*/}
        {/*<AddArrayState></AddArrayState>*/}
        {/*<AddReducerCount/>*/}
        {/*<AddReducerCart/>*/}
        {/*<TodoPage/>*/}
        {/*<NavigationPage/>*/}

        {/*<AddTransition/>*/}
        {/*<AddDeferredValue/>*/}

        {/*<AddEffectDOM/>*/}
        {/*<AddEffectFetch/>*/}
        {/*<AddEffectComponentDidMount/>*/}
        {/*<AddEffectComponentDidUpdate/>*/}
        {/*<AddEffectComponentWillUnmount/>*/}
        {/*<AddEffectFunction/>*/}

        {/*<AddLayoutEffectContent/>*/}
        {/*<BrowserRouter future={{v7_startTransition: true}}>*/}
        {/*<AddLayoutEffectScroll/>*/}
        {/*</BrowserRouter>*/}

        {/*<AddDOMRef/>*/}
        {/*<AddDataStorageRef/>*/}
        {/*<AddTimerRef/>*/}

        {/*<AddImperativeHandle18/>*/}
        {/*<AddImperativeHandle19/>*/}
        {/*<AddImperativeHandleFrom/>*/}
        {/*<AddContext18/>*/}
        {/*<AddContext19/>*/}

        {/*<AddReactMemo/>*/}
        {/*<AddUseMemo/>*/}

        {/*<AddFunctionCallback/>*/}
        {/*<AddTodoListCallback/>*/}

        {/*<AddDebugValue />*/}
        {/*<AddComponentId/>*/}
        {/*<AddSSRNavigation />*/}

        {/*<AddHook />*/}
        {/*<AddHOCComponent/>*/}

        {/*<AddControlled />*/}
        {/*<AddUncontrolled />*/}
        {/*<AddControlUncontrolled />*/}

        {/*<AddModalPortal />*/}
        {/*<AddSuspenseComponent/>*/}
        {/*<AddSuspenseCard/>*/}
        {/*<AddAsyncModal/>*/}

        {/*<AddCssCard age={81} name="张三" avatar="https://avatars.githubusercontent.com/u/1024025?v=100"/>*/}

        {/*<AddCssComponents />*/}
        {/*<AddExtendComponents/>*/}
        {/*<AddAttrsValue/>*/}
        {/*<AddGlobalStyle/>*/}

        {/*<AddCssAtomization/>*/}

        {/*<ZustandPrice/>*/}
        {/*<ZustandAsync/>*/}
        {/*<ZustandPersist/>*/}
        {/*<ZustandSplit/>*/}

        {/*<ShallowMerge/>*/}
        {/*<TwoDeepUpdate/>*/}
        {/*<StoreWithImmer/>*/}
        {/*<StorePartialize/>*/}
        {/*<StateSlicing/>*/}

        {/*<PersistMiddleware/>*/}
        {/*<ImmerMiddleware/>*/}
        {/*<DevtoolsMiddleware/>*/}
        {/*<CombinedMiddleware/>*/}

        {/*<AuthProtectedDashboard/>*/}
        {/*<TrackedProductDetailPage/>*/}

        {/*<UseImmerUser/>*/}
        {/*<UseImmerTaskList/>*/}
        {/*<UseImmerDashboard/>*/}
        {/*<UseImmerDraggable/>*/}

        <ImmerComparison/>
    </StrictMode>,
);
