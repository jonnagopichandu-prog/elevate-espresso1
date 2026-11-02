import { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import Logo from './Logo.jsx';
import '../styles/footer.css';

export default function Footer() {
  const { scrollToId } = useStore();
  const [email, setEmail] = useState('');

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error('Enter a valid email to subscribe');
    setEmail('');
    toast.success('Subscribed — welcome to the inner circle');
  };

  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo size={42} />
          <p>Specialty coffee, thoughtfully sourced and expertly roasted for those who appreciate the finer brew.</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <button onClick={() => scrollToId('home')}>Home</button>
          <button onClick={() => scrollToId('shop')}>Shop</button>
          <button onClick={() => scrollToId('experience')}>Experience</button>
          <button onClick={() => scrollToId('story')}>Our Story</button>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p><Mail size={14} /> hello@elevateespresso.in</p>
          <p><Phone size={14} /> +91 98765 43210</p>
          <p><MapPin size={14} /> Indiranagar, Bengaluru, India</p>
        </div>
        <div className="footer-col footer-news">
          <h4>The Roast Letter</h4>
          <p>Monthly stories, single-origin drops and brew guides.</p>
          <form onSubmit={subscribe} className="footer-form">
            <input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="newsletter-email-input"
            />
            <button className="btn-gold btn-sm" type="submit" data-testid="newsletter-submit-button">
              Join <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
      <div className="footer-base">
        <div className="container">
          <span>© {new Date().getFullYear()} Elevate Espresso. Brewed with patience.</span>
          <span>Crafted in India</span>
        </div>
      </div>
    </footer>
  );
}
