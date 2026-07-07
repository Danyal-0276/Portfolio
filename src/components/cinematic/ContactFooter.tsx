'use client';

import { Code2, Link2, Mail, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const links = [
  { icon: Mail, label: 'Email', val: 'danyaltanveer0276@gmail.com', href: 'mailto:danyaltanveer0276@gmail.com' },
  { icon: Code2, label: 'GitHub', val: '@Danyal-0276', href: 'https://github.com/Danyal-0276' },
  { icon: Link2, label: 'LinkedIn', val: 'danyal-tanveer', href: 'https://linkedin.com/in/danyal-tanveer' },
  { icon: Download, label: 'Résumé', val: 'PDF Download', href: '/resume/Danyal_Tanveer-Resume.pdf', download: true },
];

export default function ContactFooter() {
  return (
    <footer id="contact" className="cine-section contact-footer">
      <div className="container-cine">
        <Badge className="reveal-up">Contact</Badge>
        <h2 className="cine-heading reveal-up">
          LET&apos;S BUILD<br /><span className="text-lime">SOMETHING GREAT</span>
        </h2>
        <p className="cine-sub reveal-up">
          Open to full-stack engineering roles, NLP projects, and technical collaborations.
        </p>

        <div className="contact-grid reveal-stagger">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              download={l.download}
              target={l.href.startsWith('mailto') || l.download ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact-card"
            >
              <l.icon className="h-5 w-5 text-lime" />
              <span className="contact-label">{l.label}</span>
              <span className="contact-val">{l.val}</span>
            </a>
          ))}
        </div>

        <div className="footer-bottom reveal-up">
          <p className="footer-name">Danyal Tanveer</p>
          <p className="footer-role">Full-Stack Developer · NLP/ML Researcher · UCP 2026</p>
          <p className="footer-tech">Built with Next.js · GSAP · Lenis · shadcn/ui</p>
          <div className="footer-line" />
          <p className="footer-end">end_of_corridor</p>
        </div>
      </div>
    </footer>
  );
}
