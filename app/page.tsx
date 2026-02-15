'use client';

import React from 'react';
import { ShieldCheck, Clock, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    fetch('/api/auth/user')
      .then(res => res.json())
      .then(data => {
        if (data.user) router.push('/dashboard');
      });
  }, [router]);

  return (
    <div className="min-h-screen text-slate-900 overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 font-bold text-sm mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
              CertiSafe V2 is now live
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Secure Digital <span className="text-gradient">Certification</span> Management
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Issue, manage, and verify professional certificates with ease. Prevent fraud and automate your entire certification lifecycle.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="/admin" className="btn-primary flex items-center justify-center text-lg px-10 py-4">
                Get Started as Admin
              </a>
              <a href="/verify" className="btn-secondary flex items-center justify-center text-lg px-10 py-4 group">
                Verify a Certificate
                <ShieldCheck className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-300 blur-[150px] rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-violet/40 blur-[150px] rounded-full animate-float" style={{ animationDelay: '-1.5s' }}></div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Enterprise-Grade Features</h2>
          <p className="text-xl text-slate-600">Everything you need to manage digital trust at scale.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {[
            {
              icon: ShieldCheck,
              title: "Fraud Mitigation",
              desc: "Every certificate contains a unique, cryptographically signed QR code that links directly to our secure database.",
              bgColor: "bg-brand-500/10",
              textColor: "text-brand-600"
            },
            {
              icon: Clock,
              title: "Lifecycle Management",
              desc: "Automated expiry tracking and renewal workflows ensure your certificate holders are always compliant.",
              bgColor: "bg-accent-violet/10",
              textColor: "text-accent-violet-600"
            },
            {
              icon: LayoutDashboard,
              title: "Institutional Hub",
              desc: "A centralized dashboard for organizations to issue, revoke, and analyze certificate distribution in real-time.",
              bgColor: "bg-accent-emerald/10",
              textColor: "text-accent-emerald-600"
            }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="glass-card p-10 rounded-3xl group hover:-translate-y-2 transition-all duration-500 hover:bg-white/90"
              >
                <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`h-7 w-7 ${feature.textColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-slate-50 py-32 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">How CertiSafe Works</h2>
            <p className="text-xl text-slate-600">A seamless workflow from issuance to instant verification.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              { step: "01", title: "Configure", desc: "Set up your organization and certificate templates." },
              { step: "02", title: "Issue", desc: "Upload recipient data and generate secure certificates." },
              { step: "03", title: "Distribute", desc: "Recipients receive their digital credentials instantly." },
              { step: "04", title: "Verify", desc: "Anyone can scan the QR code to verify authenticity in 1 second." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-brand-100 mb-6">{step.step}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-10 -right-6 text-brand-200 text-2xl">→</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="glass-card p-16 rounded-[3rem] bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-2xl overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to Secure Your Institution?</h2>
            <p className="text-xl text-brand-100 mb-12 max-w-2xl mx-auto">
              Join leading organizations in building a future of trusted digital credentials.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="/register" className="bg-white text-brand-700 hover:bg-brand-50 font-bold px-10 py-4 rounded-2xl transition-all shadow-xl hover:scale-105">
                Register Now
              </a>
              <a href="/login" className="bg-brand-700/30 backdrop-blur-md border border-brand-400/30 text-white hover:bg-brand-700/50 font-bold px-10 py-4 rounded-2xl transition-all">
                Sign In
              </a>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}
