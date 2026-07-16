export default function UmsCard({ children, className = '', padding = 'default', hover = true }) {
  const pad = padding === 'lg' ? 'p-5 sm:p-8' : padding === 'sm' ? 'p-3.5 sm:p-5' : 'p-5 sm:p-7'
  const hoverCls = hover
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(124,145,249,0.12)]'
    : ''

  return (
    <div
      className={`bg-white border border-ums-border rounded-[20px] sm:rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${pad} ${hoverCls} ${className}`}
    >
      {children}
    </div>
  )
}
