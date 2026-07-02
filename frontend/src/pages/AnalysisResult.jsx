import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  FileDown,
  Layers,
  Search,
  ListTodo,
  ShieldCheck,
  TrendingUp,
  Zap,
  Award,
  BarChart3,
  CircleAlert,
  Info,
  ChevronRight,
  Sparkles,
  Target,
  Clock,
  Users,
} from 'lucide-react';
import Header from '../components/Header';

// ── Helpers ───────────────────────────────────────────────────────────────────

const getScoreColor = (s) => {
  if (s >= 80) return 'text-emerald-400';
  if (s >= 65) return 'text-amber-400';
  return 'text-rose-400';
};

const getScoreStroke = (s) => {
  if (s >= 80) return '#10b981'; // emerald-500
  if (s >= 65) return '#f59e0b'; // amber-500
  return '#f43f5e';              // rose-500
};

const getBarColor = (s) => {
  if (s >= 80) return 'from-emerald-500 to-emerald-400';
  if (s >= 65) return 'from-amber-500 to-amber-400';
  return 'from-rose-500 to-rose-400';
};

const getImpactBadge = (impact) => {
  if (impact === 'High')   return 'bg-rose-500/10 text-rose-400 border border-rose-500/25';
  if (impact === 'Medium') return 'bg-amber-500/10 text-amber-400 border border-amber-500/25';
  return 'bg-sky-500/10 text-sky-400 border border-sky-500/25';
};

const getEffortBadge = (effort) => {
  if (effort === 'Low')    return 'bg-emerald-500/10 text-emerald-400';
  if (effort === 'Medium') return 'bg-violet-500/10 text-violet-400';
  return 'bg-orange-500/10 text-orange-400';
};

const getWeightBadge = (weight) => {
  if (weight === 'critical') return 'text-rose-300 font-bold';
  if (weight === 'high')     return 'text-amber-300 font-semibold';
  return 'text-slate-300';
};

