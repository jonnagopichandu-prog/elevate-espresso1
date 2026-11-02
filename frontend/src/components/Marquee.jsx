import { Leaf } from 'lucide-react';
import '../styles/marquee.css';

const ITEMS = ['Single Origin', 'Small Batch Roasted', 'Ethically Sourced', 'Freshly Roasted Daily', 'Specialty Grade', 'Hand Picked & Slow Dried'];

export default function Marquee() {
  return (
    <div className="marquee" data-testid="marquee">
      <div className="marquee-track">
        <div className="marquee-group">
          {ITEMS.map((t) => (
            <span key={t} className="marquee-item">
              {t}
              <Leaf size={13} />
            </span>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {ITEMS.map((t) => (
            <span key={t} className="marquee-item">
              {t}
              <Leaf size={13} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
