'use client'

import { useRef, useState, useCallback, useMemo } from 'react'
import { PhotoModel } from '@/lib/types'

const FRAMES: { key: keyof PhotoModel; angle: number }[] = [
  { key: 'front', angle: 0 },
  { key: 'right', angle: 90 },
  { key: 'back', angle: 180 },
  { key: 'left', angle: 270 },
]

function angularDiff(a: number, b: number) {
  let d = Math.abs(a - b) % 360
  if (d > 180) d = 360 - d
  return d
}

export default function SpinViewer({ photoModel, name }: { photoModel: PhotoModel; name: string }) {
  const [angle, setAngle] = useState(0)
  const dragging = useRef(false)
  const lastX = useRef(0)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true
    lastX.current = e.clientX
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    setAngle((a) => (a - dx * 0.6 + 360) % 360)
  }, [])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  // Snap to whichever real photo is angularly closest — always show a single
  // crisp, correctly-framed shot rather than blending two different angles
  // into a ghosty double-exposure.
  const activeKey = useMemo(
    () =>
      FRAMES.reduce((best, f) =>
        angularDiff(angle, f.angle) < angularDiff(angle, best.angle) ? f : best
      ).key,
    [angle]
  )

  return (
    <div
      className="relative w-full h-full select-none touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {FRAMES.map(({ key }) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={key}
          src={photoModel[key]}
          alt={`${name} — ${key}`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain p-10 pointer-events-none transition-opacity duration-150 ease-out"
          style={{ opacity: key === activeKey ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none">
        <div className="w-40 h-6 rounded-[50%] bg-night-900/10 blur-md" />
      </div>
    </div>
  )
}
