import { createContext, useContext, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const { user } = useAuth()
  const socketRef = useRef(null)

  useEffect(() => {
    if (!user) return

    // Connect to backend Socket.io
    const socket = io('http://localhost:3001', {
      transports: ['websocket'],
    })
    socketRef.current = socket

    // Join personal room
    socket.emit('join', user.id)

    // ── Life Lost Event ──────────────────────────────────────
    socket.on('life_lost', (data) => {
      const hearts = '❤️'.repeat(data.livesRemaining) + '🖤'.repeat(3 - data.livesRemaining)
      toast.custom(
        (t) => (
          <div className={`${t.visible ? 'animate-pulse' : ''} bg-dark-700 border border-red-500/50 rounded-xl p-4 max-w-sm shadow-2xl`}
            style={{ boxShadow: '0 0 20px rgba(255,69,58,0.3)' }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💔</span>
              <div>
                <p className="font-bold text-red-400 text-sm">Жизнь сгорела!</p>
                <p className="text-gray-300 text-xs mt-1">{data.message}</p>
                <p className="text-lg mt-2">{hearts}</p>
              </div>
            </div>
          </div>
        ),
        { duration: 6000, position: 'top-right' }
      )
    })

    // ── HW Reviewed Event ────────────────────────────────────
    socket.on('hw_reviewed', (data) => {
      if (data.status === 'accepted') {
        toast.success(data.message, { duration: 5000 })
      } else {
        toast(data.message, {
          icon: '🔁',
          duration: 5000,
          style: { background: '#12121e', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' },
        })
      }
    })

    // ── Coins Earned Event ───────────────────────────────────
    socket.on('coins_earned', (data) => {
      toast.custom(
        (t) => (
          <div className={`bg-dark-700 border border-neon-green/30 rounded-xl p-4 max-w-sm shadow-2xl`}
            style={{ boxShadow: '0 0 20px rgba(0,255,135,0.2)' }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-bounce">🪙</span>
              <div>
                <p className="font-bold text-neon-green text-sm">{data.message}</p>
              </div>
            </div>
          </div>
        ),
        { duration: 4000, position: 'top-right' }
      )
    })

    return () => {
      socket.disconnect()
    }
  }, [user])

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
