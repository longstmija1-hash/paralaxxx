import { useState, useEffect, useRef } from 'react'

// Символы для глитча: кириллица + латиница + спецсимволы
const GLITCH_CHARS = 'ДЖЗИЦЧШЩabcdefghij0123456789!@#$%[]{}|<>?/_=+'
const GLITCH_COLORS = ['#3b82f6', '#00ff87', '#ff0040', '#f59e0b', '#a855f7', '#22d3ee']

const TEXT = 'ПАРАЛЛАКС'

const sizeMap = {
  sm: { fontSize: 18, letterSpacing: '0.10em' },
  md: { fontSize: 20, letterSpacing: '0.10em' },
  lg: { fontSize: 30, letterSpacing: '0.12em' },
}

const initLetters = () =>
  TEXT.split('').map((char) => ({ char, glitching: false, color: null, shift: 0 }))

/**
 * ParallaxLogo — логотип «ПАРАЛЛАКС» с глитч-эффектом при наведении.
 * При hover каждая буква хаотично перебирает случайные символы,
 * затем поочерёдно (слева направо) «возвращается» на место.
 */
const ParallaxLogo = ({ size = 'md', onClick }) => {
  const [hovered, setHovered] = useState(false)
  const [letters, setLetters] = useState(initLetters)
  const intervalRef = useRef(null)
  const frameRef = useRef(0)
  const sz = sizeMap[size] || sizeMap.md

  useEffect(() => {
    clearInterval(intervalRef.current)
    frameRef.current = 0

    if (!hovered) {
      setLetters(initLetters())
      return
    }

    const TOTAL_FRAMES = 18

    intervalRef.current = setInterval(() => {
      frameRef.current++
      const frame = frameRef.current

      if (frame > TOTAL_FRAMES) {
        clearInterval(intervalRef.current)
        setLetters(initLetters())
        return
      }

      setLetters(
        TEXT.split('').map((original, i) => {
          // буква «успокаивается» с сдвигом по индексу (слева→направо)
          const settleAt = Math.floor(
            TOTAL_FRAMES * 0.35 + (i / TEXT.length) * TOTAL_FRAMES * 0.55
          )

          if (frame >= settleAt) {
            return { char: original, glitching: false, color: null, shift: 0 }
          }

          return {
            char: GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
            glitching: true,
            color: GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)],
            // горизонтальный сдвиг — лёгкое «дрожание»
            shift: (Math.random() - 0.5) * 4,
          }
        })
      )
    }, 55)

    return () => clearInterval(intervalRef.current)
  }, [hovered])

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontWeight: 900,
        letterSpacing: sz.letterSpacing,
        textTransform: 'uppercase',
        userSelect: 'none',
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        lineHeight: 1,
        // общее свечение логотипа при hover
        filter: hovered
          ? 'drop-shadow(0 0 6px rgba(59,130,246,0.5))'
          : 'none',
        transition: 'filter 0.3s ease',
      }}
      aria-label="ПАРАЛЛАКС — на главную"
    >
      {letters.map(({ char, glitching, color, shift }, i) => (
        <span
          key={i}
          style={{
            fontSize: sz.fontSize,
            display: 'inline-block',
            // фиксированная ширина — нет прыжков при смене символа
            minWidth: `${sz.fontSize * 0.66}px`,
            textAlign: 'center',
            color: glitching ? color : '#f8fafc',
            // хроматическая аберрация на глитч-буквах
            textShadow: glitching
              ? `2px 0 #ff0040, -2px 0 #00a8ff, 0 0 12px ${color}cc`
              : 'none',
            transform: glitching ? `translateX(${shift}px)` : 'translateX(0)',
            transition: glitching ? 'none' : 'color 0.15s ease, text-shadow 0.15s ease, transform 0.1s ease',
          }}
        >
          {char}
        </span>
      ))}
    </button>
  )
}

export default ParallaxLogo
