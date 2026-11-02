import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext.jsx';
import Logo from './Logo.jsx';
import Guard3D from './Guard3D.jsx';
import LoaderScene from '../three/LoaderScene.jsx';
import '../styles/success.css';

export default function Success() {
  const { lastOrder, trackOrder } = useStore();
  return (
    <section className="success" data-testid="success-screen">
      <div className="success-canvas">
        <Guard3D fallback={null}>
          <LoaderScene count={16} />
        </Guard3D>
      </div>
      <div className="success-core">
        <Logo size={46} />
        <div className="success-ring">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <defs>
              <linearGradient id="successGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFB45E" />
                <stop offset="100%" stopColor="#E2A34E" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#successGrad)"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
            <motion.path
              d="M38 62 L54 78 L84 46"
              fill="none"
              stroke="#FFB45E"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
            />
          </svg>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>
          Thank you for choosing Elevate Espresso.
          <br />
          Your coffee is on its way.
        </p>
        {lastOrder && (
          <span className="success-order" data-testid="success-order-id">
            Order {lastOrder.id} · {lastOrder.items.length} item{lastOrder.items.length > 1 ? 's' : ''} · ₹
            {lastOrder.total.toLocaleString('en-IN')}
          </span>
        )}
        <button className="btn-gold" onClick={trackOrder} data-testid="success-track-order-button">
          Track Order
        </button>
      </div>
    </section>
  );
}
