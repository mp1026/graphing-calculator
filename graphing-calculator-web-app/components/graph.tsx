"use client"

import { useEffect, useRef } from "react"

interface GraphProps {
  equation: string
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

export function Graph({ equation, xMin, xMax, yMin, yMax }: GraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = rect.width
    const height = rect.height

    // Clear canvas with dark background
    ctx.fillStyle = "rgba(15, 23, 42, 0.95)"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "rgba(0, 255, 255, 0.1)"
    ctx.lineWidth = 1

    const xRange = xMax - xMin
    const yRange = yMax - yMin
    const xStep = Math.pow(10, Math.floor(Math.log10(xRange)))
    const yStep = Math.pow(10, Math.floor(Math.log10(yRange)))

    // Vertical grid lines
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const px = ((x - xMin) / xRange) * width
      ctx.beginPath()
      ctx.moveTo(px, 0)
      ctx.lineTo(px, height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      const py = height - ((y - yMin) / yRange) * height
      ctx.beginPath()
      ctx.moveTo(0, py)
      ctx.lineTo(width, py)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "rgba(0, 255, 255, 0.5)"
    ctx.lineWidth = 2

    // X-axis
    if (yMin <= 0 && yMax >= 0) {
      const y0 = height - (-yMin / yRange) * height
      ctx.beginPath()
      ctx.moveTo(0, y0)
      ctx.lineTo(width, y0)
      ctx.stroke()
    }

    // Y-axis
    if (xMin <= 0 && xMax >= 0) {
      const x0 = (-xMin / xRange) * width
      ctx.beginPath()
      ctx.moveTo(x0, 0)
      ctx.lineTo(x0, height)
      ctx.stroke()
    }

    // Plot the equation
    try {
      ctx.strokeStyle = "rgba(255, 165, 0, 0.9)"
      ctx.lineWidth = 3
      ctx.shadowBlur = 10
      ctx.shadowColor = "rgba(255, 165, 0, 0.5)"

      ctx.beginPath()
      let firstPoint = true

      for (let px = 0; px <= width; px += 1) {
        const x = xMin + (px / width) * xRange
        const y = evaluateEquation(equation, x)

        if (isNaN(y) || !isFinite(y)) continue

        const py = height - ((y - yMin) / yRange) * height

        if (py < -100 || py > height + 100) continue

        if (firstPoint) {
          ctx.moveTo(px, py)
          firstPoint = false
        } else {
          ctx.lineTo(px, py)
        }
      }

      ctx.stroke()
      ctx.shadowBlur = 0
    } catch (error) {
      // Draw error message
      ctx.fillStyle = "rgba(255, 50, 50, 0.9)"
      ctx.font = "14px monospace"
      ctx.fillText("Invalid equation", 10, 30)
    }

    // Draw labels
    ctx.fillStyle = "rgba(0, 255, 255, 0.7)"
    ctx.font = "12px monospace"
    ctx.fillText(`X: [${xMin}, ${xMax}]`, 10, height - 10)
    ctx.fillText(`Y: [${yMin}, ${yMax}]`, 10, 20)
  }, [equation, xMin, xMax, yMin, yMax])

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-square border border-primary/30 rounded-lg neon-glow-cyan"
      style={{ background: "rgba(15, 23, 42, 0.95)" }}
    />
  )
}

function evaluateEquation(equation: string, x: number): number {
  // Replace mathematical functions and operators
  const expr = equation
    .replace(/\^/g, "**")
    .replace(/x/g, `(${x})`)
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/sqrt\(/g, "Math.sqrt(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/abs\(/g, "Math.abs(")

  try {
    return eval(expr)
  } catch {
    return Number.NaN
  }
}
