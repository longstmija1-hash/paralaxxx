export default function UmsButton({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  href,
  onClick,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-bold transition-colors duration-200 cursor-pointer select-none disabled:opacity-60 disabled:pointer-events-none'

  const variants = {
    primary: 'px-6 py-3 sm:py-3.5 rounded-full bg-[#111] text-white hover:bg-[#222] text-sm sm:text-base',
    secondary:
      'px-6 py-3 sm:py-3.5 rounded-full bg-white text-[#111] border border-[#ececec] hover:bg-[#fafafa] text-sm sm:text-base',
    ghost: 'px-4 py-2 rounded-full text-[#6b7280] hover:text-[#111] hover:bg-[#f5f5f5] text-sm',
  }

  const cls = `${base} ${variants[variant] || variants.primary} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
