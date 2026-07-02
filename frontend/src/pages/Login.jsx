import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import Header from '../components/Header';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Get the redirect path from location state or default to /dashboard
    const from = location.state?.from?.pathname || '/dashboard';

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            login(email);
            setLoading(false);
            navigate(from, { replace: true });
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Decorative backgrounds */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"></div>

                <div className="w-full max-w-md bg-slate-905/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Welcome Back
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">Sign in to your ResumeAI account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-300 block" htmlFor="email-address">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <input
                                    id="email-address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3 bg-slate-900 border ${errors.email ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                                        } rounded-xl text-white outline-none focus:ring-4 transition-all duration-200`}
                                    placeholder="name@example.com"
                                />
                            </div>
                            {errors.email && (
                                <div className="flex items-center gap-1 text-rose-450 text-xs mt-1">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span>{errors.email}</span>
                                </div>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-slate-300 block" htmlFor="user-password">
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    id="user-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3 bg-slate-900 border ${errors.password ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                                        } rounded-xl text-white outline-none focus:ring-4 transition-all duration-200`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && (
                                <div className="flex items-center gap-1 text-rose-450 text-xs mt-1">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span>{errors.password}</span>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            id="submit-login"
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-650 hover:bg-indigo-600 disabled:bg-indigo-650/50 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-600/20 active:translate-y-0.5 transition-all duration-205"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social / Registration Link */}
                    <div className="mt-8 text-center text-sm text-slate-400 border-t border-slate-900 pt-6">
                        Don't have an account?{' '}
                        <Link to="/register" id="go-to-register" className="text-indigo-400 hover:text-indigo-300 font-semibold focus:underline">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
