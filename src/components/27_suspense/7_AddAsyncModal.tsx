import AsyncModal from './6_AsyncModal.tsx';
import {useState} from "react";
//异步Modal 组件
function AddAsyncModal() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <h2>Suspense + createPortal ---异步Modal </h2>
            <button onClick={() => setOpen(true)}>打开异步 Modal</button>
            <AsyncModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
}

export default AddAsyncModal;