"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  minutes: number
  onExpire?: () => void
}

export function CountdownTimer({ minutes, onExpire }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(minutes * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval)
          onExpire?.()
          return 0
        }
        return prevSeconds - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onExpire])

  const minutesLeft = Math.floor(seconds / 60)
  const secondsLeft = seconds % 60

  return (
    <div className="font-mono text-2xl font-bold">
      {minutesLeft.toString().padStart(2, "0")}:{secondsLeft.toString().padStart(2, "0")}
    </div>
  )
}
