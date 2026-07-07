# Danyal Tanveer — 3D Portfolio: Technical Specification

**Stack:** Next.js 15 (App Router) · React Three Fiber (Three.js) · @react-three/drei · Zustand · Framer Motion (DOM layer) · GSAP (camera timelines)
**Author subject:** Danyal Tanveer — final-year CS undergrad (UCP), full-stack + NLP/ML engineer
**Deployment target:** Vercel

---

## 0. Design Thesis

Danyal's real body of work already has a narrative arc most portfolios fabricate: **vanilla JS fundamentals → production full-stack systems (POS) → applied ML research (fake-news BERT benchmarks, TRAK) → systems-level rigor (distributed computing NIDS) → tying it together with an agentic AI assistant (Jarvis)**. The site's structure follows that arc literally — it's a hallway of rooms in increasing technical depth, not a stack of generic "About/Skills/Projects" cards.

Signature element: the visitor doesn't scroll past projects, they **fly a camera down a single continuous corridor** ("The Build") where each room is one real repository, rendered as a diorama of its actual tech stack (a Spark cluster of glowing shards for NIDS, a stacked ledger of POS terminals, a floating particle sphere for Jarvis). The resume and photo are not separate — the photo is the "ID badge" that clips to the camera rig in the intro, and the resume is a physical object (a folded document mesh) sitting on a desk in the final "Contact" room.

---

## 1. Framework & Library Choice

**Three.js via React Three Fiber**, not Babylon.js.

| Factor | Reasoning |
|---|---|
| React integration | R3F treats the scene graph as JSX — state (active room, scroll progress, hovered project) lives in the same React tree as the DOM overlay. Babylon's imperative scene API fights Next.js's component model. |
| Ecosystem | `@react-three/drei` (helpers: `ScrollControls`, `Html`, `Text3D`, `Environment`, `PerspectiveCamera`) and `@react-three/postprocessing` (bloom, DoF) cover 90% of this spec's needs out of the box. |
| Bundle size | Three.js core + drei tree-shakes well; Babylon's modules are heavier for a single-scene portfolio (vs. Babylon's strength in full game engines, which this isn't). |
| Team fit | Danyal already works in React/Next.js daily (POS frontend, TRAK, Pos-Admin) — R3F is additive, not a second framework to learn. |

---

## 2. Architecture Overview

### 2.1 File Structure (App Router)

```
app/
├── layout.tsx                 # <html>, fonts, global providers
├── page.tsx                   # Mounts <Experience /> (client component)
├── globals.css
components/
├── canvas/
│   ├── Experience.tsx          # <Canvas> root, camera rig, scroll orchestration
│   ├── CameraRig.tsx           # GSAP timeline driving camera position/lookAt
│   ├── rooms/
│   │   ├── HeroRoom.tsx        # Chapter 1: intro + ID badge reveal
│   │   ├── OriginRoom.tsx      # Chapter 2: education / JS-basics shelf
│   │   ├── SkillsConstellation.tsx  # Chapter 3: orbiting skill nodes
│   │   ├── BuildCorridor.tsx   # Chapter 4: project dioramas (see 4.5)
│   │   ├── ResearchRoom.tsx    # Chapter 5: BERT benchmark + TRAK ML
│   │   ├── PhilosophyRoom.tsx  # Chapter 6: statement + Jarvis sphere
│   │   └── ContactDesk.tsx     # Chapter 7: resume object + CTA
│   ├── objects/
│   │   ├── IDBadge.tsx         # Textured plane using the portrait photo
│   │   ├── ResumeDocument.tsx  # Folded-paper mesh, click → download
│   │   ├── ProjectDiorama.tsx  # Generic reusable "room-in-a-box" component
│   │   └── ParticleSphere.tsx  # Jarvis-inspired instanced-point sphere
│   └── fx/
│       ├── PostFX.tsx          # Bloom, vignette, chromatic aberration (desktop only)
│       └── LoadingGate.tsx     # Suspense fallback + progress bar
├── dom/
│   ├── ChapterLabel.tsx        # Overlay heading synced to scroll progress
│   ├── ProjectCard2D.tsx       # Accessible HTML fallback for reduced-motion/low-end
│   └── Nav.tsx                 # Chapter jump-links (a11y + fast navigation)
lib/
├── store.ts                    # Zustand: activeChapter, scrollProgress, deviceTier, hoveredProject
├── projects.ts                 # Typed data: the 8 real repos (below)
├── deviceCapability.ts         # WebGL2/GPU-tier/reduced-motion detection
└── cameraPaths.ts              # Named camera keyframes per chapter
public/
├── models/ (glb, draco-compressed)
├── textures/ (portrait.jpg — the ID badge asset, compressed to WebP + fallback JPG)
└── resume/Danyal_Tanveer-Resume.pdf
```

