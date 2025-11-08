"use client"

import { useState, useEffect } from "react"

interface NetEaseMusicPlayerProps {
  songId: string
}

export default function NetEaseMusicPlayer({ songId }: NetEaseMusicPlayerProps) {
  const [canUseIframe, setCanUseIframe] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment and if iframe embedding might work
    const isBrowser = typeof window !== "undefined"
    const isMobile =
      isBrowser && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // NetEase iframe works better on desktop browsers
    setCanUseIframe(isBrowser && !isMobile)
  }, [])

  if (!canUseIframe) {
    return (
      <div className="fallback-player">
        <div className="fallback-player-icon">
          <div className="fallback-player-triangle"></div>
        </div>
        <p className="fallback-player-text">
          NetEase Cloud Music player not available on this device.
          <br />
          Please use the link below to listen.
        </p>
      </div>
    )
  }

  return (
    <div className="netease-player-container">
      <iframe
        src={`https://music.163.com/outchain/player?type=2&id=${songId}&auto=0&height=66`}
        frameBorder="no"
        marginWidth={0}
        marginHeight={0}
        width="100%"
        height="86"
        className="netease-player"
        title="NetEase Music Player"
      />
    </div>
  )
}
