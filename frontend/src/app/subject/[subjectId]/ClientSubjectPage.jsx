"use client";

import { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { FaTelegramPlane } from 'react-icons/fa';

const OrderModal = lazy(() => import('../../../components/OrderModal'));

const Navbar = ({ openModal }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-500">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="relative flex items-center justify-center w-10 h-10 rounded bg-dark-800 border border-neon-purple/40 overflow-hidden shadow-[0_0_10px_rgba(191,90,242,0.2)] group-hover:shadow-[0_0_20px_rgba(191,90,242,0.6)] group-hover:border-neon-purple transition-all duration-300">
          <div className="absolute inset-0 bg-neon-purple/10 group-hover:bg-neon-purple/20 transition-colors" />
          <span className="relative z-10 text-lg font-mono font-black text-neon-purple drop-shadow-[0_0_5px_rgba(191,90,242,0.8)]">100</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-black text-white text-lg leading-none tracking-wide uppercase transition-colors duration-300">
            С<span className="text-neon-green ml-[1px] mr-[1px] drop-shadow-[0_0_8px_rgba(0,255,135,0.8)]">100</span>ТЫЙ
          </span>
          <span className="text-[9px] text-gray-400 font-mono tracking-[0.3em] uppercase mt-1">
            Уровень
          </span>
        </div>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
        <Link href="/" className="hover:text-neon-green transition-colors">На главную</Link>
        <Link href="/#courses" className="hover:text-neon-green transition-colors">Все предметы</Link>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={openModal} className="btn-neon text-sm px-4 py-2">Записаться</button>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="border-t border-dark-500 py-12 px-4 bg-dark-900/50">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex items-center gap-3 group mb-4">
          <div className="relative flex items-center justify-center w-10 h-10 rounded bg-dark-800 border border-neon-purple/40 overflow-hidden shadow-[0_0_10px_rgba(191,90,242,0.2)]">
            <span className="relative z-10 text-lg font-mono font-black text-neon-purple">100</span>
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="font-black text-white text-lg leading-none tracking-wide uppercase">
              С<span className="text-neon-green ml-[1px] mr-[1px]">100</span>ТЫЙ
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">© 2026 С100ТЫЙ УРОВЕНЬ. Все права защищены.</p>
      </div>
      <div className="flex flex-col items-center md:items-end gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a href="tel:+79058043110" className="font-mono text-neon-green text-xl hover:text-white transition-colors">
            +7 (905) 804-31-10
          </a>
          <div className="flex items-center gap-5 text-2xl">
            <a href="https://t.me/BNp0D0KTpAnnA" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neon-purple transition-all">
              <FaTelegramPlane />
            </a>
            <a href="https://max.ru/u/f9LHodD0cOJH9YLhQHH7ahys0fzwdOZZfVcPexgH8nLQBtS8XZ0L9GN6yuI" target="_blank" rel="noopener noreferrer" className="text-neutral-400 font-black text-xl tracking-widest hover:text-neon-purple transition-all">
              MAX
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-neon-green transition-colors">На главную</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function ClientSubjectPage({ subject }) {
  const [modalOpen, setModalOpen] = useState(false);
  
  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Navbar openModal={openModal} />

      <main className="flex-grow pt-40 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 cyber-bg opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <div className="w-full mb-10">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-neon-green transition-colors text-sm font-mono gap-2">
              <span className="text-neon-purple">←</span> Назад к списку уровней
            </Link>
          </div>

          <header className="text-center mb-16">
            <div className="text-7xl mb-6">
              {subject.emoji}
            </div>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 ${subject.color === 'neon-purple' ? 'text-neon-purple' : 'text-neon-green'} drop-shadow-[0_0_15px_currentColor]`}
            >
              {subject.title}
            </h1>
            <p
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              {subject.description}
            </p>
          </header>

          <div
            className={`cyber-card w-full mb-16 ${subject.color === 'neon-purple' ? 'border-neon-purple/40 glow-purple' : 'border-neon-green/40 glow-green'}`}
          >
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-dark-700 pb-4">Почему мы?</h2>
            <ul className="grid md:grid-cols-2 gap-6">
              {subject.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-gray-300">
                  <div className={`mt-1 shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-${subject.color}/20 text-${subject.color}`}>
                    ✓
                  </div>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button onClick={openModal} className="btn-neon text-lg px-10 py-5">
              🚀 Записаться на первый урок
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <Suspense fallback={null}>
        <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialData={{ selectedProgram: subject.programName }} />
      </Suspense>
    </div>
  );
}
