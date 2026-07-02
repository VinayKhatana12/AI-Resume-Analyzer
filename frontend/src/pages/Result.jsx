import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Lightbulb, RefreshCw, FileDown } from 'lucide-react';
import Header from '../components/Header';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Pick up details from navigation state or use pre-defined mocks
    const jobTitle = location.state?.jobTitle || 'Senior React Developer';
    const fileName = location.state?.fileName || 'resume_johndoe.pdf';
    const score = location.state?.mockScore || Math.floor(Math.random() * 20) + 72; // default range 72-91

    // Color config based on score
    const getScoreColor = (s) => {
        if (s >= 80) return 'text-emerald-450';
        if (s >= 70) return 'text-amber-450';
        return 'text-rose-455';
    };

    const getScoreBg = (s) => {
        if (s >= 80) return 'stroke-emerald-500';
        if (s >= 70) return 'stroke-amber-500';
        return 'stroke-rose-500';
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
            <Header />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

                {/* Navigation Breadcrumb */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </button>

                    <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span>Analyzing:</span>
                        <strong className="text-slate-350">{fileName}</strong>
                    </div>
                </div>

                {/* Score & Hero section */}
                <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-650/5 rounded-full blur-3xl pointer-events-none"></div>

                    {/* SVG Circular Progress Chart */}
                    <div className="relative w-36 h-36 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                className="stroke-slate-800 fill-none"
                                strokeWidth="8"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                className={`fill-none ${getScoreBg(score)} transition-all duration-1000 ease-out`}
                                strokeWidth="8"
                                strokeDasharray={`${2 * Math.PI * 40}`}
                                strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-extrabold ${getScoreColor(score)}`}>{score}%</span>
                            <span className="text-2xs text-slate-550 uppercase tracking-widest font-bold">ATS Score</span>
                        </div>
                    </div>

                    <div className="text-center md:text-left space-y-3 flex-grow">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                            Analysis Results
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold">
                            Evaluation for <span className="bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">{jobTitle}</span>
                        </h1>
                        <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
                            {score >= 80 ? 'Excellent! Your resume matches the job requirements exceptionally well and is highly likely to pass applicant tracking systems.' :
                                score >= 70 ? 'Good matching, but some crucial elements are missing. Applying optimization updates could boost your interview success rates.' :
                                    'Attention required. Your resume is missing several high-frequency keywords or structural patterns crucial for selection.'}
                        </p>
                    </div>
                </section>

                {/* Audit Details Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Missing Keywords Block */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-rose-400">
                            <XCircle className="w-5 h-5" />
                            <span>Missing Keywords</span>
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            High-impact phrases from the job description not detected in your resume context:
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {['TailwindCSS', 'Redux Toolkit', 'Next.js Routing', 'Typescript interfaces', 'E2E Testing', 'CI/CD pipeline'].map((kw, i) => (
                                <span key={i} className="px-3 py-1.5 text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Matched Keywords Block */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-emerald-450">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Matched Keywords</span>
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Keywords and competencies correctly discovered inside your resume structure:
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {['React Hooks', 'Context API', 'Vite', 'HTML5', 'Javascript ES6', 'Git Version Control', 'REST APIs', 'CSS3 Layouts'].map((kw, i) => (
                                <span key={i} className="px-3 py-1.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Formatting & Structure Advice */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 md:col-span-2">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-amber-450">
                            <Lightbulb className="w-5 h-5" />
                            <span>Suggestions & Advice</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex gap-3 items-start p-4 bg-slate-950 border border-slate-850 rounded-xl">
                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="text-left">
                                    <h4 className="text-sm font-semibold mb-1">Resume Length</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Your resume is roughly 2.5 pages. For matching this selection, compressing details to a tidy 2-page list is recommended.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start p-4 bg-slate-950 border border-slate-850 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                <div className="text-left">
                                    <h4 className="text-sm font-semibold mb-1">Action Verbs Usage</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Good usage of action verbs like 'implemented', 'optimized', and 'architected'. Keep expanding them to describe achievements.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                {/* Action Callouts */}
                <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold">Want to scan another resume?</p>
                            <p className="text-xs text-slate-505">Try matching against a different job profile.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-sm font-medium w-full sm:w-auto transition-all"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Evaluate New</span>
                        </button>
                        <button
                            onClick={() => alert('Feature incoming soon!')}
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium w-full sm:w-auto transition-all shadow-md shadow-indigo-600/10"
                        >
                            <FileDown className="w-4 h-4" />
                            <span>Download PDF</span>
                        </button>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Result;
