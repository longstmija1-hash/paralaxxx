export default function SectionShell({
  id,
  children,
  className = '',
  variant = 'muted',
  containerClassName = '',
}) {
  const bg =
    variant === 'white' ? 'bg-white' : variant === 'tint' ? 'bg-ums-tint' : 'bg-ums-bg'

  return (
    <section id={id} className={`landing-section py-12 sm:py-16 md:py-24 px-4 ${bg} ${className}`}>
      <div className={`max-w-6xl mx-auto ${containerClassName}`}>{children}</div>
    </section>
  )
}
