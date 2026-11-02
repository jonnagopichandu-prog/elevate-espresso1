import { toast } from 'sonner';
import { Hand, MousePointerClick, Sparkles, ZoomIn } from 'lucide-react';
import { BEAN_FACTS } from '../data/products.js';
import Guard3D from './Guard3D.jsx';
import ExperienceScene from '../three/ExperienceScene.jsx';
import '../styles/experience.css';

export default function ExperienceSection() {
  const pick = () =>
    toast.success(BEAN_FACTS[Math.floor(Math.random() * BEAN_FACTS.length)], { description: 'Bean discovered' });

  return (
    <section id="experience" className="exp">
      <div className="container">
        <div className="exp-panel" data-reveal>
          <span className="exp-badge" data-testid="experience-badge">
            <Sparkles size={13} /> Interactive Experience
          </span>
          <div className="exp-canvas">
            <Guard3D fallback={<img src="/img/beans-bg.jpg" alt="Interactive coffee experience" className="exp-fallback" />}>
              <ExperienceScene onBeanClick={pick} />
            </Guard3D>
          </div>
          <aside className="exp-hints" data-testid="experience-hints">
            <div><span><Hand size={15} /></span> Drag to Rotate</div>
            <div><span><ZoomIn size={15} /></span> Scroll to Zoom</div>
            <div><span><MousePointerClick size={15} /></span> Click Beans</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
