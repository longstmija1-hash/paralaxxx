'use client'

import Image from 'next/image'

const SIZES = {
  sm: {
    mark: 36,
    text: 'text-[0.8rem] tracking-[0.1em]',
    gap: 'gap-1.5',
    radius: 'rounded-lg',
    pad: 'p-0.5',
  },
  md: {
    mark: 36,
    text: 'text-[0.95rem] tracking-[0.14em]',
    gap: 'gap-2',
    radius: 'rounded-xl',
    pad: 'p-[3px]',
  },
  lg: {
    mark: 48,
    text: 'text-lg tracking-[0.16em]',
    gap: 'gap-2.5',
    radius: 'rounded-xl',
    pad: 'p-1',
  },
}

/**
 * Логотип: знак (хамелеон) + wordmark Unbounded.
 * Без глитча — спокойный hover под светлый Ums-лендинг.
 *
 * @param {boolean} [link=true] — если false, рендерит span (когда уже обёрнут в Link)
 */
export default function ParallaxLogo({
  size = 'md',
  href = '/',
  className = '',
  showWordmark = true,
  link = true,
  onClick,
}) {
  const sz = SIZES[size] || SIZES.md

  const content = (
    <>
      <span
        className={`relative shrink-0 overflow-hidden bg-ums-tint ring-1 ring-[#dce3ff] shadow-[0_2px_10px_rgba(124,145,249,0.12)] transition-[box-shadow,transform] duration-200 group-hover:shadow-[0_4px_16px_rgba(124,145,249,0.22)] group-hover:-translate-y-px ${sz.radius}`}
        style={{ width: sz.mark, height: sz.mark }}
      >
        <Image
          src="/icon.png"
          alt=""
          width={sz.mark}
          height={sz.mark}
          className={`h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.04] ${sz.pad}`}
          priority={size !== 'lg'}
        />
      </span>
      {showWordmark && (
        <span
          className={`font-display font-bold leading-none text-[#111] transition-colors duration-200 group-hover:text-ums-accent ${sz.text}`}
        >
          ПАРАЛЛАКС
        </span>
      )}
    </>
  )

  const sharedClass = `group inline-flex items-center ${sz.gap} cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent/40 focus-visible:ring-offset-2 rounded-xl ${className}`.trim()

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={sharedClass}
        aria-label="ПАРАЛЛАКС — на главную"
      >
        {content}
      </button>
    )
  }

  if (!link) {
    return <span className={sharedClass}>{content}</span>
  }

  return (
    <a href={href} className={sharedClass} aria-label="ПАРАЛЛАКС — на главную">
      {content}
    </a>
  )
}