const getFlagIcon = (severity) => {
  if (severity === 'pass')    return <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
  if (severity === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />;
  return <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />;
};

const getFlagRow = (severity) => {
  if (severity === 'pass')    return 'border-emerald-500/15 bg-emerald-500/5';
  if (severity === 'warning') return 'border-amber-500/15 bg-amber-500/5';
  return 'border-sky-500/15 bg-sky-500/5';
};

// ── Animated Circular Score Gauge ─────────────────────────────────────────────

const ScoreGauge = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - animatedScore / 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const step = score / 60;
      const interval = setInterval(() => {
        current = Math.min(current + step, score);
        setAnimatedScore(Math.round(current));
        if (current >= score) clearInterval(interval);
      }, 16);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative w-40 h-40 flex-shrink-0">
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20"
        style={{ backgroundColor: getScoreStroke(score) }}
      />
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        {/* Track */}
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
        {/* Progress arc */}
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={getScoreStroke(score)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.05s ease' }}
        />
      </svg>
      {/* Centre label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-black tabular-nums ${getScoreColor(score)}`}>
          {animatedScore}
        </span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">
          ATS Score
        </span>
      </div>
    </div>
  );
};

// ── Animated Progress Bar ─────────────────────────────────────────────────────

const AnimatedBar = ({ score, delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setWidth(score), delay);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score, delay]);

  return (
    <div ref={ref} className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${getBarColor(score)} transition-all duration-700 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

// ── Keyword Badge ─────────────────────────────────────────────────────────────

const KeywordBadge = ({ tag, freq, weight, type }) => {
  const [hovered, setHovered] = useState(false);

  if (type === 'matched') {
    return (
      <div
        className="relative inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-500/8 border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-500/15 rounded-xl text-sm transition-all cursor-default select-none group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <span className={`text-emerald-200 ${getWeightBadge(weight)}`}>{tag}</span>
        {hovered && (
          <span className="ml-1 text-[10px] text-emerald-500 font-bold opacity-80">
            ×{freq}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative inline-flex items-center gap-1.5 px-3 py-2 bg-rose-500/8 border border-rose-500/20 hover:border-rose-400/50 hover:bg-rose-500/15 rounded-xl text-sm transition-all cursor-default select-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
      <span className={`text-rose-200 ${getWeightBadge(weight)}`}>{tag}</span>
      {hovered && weight === 'critical' && (
        <span className="ml-1 text-[10px] text-rose-500 font-bold opacity-80">
          CRITICAL
        </span>
      )}
    </div>
  );
};


// ── Tab: Score Profile ────────────────────────────────────────────────────────

const TabOverview = ({ data }) => {
  const { sectionScores, quickStats, formattingFlags } = data;
  const sections = Object.values(sectionScores);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-[fadeIn_0.3s_ease]">

      {/* Section Progress Bars */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Section Performance Breakdown
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            AI-computed compliance rating for each résumé section — scored against ATS parsing benchmarks.
          </p>
        </div>

        <div className="space-y-5">
          {sections.map((sec, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">{sec.label}</span>
                <strong className={`text-sm font-bold tabular-nums ${getScoreColor(sec.score)}`}>
                  {sec.score}%
                </strong>
              </div>
              <AnimatedBar score={sec.score} delay={i * 80} />
            </div>
          ))}
        </div>
      </div>

      {/* Right column: Quick Stats + Formatting Flags */}
      <div className="space-y-5">

        {/* Quick Stats card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Audit Summary
          </h3>
          {[
            { label: 'Keyword Coverage', value: `${quickStats.matchedCount} / ${quickStats.totalKeywordsScanned}`, color: 'text-emerald-400' },
            { label: 'Missing Keywords', value: `${quickStats.missingCount} tags`, color: 'text-rose-400' },
            { label: 'Action Items', value: `${quickStats.recommendationCount} items`, color: 'text-amber-400' },
            { label: 'Formatting Issues', value: `${quickStats.formattingIssues} flags`, color: 'text-orange-400' },
            { label: 'ATS Estimated Rank', value: quickStats.estimatedATSRank, color: 'text-indigo-400' },
            { label: 'Readability Grade', value: quickStats.readabilityGrade, color: 'text-violet-400' },
          ].map(({ label, value, color }, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-xs border-b border-slate-800/80 pb-3 last:border-0 last:pb-0"
            >
              <span className="text-slate-400">{label}</span>
              <strong className={`${color} font-bold`}>{value}</strong>
            </div>
          ))}
        </div>

        {/* Formatting Flag card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Formatting Checks
          </h3>
          <div className="space-y-2">
            {formattingFlags.map((flag, i) => (
              <div
                key={i}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs leading-relaxed ${getFlagRow(flag.severity)}`}
              >
                {getFlagIcon(flag.severity)}
                <span className="text-slate-300">{flag.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// ── Tab: Keyword Gap ──────────────────────────────────────────────────────────

const TabKeywords = ({ matchedKeywords, missingKeywords, keywordCoveragePercent }) => (
  <div className="space-y-6 animate-[fadeIn_0.3s_ease]">

    {/* Coverage bar */}
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Keyword Coverage Rate
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Percentage of role-critical terms detected in your document.
          </p>
        </div>
        <span className={`text-3xl font-black tabular-nums ${getScoreColor(keywordCoveragePercent)}`}>
          {keywordCoveragePercent}%
        </span>
      </div>
      <AnimatedBar score={keywordCoveragePercent} delay={100} />
      <div className="flex gap-6 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          {matchedKeywords.length} matched
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
          {missingKeywords.length} missing
        </span>
      </div>
    </div>

    {/* Missing keywords */}
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
      <div className="flex items-center gap-2 text-rose-400">
        <XCircle className="w-5 h-5" />
        <h3 className="font-bold text-lg text-white">Missing Keywords</h3>
        <span className="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
          {missingKeywords.length} to add
        </span>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        ATS engines score your résumé against each keyword from the job spec.
        Add these terms naturally to the relevant sections to boost your rank:
      </p>
      <div className="flex flex-wrap gap-2.5 pt-1">
        {missingKeywords.map((kw, i) => (
          <KeywordBadge key={i} {...kw} type="missing" />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-800 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="font-bold text-rose-300">Bold red</span> = critical frequency keyword
        </span>
        <span className="flex items-center gap-1.5">
          <span className="font-semibold text-amber-300">Amber</span> = high-impact keyword
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-slate-300">Normal</span> = medium / low impact
        </span>
        <span className="flex items-center gap-1.5">
          Hover keyword to see frequency in job spec
        </span>
      </div>
    </div>

    {/* Matched keywords */}
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
      <div className="flex items-center gap-2 text-emerald-400">
        <CheckCircle2 className="w-5 h-5" />
        <h3 className="font-bold text-lg text-white">Matched Keywords</h3>
        <span className="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {matchedKeywords.length} detected
        </span>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        These terms were successfully parsed and cross-referenced from your document content:
      </p>
      <div className="flex flex-wrap gap-2.5 pt-1">
        {matchedKeywords.map((kw, i) => (
          <KeywordBadge key={i} {...kw} type="matched" />
        ))}
      </div>
    </div>
  </div>
);


// ── Tab: Recommendations ──────────────────────────────────────────────────────

const TabRecommendations = ({ recommendations }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5">
        <div>
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-indigo-400" />
            AI-Powered Action Checklist
          </h3>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Prioritised improvements ranked by ATS impact potential. Each card shows
            the detected issue, the exact action to take, and the estimated effort.
          </p>
        </div>

        {/* Impact legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          {[
            { label: 'High Priority', cls: 'bg-rose-500/10 text-rose-400 border border-rose-500/25' },
            { label: 'Medium Priority', cls: 'bg-amber-500/10 text-amber-400 border border-amber-500/25' },
            { label: 'Low Priority', cls: 'bg-sky-500/10 text-sky-400 border border-sky-500/25' },
          ].map(({ label, cls }) => (
            <span key={label} className={`px-2.5 py-1 rounded-lg font-semibold ${cls}`}>
              {label}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          {recommendations.map((rec) => {
            const isOpen = expanded === rec.id;
            return (
              <div
                key={rec.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-indigo-500/40 bg-indigo-500/5'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : rec.id)}
                  className="w-full flex items-start gap-3 p-4 text-left"
                >
                  <div className={`flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 ${
                    rec.impact === 'High'   ? 'bg-rose-500/15 text-rose-400' :
                    rec.impact === 'Medium' ? 'bg-amber-500/15 text-amber-400' :
                    'bg-sky-500/15 text-sky-400'
                  }`}>
                    <span className="text-xs font-black">{rec.id}</span>
                  </div>

                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        {rec.section}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${getImpactBadge(rec.impact)}`}>
                        {rec.impact}
                      </span>
                      {rec.effort && (
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${getEffortBadge(rec.effort)}`}>
                          {rec.effort} effort
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      {rec.issue}
                    </p>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-200 mt-0.5 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {/* Expanded suggestion */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="pl-10 flex items-start gap-2.5 p-3.5 bg-indigo-500/5 border border-indigo-500/15 rounded-xl">
                      <Lightbulb className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-300 leading-relaxed">{rec.suggestion}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


// ── Main Page ─────────────────────────────────────────────────────────────────

const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const analysisResult = location.state?.analysisResult;
  const fileName = location.state?.fileName || 'resume_submitted.pdf';

  /* ── Empty state ── */
  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-4 text-center">
          <div className="p-5 bg-amber-500/10 rounded-full border border-amber-500/20">
            <AlertTriangle className="w-10 h-10 text-amber-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">No Analysis Data Found</h2>
            <p className="text-sm text-slate-400 max-w-sm">
              Please upload a resume and a job description from the Dashboard to begin your ATS audit.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const {
    jobTitle,
    score,
    matchedKeywords,
    missingKeywords,
    keywordCoveragePercent,
    sectionScores,
    formattingFlags,
    recommendations,
    quickStats,
    analyzedAt,
  } = analysisResult;

  const scoreVerdict =
    score >= 85
      ? { text: 'Excellent Match', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/25' }
      : score >= 70
      ? { text: 'Good Alignment', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/25' }
      : { text: 'Needs Improvement', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/25' };

  const tabs = [
    {
      id: 'overview',
      label: 'Score Profile',
      icon: <Layers className="w-4 h-4" />,
      badge: null,
    },
    {
      id: 'keywords',
      label: 'Keyword Gap',
      icon: <Search className="w-4 h-4" />,
      badge: missingKeywords.length,
      badgeCls: 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
    },
    {
      id: 'improvements',
      label: 'Recommendations',
      icon: <ListTodo className="w-4 h-4" />,
      badge: recommendations.length,
      badgeCls: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
    },
  ];

  const analysisDate = analyzedAt
    ? new Date(analyzedAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-indigo-600/40 selection:text-white">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ── Breadcrumb ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            {analysisDate && (
              <span className="hidden sm:flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {analysisDate}
              </span>
            )}
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg">
              <span>📄</span>
              <strong className="text-slate-300 max-w-[160px] truncate">{fileName}</strong>
            </span>
          </div>
        </div>

        {/* ── Hero Card ────────────────────────────────────────────── */}
        <section className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 overflow-hidden">
          {/* Gradient glow background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: getScoreStroke(score) }}
            />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/5 rounded-full blur-2xl" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <ScoreGauge score={score} />

            <div className="flex-1 text-center md:text-left space-y-4 min-w-0">
              {/* Badges row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  ATS Compliance Audit
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${scoreVerdict.bg} ${scoreVerdict.color}`}>
                  <Award className="w-3.5 h-3.5" />
                  {scoreVerdict.text}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                Audit Report —{' '}
                <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {jobTitle}
                </span>
              </h1>

              {/* Verdict text */}
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
                {score >= 85
                  ? 'Excellent alignment detected. Your résumé is well-optimised for ATS parsing and closely mirrors the target job requirements. Minor keyword additions can push you into the top 10%.'
                  : score >= 70
                  ? 'Good alignment detected, but keyword gaps were identified in key sections. Addressing the missing terms in the Keyword Gap tab can raise your score by 10–18 points.'
                  : 'Significant gaps detected. Your résumé is missing several high-frequency role requirements. Follow the Recommendations tab to systematically close these gaps before submission.'}
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-1">
                {[
                  { label: 'Keywords Matched', value: quickStats.matchedCount, color: 'text-emerald-400' },
                  { label: 'Keywords Missing', value: quickStats.missingCount, color: 'text-rose-400' },
                  { label: 'ATS Rank', value: quickStats.estimatedATSRank, color: 'text-indigo-400' },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center px-4 py-2 bg-slate-800/60 rounded-xl border border-slate-700/50"
                  >
                    <strong className={`text-lg font-black ${color}`}>{value}</strong>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Tab Navigation ───────────────────────────────────────── */}
        <div className="border-b border-slate-800">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== null && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${tab.badgeCls}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Tab Content ──────────────────────────────────────────── */}
        <div className="min-h-96">
          {activeTab === 'overview' && (
            <TabOverview
              data={{ sectionScores, quickStats, formattingFlags }}
            />
          )}
          {activeTab === 'keywords' && (
            <TabKeywords
              matchedKeywords={matchedKeywords}
              missingKeywords={missingKeywords}
              keywordCoveragePercent={keywordCoveragePercent}
            />
          )}
          {activeTab === 'improvements' && (
            <TabRecommendations recommendations={recommendations} />
          )}
        </div>

        {/* ── Footer Action Bar ────────────────────────────────────── */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/15">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Ready to audit another role?</p>
              <p className="text-xs text-slate-500">Upload a new résumé or paste a different job description.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-sm font-semibold w-full sm:w-auto transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              New Analysis
            </button>
            <button
              onClick={() => alert('PDF export coming in Phase 3!')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold w-full sm:w-auto transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AnalysisResult;
