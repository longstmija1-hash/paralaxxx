import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function ShopPage() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [balance, setBalance] = useState(0)
  const [orders, setOrders] = useState([])
  const [purchasing, setPurchasing] = useState(null)
  const [tab, setTab] = useState('shop') // shop | orders

  useEffect(() => {
    Promise.all([
      axios.get('/api/shop/items'),
      axios.get('/api/gamification/me'),
      axios.get('/api/shop/orders'),
    ]).then(([itemsRes, gamRes, ordersRes]) => {
      setItems(itemsRes.data.items)
      setBalance(gamRes.data.gamification.coin_balance)
      setOrders(ordersRes.data.orders)
    }).catch(console.error)
  }, [])

  const handlePurchase = async (item) => {
    if (balance < item.coin_price) {
      toast.error(`Нужно ${item.coin_price} 🪙, а у тебя ${balance}`)
      return
    }
    setPurchasing(item.id)
    try {
      const { data } = await axios.post('/api/shop/orders', { itemId: item.id })
      setBalance(b => b - data.coinsSpent)
      toast.success(data.message)
      const ordersRes = await axios.get('/api/shop/orders')
      setOrders(ordersRes.data.orders)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Ошибка покупки')
    } finally {
      setPurchasing(null)
    }
  }

  // Demo items if API not connected
  const demoItems = [
    { id: 1, name: 'CodeSchool Худи', description: 'Тёмно-серое с неоновым лого CS', image_url: null, coin_price: 500, stock: 20 },
    { id: 2, name: 'Стикер-пак', description: '10 стикеров с мемами про код', image_url: null, coin_price: 50, stock: 100 },
    { id: 3, name: 'Коврик для мыши', description: 'XXL коврик, дизайн Cyberpunk', image_url: null, coin_price: 200, stock: 15 },
    { id: 4, name: '🍕 Пицца домой', description: 'Промокод на пиццу с доставкой', image_url: null, coin_price: 300, stock: 5 },
    { id: 5, name: 'Консультация Senior', description: '1 час с опытным разработчиком', image_url: null, coin_price: 800, stock: -1 },
    { id: 6, name: '3D Принт медали', description: 'Именная 3D-медаль «Прошёл курс»', image_url: null, coin_price: 150, stock: 30 },
  ]

  const displayItems = items.length > 0 ? items : demoItems
  const emojis = { 1: '👕', 2: '🎨', 3: '🖱️', 4: '🍕', 5: '💡', 6: '🏅' }

  const orderStatusMap = {
    pending: { label: 'В обработке', color: 'text-yellow-400' },
    processing: { label: 'Готовится', color: 'text-blue-400' },
    shipped: { label: '📦 Отправлено', color: 'text-neon-purple' },
    delivered: { label: '✅ Доставлено', color: 'text-neon-green' },
    cancelled: { label: '❌ Отменено', color: 'text-red-400' },
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-500 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-gray-500 hover:text-neon-green text-sm transition-colors">← Дашборд</Link>
            <h1 className="font-black text-white text-xl">🛒 Магазин</h1>
          </div>
          <div className="flex items-center gap-2 bg-dark-600 border border-yellow-500/30 rounded-xl px-3 py-1.5"
            style={{ boxShadow: '0 0 10px rgba(255,214,10,0.15)' }}>
            <span>🪙</span>
            <span className="font-black text-yellow-400 text-lg">{balance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 bg-dark-800 rounded-xl p-1 border border-dark-500 mb-8 max-w-xs">
          {[{ id: 'shop', label: '🛍 Товары' }, { id: 'orders', label: '📦 Мои заказы' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? 'bg-neon-green text-dark-900' : 'text-gray-500 hover:text-white'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'shop' && (
          <>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-gray-500 text-sm mb-6">
              Зарабатывай коины за своевременную сдачу ДЗ и активность на вебинарах. Трать с умом!
            </motion.p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayItems.map((item, i) => {
                const canAfford = balance >= item.coin_price
                const outOfStock = item.stock === 0
                return (
                  <motion.div key={item.id}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`cyber-card flex flex-col ${!canAfford || outOfStock ? 'opacity-75' : ''}`}>
                    {/* Image placeholder */}
                    <div className="aspect-square bg-dark-600 rounded-xl mb-4 flex items-center justify-center text-5xl border border-dark-500">
                      {emojis[item.id] || '🎁'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-white">{item.name}</h3>
                        {item.stock !== -1 && item.stock <= 10 && item.stock > 0 && (
                          <span className="text-xs text-orange-400 font-mono">Осталось {item.stock}</span>
                        )}
                        {outOfStock && <span className="text-xs text-red-400">Нет в наличии</span>}
                      </div>
                      <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-lg">🪙</span>
                        <span className={`font-black text-xl ${canAfford ? 'text-yellow-400' : 'text-gray-600'}`}>
                          {item.coin_price}
                        </span>
                      </div>
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford || outOfStock || purchasing === item.id}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          canAfford && !outOfStock
                            ? 'btn-neon py-2 px-4'
                            : 'bg-dark-600 text-gray-600 cursor-not-allowed border border-dark-500'
                        }`}
                      >
                        {purchasing === item.id ? '...' : outOfStock ? 'Распродано' : !canAfford ? 'Мало коинов' : 'Купить'}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </>
        )}

        {tab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📦</div>
                <p className="text-gray-500">Заказов пока нет. Трать коины!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const st = orderStatusMap[order.status] || orderStatusMap.pending
                  return (
                    <div key={order.id} className="cyber-card flex items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold text-white">{order.item_name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{new Date(order.ordered_at).toLocaleDateString('ru-RU')}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${st.color}`}>{st.label}</div>
                        <div className="text-xs text-gray-600">-{order.total_coins} 🪙</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
