export default function UmsBadge({ children, variant = 'dark' }) {
  if (variant === 'discount') {
    return (
      <span className="px-2 py-0.5 rounded-md bg-ums-accent text-white text-xs font-bold">
        {children}
      </span>
    )
  }

  if (variant === 'accent') {
    return (
      <span className="px-2.5 py-1 rounded-full bg-ums-tint text-ums-accent text-[11px] font-bold uppercase tracking-wide border border-[#dce3ff]">
        {children}
      </span>
    )
  }

  return (
    <span className="px-2.5 py-1 rounded-full bg-[#111] text-white text-[11px] font-bold uppercase tracking-wide">
      {children}
    </span>
  )
}
