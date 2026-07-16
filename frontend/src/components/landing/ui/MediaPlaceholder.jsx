import { ImageIcon } from 'lucide-react'

const ASPECT = {
  '4/3': 'aspect-[4/3]',
  '4/5': 'aspect-[4/5]',
  '16/9': 'aspect-video',
  '16/10': 'aspect-[16/10]',
  '1/1': 'aspect-square',
}

export default function MediaPlaceholder({
  label = 'Изображение',
  aspect = '4/3',
  rounded = '28px',
  overlayText,
  circle = false,
  className = '',
}) {
  const radius = circle ? '9999px' : rounded
  const aspectClass = circle ? 'aspect-square w-full h-full' : ASPECT[aspect] || ASPECT['4/3']

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-ums-tint via-[#dce3ff] to-[#c5d0ff] border border-[#dce3ff] ${aspectClass} ${className}`}
      style={{ borderRadius: radius }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.7) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124,145,249,0.35) 0%, transparent 45%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/90 border border-white flex items-center justify-center shadow-sm">
          <ImageIcon className="w-6 h-6 text-ums-accent" aria-hidden />
        </div>
        <span className="text-xs sm:text-sm font-medium text-ums-muted">{label}</span>
      </div>
      {overlayText && (
        <div
          className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-[#111]/70 via-[#111]/35 to-transparent"
          style={{ borderRadius: circle ? '9999px' : `0 0 ${rounded} ${rounded}` }}
        >
          <p className="text-white font-bold text-sm sm:text-base leading-snug">{overlayText}</p>
        </div>
      )}
    </div>
  )
}
