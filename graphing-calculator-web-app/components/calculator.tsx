"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [currentValue, setCurrentValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const handleOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (currentValue === null) {
      setCurrentValue(inputValue)
    } else if (operation) {
      const newValue = performOperation(currentValue, inputValue, operation)
      setDisplay(String(newValue))
      setCurrentValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const performOperation = (firstValue: number, secondValue: number, op: string): number => {
    switch (op) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0
      case "^":
        return Math.pow(firstValue, secondValue)
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = Number.parseFloat(display)

    if (currentValue !== null && operation) {
      const newValue = performOperation(currentValue, inputValue, operation)
      setDisplay(String(newValue))
      setCurrentValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setCurrentValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const handleFunction = (func: string) => {
    const value = Number.parseFloat(display)
    let result = 0

    switch (func) {
      case "sin":
        result = Math.sin(value)
        break
      case "cos":
        result = Math.cos(value)
        break
      case "tan":
        result = Math.tan(value)
        break
      case "√":
        result = Math.sqrt(value)
        break
      case "log":
        result = Math.log10(value)
        break
      case "ln":
        result = Math.log(value)
        break
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const buttons = [
    ["sin", "cos", "tan", "√"],
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C", "^", "log", "ln"],
  ]

  return (
    <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-primary/30 neon-glow-cyan">
      <CardHeader>
        <CardTitle className="text-2xl font-mono text-primary text-center">BASIC OPERATIONS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            value={display}
            readOnly
            className="text-right text-3xl md:text-4xl font-mono h-20 bg-background/50 border-primary/50 text-primary neon-glow-cyan"
          />
          <div className="absolute top-2 left-3 text-xs text-muted-foreground font-mono">
            {operation ? `${currentValue} ${operation}` : ""}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn) => {
            const isOperator = ["+", "-", "×", "÷", "^"].includes(btn)
            const isFunction = ["sin", "cos", "tan", "√", "log", "ln"].includes(btn)
            const isEquals = btn === "="
            const isClear = btn === "C"

            return (
              <Button
                key={btn}
                onClick={() => {
                  if (btn === "C") handleClear()
                  else if (btn === "=") handleEquals()
                  else if (btn === ".") handleDecimal()
                  else if (isOperator) handleOperation(btn)
                  else if (isFunction) handleFunction(btn)
                  else handleNumber(btn)
                }}
                variant={isOperator || isEquals ? "default" : isClear ? "destructive" : "outline"}
                className={`h-16 text-lg font-mono transition-all ${
                  isOperator || isEquals
                    ? "bg-primary hover:bg-primary/80 text-primary-foreground neon-glow-cyan"
                    : isClear
                      ? "bg-destructive hover:bg-destructive/80 neon-glow-orange"
                      : "bg-card hover:bg-primary/20 border-primary/30"
                } ${isFunction ? "text-secondary neon-text-orange" : ""}`}
              >
                {btn}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
