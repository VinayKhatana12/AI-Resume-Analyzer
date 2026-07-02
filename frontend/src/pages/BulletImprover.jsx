import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Zap,
  RotateCcw,
  ChevronRight,
  LayoutPanelLeft,
  Tag,
  TrendingUp,
  Target,
  Info,
} from 'lucide-react';
import Header from '../components/Header';
import { getMockBulletPoints } from '../utils/mockApi';

// ── Static data ──────────────────────────────────────────────────────────────

const ALL_BULLETS = getMockBulletPoints();

const CATEGORIES = ['All', ...Array.from(new Set(ALL_BULLETS.map((b) => b.category)))];

// ── Helpers ──────────────────────────────────────────────────────────────────

const getImpactCls = (impact) => {
  if (impact === 'High')   return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
  if (impact === 'Medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
};

const getDifficultyCls = (d) => {
  if (d === 'Easy')   return 'bg-emerald-500/10 text-emerald-400';
  if (d === 'Medium') return 'bg-violet-500/10 text-violet-400';
  return 'bg-orange-500/10 text-orange-400';
};

// Highlights numbers and percentages inside a string
const HighlightMetrics = ({ text }) => {
  const parts = text.split(/(\d[\d,.%$KkMm+\-/s]*(?:ms|s|K|M|%|\$)?)/g);
  return (
    <>
      {parts.map((part, i) =>
        /\d/.test(part) ? (
          <strong key={i} className="text-white font-bold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

// ── Left Panel — Bullet List Item ────────────────────────────────────────────

const BulletListItem = ({ bullet, isSelected, isApplied, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative ${
      isApplied
        ? 'border-emerald-500/30 bg-emerald-500/5 opacity-60'
        : isSelected
        ? 'border-indigo-500/60 bg-indigo-500/8 shadow-lg shadow-indigo-500/5'
        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/60'
    }`}
  >
    {/* Applied ribbon */}
    {isApplied && (
      <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
        <Check className="w-3 h-3" /> Applied
      </span>
    )}

    <div className="flex items-start gap-3">
      {/* Bullet number */}
      <span
        className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black mt-0.5 ${
          isSelected
            ? 'bg-indigo-500 text-white'
            : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
        }`}
      >
        {bullet.id}
      </span>

      <div className="flex-1 min-w-0 space-y-2">
        {/* Category label */}
        <p className={`text-[10px] font-bold uppercase tracking-widest ${
          isSelected ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-400'
        }`}>
          {bullet.category}
        </p>

        {/* Weak bullet text */}
        <p className={`text-sm leading-relaxed line-clamp-2 transition-colors ${
          isSelected ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'
        }`}>
          {bullet.weak}
        </p>

        {/* Impact + Difficulty pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md border ${getImpactCls(bullet.impact)}`}>
            <TrendingUp className="w-2.5 h-2.5" />
            {bullet.impact} impact
          </span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-md ${getDifficultyCls(bullet.difficulty)}`}>
            {bullet.difficulty} effort
          </span>
        </div>
      </div>

      <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-2 transition-all ${
        isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-700 group-hover:text-slate-500'
      }`} />
    </div>
  </button>
);

// ── Empty right-panel placeholder ────────────────────────────────────────────

const EmptyRevisionPanel = () => (
  <div className="h-full flex flex-col items-center justify-center gap-5 text-center px-8 py-16">
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-2xl" />
      <div className="relative p-6 bg-slate-800/60 border border-slate-700/50 rounded-2xl">
        <LayoutPanelLeft className="w-10 h-10 text-indigo-400 mx-auto" />
      </div>
    </div>
    <div className="space-y-2 max-w-xs">
      <h3 className="font-bold text-lg text-white">Select a Bullet Point</h3>
      <p className="text-sm text-slate-400 leading-relaxed">
        Click any weak bullet on the left to instantly reveal its AI-optimised, high-impact version.
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500">
      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
        <Zap className="w-3 h-3 text-amber-400" /> Strong action verbs
      </span>
      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
        <Target className="w-3 h-3 text-indigo-400" /> Quantified metrics
      </span>
      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
        <Sparkles className="w-3 h-3 text-pink-400" /> ATS-optimised
      </span>
    </div>
  </div>
);

// ── Right Panel — Revision Card ───────────────────────────────────────────────

const RevisionCard = ({ bullet, onApply, isApplied }) => {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState('improved'); // 'improved' | 'compare'

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(bullet.strong);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = bullet.strong;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }, [bullet.strong]);

  return (
    <div className="h-full flex flex-col space-y-4 animate-[revealIn_0.25s_ease_forwards]">

      {/* ── Header row ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">{bullet.category}</p>
          <h2 className="text-lg font-extrabold text-white mt-0.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            AI-Enhanced Bullet #{bullet.id}
          </h2>
        </div>
        {/* View toggle */}
        <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl p-1">
          <button
            onClick={() => setView('improved')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              view === 'improved'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Improved
          </button>
          <button
            onClick={() => setView('compare')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              view === 'compare'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Compare
          </button>
        </div>
      </div>

      {/* ── Content area ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-4">

        {/* IMPROVED VIEW */}
        {view === 'improved' && (
          <div className="flex-1 flex flex-col gap-4">

            {/* Strong bullet card */}
            <div className="relative flex-1 p-5 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/25 rounded-2xl shadow-lg">
              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-start gap-2 mb-3">
                <div className="p-1.5 bg-indigo-500/15 rounded-lg">
                  <Zap className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider pt-0.5">
                  AI-Optimised Version
                </span>
              </div>

              <p className="text-[15px] leading-relaxed text-slate-200 relative">
                <HighlightMetrics text={bullet.strong} />
              </p>

              {/* Tag chips */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-indigo-500/15">
                {bullet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-500/8 border border-indigo-500/20 rounded-lg text-[11px] font-semibold text-indigo-300"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Coaching tip */}
            <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl">
              <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-400 mb-0.5">Why this works</p>
                <p className="text-xs text-slate-300 leading-relaxed">{bullet.tip}</p>
              </div>
            </div>

          </div>
        )}

        {/* COMPARE VIEW */}
        {view === 'compare' && (
          <div className="flex-1 flex flex-col gap-3">

            {/* Before */}
            <div className="flex-1 p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-rose-500/15 text-rose-400 font-black text-[10px]">✕</span>
                Before — Weak Version
              </div>
              <p className="text-sm text-slate-400 leading-relaxed pl-7">{bullet.weak}</p>
              <div className="pl-7 flex gap-2 flex-wrap">
                <span className="text-[10px] text-rose-500/70 italic">— No action verb leading the sentence</span>
              </div>
            </div>

            {/* Arrow divider */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-indigo-500/30" />
              <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-bold text-indigo-400">
                <Sparkles className="w-3 h-3" /> AI Rewrite
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-indigo-500/30 to-indigo-500/30" />
            </div>

            {/* After */}
            <div className="flex-1 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 font-black text-[10px]">✓</span>
                After — High-Impact Version
              </div>
              <p className="text-sm text-slate-200 leading-relaxed pl-7">
                <HighlightMetrics text={bullet.strong} />
              </p>
            </div>

            {/* Coaching tip in compare mode */}
            <div className="flex items-start gap-3 p-3.5 bg-amber-500/5 border border-amber-500/15 rounded-xl">
              <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">{bullet.tip}</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Action buttons ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 pt-2">
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border transition-all duration-200 ${
            copied
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Suggestion
            </>
          )}
        </button>

        {/* Apply / Unapply button */}
        <button
          onClick={onApply}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border transition-all duration-200 ${
            isApplied
              ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
              : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
          }`}
        >
          {isApplied ? (
            <>
              <RotateCcw className="w-4 h-4" />
              Mark as Pending
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Mark as Applied
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const BulletImprover = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBullets = activeCategory === 'All'
    ? ALL_BULLETS
    : ALL_BULLETS.filter((b) => b.category === activeCategory);

  const selectedBullet = ALL_BULLETS.find((b) => b.id === selectedId) || null;

  const toggleApplied = (id) => {
    setAppliedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const appliedCount = appliedIds.size;
  const totalCount   = ALL_BULLETS.length;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6">

        {/* ── Page header ──────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-3 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <Zap className="w-6 h-6 text-indigo-400" />
              </span>
              AI Bullet Improver
            </h1>
            <p className="text-slate-400 text-sm mt-1.5 max-w-xl">
              Select a weak resume bullet on the left — instantly get an AI-powered, ATS-optimised rewrite with strong action verbs and quantified metrics.
            </p>
          </div>

          {/* Progress pill */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">{appliedCount}</span>
              <span className="text-xs text-slate-500">/ {totalCount} applied</span>
            </div>
            {/* Mini progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(appliedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Category filter tabs ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All'
              ? ALL_BULLETS.length
              : ALL_BULLETS.filter((b) => b.category === cat).length;
            const appliedInCat = cat === 'All'
              ? appliedIds.size
              : ALL_BULLETS.filter((b) => b.category === cat && appliedIds.has(b.id)).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  activeCategory === cat ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {appliedInCat}/{count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Split-screen body ─────────────────────────────────────────── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-5 min-h-0">

          {/* LEFT — Bullet list panel */}
          <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/80">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weak Bullets</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{filteredBullets.length} bullets • click to improve</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
              {filteredBullets.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500">No bullets in this category.</div>
              ) : (
                filteredBullets.map((bullet) => (
                  <BulletListItem
                    key={bullet.id}
                    bullet={bullet}
                    isSelected={selectedId === bullet.id}
                    isApplied={appliedIds.has(bullet.id)}
                    onClick={() => setSelectedId(bullet.id === selectedId ? null : bullet.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* RIGHT — Revision card panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="h-full p-5 md:p-6 flex flex-col">
              {selectedBullet ? (
                <RevisionCard
                  key={selectedBullet.id}
                  bullet={selectedBullet}
                  isApplied={appliedIds.has(selectedBullet.id)}
                  onApply={() => toggleApplied(selectedBullet.id)}
                />
              ) : (
                <EmptyRevisionPanel />
              )}
            </div>
          </div>
        </div>

        {/* ── All Applied celebration banner ────────────────────────────── */}
        {appliedCount === totalCount && totalCount > 0 && (
          <div className="flex items-center justify-between gap-4 p-5 bg-gradient-to-r from-emerald-950/60 to-indigo-950/60 border border-emerald-500/25 rounded-2xl animate-[revealIn_0.3s_ease]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/15 rounded-xl">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">All bullets applied! 🎉</p>
                <p className="text-xs text-slate-400">Your resume is now packed with high-impact, ATS-optimised bullets.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex-shrink-0"
            >
              Re-Scan Resume
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default BulletImprover;
