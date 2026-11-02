import * as THREE from 'three';

const cache = new Map();
const cached = (key, fn) => {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key);
};

const canvas = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
};

const toTexture = (c) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
};

export function glowTexture(inner = 'rgba(255,224,176,1)', mid = 'rgba(255,180,94,0.55)') {
  return cached(`glow-${inner}-${mid}`, () => {
    const [c, g] = canvas(64, 64);
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, inner);
    grd.addColorStop(0.45, mid);
    grd.addColorStop(1, 'rgba(255,180,94,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    return toTexture(c);
  });
}

export const dotTexture = () => glowTexture();

export function steamTexture() {
  return cached('steam', () => {
    const [c, g] = canvas(128, 128);
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 62);
    grd.addColorStop(0, 'rgba(255,240,220,0.85)');
    grd.addColorStop(0.4, 'rgba(255,230,205,0.32)');
    grd.addColorStop(1, 'rgba(255,230,205,0)');
    g.fillStyle = grd;
    g.beginPath();
    g.arc(64, 64, 62, 0, Math.PI * 2);
    g.fill();
    return toTexture(c);
  });
}

export function drawLeaf(g, cx, cy, s, rot = -0.35, fill = '#E2A34E', vein = '#100B08') {
  g.save();
  g.translate(cx, cy);
  g.rotate(rot);
  g.beginPath();
  g.moveTo(0, -s);
  g.bezierCurveTo(s * 0.95, -s * 0.3, s * 0.8, s * 0.55, 0, s);
  g.bezierCurveTo(-s * 0.8, s * 0.55, -s * 0.95, -s * 0.3, 0, -s);
  g.closePath();
  g.fillStyle = fill;
  g.fill();
  g.strokeStyle = vein;
  g.lineWidth = Math.max(1.5, s * 0.08);
  g.beginPath();
  g.moveTo(0, -s * 0.72);
  g.quadraticCurveTo(s * 0.14, 0, 0, s * 0.78);
  g.stroke();
  g.restore();
}

