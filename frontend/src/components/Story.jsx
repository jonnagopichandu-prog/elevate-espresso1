import { ArrowRight, Coffee, Flame, Leaf } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import '../styles/story.css';

const FEATURES = [
  { icon: Leaf, title: 'Ethically Sourced' },
  { icon: Flame, title: 'Small Batch Roasted' },
  { icon: Coffee, title: 'Expertly Crafted' },
];

export default function Story() {
  const { scrollToId } = useStore();
  return (
    <section id="story" className="story">
      <div className="container story-grid">
        <div className="story-media" data-reveal>
          <img src="/img/story-barista.jpg" alt="Barista crafting espresso at Elevate Espresso" data-testid="story-image" />
          <div className="story-frame" />
        </div>
        <div className="story-copy">
          <span className="eyebrow" data-reveal>Our Story</span>
          <h2 data-reveal>
            From Bean
            <br />
            to Brew
          </h2>
          <p data-reveal>
            Elevate Espresso was born from a simple belief — coffee can be more than a drink, it can be an experience that
            uplifts, connects and inspires.
          </p>
          <div className="story-feats">
            {FEATURES.map((f) => (
              <div className="story-feat" key={f.title} data-reveal>
                <span className="story-feat-icon">
                  <f.icon size={19} />
                </span>
                <p>{f.title}</p>
              </div>
            ))}
          </div>
          <button className="btn-outline" onClick={() => scrollToId('shop')} data-testid="story-journey-button">
            Our Journey <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
