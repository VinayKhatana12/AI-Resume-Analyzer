/**
 * getMockAnalysisData()
 * ─────────────────────────────────────────────────────────────────────────────
 * Simulated AI Resume Audit Response — Phase 2 Mock Data Layer
 *
 * Returns a rich, realistic JSON payload that mirrors what a production
 * AI analysis service would return, including:
 *   • ATS compatibility score
 *   • Matched / Missing keyword lists (with frequency & importance weights)
 *   • Section-by-section sub-scores with descriptive labels
 *   • Formatting & parsing risk flags
 *   • Prioritised recommendation cards grouped by section
 *   • Quick-stats summary object
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── 1. KEYWORD DATABASES ─────────────────────────────────────────────────────

const keywordDatabase = {
  frontend: {
    matched: [
      { tag: 'React.js', weight: 'critical', freq: 18 },
      { tag: 'React Hooks', weight: 'high', freq: 14 },
      { tag: 'Context API', weight: 'high', freq: 11 },
      { tag: 'Vite Build Tool', weight: 'medium', freq: 8 },
      { tag: 'HTML5 Semantics', weight: 'medium', freq: 12 },
      { tag: 'CSS3 / Flexbox', weight: 'medium', freq: 10 },
      { tag: 'JavaScript ES6+', weight: 'critical', freq: 22 },
      { tag: 'Git / GitHub', weight: 'medium', freq: 9 },
      { tag: 'REST API Integration', weight: 'high', freq: 13 },
      { tag: 'Responsive Design', weight: 'high', freq: 15 },
    ],
    missing: [
      { tag: 'TypeScript', weight: 'critical', freq: 24 },
      { tag: 'Next.js App Router', weight: 'high', freq: 19 },
      { tag: 'Redux Toolkit', weight: 'high', freq: 16 },
      { tag: 'TailwindCSS', weight: 'high', freq: 14 },
      { tag: 'Unit Testing (Jest / RTL)', weight: 'high', freq: 13 },
      { tag: 'E2E Testing (Playwright)', weight: 'medium', freq: 10 },
      { tag: 'CI/CD Pipelines', weight: 'medium', freq: 11 },
      { tag: 'Storybook', weight: 'low', freq: 6 },
      { tag: 'GraphQL Client', weight: 'medium', freq: 9 },
    ],
  },

  backend: {
    matched: [
      { tag: 'Node.js', weight: 'critical', freq: 20 },
      { tag: 'Express.js', weight: 'high', freq: 16 },
      { tag: 'REST API Design', weight: 'high', freq: 18 },
      { tag: 'MongoDB / Mongoose', weight: 'high', freq: 14 },
      { tag: 'JWT Authentication', weight: 'high', freq: 12 },
      { tag: 'Git Version Control', weight: 'medium', freq: 9 },
      { tag: 'MVC Architecture', weight: 'medium', freq: 10 },
      { tag: 'Middleware Design', weight: 'medium', freq: 8 },
    ],
    missing: [
      { tag: 'PostgreSQL / SQL', weight: 'critical', freq: 21 },
      { tag: 'Docker Containers', weight: 'critical', freq: 19 },
      { tag: 'Redis Caching', weight: 'high', freq: 15 },
      { tag: 'Microservices Architecture', weight: 'high', freq: 14 },
      { tag: 'Jest Unit Testing', weight: 'high', freq: 12 },
      { tag: 'Kubernetes (K8s)', weight: 'medium', freq: 9 },
      { tag: 'gRPC / Protobuf', weight: 'medium', freq: 7 },
      { tag: 'Message Queues (RabbitMQ)', weight: 'medium', freq: 8 },
      { tag: 'Prisma ORM', weight: 'medium', freq: 10 },
    ],
  },

  fullstack: {
    matched: [
      { tag: 'React.js', weight: 'critical', freq: 20 },
      { tag: 'Node.js / Express', weight: 'critical', freq: 18 },
      { tag: 'MongoDB', weight: 'high', freq: 15 },
      { tag: 'REST API Integration', weight: 'high', freq: 17 },
      { tag: 'Git / GitHub', weight: 'medium', freq: 10 },
      { tag: 'JavaScript ES6+', weight: 'critical', freq: 22 },
      { tag: 'HTML5 & CSS3', weight: 'medium', freq: 12 },
      { tag: 'JWT Authentication', weight: 'high', freq: 11 },
    ],
    missing: [
      { tag: 'TypeScript', weight: 'critical', freq: 25 },
      { tag: 'Next.js App Router', weight: 'high', freq: 20 },
      { tag: 'Docker', weight: 'critical', freq: 18 },
      { tag: 'PostgreSQL', weight: 'high', freq: 16 },
      { tag: 'GraphQL', weight: 'high', freq: 13 },
      { tag: 'AWS S3 / EC2', weight: 'high', freq: 14 },
      { tag: 'Prisma ORM', weight: 'medium', freq: 10 },
      { tag: 'CI/CD (GitHub Actions)', weight: 'medium', freq: 11 },
      { tag: 'Unit & Integration Testing', weight: 'high', freq: 14 },
    ],
  },

  general: {
    matched: [
      { tag: 'Agile / Scrum', weight: 'high', freq: 15 },
      { tag: 'Software Development Life Cycle', weight: 'high', freq: 12 },
      { tag: 'Git Version Control', weight: 'medium', freq: 10 },
      { tag: 'Problem Solving', weight: 'medium', freq: 9 },
      { tag: 'Team Collaboration', weight: 'medium', freq: 8 },
      { tag: 'Code Review Practices', weight: 'medium', freq: 7 },
    ],
    missing: [
      { tag: 'Cloud Infrastructure (AWS / GCP)', weight: 'high', freq: 18 },
      { tag: 'DevOps / SRE Practices', weight: 'high', freq: 14 },
      { tag: 'Information Security Fundamentals', weight: 'medium', freq: 10 },
      { tag: 'System Architecture Design', weight: 'high', freq: 13 },
      { tag: 'Unit Testing Frameworks', weight: 'high', freq: 12 },
      { tag: 'Technical Documentation', weight: 'medium', freq: 8 },
      { tag: 'Performance Optimisation', weight: 'medium', freq: 9 },
    ],
  },
};


// ── 2. FORMATTING RISK FLAGS ──────────────────────────────────────────────────

const formattingFlags = {
  frontend: [
    { severity: 'warning', message: 'Non-standard font detected — ATS parsers may misread decorative glyphs.' },
    { severity: 'info', message: 'Two-column layout identified. Some legacy parsers extract columns out of order.' },
    { severity: 'pass', message: 'File encoding is UTF-8. No special character conflicts detected.' },
    { severity: 'warning', message: 'Header placed inside a text-box frame — may be invisible to some ATS systems.' },
    { severity: 'pass', message: 'No graphics or embedded images that could confuse text extraction.' },
  ],
  backend: [
    { severity: 'pass', message: 'Single-column layout confirmed — optimal for ATS linear parsing.' },
    { severity: 'warning', message: 'Bullet points use custom Unicode symbols (▶ •) — consider plain hyphens.' },
    { severity: 'info', message: 'Horizontal divider lines detected. Ensure they are not image-based.' },
    { severity: 'pass', message: 'File size within optimal range (under 500 KB).' },
    { severity: 'warning', message: `Dates formatted as "Jan '22" — prefer "January 2022" for reliability.` },
  ],
  fullstack: [
    { severity: 'warning', message: 'Embedded hyperlinks may not be parsed by older ATS readers.' },
    { severity: 'pass', message: 'Section headings are plain text. Excellent for keyword extraction.' },
    { severity: 'info', message: 'Multiple page spans detected. Keep resume to 1–2 pages for senior roles.' },
    { severity: 'warning', message: 'Skills listed in a graphical rating bar — remove visual skill meters.' },
    { severity: 'pass', message: 'No tables or multi-column skill grids found in experience section.' },
  ],
  general: [
    { severity: 'info', message: 'Resume length is 3 pages — trim to under 2 for most applicant tracking.' },
    { severity: 'warning', message: 'Photo/headshot found — remove before submitting to international ATS.' },
    { severity: 'pass', message: 'Contact information is in the top 10% of the document. Correct placement.' },
    { severity: 'warning', message: 'Objective statement uses first-person pronouns — rewrite in third person.' },
    { severity: 'pass', message: 'Education section correctly follows experience. Good structural order.' },
  ],
};


// ── 3. RECOMMENDATION TEMPLATES ───────────────────────────────────────────────

const recommendationTemplates = {
  frontend: [
    {
      id: 1,
      section: 'Skills Section',
      icon: 'Zap',
      issue: 'Missing top 3 critical keywords: TypeScript, Next.js App Router, and Redux Toolkit.',
      suggestion:
        'Add a dedicated "Technical Skills" subsection with these exact strings. ATS systems match keywords verbatim — include both "TypeScript" and "TS" variations.',
      impact: 'High',
      effort: 'Low',
    },
    {
      id: 2,
      section: 'Work Experience',
      icon: 'Briefcase',
      issue: 'Accomplishment bullets use passive voice and weak action verbs.',
      suggestion:
        "Replace openers like 'Helped build' or 'Worked on' with quantified action verbs: 'Architected a reusable component library serving 12+ micro-frontends, reducing page load by 34%'.",
      impact: 'High',
      effort: 'Medium',
    },
    {
      id: 3,
      section: 'Professional Summary',
      icon: 'FileText',
      issue: 'Summary does not mention years of experience or primary specialisation stack.',
      suggestion:
        "Rewrite to: '5+ years of front-end engineering experience specialising in React.js, TypeScript, and modern build tooling. Proven track record of delivering pixel-perfect UIs at scale.'",
      impact: 'Medium',
      effort: 'Low',
    },
    {
      id: 4,
      section: 'Projects Section',
      icon: 'Code2',
      issue: 'Projects listed without measurable outcomes or live deployment links.',
      suggestion:
        'Add GitHub repository URLs and live demo links. Include metrics such as "4.9★ user rating" or "3,000+ monthly active users". ATS bonus: repo star counts signal real-world adoption.',
      impact: 'Medium',
      effort: 'Medium',
    },
    {
      id: 5,
      section: 'Document Structure',
      icon: 'Layout',
      issue: 'Non-standard font family and two-column layout detected.',
      suggestion:
        'Switch to a single-column layout using system-safe fonts (Inter, Arial, Calibri). Two-column resumes routinely cause ATS to merge columns and scramble section order.',
      impact: 'High',
      effort: 'High',
    },
    {
      id: 6,
      section: 'Education',
      icon: 'GraduationCap',
      issue: 'Degree field missing GPA and relevant coursework for entry-to-mid roles.',
      suggestion:
        'For roles requiring recent graduates, add: "Relevant coursework: Data Structures, Web Systems, Operating Systems" and GPA if ≥ 3.5.',
      impact: 'Low',
      effort: 'Low',
    },
  ],

  backend: [
    {
      id: 1,
      section: 'Skills Section',
      icon: 'Zap',
      issue: 'PostgreSQL, Docker, and Redis are absent — three critical backend stack requirements.',
      suggestion:
        'Create a structured skills matrix: "Databases: MongoDB, PostgreSQL | DevOps: Docker, Nginx | Caching: Redis". Match exact strings from the job spec.',
      impact: 'High',
      effort: 'Low',
    },
    {
      id: 2,
      section: 'Work Experience',
      icon: 'Briefcase',
      issue: 'API performance and scalability impacts are not quantified in experience bullets.',
      suggestion:
        "Reframe achievements: 'Optimised PostgreSQL query execution reducing average API response time from 800ms → 120ms under 10K concurrent users.' Numbers drive recruiter attention and ATS ranking.",
      impact: 'High',
      effort: 'Medium',
    },
    {
      id: 3,
      section: 'Professional Summary',
      icon: 'FileText',
      issue: 'Summary section is generic and could apply to any developer role.',
      suggestion:
        "Specialise the summary: 'Backend engineer with 4+ years building high-throughput Node.js microservices. Expert in RESTful API design, MongoDB schema optimisation, and JWT security patterns.'",
      impact: 'Medium',
      effort: 'Low',
    },
    {
      id: 4,
      section: 'Projects Section',
      icon: 'Code2',
      issue: 'Backend project descriptions focus on implementation, not on production-scale metrics.',
      suggestion:
        'Add load numbers and reliability metrics: "Engineered a real-time notification service handling 50K events/sec with 99.97% uptime on AWS EC2 behind NGINX load balancer."',
      impact: 'High',
      effort: 'Medium',
    },
    {
      id: 5,
      section: 'Certifications',
      icon: 'Award',
      issue: 'No cloud or DevOps certifications listed — a significant gap for senior backend roles.',
      suggestion:
        'Consider adding AWS Certified Developer, Google Cloud Associate, or Certified Kubernetes Administrator (CKA). Even in-progress certifications signal intent.',
      impact: 'Medium',
      effort: 'High',
    },
    {
      id: 6,
      section: 'Document Structure',
      icon: 'Layout',
      issue: "Date formatting inconsistency detected ('Jan '22' vs 'November 2021').",
      suggestion:
        'Standardise all date formats to "Month YYYY" (e.g., "January 2022"). Inconsistencies confuse ATS date parsers and can misassign tenure durations.',
      impact: 'Low',
      effort: 'Low',
    },
  ],

  fullstack: [
    {
      id: 1,
      section: 'Skills Section',
      icon: 'Zap',
      issue: 'TypeScript, Docker, and PostgreSQL are the top 3 missing keywords for this role.',
      suggestion:
        'Expand the skills section with an explicit "Tech Stack" block: React | Next.js | TypeScript | Node.js | PostgreSQL | Docker | AWS. Group by layer (Frontend / Backend / DevOps).',
      impact: 'High',
      effort: 'Low',
    },
    {
      id: 2,
      section: 'Work Experience',
      icon: 'Briefcase',
      issue: 'Full-stack contributions are described from the front-end perspective only.',
      suggestion:
        'Expand backend contributions in each role bullet. Mention database schema design decisions, API versioning strategies, and infrastructure choices. Show the full stack depth.',
      impact: 'High',
      effort: 'Medium',
    },
    {
      id: 3,
      section: 'Professional Summary',
      icon: 'FileText',
      issue: 'Summary reads as a front-end developer bio, not a full-stack engineer.',
      suggestion:
        "Update to: 'Full-stack engineer proficient across the MERN ecosystem. 5+ years shipping production features from database schema to browser paint. Comfortable owning entire feature slices end-to-end.'",
      impact: 'Medium',
      effort: 'Low',
    },
    {
      id: 4,
      section: 'Projects Section',
      icon: 'Code2',
      issue: 'Project descriptions are vague about the backend architecture and data model.',
      suggestion:
        'For each project add: tech stack breakdown (React / Express / PostgreSQL / Docker), system design decisions made, and measurable outcomes (e.g., "reduced server cold-start by 60% via connection pooling").',
      impact: 'High',
      effort: 'Medium',
    },
    {
      id: 5,
      section: 'Testing Coverage',
      icon: 'TestTube2',
      issue: 'No mention of test coverage, testing frameworks, or test-driven development practices.',
      suggestion:
        'Add a testing line under each role: "Maintained 85%+ test coverage via Jest, React Testing Library, and Playwright E2E suites." This is a filter criterion at many senior hiring rounds.',
      impact: 'High',
      effort: 'Medium',
    },
    {
      id: 6,
      section: 'Document Structure',
      icon: 'Layout',
      issue: 'Visual skill-level bars (graphical progress indicators) detected in skills section.',
      suggestion:
        'Remove all graphical rating systems. ATS parsers cannot interpret bar widths. Replace with explicit text: "Advanced: React, Node.js | Proficient: Docker, PostgreSQL | Familiar: Kubernetes, Terraform".',
      impact: 'High',
      effort: 'Low',
    },
  ],

  general: [
    {
      id: 1,
      section: 'Skills Section',
      icon: 'Zap',
      issue: 'Cloud and DevOps keywords are entirely absent from the skills profile.',
      suggestion:
        'Add any cloud experience, even basic: "AWS (S3, EC2 basics)", "GCP (Firebase)", or "DigitalOcean". Cloud literacy is a baseline expectation in most modern tech roles.',
      impact: 'High',
      effort: 'Low',
    },
    {
      id: 2,
      section: 'Work Experience',
      icon: 'Briefcase',
      issue: 'Bullet points are task-oriented ("responsible for") rather than outcome-oriented.',
      suggestion:
        'Apply the STAR format: Situation → Task → Action → Result. Example: "Led migration of monolithic codebase to microservices (Action), reducing deployment lead time from 3 days → 4 hours (Result, 94% faster)."',
      impact: 'High',
      effort: 'Medium',
    },
    {
      id: 3,
      section: 'Professional Summary',
      icon: 'FileText',
      issue: 'Summary is 6 lines long and buries the value proposition.',
      suggestion:
        'Trim to 3 high-impact sentences: (1) your title + years of experience, (2) your core specialisation, (3) a signature achievement. Remove filler phrases like "team player" and "fast learner".',
      impact: 'Medium',
      effort: 'Low',
    },
    {
      id: 4,
      section: 'Document Structure',
      icon: 'Layout',
      issue: 'Resume is 3+ pages — significantly above the recommended maximum.',
      suggestion:
        'Target 1 page for under 5 years of experience; 2 pages maximum for senior roles. Remove duplicate descriptions and trim bullet points to 1 clear line each.',
      impact: 'High',
      effort: 'High',
    },
    {
      id: 5,
      section: 'Contact Section',
      icon: 'User',
      issue: 'LinkedIn URL and GitHub profile are absent from the contact block.',
      suggestion:
        "Add formatted links: 'linkedin.com/in/yourname' and 'github.com/yourhandle'. Many ATS systems scan these to enrich your profile score — especially for technical roles.",
      impact: 'Medium',
      effort: 'Low',
    },
    {
      id: 6,
      section: 'Keywords Density',
      icon: 'TrendingUp',
      issue: 'Job-relevant terminology appears fewer than 3 times in the document body.',
      suggestion:
        'Naturally weave the top 5 missing keywords into your experience bullets and summary. Keyword frequency (within reason) signals relevance to ATS ranking algorithms.',
      impact: 'High',
      effort: 'Medium',
    },
  ],
};


// ── 4. QUICK STATS GENERATORS ─────────────────────────────────────────────────

const getReadabilityGrade = (score) => {
  if (score >= 85) return { label: 'Excellent', color: 'emerald' };
  if (score >= 70) return { label: 'Good', color: 'amber' };
  if (score >= 55) return { label: 'Fair', color: 'orange' };
  return { label: 'Needs Work', color: 'rose' };
};


// ── 5. MAIN EXPORT ───────────────────────────────────────────────────────────

export const getMockAnalysisData = (jobTitle = '') => {
  const titleLower = jobTitle.toLowerCase();

  let category = 'general';
  if (
    titleLower.includes('front') ||
    titleLower.includes('react') ||
    titleLower.includes('ui') ||
    titleLower.includes('web') ||
    titleLower.includes('angular') ||
    titleLower.includes('vue')
  ) {
    category = 'frontend';
  } else if (
    titleLower.includes('back') ||
    titleLower.includes('node') ||
    titleLower.includes('api') ||
    titleLower.includes('server') ||
    titleLower.includes('django') ||
    titleLower.includes('python')
  ) {
    category = 'backend';
  } else if (
    titleLower.includes('full') ||
    titleLower.includes('stack') ||
    titleLower.includes('mern') ||
    titleLower.includes('software') ||
    titleLower.includes('engineer') ||
    titleLower.includes('developer')
  ) {
    category = 'fullstack';
  }

  const dataset = keywordDatabase[category];
  const flags = formattingFlags[category];
  const recommendations = recommendationTemplates[category];

  // Deterministic-ish score so re-runs feel realistic
  const totalKw = dataset.matched.length + dataset.missing.length;
  const matchRatio = dataset.matched.length / totalKw;
  const rawScore = Math.round(52 + matchRatio * 38 + Math.random() * 9);
  const finalScore = Math.min(Math.max(rawScore, 58), 97);

  // Section scores with realistic variance
  const rand = (min, max) => Math.round(min + Math.random() * (max - min));
  const sectionScores = {
    contactInfo:  { score: rand(80, 100), label: 'Contact Information' },
    summary:      { score: rand(55, 85),  label: 'Professional Summary' },
    experience:   { score: rand(50, 82),  label: 'Work Experience' },
    skills:       { score: rand(45, 80),  label: 'Core Skills' },
    education:    { score: rand(88, 100), label: 'Education' },
    projects:     { score: rand(42, 78),  label: 'Projects / Portfolio' },
    formatting:   { score: rand(60, 90),  label: 'ATS Formatting' },
  };

  const readability = getReadabilityGrade(finalScore);

  const keywordCoveragePercent = Math.round(
    (dataset.matched.length / (dataset.matched.length + dataset.missing.length)) * 100
  );

  return {
    // ── Core ─────────────────────────────────────────────────────────────
    jobTitle: jobTitle || 'Target Position',
    category,
    score: finalScore,
    analyzedAt: new Date().toISOString(),

    // ── Keyword Analysis ─────────────────────────────────────────────────
    matchedKeywords: dataset.matched,
    missingKeywords: dataset.missing,
    keywordCoveragePercent,

    // ── Section Scores ───────────────────────────────────────────────────
    sectionScores,

    // ── Formatting Flags ─────────────────────────────────────────────────
    formattingFlags: flags,

    // ── Recommendations ──────────────────────────────────────────────────
    recommendations,

    // ── Quick Stats ──────────────────────────────────────────────────────
    quickStats: {
      totalKeywordsScanned: dataset.matched.length + dataset.missing.length,
      matchedCount:         dataset.matched.length,
      missingCount:         dataset.missing.length,
      recommendationCount:  recommendations.length,
      formattingIssues:     flags.filter(f => f.severity !== 'pass').length,
      readabilityGrade:     readability.label,
      readabilityColor:     readability.color,
      estimatedATSRank:     finalScore >= 85 ? 'Top 15%' :
                            finalScore >= 70 ? 'Top 35%' :
                            finalScore >= 55 ? 'Top 55%' : 'Bottom 45%',
    },
  };
};


// ── 6. BULLET POINT IMPROVER DATA ────────────────────────────────────────────
//
// Each entry contains:
//   id          – unique identifier
//   category    – grouping label shown in the UI
//   weak        – the original, low-impact bullet text
//   strong      – the AI-rewritten, high-impact version
//   tags        – skill tags extracted from the improvement
//   impact      – 'High' | 'Medium' | 'Low'  (ATS rank uplift potential)
//   difficulty  – 'Easy' | 'Medium' | 'Hard' (how hard it is to adopt)
//   tip         – a one-line coaching note explaining the rewrite rationale

export const getMockBulletPoints = () => [

  // ── Frontend ──────────────────────────────────────────────────────────────

  {
    id: 1,
    category: 'Frontend Development',
    weak: 'Responsible for fixing bugs and updating the web page.',
    strong: 'Diagnosed and resolved 40+ critical UI bugs across React component tree, reducing user-reported issues by 62% over two sprint cycles.',
    tags: ['React', 'Debugging', 'Sprint Planning'],
    impact: 'High',
    difficulty: 'Easy',
    tip: 'Lead with a number. Quantify how many bugs and the measurable outcome — percentage drop in issue tickets.',
  },
  {
    id: 2,
    category: 'Frontend Development',
    weak: 'Made the website faster by changing some code.',
    strong: 'Refactored critical rendering paths using React.memo, lazy loading, and code-splitting, cutting Largest Contentful Paint (LCP) from 4.2s to 1.1s and achieving a 96 Lighthouse performance score.',
    tags: ['React', 'Performance', 'Lighthouse', 'Code Splitting'],
    impact: 'High',
    difficulty: 'Medium',
    tip: 'Name the specific techniques used (React.memo, lazy loading) and cite concrete before/after metrics (LCP, Lighthouse score).',
  },
  {
    id: 3,
    category: 'Frontend Development',
    weak: 'Worked on the UI and helped make it look better for mobile.',
    strong: 'Engineered a fully responsive design system using CSS Grid and Flexbox, increasing mobile session duration by 38% and reducing bounce rate from 72% to 41% across 5 breakpoints.',
    tags: ['CSS Grid', 'Flexbox', 'Responsive Design', 'UX'],
    impact: 'High',
    difficulty: 'Easy',
    tip: 'Replace vague "helped make it better" with design system specifics, the technology used, and user behaviour metrics from analytics.',
  },
  {
    id: 4,
    category: 'Frontend Development',
    weak: 'Used React to build some components for the app.',
    strong: 'Architected a reusable React component library of 35+ components with Storybook documentation, accelerating feature development velocity by 50% and adopted across 4 product micro-frontends.',
    tags: ['React', 'Storybook', 'Component Library', 'Micro-Frontends'],
    impact: 'High',
    difficulty: 'Medium',
    tip: 'Scope the work with hard numbers (35+ components) and demonstrate organisational impact (4 micro-frontends adopted it).',
  },

  // ── Backend / API ─────────────────────────────────────────────────────────

  {
    id: 5,
    category: 'Backend & API',
    weak: 'Responsible for building the backend API for the project.',
    strong: 'Designed and deployed a RESTful Node.js/Express API serving 120K+ daily requests, implementing JWT authentication, rate-limiting middleware, and input sanitisation to achieve 99.94% uptime.',
    tags: ['Node.js', 'Express', 'REST API', 'JWT', 'Security'],
    impact: 'High',
    difficulty: 'Easy',
    tip: 'Quantify the scale (daily requests), list the specific security patterns implemented, and cite uptime as a reliability signal.',
  },
  {
    id: 6,
    category: 'Backend & API',
    weak: 'Improved the database queries to make things run faster.',
    strong: 'Optimised 15+ critical MongoDB aggregation pipelines with compound indexing and query projection, reducing average API response time from 850ms to 120ms (86% improvement) under peak load.',
    tags: ['MongoDB', 'Database Optimisation', 'Indexing', 'Node.js'],
    impact: 'High',
    difficulty: 'Medium',
    tip: 'State the exact number of queries touched, name the optimisation techniques, and show the before/after latency with a clear percentage improvement.',
  },
  {
    id: 7,
    category: 'Backend & API',
    weak: 'Helped set up caching to improve performance.',
    strong: 'Implemented a Redis caching layer for high-frequency GET endpoints, reducing database read load by 74% and decreasing average response latency by 310ms across the product\'s 3 most-trafficked routes.',
    tags: ['Redis', 'Caching', 'Performance', 'Node.js'],
    impact: 'High',
    difficulty: 'Easy',
    tip: 'Name the caching technology (Redis), give the exact reduction metric, and scope which routes were affected.',
  },
  {
    id: 8,
    category: 'Backend & API',
    weak: 'Worked on integrating a payment system into the app.',
    strong: 'Integrated Stripe Payment API with webhook signature verification, idempotency key handling, and automated refund logic, processing $2.4M in transactions at 99.98% success rate with zero double-charges.',
    tags: ['Stripe', 'Payments', 'Webhooks', 'Node.js'],
    impact: 'High',
    difficulty: 'Hard',
    tip: 'Cite the dollar volume processed and the success rate. This transforms a vague "integration" into a business-critical achievement with trust signals.',
  },

  // ── Full-Stack / DevOps ───────────────────────────────────────────────────

  {
    id: 9,
    category: 'Full-Stack & DevOps',
    weak: 'Set up Docker for the project to help with deployment.',
    strong: 'Containerised a 6-service MERN application with Docker Compose, slashing environment setup time from 2 hours to under 8 minutes and eliminating "works on my machine" inconsistencies across a 12-engineer team.',
    tags: ['Docker', 'Docker Compose', 'DevOps', 'MERN'],
    impact: 'High',
    difficulty: 'Medium',
    tip: 'Show time saved (2h → 8min) and team impact (12 engineers). The human benefit makes the achievement tangible to non-technical hiring managers.',
  },
  {
    id: 10,
    category: 'Full-Stack & DevOps',
    weak: 'Helped build the CI/CD pipeline for the team.',
    strong: 'Architected a GitHub Actions CI/CD pipeline with automated Jest/RTL test gates, ESLint enforcement, and zero-downtime blue-green deployments to AWS ECS, reducing release cycle from 3 days to 45 minutes.',
    tags: ['GitHub Actions', 'CI/CD', 'AWS ECS', 'Jest', 'DevOps'],
    impact: 'High',
    difficulty: 'Hard',
    tip: 'Name the specific tools in each stage (GitHub Actions, Jest, ECS) and show the business-level impact: release cycle compression is a strong executive signal.',
  },
  {
    id: 11,
    category: 'Full-Stack & DevOps',
    weak: 'Made the app work better overall and fixed some performance issues.',
    strong: 'Conducted a full-stack performance audit across React frontend and Node.js backend, implementing lazy routes, N+1 query fixes, and CDN asset delivery, resulting in a 55% reduction in Time to Interactive (TTI) and a 28% decrease in cloud infrastructure costs.',
    tags: ['Performance Audit', 'React', 'Node.js', 'CDN', 'AWS'],
    impact: 'High',
    difficulty: 'Hard',
    tip: 'Combine frontend and backend wins into one power-bullet. Adding cost savings ($) or percentage infrastructure reduction is a C-suite attention magnet.',
  },

  // ── Leadership / Collaboration ─────────────────────────────────────────────

  {
    id: 12,
    category: 'Leadership & Collaboration',
    weak: 'Helped mentor junior developers on the team.',
    strong: 'Mentored 4 junior full-stack engineers through bi-weekly code reviews and pair-programming sessions, lifting team PR merge rate by 35% and enabling 2 mentees to independently own and ship production features within 3 months.',
    tags: ['Mentorship', 'Code Review', 'Team Leadership', 'Agile'],
    impact: 'Medium',
    difficulty: 'Easy',
    tip: 'Quantify your mentorship (4 engineers, bi-weekly sessions) and prove its outcome: faster PRs and independently shipping engineers are concrete results.',
  },
];
