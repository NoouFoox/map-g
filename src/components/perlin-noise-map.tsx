import { useEffect, useRef } from "react"
import { createNoise2D } from 'simplex-noise'
const seed = () => Math.random()
const  noise = createNoise2D(seed)
const WIDTH = 500
const HEIGHT = 500
const SCALE = 0.009
// 颜色映射函数
const getColor = (value: number) => {
  // 映射噪声值到不同颜色
  if (value < -0.2) return { r: 0, g: 0, b: 255 };  // 水
  if (value < 0) return { r: 255, g: 255, b: 0 };  // 沙漠
  if (value < 0.3) return { r: 0, g: 255, b: 0 };  // 草地
  if (value < 0.5) return { r: 139, g: 69, b: 19 }; // 森林
  return { r: 255, g: 255, b: 255 }; // 雪山
};
export default function PerlinNoiseMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const imageData = ctx.createImageData(WIDTH, HEIGHT)
    for (let x = 0; x < WIDTH; x++) {
      for(let y = 0; y < HEIGHT; y++) {
        const value = noise(x * SCALE, y * SCALE)
        const color = getColor(value); // 获取颜色映射
        const index = (x + y * WIDTH) * 4;
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0)
  },[])
  return (
    <div>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
    </div>
  )
}