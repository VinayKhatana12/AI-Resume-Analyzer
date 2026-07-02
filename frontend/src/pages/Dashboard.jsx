import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMockAnalysisData } from '../utils/mockApi';
import { Upload, FileText, ArrowRight, Briefcase, Trash2, Calendar, Award, Sparkles, Loader } from 'lucide-react';
import Header from '../components/Header';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const [analyzing, setAnalyzing] = useState(false);

    // Progress states
    const [progress, setProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');

    // Mock History
    const [history] = useState([
        { id: 1, role: 'Senior React Developer', company: 'Netflix', score: 88, date: '2026-06-28' },
        { id: 2, role: 'Software Engineer II', company: 'Stripe', score: 74, date: '2026-06-15' },
        { id: 3, role: 'Full Stack Engineer', company: 'Vercel', score: 62, date: '2026-05-30' },
    ]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf") || droppedFile.name.endsWith(".docx")) {
                setFile(droppedFile);
                setError('');
            } else {
                setError('Only PDF or DOCX files are allowed.');
            }
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf") || selectedFile.name.endsWith(".docx")) {
                setFile(selectedFile);
                setError('');
            } else {
                setError('Only PDF or DOCX files are allowed.');
            }
        }
    };

    const removeFile = () => {
        setFile(null);
    };

    const handleScan = (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please upload a resume file first.');
            return;
        }
        if (!jobDescription.trim()) {
            setError('Please input a target Job Description.');
            return;
        }

        setError('');
        setAnalyzing(true);
        setProgress(0);
        setProgressMessage('Initializing parser...');
    };

    // Simulating loading bar over 2.5s
    useEffect(() => {
        if (!analyzing) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 5;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 125); // 20 steps * 125ms = 2500ms

        return () => clearInterval(interval);
    }, [analyzing]);

    // Update progress message based on percentage
    useEffect(() => {
        if (!analyzing) return;

        if (progress < 25) {
            setProgressMessage('Extracting PDF text structures and formatting elements...');
        } else if (progress < 55) {
            setProgressMessage('Parsing target job description roles and technical stack...');
        } else if (progress < 85) {
            setProgressMessage('Using Gemini 1.5 Flash AI to match keywords and context alignments...');
        } else if (progress < 100) {
            setProgressMessage('Evaluating layout, readability, headers, and bullet action verbs...');
        } else {
            setProgressMessage('Compiling final evaluation check card details...');

            // Navigate to /result with the detailed mock API data
            const timer = setTimeout(() => {
                setAnalyzing(false);
                const resultData = getMockAnalysisData(jobTitle || 'Target Position');
                navigate('/result', {
                    state: {
                        analysisResult: resultData,
                        fileName: file.name
                    }
                });
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [progress, analyzing, jobTitle, file, navigate]);

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col relative">
            <Header />

            {/* Simulated AI Loader Glassmorphic Overlay */}
            {analyzing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md transition-all duration-300">
                    <div className="max-w-md w-full mx-4 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-6">
                        <div className="relative flex items-center justify-center w-20 h-20">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl animate-pulse"></div>
                            {/* Spinner */}
                            <Loader className="w-12 h-12 text-indigo-400 animate-spin" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center gap-1.5">
                                <Sparkles className="w-5 h-5 text-indigo-400 animate-bounce" />
                                <span>AI Auditor Progress</span>
                            </h3>
                            <p className="text-sm text-slate-400 min-h-12 leading-relaxed">
                                {progressMessage}
                            </p>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full space-y-2">
                            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-200 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 font-semibold px-0.5">
                                <span>Analyzing</span>
                                <span>{progress}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Upload and Form Form Section */}
                <section className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                            Resume Analyzer
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">Upload your resume and the target job description to match ATS criteria.</p>

                        <form onSubmit={handleScan} className="space-y-6">
                            {/* File Upload zone */}
                            <div
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center transition-all ${dragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-850 bg-slate-930/50 hover:border-slate-750'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                            >
                                {!file ? (
                                    <>
                                        <div className="p-4 bg-slate-900 rounded-full border border-slate-800 text-slate-400 mb-4">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <p className="text-sm font-semibold">
                                            Drag & drop your resume, or{' '}
                                            <label htmlFor="file-upload" className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer">
                                                browse files
                                            </label>
                                        </p>
                                        <p className="text-xs text-slate-505 mt-2">Supports PDF, DOCX (Max 5MB)</p>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.docx,application/pdf"
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : (
                                    <div className="flex items-center justify-between w-full p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-indigo-650/15 text-indigo-400 rounded-lg">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold truncate max-w-xs">{file.name}</p>
                                                <p className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="p-2 text-rose-450 hover:bg-rose-500/10 rounded-lg border border-transparent hover:border-rose-500/20 transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {error && <p className="text-sm text-rose-450 text-left font-medium">{error}</p>}

                            {/* Form Input fields */}
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label htmlFor="job-title" className="text-sm font-semibold text-slate-300 block mb-2 font-semibold">Target Job Title (Optional)</label>
                                    <input
                                        id="job-title"
                                        type="text"
                                        value={jobTitle}
                                        placeholder="e.g. Senior Frontend Developer"
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-white outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="job-desc" className="text-sm font-semibold text-slate-350 block mb-2 font-semibold font-semibold">Job Description (Required)</label>
                                    <textarea
                                        id="job-desc"
                                        value={jobDescription}
                                        rows="6"
                                        placeholder="Paste the job description details here..."
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-white outline-none focus:border-indigo-500 transition-colors resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                id="submit-analysis"
                                type="submit"
                                disabled={analyzing}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-650 hover:bg-indigo-600 disabled:bg-indigo-650/50 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-600/25 transition-all text-base cursor-pointer"
                            >
                                <span>Audit Resume Compatibility</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </section>

                {/* Sidebar - Profile & History */}
                <section className="space-y-6">
                    {/* Quick Profile Summary */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-24 h-24 bg-indigo-600/10 rounded-full blur-xl"></div>
                        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4 border-2 border-slate-850 shadow-md">
                            {user?.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <h3 className="font-bold text-lg">{user?.name}</h3>
                        <p className="text-indigo-400 text-xs mt-0.5">{user?.email}</p>
                    </div>

                    {/* Analysis History */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold text-lg border-b border-slate-850 pb-4 mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-indigo-400" />
                            <span>Recent Evaluations</span>
                        </h3>

                        <div className="space-y-4">
                            {history.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        const resultData = getMockAnalysisData(item.role);
                                        resultData.score = item.score; // Override to match history score
                                        navigate('/result', { state: { analysisResult: resultData, fileName: 'resume_archive.pdf' } });
                                    }}
                                    className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-850 hover:border-indigo-500/40 rounded-xl cursor-pointer group transition-all"
                                >
                                    <div className="text-left space-y-1">
                                        <h4 className="text-sm font-semibold group-hover:text-indigo-400 transition-colors truncate max-w-40">{item.role}</h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-550">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                {item.company}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {item.date}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg ${item.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                item.score >= 70 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                    'bg-rose-500/10 text-rose-455 border border-rose-500/20'
                                            }`}>
                                            {item.score}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Dashboard;
