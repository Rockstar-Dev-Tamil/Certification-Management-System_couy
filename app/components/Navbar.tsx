'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShieldCheck, Menu, X, LayoutDashboard, LogOut, Award, Search, UserCheck } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [user, setUser] = React.useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        fetch('/api/auth/user')
            .then(res => res.json())
            .then(data => setUser(data.user || null))
            .catch(() => setUser(null));
    }, [pathname]);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
        router.push('/');
        router.refresh();
    };

    const isAuthPage = pathname === '/login' || pathname === '/register';
    if (isAuthPage) return null; // Let auth pages handle their own layout or keep it clean

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-200 group-hover:rotate-6 transition-transform">
                            <ShieldCheck className="text-white h-6 w-6" />
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tight italic">CertiSafe</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/verify" className={`text-sm font-bold transition-colors ${pathname === '/verify' ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`}>Verify Portal</Link>

                        {user ? (
                            <>
                                <Link href="/dashboard" className={`text-sm font-bold transition-colors ${pathname.startsWith('/dashboard') ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`}>Console</Link>
                                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden lg:block">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Active Account</p>
                                        <p className="text-xs font-bold text-slate-900 leading-none">{user.email.split('@')[0]}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-all active:scale-95"
                                        title="Sign Out"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-bold text-slate-900 hover:text-brand-600">Login</Link>
                                <Link href="/register" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl shadow-brand-100 active:scale-95">
                                    Join Network
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 p-8 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col gap-6">
                        <Link href="/verify" className="font-black text-slate-900 uppercase text-xs tracking-widest" onClick={() => setIsOpen(false)}>Verification Portal</Link>
                        {user ? (
                            <>
                                <Link href="/dashboard" className="font-black text-slate-900 uppercase text-xs tracking-widest" onClick={() => setIsOpen(false)}>User Console</Link>
                                <div className="h-px bg-slate-100 w-full"></div>
                                <button onClick={handleLogout} className="flex items-center gap-3 text-rose-600 font-black uppercase text-xs tracking-widest">
                                    <LogOut className="h-4 w-4" /> Terminate Session
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="h-px bg-slate-100 w-full"></div>
                                <Link href="/login" className="font-black text-slate-900 uppercase text-xs tracking-widest" onClick={() => setIsOpen(false)}>Log In</Link>
                                <Link href="/register" className="bg-brand-600 text-center text-white py-4 rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-brand-200" onClick={() => setIsOpen(false)}>Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
