import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, LayoutDashboard, LogIn, UserPlus, Zap } from 'lucide-react';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                <FileText className="w-6 h-6 animate-pulse" />
                            </div>
                            <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                ResumeAI
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex space-x-8 text-sm font-medium">
                        <Link to="/" className="text-slate-300 hover:text-white transition">Home</Link>
                        {isAuthenticated && (
                            <>
                    <Link to="/dashboard" className="text-slate-300 hover:text-white transition">Dashboard</Link>
                                <Link to="/result" className="text-slate-300 hover:text-white transition">Results</Link>
                                <Link
                                    to="/bullets"
                                    className="flex items-center gap-1 text-slate-300 hover:text-indigo-300 transition font-medium"
                                >
                                    <Zap className="w-3.5 h-3.5" />
                                    Bullet Improver
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="hidden sm:inline text-sm text-slate-400">
                                    Welcome, <strong className="text-slate-200">{user?.name}</strong>
                                </span>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Dashboard</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg border border-rose-500/25 transition"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 rounded-lg transition"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    <span>Sign Up</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
