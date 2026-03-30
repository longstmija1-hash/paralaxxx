import React from 'react'

export default function AnnouncementMarquee() {
  const text = "⚡ ПОДГОТОВКА К ЭКЗАМЕНАМ ЗА 2 МЕСЯЦА | ЛЮБОЙ УРОВЕНЬ СЛОЖНОСТИ | МЫ БЕРЕМСЯ ТАМ, ГДЕ ДРУГИЕ СДАЮТСЯ | УСПЕЙ ЗАПИСАТЬСЯ ⚡"

  // Важно: нужно минимум 3-4 копии, чтобы на больших мониторах (например, 1920px или 2560px)
  // строка не обрывалась пустотой, так как мы двигаем блок ровно на 50% влево.
  const repeatedText = [...Array(1)].map((_, i) => (
    <span key={i} className="mx-8">{text}</span>
  ))

  const handleMouseEnter = (e) => {
    const anims = e.currentTarget.getAnimations()
    anims.forEach(anim => { anim.playbackRate = 0.25 }) // Замедляем в 4 раза
  }

  const handleMouseLeave = (e) => {
    const anims = e.currentTarget.getAnimations()
    anims.forEach(anim => { anim.playbackRate = 1 }) // Возвращаем нормальную скорость
  }

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-animation {
          animation: ticker-scroll 25s linear infinite;
        }
      `}</style>
      <div className="absolute top-[73px] left-0 right-0 z-40 h-12 bg-dark-900/60 backdrop-blur-md border-y-2 border-neon-purple/50 overflow-hidden flex items-center group drop-shadow-[0_0_15px_rgba(191,90,242,0.4)]">
        <div
          className="flex shrink-0 ticker-animation font-mono text-base font-bold w-max cursor-default transition-all duration-300"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* We need two identical blocks side-by-side to make the -50% translation loop seamless */}
          <div className="flex shrink-0 px-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-green drop-shadow-[0_0_8px_rgba(191,90,242,0.8)]">
            {repeatedText}
          </div>
          <div className="flex shrink-0 px-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-green drop-shadow-[0_0_8px_rgba(191,90,242,0.8)]">
            {repeatedText}
          </div>
        </div>
      </div>
    </>
  )
}
