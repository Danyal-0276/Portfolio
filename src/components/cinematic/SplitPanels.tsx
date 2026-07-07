'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const panels = [
  {
    id: 'production',
    label: 'In Production',
    title: 'Live Systems',
    desc: 'Express APIs with Redis caching, Next.js frontends, and MongoDB — deployed for two live restaurant clients.',
    stats: ['POS Ecosystem', 'TRAK Platform', 'Redis + JWT'],
    href: '#showcase',
    accent: '#f59e0b',
  },
  {
    id: 'research',
    label: 'In Research',
    title: 'ML Pipeline',
    desc: '10-model BERT-family benchmark on 10K articles. TRAK ensemble with RoBERTa + DeBERTa voting at 93.1% accuracy.',
    stats: ['BERT Benchmark', 'Spark NIDS', 'MCC / AUC-ROC'],
    href: '#research',
    accent: '#2ec4b6',
  },
];

export default function SplitPanels() {
  return (
    <section id="split" className="cine-section split-panels">
      <div className="split-grid">
        {panels.map((p) => (
          <div key={p.id} className="split-panel reveal-up" style={{ '--panel-accent': p.accent } as React.CSSProperties}>
            <Badge variant="outline">{p.label}</Badge>
            <h3 className="split-title">{p.title}</h3>
            <p className="split-desc">{p.desc}</p>
            <ul className="split-stats">
              {p.stats.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <Button variant="outline" asChild className="mt-6">
              <a href={p.href}>Explore →</a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