export function groundTexture() {
  return cached('ground', () => {
    const [c, g] = canvas(512, 512);
    const grd = g.createRadialGradient(256, 256, 30, 256, 256, 250);
    grd.addColorStop(0, 'rgba(21,12,7,0.98)');
    grd.addColorStop(0.55, 'rgba(19,11,7,0.78)');
    grd.addColorStop(1, 'rgba(19,11,7,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 512, 512);
    return toTexture(c);
  });
}

export function latteTexture() {
  return cached('latte', () => {
    const [c, g] = canvas(512, 512);
    const cx = 256;
    const base = g.createRadialGradient(cx, cx, 40, cx, cx, 256);
    base.addColorStop(0, '#dca45f');
    base.addColorStop(0.62, '#b5793a');
    base.addColorStop(0.86, '#8a5a28');
    base.addColorStop(1, '#5c3714');
    g.fillStyle = base;
    g.beginPath();
    g.arc(cx, cx, 256, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = 'rgba(70,38,12,0.9)';
    g.lineWidth = 18;
    g.beginPath();
    g.arc(cx, cx, 243, 0, Math.PI * 2);
    g.stroke();
    g.strokeStyle = 'rgba(240,205,150,0.15)';
    g.lineWidth = 14;
    for (let i = 0; i < 3; i++) {
      g.beginPath();
      g.arc(cx, cx, 140 + i * 36, i * 1.8, i * 1.8 + 4.2);
      g.stroke();
    }
    g.save();
    g.translate(cx, cx + 56);
    g.shadowColor = 'rgba(250,235,210,0.55)';
    g.shadowBlur = 10;
    for (let i = 0; i < 5; i++) {
      const w = 118 - i * 20;
      const y = -i * 52;
      const d = 34 + i * 6;
      g.fillStyle = `rgba(246,232,208,${0.92 - i * 0.07})`;
      g.beginPath();
      g.moveTo(0, y);
      g.quadraticCurveTo(-w, y - d * 0.4, -w * 0.55, y - d);
      g.quadraticCurveTo(0, y - d - 18, w * 0.55, y - d);
      g.quadraticCurveTo(w, y - d * 0.4, 0, y);
      g.closePath();
      g.fill();
    }
    g.strokeStyle = 'rgba(246,232,208,0.85)';
    g.lineWidth = 9;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(0, -14);
    g.quadraticCurveTo(14, -160, -6, -240);
    g.stroke();
    g.restore();
    return toTexture(c);
  });
}

export function cupBrandTexture() {
  return cached('brand', () => {
    const [c, g] = canvas(1024, 512);
    drawLeaf(g, 512, 112, 62, -0.35);
    g.textAlign = 'center';
    g.fillStyle = '#F5E9D8';
    g.font = '600 92px "Playfair Display", Georgia, serif';
    g.fillText('Elevate', 512, 300);
    g.fillStyle = '#E2A34E';
    g.fillText('Espresso', 512, 398);
    return toTexture(c);
  });
}

export const BAG_VARIANTS = {
  house: { name: 'HOUSE BLEND', sub: 'WHOLE BEAN · 250G', sky: ['#4a2008', '#8a4413'], peaks: ['#e08a33', '#9a4e1c', '#4e2409'], disc: '#FFB45E', stars: false, tree: false },
  colombian: { name: 'COLOMBIAN RESERVE', sub: 'WHOLE BEAN · 250G', sky: ['#3d0f0b', '#7c2414'], peaks: ['#c2452a', '#7c2414', '#380f08'], disc: '#ffcf9a', stars: false, tree: false },
  ethiopian: { name: 'ETHIOPIAN SINGLE ORIGIN', sub: 'WHOLE BEAN · 250G', sky: ['#402a08', '#7c5a1a'], peaks: ['#d9a544', '#8a6a24', '#402a08'], disc: '#ffe3ae', stars: false, tree: true },
  forte: { name: 'ESPRESSO FORTE', sub: 'WHOLE BEAN · 250G', sky: ['#2a1408', '#5c3410'], peaks: ['#c98f3a', '#6e451a', '#2a1408'], disc: '#e2a34e', stars: false, tree: false },
  midnight: { name: 'MIDNIGHT ESPRESSO', sub: 'WHOLE BEAN · 250G', sky: ['#0e1420', '#232f44'], peaks: ['#4a5f80', '#2a3a54', '#101828'], disc: '#dfe8f5', stars: true, tree: false },
  golden: { name: 'GOLDEN HOUR', sub: 'WHOLE BEAN · 250G', sky: ['#5c2c06', '#c07818'], peaks: ['#f0a848', '#a05818', '#48260a'], disc: '#ffd98a', stars: false, tree: true },
  velvet: { name: 'VELVET BLOOM', sub: 'WHOLE BEAN · 250G', sky: ['#380d14', '#7c1f30'], peaks: ['#d4526a', '#8a2438', '#3a0e18'], disc: '#ffb4a2', stars: false, tree: false },
};

function drawScene(g, x0, y0, w, h, v) {
  const sky = g.createLinearGradient(0, y0, 0, y0 + h);
  sky.addColorStop(0, v.sky[0]);
  sky.addColorStop(1, v.sky[1]);
  g.fillStyle = sky;
  g.fillRect(x0, y0, w, h);
  if (v.stars) {
    g.fillStyle = 'rgba(255,255,255,0.75)';
    for (let i = 0; i < 60; i++) {
      const sx = x0 + Math.abs(Math.sin(i * 37.7)) * w;
      const sy = y0 + Math.abs(Math.sin(i * 11.3)) * h * 0.45;
      const r = Math.abs(Math.sin(i * 5.1)) * 1.8 + 0.5;
      g.beginPath();
      g.arc(sx, sy, r, 0, Math.PI * 2);
      g.fill();
    }
  }
  if (v.disc) {
    const dx = x0 + w * 0.7;
    const dy = y0 + h * 0.3;
    const glow = g.createRadialGradient(dx, dy, 4, dx, dy, 90);
    glow.addColorStop(0, v.disc);
    glow.addColorStop(0.25, 'rgba(255,200,120,0.35)');
    glow.addColorStop(1, 'rgba(255,200,120,0)');
    g.fillStyle = glow;
    g.fillRect(dx - 90, dy - 90, 180, 180);
    g.fillStyle = v.disc;
    g.beginPath();
    g.arc(dx, dy, 26, 0, Math.PI * 2);
    g.fill();
  }
  v.peaks.forEach((color, i) => {
    const base = y0 + h * (0.5 + i * 0.2);
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(x0, y0 + h);
    g.lineTo(x0, base);
    for (let k = 0; k <= 7; k++) {
      const px = x0 + w * (k / 7);
      const rnd = Math.abs(Math.sin(i * 37.7 + k * 11.3));
      const py = base - h * (0.1 + rnd * 0.3) * (1 - i * 0.16);
      g.lineTo(px, py);
    }
    g.lineTo(x0 + w, y0 + h);
    g.closePath();
    g.fill();
  });
  if (v.tree) {
    const tx = x0 + w * 0.3;
    const ty = y0 + h * 0.94;
    g.strokeStyle = '#120a06';
    g.lineWidth = 8;
    g.beginPath();
    g.moveTo(tx, ty);
    g.lineTo(tx + 6, ty - 74);
    g.stroke();
    g.lineWidth = 5;
    g.beginPath();
    g.moveTo(tx + 5, ty - 52);
    g.lineTo(tx - 26, ty - 68);
    g.moveTo(tx + 6, ty - 58);
    g.lineTo(tx + 34, ty - 72);
    g.stroke();
    g.fillStyle = '#120a06';
    g.beginPath();
    g.ellipse(tx + 4, ty - 84, 68, 15, 0, 0, Math.PI * 2);
    g.fill();
  }
}

export function makeBagCanvas(variantKey) {
  const v = BAG_VARIANTS[variantKey] || BAG_VARIANTS.house;
  const W = 1024;
  const H = 1480;
  const [c, g] = canvas(W, H);
  g.fillStyle = '#0b0704';
  g.fillRect(0, 0, W, H);
  const sheen = g.createLinearGradient(0, 0, W, 0);
  sheen.addColorStop(0, 'rgba(255,190,110,0.10)');
  sheen.addColorStop(0.3, 'rgba(255,190,110,0.02)');
  sheen.addColorStop(0.55, 'rgba(0,0,0,0.28)');
  sheen.addColorStop(0.85, 'rgba(255,190,110,0.07)');
  sheen.addColorStop(1, 'rgba(255,190,110,0.02)');
  g.fillStyle = sheen;
  g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(226,163,78,0.55)';
  g.lineWidth = 3;
  g.beginPath();
  g.roundRect(46, 46, W - 92, H - 92, 20);
  g.stroke();
  g.strokeStyle = 'rgba(226,163,78,0.18)';
  g.lineWidth = 1.5;
  g.beginPath();
  g.roundRect(62, 62, W - 124, H - 124, 14);
  g.stroke();
  drawLeaf(g, W / 2, 168, 60, -0.35);
  g.textAlign = 'center';
  g.fillStyle = '#F5E9D8';
  g.font = '600 96px "Playfair Display", Georgia, serif';
  g.fillText('Elevate', W / 2, 342);
  g.fillStyle = '#E2A34E';
  g.fillText('Espresso', W / 2, 444);
  g.fillStyle = 'rgba(245,233,216,0.5)';
  g.font = '400 26px Jost, Arial, sans-serif';
  g.letterSpacing = '8px';
  g.fillText('SPECIALTY ROASTERY', W / 2, 504);
  g.letterSpacing = '0px';
  g.fillStyle = '#E2A34E';
  g.font = '600 42px Jost, Arial, sans-serif';
  g.letterSpacing = '8px';
  g.fillText(v.name, W / 2, 592);
  g.letterSpacing = '0px';
  drawScene(g, 120, 640, W - 240, 470, v);
  g.strokeStyle = 'rgba(226,163,78,0.35)';
  g.lineWidth = 2;
  g.strokeRect(120, 640, W - 240, 470);
  g.fillStyle = 'rgba(245,233,216,0.82)';
  g.font = '400 30px Jost, Arial, sans-serif';
  g.letterSpacing = '6px';
  g.fillText(v.sub, W / 2, 1226);
  g.letterSpacing = '0px';
  for (let i = 0; i < 5; i++) {
    g.beginPath();
    g.arc(W / 2 - 80 + i * 40, 1298, 9, 0, Math.PI * 2);
    g.fillStyle = i < 3 ? '#E2A34E' : 'rgba(226,163,78,0.22)';
    g.fill();
  }
  g.fillStyle = 'rgba(245,233,216,0.5)';
  g.font = '400 24px Jost, Arial, sans-serif';
  g.letterSpacing = '6px';
  g.fillText('SMALL BATCH ROASTED', W / 2, 1368);
  g.letterSpacing = '0px';
  return c;
}

export const bagTexture = (v) => cached(`bag-${v}`, () => toTexture(makeBagCanvas(v)));
export const bagThumb = (v) => cached(`thumb-${v}`, () => makeBagCanvas(v).toDataURL('image/png'));
