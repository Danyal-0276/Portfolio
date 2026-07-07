'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectShowcase() {
  return (
    <section id="showcase" className="cine-section project-showcase">
      <div className="container-cine">
        <Badge className="reveal-up">Hall of Builds</Badge>
        <h2 className="cine-heading reveal-up">
          FLAGSHIP<br /><span className="text-lime">SYSTEMS</span>
        </h2>

        <div className="project-grid reveal-stagger">
          {projects.map((p) => (
            <Card key={p.id} className="project-card group">
              <div className="project-card-media">
                {p.screenshots[0] ? (
                  <>
                    <Image
                      src={p.screenshots[0]}
                      alt={p.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="project-img-base object-cover"
                    />
                    {p.screenshots[1] && (
                      <Image
                        src={p.screenshots[1]}
                        alt=""
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="project-img-hover object-cover"
                      />
                    )}
                  </>
                ) : (
                  <div className="project-placeholder" style={{ background: `${p.accentColor}15` }}>
                    <span style={{ color: p.accentColor }}>{p.title.split(' ')[0]}</span>
                  </div>
                )}
                <div className="project-card-glow" style={{ background: p.accentColor }} />
              </div>
              <CardHeader>
                <CardTitle className="text-base">{p.title.split('—')[0].trim()}</CardTitle>
                <p className="text-xs font-mono text-white/45">{p.tagline}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.slice(0, 4).map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
                <Link
                  href={Object.values(p.links)[0]}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm text-lime hover:gap-2 transition-all"
                >
                  View repository <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
