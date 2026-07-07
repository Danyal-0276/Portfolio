'use client';

import { usePortfolioStore } from '@/lib/store';
import { projects } from '@/lib/projects';
import { getProgressForChapter } from '@/lib/cameraPaths';

const chapterContent = [
  {
    title: 'Danyal Tanveer',
    subtitle: 'Full-Stack Engineer · NLP/ML Researcher',
    body: 'Final-year CS at UCP. Production backends, Transformer ensembles, and interactive 3D experiences.',
    dark: true,
  },
  {
    title: 'Where it all began',
    subtitle: 'UCP · JS Workshop · 18 foundations',
    body: 'From vanilla JS fundamentals to distributed systems coursework — the workshop before the corridor.',
    dark: false,
  },
  {
    title: 'Tools of the trade',
    subtitle: 'Languages · Frameworks · AI/ML · Databases',
    body: 'Breadth within depth — orbiting skill clusters grouped by domain.',
    dark: false,
  },
  {
    title: 'The Build Corridor',
    subtitle: '5 flagship repositories',
    body: 'TRAK · POS Ecosystem · BERT Benchmark · NIDS · J.A.R.V.I.S — each bay lights up as you fly through.',
    dark: true,
  },
  {
    title: 'BERT Benchmark Skyline',
    subtitle: '10 models · TRAK ensemble',
    body: 'Floating confusion-matrix panels for the benchmark methodology and production voting ensemble.',
    dark: false,
  },
  {
    title: 'Cognitive Synthesis',
    subtitle: 'Philosophy · J.A.R.V.I.S',
    body: 'Software as intelligent storytelling. The particle sphere breathes at the emotional high point.',
    dark: true,
  },
  {
    title: "Let's build something great",
    subtitle: 'Contact desk',
    body: 'Résumé, email, GitHub, and LinkedIn — the natural last surface the camera lands on.',
    dark: false,
  },
];

export default function ChapterOverlay() {
  const activeChapter = usePortfolioStore((s) => s.activeChapter);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const hoveredProjectId = usePortfolioStore((s) => s.hoveredProjectId);
  const content = chapterContent[activeChapter];
  const hoveredProject = projects.find((p) => p.id === hoveredProjectId);

  if (scrollProgress > 0.98) return null;

  return (
    <div className={`chapter-overlay ${content.dark ? 'dark' : 'light'}`}>
      <div className="chapter-overlay-inner">
        <h1>{content.title}</h1>
        <p className="chapter-sub">{content.subtitle}</p>
        <p className="chapter-body">{content.body}</p>

        {activeChapter === 3 && hoveredProject && (
          <div className="chapter-project-hint">
            <span style={{ color: hoveredProject.accentColor }}>{hoveredProject.title}</span>
            <span>{hoveredProject.tagline}</span>
          </div>
        )}

        {activeChapter === 0 && (
          <div className="chapter-cta">
            <button
              type="button"
              className="btn btn-red"
              onClick={() => {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo({ top: getProgressForChapter(3) * max, behavior: 'smooth' });
              }}
            >
              Explore Projects
            </button>
            <a href="/resume/Danyal_Tanveer-Resume.pdf" download className="btn btn-ghost-dark">
              Download CV
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
