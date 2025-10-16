import { useEffect, useRef, useState } from "react"

export interface WatermarkOptions {
    content: string
    width?: number
    height?: number
    fontSize?: number
    fontColor?: string
    zIndex?: number
    rotate?: number
    gapX?: number
    gapY?: number
}

// 默认配置
const defaultOptions = (): Partial<WatermarkOptions> => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        fontSize: 16,
        fontColor: "black",
        zIndex: 9999,
        rotate: -30,
        gapX: 200,
        gapY: 100,
    }
}

export const useWatermark = (options: WatermarkOptions) => {
    const [watermarkOptions, setWatermarkOptions] = useState<WatermarkOptions>({
        ...defaultOptions(),
        ...options,
    })

    const watermarkRef = useRef<HTMLDivElement | null>(null)

    const renderWatermark = (opts: WatermarkOptions) => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        canvas.width = opts.gapX!
        canvas.height = opts.gapY!

        ctx.translate(opts.gapX! / 2, opts.gapY! / 2)
        ctx.rotate((opts.rotate! * Math.PI) / 180)
        ctx.font = `${opts.fontSize}px sans-serif`
        ctx.textAlign = "center"
        ctx.fillStyle = opts.fontColor!
        ctx.globalAlpha = 0.15
        ctx.fillText(opts.content, 0, 0)

        if (watermarkRef.current) {
            watermarkRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`
            watermarkRef.current.style.backgroundSize = `${opts.gapX}px ${opts.gapY}px`
        }
    }

    const updateWatermark = (newOptions: Partial<WatermarkOptions>) => {
        setWatermarkOptions((prev) => ({
            ...prev,
            ...newOptions,
        }))
    }

    useEffect(() => {
        // 创建容器
        const div = document.createElement("div")
        div.id = "watermark"
        div.style.position = "fixed"
        div.style.top = "0"
        div.style.left = "0"
        div.style.width = `${watermarkOptions.width}px`
        div.style.height = `${watermarkOptions.height}px`
        div.style.pointerEvents = "none"
        div.style.zIndex = `${watermarkOptions.zIndex}`
        div.style.overflow = "hidden"
        document.body.appendChild(div)
        watermarkRef.current = div

        renderWatermark(watermarkOptions)

        // resize 时更新
        const resizeHandler = () => {
            updateWatermark({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener("resize", resizeHandler)

        return () => {
            document.body.removeChild(div)
            window.removeEventListener("resize", resizeHandler)
        }
    }, [])

    return [updateWatermark, watermarkOptions] as const
}
