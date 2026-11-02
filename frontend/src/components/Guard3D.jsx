import { Component, useMemo } from 'react';

export function webglSupported() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  componentDidCatch(e) {
    console.warn('3D scene failed, showing fallback:', e);
  }
  render() {
    return this.state.err ? this.props.fallback : this.props.children;
  }
}

export default function Guard3D({ children, fallback = null }) {
  const ok = useMemo(webglSupported, []);
  if (!ok) return fallback;
  return <SceneBoundary fallback={fallback}>{children}</SceneBoundary>;
}
