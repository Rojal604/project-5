"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface PriceRangeSliderProps {
  min: number
  max: number
  step: number
  onRangeChange: (min: number, max: number) => void
}

export function PriceRangeSlider({ min: initialMin, max: initialMax, step, onRangeChange }: PriceRangeSliderProps) {
  const [min, setMin] = useState(initialMin)
  const [max, setMax] = useState(initialMax)

  useEffect(() => {
    onRangeChange(min, max)
  }, [min, max])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), max - step)
    setMin(newMin)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), min + step)
    setMax(newMax)
  }

  const minPercent = ((min - initialMin) / (initialMax - initialMin)) * 100
  const maxPercent = ((max - initialMin) / (initialMax - initialMin)) * 100

  return (
    <div className="space-y-4">
      <div className="relative pt-2 pb-4">
        <input
          type="range"
          min={initialMin}
          max={initialMax}
          value={min}
          onChange={handleMinChange}
          className="absolute w-full h-1 bg-border rounded-lg pointer-events-none appearance-none z-5"
          style={{
            background: `linear-gradient(to right, var(--color-border) 0%, var(--color-border) ${minPercent}%, var(--color-primary) ${minPercent}%, var(--color-primary) ${maxPercent}%, var(--color-border) ${maxPercent}%, var(--color-border) 100%)`,
          }}
        />
        <input
          type="range"
          min={initialMin}
          max={initialMax}
          value={max}
          onChange={handleMaxChange}
          className="absolute w-full h-1 bg-transparent rounded-lg pointer-events-none appearance-none z-4"
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Math.max(Number(e.target.value), initialMin))}
            className="w-20 px-2 py-1 text-xs border border-border rounded bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Math.min(Number(e.target.value), initialMax))}
            className="w-20 px-2 py-1 text-xs border border-border rounded bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  )
}