### 2.2 State Management

A single Zustand store is the seam between the R3F canvas and the DOM overlay — both subscribe to it, neither owns the other:

```ts
// lib/store.ts
type PortfolioState = {
  activeChapter: number;          // 0..6, drives ChapterLabel + Nav highlight
  scrollProgress: number;         // 0..1 global, feeds ScrollControls
  deviceTier: 'high' | 'mid' | 'low';
  hoveredProjectId: string | null;
  reducedMotion: boolean;
  setChapter: (i: number) => void;
  setScrollProgress: (p: number) => void;
};
```

`ScrollControls` (drei) drives `scrollProgress`; a `useFrame` in `CameraRig` reads it and interpolates along `cameraPaths.ts` keyframes with `THREE.CatmullRomCurve3` — this is what makes the ride feel like one continuous flight instead of section-snapping.

---

## 3. Narrative Structure — The Seven Chapters

| # | Chapter | Real content | Camera behavior |
|---|---|---|---|
| 1 | **Hero** | Name, title, portrait as ID badge | Static wide shot; badge flips in on load |
| 2 | **Origin** | UCP CS degree, coursework, the 18-project JS-basics repo as a "workshop shelf" | Slow dolly-in past a shelf of small glowing cubes (one per JS mini-project) |
| 3 | **Skills Constellation** | Languages/frameworks from the resume, grouped by domain | Orbit around a node cluster; hover = tooltip via `Html` |
| 4 | **The Build (corridor)** | 5 flagship repos as dioramas — detailed in §4.5 | Continuous forward dolly, one diorama per "bay" |
| 5 | **Research** | Fake-news BERT benchmark (10 models, 10K set) + TRAK's ensemble classifier | Camera descends into a "lab" with floating confusion-matrix panels |
| 6 | **Philosophy** | Short statement + the Jarvis particle sphere as the emotional high point | Camera pulls back to reveal the sphere breathing/reacting to cursor |
| 7 | **Contact** | Resume as physical object, email/GitHub/LinkedIn as desk items | Camera settles at a desk; UI unlocks (cursor, scroll re-enabled) |

Transitions are never cuts — chapter N's exit camera position is chapter N+1's entry position, so `CameraRig` only ever interpolates forward along one spline.

---

## 4. Section-by-Section Interaction Patterns

### 4.1 Hero — ID Badge Reveal

