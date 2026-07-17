export default function WaveAccent({ children, className = '' }) {
  return <span className={`text-ums-accent ${className}`.trim()}>{children}</span>
}
