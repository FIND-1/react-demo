import React, { useState, useRef, useId } from 'react';
/*
* 拓展知识:
* <label> 的 htmlFor 属性 :

1. **焦点转移**：当用户点击带有 [htmlFor]属性的 `<label>` 时，
   浏览器会自动将焦点转移到与该标签相关联的表单元素上（通过匹配 [id])。

2. **提升可访问性**：这提高了网页的可访问性（Accessibility），
  辅助技术如屏幕阅读器可以更好地理解页面结构，并告知用户哪个标签对应哪个输入字段。
* */
// 定义组件 Props 类型
interface FormDemoProps {
    title?: string;
}

// 主组件：受控与非受控组件对比演示
const AddControlUncontrolled: React.FC<FormDemoProps> = ({ title = '受控 vs 非受控组件对比' }) => {
    // ✅ 受控组件状态
    const [controlledValue, setControlledValue] = useState<string>('');
    // ✅非受控组件 ref
    const uncontrolledRef = useRef<HTMLInputElement>(null);
    // ✅ 文件输入 ref（必须非受控）
    const fileInputRef = useRef<HTMLInputElement>(null);
    // ✅ 使用 useId 确保 SSR 安全的唯一 ID
    const controlledDescId = useId();
    const uncontrolledDescId = useId();
    const liveRegionId = useId(); // 🔔 为 aria-live 区域生成唯一 ID

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const uncontrolledValue = uncontrolledRef.current?.value ?? '';
        const file = fileInputRef.current?.files?.[0];

        alert(
            `提交数据:\n` +
            `- 受控输入: ${controlledValue}\n` +
            `- 非受控输入: ${uncontrolledValue}\n` +
            `- 文件名: ${file ? file.name : '无'}`
        );
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>{title}</h2>
            <p><strong>观察区别：</strong>受控输入下方会实时同步，非受控不会。</p>

            {/* 🔔 aria-live 区域：对屏幕阅读器播报受控输入变化 */}
            <div
                id={liveRegionId}
                aria-live="polite"
                style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
            >
                受控输入当前值：{controlledValue || '空'}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', maxWidth: '500px' }}>

                {/* ✅ 受控组件 + aria-describedby + aria-labelledby (可选) */}
                <div>
                    <label htmlFor={controlledDescId}>
                        受控输入：
                    </label>
                    <input
                        id={controlledDescId}
                        type="text"
                        value={controlledValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setControlledValue(e.target.value)}
                        placeholder="React 控制值"
                        aria-describedby={`${controlledDescId}-desc`}
                        aria-live="polite" // ❗ 可选：某些场景下可加，但通常由外部 live region 处理
                    />
                    <div id={`${controlledDescId}-desc`} style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        实时显示输入内容，适合复杂交互。
                    </div>
                </div>

                {/* 📢 视觉反馈 + 屏幕阅读器播报 */}
                <div style={{ color: '#0066cc', paddingLeft: '20px' }}>
                    实时值："{controlledValue}"
                </div>

                {/* ✅ 非受控组件 + aria-describedby */}
                <div>
                    <label htmlFor={uncontrolledDescId}>
                        非受控输入：
                    </label>
                    <input
                        id={uncontrolledDescId}
                        type="text"
                        defaultValue="初始值"
                        ref={uncontrolledRef}
                        placeholder="DOM 控制值"
                        aria-describedby={`${uncontrolledDescId}-desc`}
                    />
                    <div id={`${uncontrolledDescId}-desc`} style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        值由 DOM 管理，提交时通过 ref 读取。
                    </div>
                </div>

                <div style={{ color: '#999', paddingLeft: '20px', fontSize: '14px' }}>
                    （无实时预览）
                </div>

                {/* ✅ 文件上传 + aria-describedby */}
                <div>
                    <label htmlFor="file-input">
                        文件上传：
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        ref={fileInputRef}
                        aria-describedby="file-desc"
                        // 注意：type="file" 无法受控，value 只读
                    />
                    <div id="file-desc" style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        支持图片、PDF 等格式（必须非受控）。
                    </div>
                </div>

                <button type="submit">提交</button>
            </form>

            {/* 💡 可访问性说明 */}
            <div style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
                <h3>📌 可访问性特性</h3>
                <ul>
                    <li><strong>aria-describedby</strong>：关联输入框与描述文本，辅助技术可读出提示。</li>
                    <li><strong>aria-live</strong>：当受控输入变化时，屏幕阅读器会自动播报新值。</li>
                    <li><strong>useId()</strong>：确保所有 ID 在服务端渲染（SSR）中保持一致，避免 hydration 错误。</li>
                    <li><strong>语义化标签</strong>：所有输入均有 <code>label</code>，符合 WCAG 标准。</li>
                </ul>
            </div>
        </div>
    );
};


export default AddControlUncontrolled;