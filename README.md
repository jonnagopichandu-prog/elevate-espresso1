# Elevate Espresso — Luxury Coffee Experience

A production-ready, award-caliber luxury coffee website. React + Vite + Three.js (React Three Fiber + Drei) + GSAP + Lenis + plain CSS — no Tailwind, no UI kits.

## Highlights

- **Animated loading screen** — glowing gold ring logo, flying 3D coffee beans, golden sparkles, live progress bar.
- **Premium login screen** — café photography backdrop, glass card, email/password with icons, Remember me, Forgot password, Google & Apple buttons, Create Account mode. Demo auth (any valid email + 4+ char password).
- **3D hero** — real-time black ceramic cup (lathe geometry, clearcoat PBR), canvas-generated latte-art crema, gold branding band, saucer, procedural particle steam, beans on elliptical orbits, glowing orbital rings, cinematic orange/gold lighting, custom Lightformer environment.
- **Signature Coffee Range** — four-plus realistic 3D coffee bags (RoundedBox PBR packaging with per-variant canvas artwork: House Blend, Colombian Reserve, Ethiopian Single Origin, Espresso Forte, Midnight Espresso, Golden Hour, Velvet Bloom), carousel with arrows + dots, ratings and Indian Rupee pricing.
- **Interactive experience** — drag to rotate, scroll to zoom (OrbitControls), clickable popping beans with tasting-note toasts, rocks, sparkles, steam.
- **Our Story** — barista photography, icon features, journey CTA.
- **Functional cart** — drawer with thumbnails rendered from the bag artwork canvases, quantity steppers, remove, subtotal/delivery/total in ₹, localStorage persistence.
- **Order success** — animated golden checkmark (SVG stroke draw), floating beans, order id, Track Order.
- **Craft details** — Lenis momentum scrolling, GSAP ScrollTrigger reveals, masked hero line reveal, editorial marquee, film grain, search & account menus, responsive mobile nav, WebGL fallback + error boundaries everywhere.

## Structure

```
frontend/
├── index.html                  # Vite entry, fonts, favicon
├── vite.config.js              # Vite + react plugin, aliases, host config
├── public/
│   ├── img/                    # Generated café / barista / beans photography
│   └── downloads/              # Source zip handoff
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # Screen state machine, Lenis + GSAP setup
    ├── context/StoreContext.jsx # Auth, cart, orders (localStorage)
    ├── data/products.js        # Catalog, bean facts, ₹ formatting
    ├── utils/textures.js       # Canvas PBR textures (latte art, bags, branding)
    ├── components/             # UI (Preloader, Login, Navbar, Hero, Collection,
    │                           #   Marquee, ExperienceSection, Story, Footer,
    │                           #   CartDrawer, Success, Logo, Guard3D)
    ├── three/                  # 3D scenes & meshes (CupScene, ExperienceScene,
    │                           #   LoaderScene, CupMesh, BagMesh, BagCardScene,
    │                           #   Bean, Steam, OrbitRings, OrbitBeans, ScatterBeans)
    └── styles/                 # Plain CSS per screen + global tokens
```

## Run

```bash
cd frontend
yarn install
yarn start        # dev server on :3000
yarn build        # production build
```

Backend (optional, untouched template): FastAPI in `backend/`, started by the platform on :8001 under `/api`.

## Notes

- All product artwork, latte art, branding and particle sprites are generated procedurally on `<canvas>` at runtime — no binary texture assets required.
- Cart, sign-in session and the last order persist in `localStorage` (`ee_cart`, `ee_user`, `ee_order`).
- Every WebGL scene is wrapped in a support check + React error boundary with a photographic fallback.
