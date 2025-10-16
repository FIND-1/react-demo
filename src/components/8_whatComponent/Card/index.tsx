import './index.css'

export default function Card() {
    return (
        <div className='card'>
            <header>
                <div>Card标题</div>
                <div>Card副标题</div>
            </header>
            <main>
                内容区域
            </main>
            <footer>
                <button onClick={() => window.onShow()}>确认</button>
                <button>取消</button>
            </footer>
        </div>
    )
}
