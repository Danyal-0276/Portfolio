'use client';

import { Badge } from '@/components/ui/badge';

const models = [
  { name: 'DeBERTa v3', acc: 93.1, color: '#06b6d4' },
  { name: 'RoBERTa', acc: 91.5, color: '#8b5cf6' },
  { name: 'ELECTRA', acc: 91.0, color: '#14b8a6' },
  { name: 'XLM-R', acc: 90.8, color: '#c8ff00' },
  { name: 'DistilBERT', acc: 89.2, color: '#f59e0b' },
  { name: 'MobileBERT', acc: 88.0, color: '#10b981' },
];

export default function ResearchSection() {
  const max = Math.max(...models.map((m) => m.acc));

  return (
    <section id="research" className="cine-section research-section">
      <div className="container-cine">
        <Badge data-reveal>Research Lab</Badge>
        <h2 className="cine-heading" data-reveal>
          BERT<br /><span className="text-lime">SKYLINE</span>
        </h2>
        <p className="cine-sub" data-reveal>
          10 Transformer architectures benchmarked on 10,000 news articles — MCC, AUC-ROC, and ensemble voting.
        </p>

        <div className="research-layout">
          <div className="research-chart" data-reveal>
            {models.map((m) => {
              const h = ((m.acc - 85) / (max - 85)) * 100;
              return (
                <div key={m.name} className="research-col">
                  <div
                    className="research-bar"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(180deg, ${m.color}, ${m.color}88)`,
                    }}
                  />
                  <span className="research-label">{m.acc}%</span>
                  <span className="research-name">{m.name}</span>
                </div>
              );
            })}
          </div>

          <div className="research-metrics" data-stagger>
            {[
              { l: 'Accuracy', v: '93.1%', c: '#06b6d4' },
              { l: 'MCC Score', v: '0.841', c: '#8b5cf6' },
              { l: 'AUC-ROC', v: '0.97', c: '#c8ff00' },
              { l: 'Ensemble', v: '3-Model', c: '#f59e0b' },
            ].map((m) => (
              <div key={m.l} className="research-metric" style={{ borderColor: `${m.c}40` }}>
                <span>{m.l}</span>
                <strong style={{ color: m.c }}>{m.v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
