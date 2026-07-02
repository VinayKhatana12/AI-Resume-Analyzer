import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, AlertCircle } from 'lucide-react';
import Header from '../components/Header';

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = 'Full name is required';
        }

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

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        // Simulate API registration & auto-login
        setTimeout(() => {
            login(email);
            setLoading(false);
            navigate('/dashboard', { replace: true });
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
                            Create Account
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">Get started with ResumeAI today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name Field */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-300 block" htmlFor="full-name">
                                Full Name
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                    <User className="w-5 h-5" />
                                </span>
                                <input
                                    id="full-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3 bg-slate-900 border ${errors.name ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                                        } rounded-xl text-white outline-none focus:ring-4 transition-all duration-205`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <div className="flex items-center gap-1 text-rose-450 text-xs mt-1">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span>{errors.name}</span>
                                </div>
                            )}
                        </div>

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
                                        } rounded-xl text-white outline-none focus:ring-4 transition-all duration-205`}
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
                            <label className="text-sm font-semibold text-slate-300 block" htmlFor="user-password">
                                Password
                            </label>
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
                                        } rounded-xl text-white outline-none focus:ring-4 transition-all duration-205`}
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

                        {/* Confirm Password Field */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-300 block" htmlFor="confirm-user-password">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    id="confirm-user-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3 bg-slate-900 border ${errors.confirmPassword ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                                        } rounded-xl text-white outline-none focus:ring-4 transition-all duration-205`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <div className="flex items-center gap-1 text-rose-450 text-xs mt-1">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span>{errors.confirmPassword}</span>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            id="submit-register"
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-650 hover:bg-indigo-600 disabled:bg-indigo-650/50 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-600/20 active:translate-y-0.5 transition-all duration-205"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    <span>Sign Up</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 text-center text-sm text-slate-400 border-t border-slate-900 pt-6">
                        Already have an account?{' '}
                        <Link to="/login" id="go-to-login" className="text-indigo-400 hover:text-indigo-300 font-semibold focus:underline">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
