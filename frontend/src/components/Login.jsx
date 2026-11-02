import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import Logo from './Logo.jsx';
import '../styles/login.css';

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.8-3.8H1.2v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.2a12 12 0 0 0 0 10.8l4.1-3.1z" />
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.7 1.8l3.5-3.5A12 12 0 0 0 1.2 6.6l4.1 3.1A7.2 7.2 0 0 1 12 4.8z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.4 12.8c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2-1.6-.2-3.1 1-3.9 1s-2-1-3.4-1c-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.5 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8 2.3-1.2 3.1-2.4c1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 4.6c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1 0 2.3-.6 3-1.5z" />
  </svg>
);

export default function Login() {
  const { signIn, setScreen } = useStore();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error('Enter a valid email address');
    if (pw.length < 4) return toast.error('Password must be at least 4 characters');
    signIn(email);
    setScreen('app');
    toast.success(`Welcome, ${email.split('@')[0]} — your brew awaits`);
  };

  const social = (provider) => {
    signIn(`${provider.toLowerCase()}.user@elevateespresso.in`);
    setScreen('app');
    toast.success(`Signed in with ${provider} — enjoy the experience`);
  };

  return (
    <section className="login">
      <img className="login-bg" src="/img/login-bg.jpg" alt="" />
      <div className="login-shade" />
      <div className="login-card" data-testid="login-card">
        <Logo size={44} />
        <h1 data-testid="login-title">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="login-sub">{mode === 'login' ? 'Sign in to continue your coffee journey' : 'Join the Elevate Espresso circle'}</p>
        <form onSubmit={submit}>
          <label className="field">
            <Mail size={16} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="login-email-input"
            />
          </label>
          <label className="field">
            <Lock size={16} />
            <input
              type={show ? 'text' : 'password'}
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              data-testid="login-password-input"
            />
            <button
              type="button"
              className="field-eye"
              onClick={() => setShow(!show)}
              aria-label="Toggle password visibility"
              data-testid="login-password-toggle"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </label>
          <div className="login-row">
            <label className="login-check">
              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} data-testid="login-remember-checkbox" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="login-link"
              onClick={() => toast.info('Password reset link sent to your email (demo)')}
              data-testid="login-forgot-link"
            >
              Forgot password?
            </button>
          </div>
          <button type="submit" className="btn-gold login-submit" data-testid="login-submit-button">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
        <div className="login-divider"><span>or continue with</span></div>
        <div className="login-social">
          <button onClick={() => social('Google')} data-testid="login-google-button"><GoogleIcon /> Google</button>
          <button onClick={() => social('Apple')} data-testid="login-apple-button"><AppleIcon /> Apple</button>
        </div>
        <p className="login-switch">
          {mode === 'login' ? 'New to Elevate Espresso? ' : 'Already have an account? '}
          <button className="login-link" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} data-testid="login-switch-button">
            {mode === 'login' ? 'Create Account' : 'Sign in'}
          </button>
        </p>
      </div>
    </section>
  );
}
