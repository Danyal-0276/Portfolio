'use client';

import { Badge } from '@/components/ui/badge';

export default function QuoteSection() {
  return (
    <section id="origin" className="cine-section quote-section">
      <div className="container-cine quote-inner">
        <Badge variant="outline" data-reveal>Message</Badge>
        <blockquote className="quote-text">
          &ldquo;Software should be <span className="text-lime">active, intelligent storytelling</span> —
          not passive logic. My work bridges systems engineering with applied NLP research.&rdquo;
        </blockquote>
        <cite className="quote-cite" data-reveal>— Danyal Tanveer</cite>
        <div className="quote-meta" data-reveal>
          <span>University of Central Punjab</span>
          <span className="quote-sep">·</span>
          <span>BS Computer Science</span>
          <span className="quote-sep">·</span>
          <span>2022 — Present</span>
        </div>
      </div>
    </section>
  );
}