```tsx
// components/canvas/objects/IDBadge.tsx
function IDBadge() {
  const texture = useTexture('/textures/portrait.webp');
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Badge tracks pointer subtly — parallax, not full rotation
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y, state.pointer.x * 0.15, 0.05
    );
  });

  return (
    <mesh ref={ref} position={[0, 0.2, 0]}>
      <planeGeometry args={[1.2, 1.6]} />
      <meshPhysicalMaterial map={texture} roughness={0.35} clearcoat={0.6} />
    </mesh>
  );
}
```
The portrait (the dark, moody headshot) is the badge face; a thin bevel + rim light (a single `pointLight` with teal tint, matching the photo's existing lighting) sells the "premium hardware ID" feel rather than a pasted-on photo. On scroll-start, the badge shrinks and clips to the top-left of the viewport as a persistent HUD element (`position` animated via `useSpring` from `@react-spring/three`) for the rest of the experience — this is the resume/photo "narrative-integrated, always-present" anchor the brief asks for.

### 4.2 Origin — JS Basics Shelf

Each of the 18 vanilla-JS mini-projects (`Calculator`, `Weather App`, `Quiz App`, etc.) becomes one small emissive cube in an `InstancedMesh` row. Hovering raises that cube 0.1 units and shows its name; this is deliberately the *smallest, plainest* diorama in the site — it's the "workshop" chapter, so the visual restraint is a callback to fundamentals before the corridor's later complexity ramps up.

### 4.3 Skills Constellation

```tsx
// Skill nodes grouped by resume categories: Languages / Frameworks / AI-ML / Databases / Tools
const skillGroups = groupSkillsByCategory(resumeSkills);
// Each group orbits a shared center at a different radius/speed —
// visually encodes "breadth within depth" without numbered labels.
```
Camera holds at a fixed radius and slowly rotates 40° across the chapter's scroll range; clicking a node pins the camera to look directly at that cluster and opens an `Html` panel listing specifics (e.g., clicking "AI/ML" surfaces RoBERTa, DeBERTa, BART, spaCy).

### 4.4 The Build — Corridor Overview

`BuildCorridor.tsx` renders `<ProjectDiorama>` instances spaced 8 units apart along the Z-axis. `CameraRig` dollies straight through; each diorama activates (lights up, starts its idle animation) when the camera enters its 8-unit bay, and de-saturates behind the camera — this keeps draw calls and animation cost bounded to ~2 active dioramas at a time regardless of total project count.

### 4.5 Project Data (real repos → diorama concepts)

```ts
// lib/projects.ts
export const projects: Project[] = [
  {
    id: 'trak',
    title: 'TRAK — AI News Credibility Platform',
    tagline: 'Capstone: React Native + Django + a 3-model credibility ensemble',
    tech: ['React Native', 'Django/DRF', 'MongoDB', 'RoBERTa', 'DeBERTa', 'JWT'],
    dioramaConcept: 'A rotating phone mockup streaming a live "credibility meter" '
      + 'needle between Real / Suspicious / Fake, fed by a fake animated data stream.',
    links: { app: 'github.com/Danyal-0276/TRAK', backend: 'github.com/Danyal-0276/TRAK-BACKEND' },
  },
  {
    id: 'pos-ecosystem',
    title: 'POS Ecosystem',
    tagline: 'Three connected repos powering two live restaurant clients',
    tech: ['Next.js 15', 'Express', 'MongoDB', 'JWT', 'Redis', 'Swagger'],
    dioramaConcept: 'Three linked terminal-shaped meshes (POS / Admin / Backend) with '
      + 'glowing connector lines pulsing to represent request flow between them.',
    links: { pos: 'github.com/Danyal-0276/POS-client', admin: 'github.com/Danyal-0276/POS-Admin', api: 'github.com/Danyal-0276/POS-backend' },
  },
  {
    id: 'bert-benchmark',
    title: 'BERT-Family Fake News Benchmark',
    tagline: '10 models (RoBERTa, DistilBERT, MobileBERT, XLM-R and more) on a 10K split',
    tech: ['PyTorch', 'HuggingFace Transformers', 'scikit-learn', 'Pandas'],
    dioramaConcept: 'A bar-chart-as-skyline — ten glass columns of varying height '
      + '(model accuracy), camera glides alongside like a research poster come to life.',
    links: { repo: 'github.com/Danyal-0276/Bert-Based-models-evaluation' },
  },
  {
    id: 'nids',
    title: 'Network Intrusion Detection System',
    tagline: 'PDC coursework: Spark MLlib ensemble on CIC-IDS2017',
    tech: ['PySpark 3.5', 'Apache Spark', 'Naive Bayes/LR/GBT/RF ensemble'],
    dioramaConcept: 'A distributed "shard cluster" — small glowing nodes that light up '
      + 'in sequence to visualize data flowing through a Spark pipeline, ending in a '
      + 'shield-shaped mesh for "attack detected/blocked."',
    links: { repo: 'github.com/Danyal-0276/PDC-Project-Intrusion-Detection-System-' },
  },
  {
    id: 'jarvis',
    title: 'J.A.R.V.I.S — Personal AI Assistant',
    tagline: 'Gemini-powered desktop assistant with its own 3D particle-sphere UI',
    tech: ['Python', 'Eel', 'Google Gemini', 'SpeechRecognition', 'pyttsx3'],
    dioramaConcept: 'Reuses this site\'s own ParticleSphere component at larger scale — '
      + 'a deliberate wink that the portfolio itself borrows a UI idea Danyal already built.',
    links: { repo: 'github.com/Danyal-0276/Jarvis' },
  },
];

// Secondary/supporting work — rendered as a low-key "archive shelf" at the corridor's
// exit rather than a full bay: Multi-Marketplace Scraper, Duolingo-clone Android app,
// 18-project JS basics collection (already used in Origin chapter).
```

### 4.6 Research Room

Surfaces the two ML-heavy efforts distinctly from the shipped-product corridor: the 10-model BERT benchmark's evaluation methodology (train/val/test split discipline, MCC/AUC-ROC reporting) and TRAK's production ensemble (RoBERTa + DeBERTa voting for real/fake/suspicious). Visualized as floating translucent panels showing simplified confusion-matrix grids that animate in as the camera enters.

### 4.7 Contact Desk

```tsx
// components/canvas/objects/ResumeDocument.tsx
function ResumeDocument({ onOpen }: { onOpen: () => void }) {
  return (
    <mesh onClick={onOpen} onPointerOver={() => document.body.style.cursor = 'pointer'}>
      <boxGeometry args={[0.6, 0.8, 0.02]} />
      <meshStandardMaterial color="#f4f1ea" />
      <Html position={[0, 0, 0.02]} transform occlude>
        <span className="resume-label">Résumé — click to open</span>
      </Html>
    </mesh>
  );
}
// onOpen triggers a same-tab download of /resume/Danyal_Tanveer-Resume.pdf —
// never a hard navigation away from the 3D scene.
```
Email, GitHub, and LinkedIn render as three small labeled objects on the same desk; clicking opens `mailto:` / external links in a new tab. This is the CTA "emerging from the flow" the brief calls for — it's the natural last surface the camera lands on, not a form injected at the top.

---

## 5. Performance & Optimization Strategy

**Budgets:** 60fps on desktop/high-tier mobile, 30fps floor on mid-tier, automatic 2D fallback below that.

| Technique | Application |
|---|---|
| Device tiering | `lib/deviceCapability.ts` checks WebGL2 support, `navigator.hardwareConcurrency`, and a one-time render-cost probe on mount; sets `deviceTier` in the store before `<Experience>` mounts |
| LOD | Corridor dioramas use `<Detail>` (drei) — full geometry within 1 bay of the camera, low-poly placeholder beyond that |
| Asset loading | `.glb` models Draco-compressed; textures served as WebP with JPG fallback; `useGLTF.preload()` only for the *next* chapter's assets, triggered when scroll crosses 70% of the current chapter |
| Instancing | JS-basics shelf and skill nodes use `InstancedMesh` — one draw call per group regardless of count |
| Postprocessing | Bloom/DoF only on `deviceTier === 'high'`; disabled entirely on mid/low |
| Code splitting | Each `Room` component is `next/dynamic` with `ssr: false`; the canvas itself never touches the server render |
| Fallback | `deviceTier === 'low'` or `prefers-reduced-motion` → the entire experience swaps to `ProjectCard2D` stacked sections (same content, same data source, zero WebGL) — this is a real fallback, not a spinner |

---

## 6. Error Handling & Edge Cases

- **WebGL unsupported/context lost:** `LoadingGate` wraps `<Canvas>` in an error boundary; on `webglcontextlost` or initial capability failure, swap to the 2D fallback rather than a blank canvas.
- **Asset 404/slow network:** `useGLTF`/`useTexture` calls wrapped in `Suspense` with per-chapter fallback meshes (simple colored boxes) so a missing model degrades gracefully instead of blocking the whole corridor.
- **Reduced motion:** Respected at two levels — camera transitions become instant cuts (no GSAP tween), and idle/ambient animations (badge parallax, sphere breathing) are disabled entirely.
- **Scroll-jacking accessibility:** Native scroll is never fully hijacked — `ScrollControls` maps to real scroll distance, so trackpad/wheel/touch all work identically, and a fixed `Nav` provides direct chapter jump-links for keyboard/screen-reader users bypassing the 3D entirely.
- **Mobile touch conflicts:** Camera drag-orbit is disabled on touch devices in the Skills Constellation chapter (where desktop uses pointer-orbit) in favor of scroll-only progression, avoiding fights with native pinch/scroll gestures.

---

## 7. Responsive Design

- **Desktop (≥1024px):** Full corridor experience, postprocessing enabled, cursor-parallax on badge/sphere.
- **Tablet (768–1023px):** Same scene graph, `deviceTier` capped at `'mid'` — postprocessing off, LOD switches earlier.
- **Mobile (<768px):** Camera FOV widened for narrower viewports; `Html` overlay panels stack full-width instead of side-anchored; orbit/drag interactions replaced with scroll-only + tap-to-select.
- All breakpoints share one `<Canvas>` — no separate mobile scene — only quality knobs (`deviceTier`, `pixelRatio` capped at 1.5 on mobile) change.

---

## 8. Code Organization Patterns

**Reusable hooks:**
```ts
useCameraPath(chapterIndex: number)     // returns interpolated position/lookAt for current scrollProgress
useDeviceTier()                          // reads store, exposes 'high'|'mid'|'low'
useChapterVisibility(chapterIndex)       // boolean: is this chapter within render/activation range
```

**Component API convention** — every `Room` takes only its data + a shared camera-progress value, no cross-room imports:
```tsx
<BuildCorridor projects={projects} progress={scrollProgress} deviceTier={deviceTier} />
```

**Material/shader management:** a single `materials.ts` exports shared `MeshPhysicalMaterial` presets (glass, badge-metal, terminal-glow) so every diorama pulls from the same token set instead of ad hoc materials per component — keeps the "premium, cohesive" visual direction enforceable in one file.

**Animation orchestration:** GSAP timeline lives once in `CameraRig`; individual dioramas only expose an `active: boolean` prop and manage their own idle loop internally via `useFrame` — no component reaches into another's animation state.

---

## 9. Build Sequence (recommended implementation order)

1. Scaffold Next.js app, static `<Canvas>` with camera + lighting, no scroll yet.
2. `CameraRig` + `ScrollControls` — get the corridor "feel" right with placeholder boxes before any real geometry.
3. `IDBadge` with the real portrait texture + HUD-clip behavior.
4. `ProjectDiorama` generic component, wire in the 5 flagship projects from §4.5.
5. Skills Constellation + Origin shelf (lower-complexity chapters, fast to finish).
6. Research Room + Philosophy/Jarvis sphere.
7. Contact Desk + resume download wiring.
8. Device tiering, LOD, 2D fallback — perf pass.
9. Accessibility pass: keyboard nav, reduced-motion, screen-reader landmarks on the DOM overlay.
