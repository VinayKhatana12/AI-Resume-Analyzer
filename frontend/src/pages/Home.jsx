import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, LineChart, Cpu, FileText } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-indigo-500 selection:text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
                {/* Decorative Background Glows */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-8 animate-bounce">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Power by Gemini 1.5 Flash AI</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                        Land more interviews with{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            AI-Powered Resume Analysis
                        </span>
                    </h1>

                    <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-400 mb-10">
                        Optimize your resume for ATS algorithms. Get instant match compatibility scores, identify missing keywords, and stand out to hiring managers in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to={isAuthenticated ? "/dashboard" : "/register"}
                            className="group flex items-center gap-2 w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg hover:shadow-indigo-600/35 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <span>Get Started Free</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 hover:border-slate-700 transition"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-slate-900/40 border-t border-slate-900 py-20 px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold">Everything you need to beat the ATS</h2>
                        <p className="text-slate-400 mt-3 max-w-lg mx-auto">
                            Our automated analysis provides detailed advice on matching key requirements and formats.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group">
                            <div className="p-3 w-fit bg-indigo-600/10 text-indigo-400 rounded-xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <LineChart className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">ATS Compatibility Score</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Receive an immediate ranking representing how well your resume matches target job descriptions.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group">
                            <div className="p-3 w-fit bg-purple-600/10 text-purple-400 rounded-xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Gemini 1.5 Analysis</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Utilize state-of-the-art AI to review structural layouts, vocabulary, and relevance of bullet points.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/5 transition-all duration-300 group">
                            <div className="p-3 w-fit bg-pink-600/10 text-pink-400 rounded-xl mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Keyword Optimization</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Identify high-impact keywords missing from your experiences to ensure your application passes screening.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto py-8 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500">
                <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
