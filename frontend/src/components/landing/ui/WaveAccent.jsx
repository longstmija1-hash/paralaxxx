'use client'

const VARIANTS = {
  /** Плавный бег — hero */
  flow: {
    viewBox: '0 0 120 14',
    path: 'M0 8 C15 8 15 3 30 3 S45 8 60 8 S75 3 90 3 S105 8 120 8 S135 3 150 3 S165 8 180 8 S195 3 210 3 S225 8 240 8',
    fill: 'M0 8 C15 8 15 3 30 3 S45 8 60 8 S75 3 90 3 S105 8 120 8 S135 3 150 3 S165 8 180 8 S195 3 210 3 S225 8 240 8 V14 H0 Z',
    strokeWidth: 2.6,
    showFill: true,
  },
  /** Высокая амплитуда — urgency / chaos */
  bounce: {
    viewBox: '0 0 120 16',
    path: 'M0 10 C10 10 12 2 24 2 S36 10 48 10 S60 2 72 2 S84 10 96 10 S108 2 120 2 S132 10 144 10 S156 2 168 2 S180 10 192 10 S204 2 216 2 S228 10 240 10',
    fill: 'M0 10 C10 10 12 2 24 2 S36 10 48 10 S60 2 72 2 S84 10 96 10 S108 2 120 2 S132 10 144 10 S156 2 168 2 S180 10 192 10 S204 2 216 2 S228 10 240 10 V16 H0 Z',
    strokeWidth: 2.8,
    showFill: true,
  },
  /** Пунктир / дедлайн */
  pulse: {
    viewBox: '0 0 120 12',
    path: 'M0 7 C12 7 12 3 24 3 S36 7 48 7 S60 3 72 3 S84 7 96 7 S108 3 120 3 S132 7 144 7 S156 3 168 3 S180 7 192 7 S204 3 216 3 S228 7 240 7',
    fill: null,
    strokeWidth: 2.4,
    showFill: false,
  },
  /** Мягкая дуга — результат / забота */
  arc: {
    viewBox: '0 0 120 12',
    path: 'M2 9 C30 2 90 2 118 9',
    fill: 'M2 9 C30 2 90 2 118 9 L118 12 L2 12 Z',
    strokeWidth: 2.8,
    showFill: true,
  },
  /** Зигзаг / напряжение */
  zigzag: {
    viewBox: '0 0 120 14',
    path: 'M0 8 L12 3 L24 10 L36 3 L48 10 L60 3 L72 10 L84 3 L96 10 L108 3 L120 8 L132 3 L144 10 L156 3 L168 10 L180 3 L192 10 L204 3 L216 10 L228 3 L240 8',
    fill: null,
    strokeWidth: 2.3,
    showFill: false,
  },
  /** Две волны — тандем / два трека */
  double: {
    viewBox: '0 0 120 16',
    path: 'M0 6 C14 6 14 2 28 2 S42 6 56 6 S70 2 84 2 S98 6 112 6 S126 2 140 2 S154 6 168 6 S182 2 196 2 S210 6 224 6 S238 2 240 2',
    path2: 'M0 12 C14 12 14 8 28 8 S42 12 56 12 S70 8 84 8 S98 12 112 12 S126 8 140 8 S154 12 168 12 S182 8 196 8 S210 12 224 12 S238 8 240 8',
    fill: null,
    strokeWidth: 2.1,
    showFill: false,
  },
  /** Жирный «кистевой» штрих */
  brush: {
    viewBox: '0 0 120 14',
    path: 'M0 9 C18 4 28 11 45 7 S70 3 90 8 S105 12 120 7 S140 3 160 9 S180 12 200 6 S220 3 240 8',
    fill: 'M0 9 C18 4 28 11 45 7 S70 3 90 8 S105 12 120 7 S140 3 160 9 S180 12 200 6 S220 3 240 8 V14 H0 Z',
    strokeWidth: 3.2,
    showFill: true,
  },
  /** Обратный ripple */
  ripple: {
    viewBox: '0 0 120 14',
    path: 'M0 7 C10 2 20 12 30 7 S50 2 60 7 S70 12 80 7 S90 2 100 7 S110 12 120 7 S130 2 140 7 S150 12 160 7 S170 2 180 7 S190 12 200 7 S210 2 220 7 S230 12 240 7',
    fill: 'M0 7 C10 2 20 12 30 7 S50 2 60 7 S70 12 80 7 S90 2 100 7 S110 12 120 7 S130 2 140 7 S150 12 160 7 S170 2 180 7 S190 12 200 7 S210 2 220 7 S230 12 240 7 V14 H0 Z',
    strokeWidth: 2.5,
    showFill: true,
  },
  /** Короткий акцент с «искрами» */
  spark: {
    viewBox: '0 0 120 12',
    path: 'M8 8 C35 3 85 3 112 8',
    fill: null,
    strokeWidth: 2.7,
    showFill: false,
    dots: true,
  },
}

/**
 * @param {'flow'|'bounce'|'pulse'|'arc'|'zigzag'|'double'|'brush'|'ripple'|'spark'} [variant]
 */
export default function WaveAccent({ children, className = '', variant = 'flow' }) {
  const config = VARIANTS[variant] ?? VARIANTS.flow

  return (
    <span className={`wave-accent wave-v-${variant} text-ums-accent ${className}`.trim()}>
      {children}
      <svg
        className="wave-accent-svg"
        viewBox={config.viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <g className="wave-accent-flow">
          {config.showFill && config.fill && (
            <path className="wave-accent-fill" d={config.fill} />
          )}
          <path
            className="wave-accent-path"
            d={config.path}
            fill="none"
            stroke="#7c91f9"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {config.path2 && (
            <path
              className="wave-accent-path wave-accent-path--secondary"
              d={config.path2}
              fill="none"
              stroke="#7c91f9"
              strokeWidth={config.strokeWidth * 0.85}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              opacity="0.55"
            />
          )}
          {config.dots && (
            <>
              <circle className="wave-accent-dot" cx="8" cy="8" r="2.2" fill="#7c91f9" />
              <circle className="wave-accent-dot wave-accent-dot--end" cx="112" cy="8" r="2.2" fill="#7c91f9" />
            </>
          )}
        </g>
      </svg>
    </span>
  )
}
