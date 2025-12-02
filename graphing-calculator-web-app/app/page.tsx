"use client"

import { Calculator } from "@/components/calculator"
import { GraphView } from "@/components/graph-view"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [activeTab, setActiveTab] = useState("calculator")

  return (
    <main className="min-h-screen tron-grid scanlines flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background/50" />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 neon-text-cyan font-mono tracking-wider">
            GRAPHING CALCULATOR
          </h1>
          <p className="text-muted-foreground text-sm md:text-base font-mono">DIGITAL COMPUTATION SYSTEM • V2.0</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 bg-card border border-primary/30 neon-glow-cyan">
            <TabsTrigger
              value="calculator"
              className="font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              BASIC OPS
            </TabsTrigger>
            <TabsTrigger
              value="graph"
              className="font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              GRAPHING
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-0">
            <Calculator />
          </TabsContent>

          <TabsContent value="graph" className="mt-0">
            <GraphView />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
