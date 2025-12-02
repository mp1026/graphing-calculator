"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Graph } from "@/components/graph"

export function GraphView() {
  const [equation, setEquation] = useState("x^2")
  const [xMin, setXMin] = useState("-10")
  const [xMax, setXMax] = useState("10")
  const [yMin, setYMin] = useState("-10")
  const [yMax, setYMax] = useState("10")
  const [plotEquation, setPlotEquation] = useState("x^2")

  const handlePlot = () => {
    setPlotEquation(equation)
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px] max-w-6xl mx-auto">
      <Card className="bg-card/80 backdrop-blur-sm border-primary/30 neon-glow-cyan">
        <CardHeader>
          <CardTitle className="text-2xl font-mono text-primary text-center">GRAPH DISPLAY</CardTitle>
        </CardHeader>
        <CardContent>
          <Graph
            equation={plotEquation}
            xMin={Number.parseFloat(xMin)}
            xMax={Number.parseFloat(xMax)}
            yMin={Number.parseFloat(yMin)}
            yMax={Number.parseFloat(yMax)}
          />
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-primary/30 neon-glow-cyan h-fit">
        <CardHeader>
          <CardTitle className="text-xl font-mono text-primary">GRAPH CONTROLS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="equation" className="font-mono text-muted-foreground">
              EQUATION
            </Label>
            <Input
              id="equation"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g., x^2, sin(x), 2*x+3"
              className="font-mono bg-background/50 border-primary/50 text-primary"
            />
            <p className="text-xs text-muted-foreground font-mono">
              Use: +, -, *, /, ^, sin(), cos(), tan(), sqrt(), log(), abs()
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="xMin" className="font-mono text-muted-foreground text-xs">
                X MIN
              </Label>
              <Input
                id="xMin"
                type="number"
                value={xMin}
                onChange={(e) => setXMin(e.target.value)}
                className="font-mono bg-background/50 border-primary/50 text-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xMax" className="font-mono text-muted-foreground text-xs">
                X MAX
              </Label>
              <Input
                id="xMax"
                type="number"
                value={xMax}
                onChange={(e) => setXMax(e.target.value)}
                className="font-mono bg-background/50 border-primary/50 text-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yMin" className="font-mono text-muted-foreground text-xs">
                Y MIN
              </Label>
              <Input
                id="yMin"
                type="number"
                value={yMin}
                onChange={(e) => setYMin(e.target.value)}
                className="font-mono bg-background/50 border-primary/50 text-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yMax" className="font-mono text-muted-foreground text-xs">
                Y MAX
              </Label>
              <Input
                id="yMax"
                type="number"
                value={yMax}
                onChange={(e) => setYMax(e.target.value)}
                className="font-mono bg-background/50 border-primary/50 text-primary"
              />
            </div>
          </div>

          <Button
            onClick={handlePlot}
            className="w-full font-mono bg-primary hover:bg-primary/80 text-primary-foreground neon-glow-cyan"
          >
            PLOT GRAPH
          </Button>

          <div className="space-y-2 pt-4 border-t border-primary/30">
            <p className="text-xs font-mono text-muted-foreground">EXAMPLE EQUATIONS:</p>
            {["x^2", "sin(x)", "cos(x)", "x^3 - 2*x", "sqrt(x)", "1/x"].map((eq) => (
              <Button
                key={eq}
                variant="outline"
                size="sm"
                onClick={() => setEquation(eq)}
                className="w-full font-mono text-xs bg-card hover:bg-primary/20 border-primary/30 text-secondary"
              >
                {eq}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
