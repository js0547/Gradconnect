import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  GraduationCap, Users, Briefcase, Star, ArrowRight, CheckCircle,
  Zap, Globe, Shield, ChevronRight, Github, Twitter, Linkedin,
  BookOpen, Target, Award, TrendingUp
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Skills First, Grades Never",
    description: "Your skills, projects, and passions define you — not your GPA. Build a profile that actually showcases what you can do.",
    color: "#14B8A6",
    bg: "#F0FDFA",
  },
  {
    icon: Users,
    title: "Find Your Tribe",
    description: "Discover students and alumni with complementary skills. Connect for collaboration, mentorship, and friendship.",
    color: "#1E3A8A",
    bg: "#EFF6FF",
  },
  {
    icon: Target,
    title: "Collaboration Hub",
    description: "Turn ideas into products. Launch projects, build teams, and track progress — all in one place.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: BookOpen,
    title: "Expert Mentorship",
    description: "Book 1-on-1 sessions with alumni and industry experts who've walked your path and want to give back.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    icon: Briefcase,
    title: "Skill-Based Hiring",
    description: "Get discovered by recruiters looking for exactly your skillset. No cover letters required.",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Join a network of 50,000+ students across 300+ universities. Your next co-founder is already here.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
];

const STATS = [
  { value: "50K+", label: "Students & Alumni" },
  { value: "300+", label: "Universities" },
  { value: "12K+", label: "Projects Launched" },
  { value: "8K+", label: "Mentor Sessions" },
];

const TESTIMONIALS = [
  {
    text: "GradConnect helped me find my co-founder and first 3 teammates for our startup. We just closed a $500K seed round!",
    name: "Alex T.",
    role: "Founder, BuildWithAI • MIT 2023",
    avatar: "https://images.unsplash.com/photo-1701967341617-14499d8bf8c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    text: "As a first-gen student, I had no network. GradConnect connected me with mentors who changed my career trajectory.",
    name: "Maya R.",
    role: "Software Engineer, Google • Howard 2024",
    avatar: "https://images.unsplash.com/photo-1563290329-f80d8464a6ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    text: "We found incredible talent here. The skill-first approach is a game changer compared to traditional recruiting.",
    name: "Liam W.",
    role: "Head of Engineering, Stripe",
    avatar: "https://images.unsplash.com/photo-1701967341617-14499d8bf8c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Build Your Skill Profile",
    description: "Add your skills, projects, and interests. No GPA needed — just show what you can do.",
  },
  {
    step: "02",
    title: "Discover Your Community",
    description: "Our AI matches you with students, alumni, and mentors based on skills and goals.",
  },
  {
    step: "03",
    title: "Collaborate & Grow",
    description: "Join projects, find mentors, and get discovered by top recruiters — all in one place.",
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#1E3A8A] rounded-xl flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "#1E3A8A" }}>
                GRAD<span style={{ color: "#14B8A6" }}>CONNECT</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-[#1E3A8A] text-sm transition-colors">Features</a>
              <a href="#how" className="text-gray-600 hover:text-[#1E3A8A] text-sm transition-colors">How it Works</a>
              <a href="#community" className="text-gray-600 hover:text-[#1E3A8A] text-sm transition-colors">Community</a>
              <a href="#testimonials" className="text-gray-600 hover:text-[#1E3A8A] text-sm transition-colors">Stories</a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="text-[#1E3A8A] text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
                style={{ fontWeight: 500 }}
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-[#1E3A8A] text-white text-sm px-5 py-2 rounded-xl hover:bg-[#1E3A8A]/90 transition-all shadow-md hover:shadow-lg"
                style={{ fontWeight: 500 }}
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1E3A8A]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-blue-200 text-[#1E3A8A] px-4 py-2 rounded-full text-sm mb-6" style={{ fontWeight: 500 }}>
                <Zap size={14} className="text-[#14B8A6]" />
                Skill-first networking for Gen Z
              </div>
              <h1 className="text-[#0F172A] mb-6 leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.15 }}>
                Your Skills Open
                <br />
                <span className="text-[#1E3A8A]">Every Door.</span>
                <br />
                <span className="text-[#14B8A6]">Not Your GPA.</span>
              </h1>
              <p className="text-gray-500 mb-8 max-w-lg leading-relaxed" style={{ fontSize: "1.1rem" }}>
                GradConnect is where students, graduates, and alumni connect through skills, build together through projects, and grow together through mentorship.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => navigate("/signup")}
                  className="flex items-center justify-center gap-2 bg-[#1E3A8A] text-white px-8 py-4 rounded-2xl hover:bg-[#1E3A8A]/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                  style={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Join the Community
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center justify-center gap-2 text-[#1E3A8A] border-2 border-[#1E3A8A]/20 px-8 py-4 rounded-2xl hover:border-[#1E3A8A] hover:bg-blue-50 transition-all"
                  style={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Explore Demo
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="flex items-center gap-6">
                {[
                  "Free to join",
                  "Skills-first",
                  "Real opportunities",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#14B8A6]" />
                    <span className="text-gray-500 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1762158007836-25d13ab34c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Students collaborating"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: 500 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/40 to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute -left-8 top-12 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 max-w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#14B8A6]/20 flex items-center justify-center">
                    <TrendingUp size={14} className="text-[#14B8A6]" />
                  </div>
                  <span className="text-xs text-gray-500" style={{ fontWeight: 600 }}>Skill Match</span>
                </div>
                <p className="text-[#1E3A8A] mb-1" style={{ fontWeight: 800, fontSize: "1.5rem" }}>94%</p>
                <div className="flex gap-1 flex-wrap">
                  {["React", "Python", "ML"].map(s => (
                    <span key={s} className="bg-[#EFF6FF] text-[#1E3A8A] text-xs px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="absolute -right-4 bottom-16 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-800" style={{ fontWeight: 600 }}>Marcus Chen</p>
                    <p className="text-xs text-gray-400">Wants to connect</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#1E3A8A] text-white text-xs px-3 py-1.5 rounded-lg" style={{ fontWeight: 500 }}>Accept</button>
                  <button className="flex-1 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg" style={{ fontWeight: 500 }}>View Profile</button>
                </div>
              </div>

              <div className="absolute right-8 top-8 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["photo-1563290329-f80d8464a6ab", "photo-1762522921456-cdfe882d36c3", "photo-1701967341617-14499d8bf8c3"].map((p, i) => (
                      <img key={i} src={`https://images.unsplash.com/${p}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100`} className="w-7 h-7 rounded-full object-cover border-2 border-white" alt="" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600" style={{ fontWeight: 500 }}>+248 this week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1E3A8A]">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-white mb-1" style={{ fontWeight: 800, fontSize: "2.5rem" }}>{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#EFF6FF] text-[#1E3A8A] text-sm px-4 py-1.5 rounded-full mb-4" style={{ fontWeight: 600 }}>
              Everything you need
            </span>
            <h2 className="text-[#0F172A] mb-4" style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              Built for the modern student
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              GradConnect combines the best of LinkedIn, GitHub, and Discord — designed specifically for academic communities and early career professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: feature.bg }}>
                  <feature.icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 className="text-[#0F172A] mb-2" style={{ fontWeight: 700 }}>{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#F0FDFA] text-[#14B8A6] text-sm px-4 py-1.5 rounded-full mb-4" style={{ fontWeight: 600 }}>
              Simple & powerful
            </span>
            <h2 className="text-[#0F172A] mb-4" style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              Get started in minutes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#1E3A8A]/30 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-white" style={{ fontWeight: 800, fontSize: "1.2rem" }}>{step.step}</span>
                  </div>
                  <h3 className="text-[#0F172A] mb-3" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#0F172A] mb-4" style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              Stories from our community
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#0369A1] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#14B8A6] rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award size={32} className="text-white" />
          </div>
          <h2 className="text-white mb-4" style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Start building your future today
          </h2>
          <p className="text-white/70 mb-10 max-w-xl mx-auto">
            Join 50,000+ students and alumni who are building skills, projects, and careers on GradConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center justify-center gap-2 bg-[#14B8A6] text-white px-8 py-4 rounded-2xl hover:bg-[#0D9488] transition-all shadow-xl"
              style={{ fontWeight: 700, fontSize: "1rem" }}
            >
              Join Free — No GPA Required
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
              style={{ fontWeight: 600, fontSize: "1rem" }}
            >
              Already a member? Log in
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#14B8A6] rounded-lg flex items-center justify-center">
                  <GraduationCap size={16} />
                </div>
                <span style={{ fontWeight: 800 }}>GRAD<span className="text-[#14B8A6]">CONNECT</span></span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The skill-first platform for the next generation of innovators and creators.
              </p>
              <div className="flex gap-3 mt-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                    <Icon size={14} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Platform", links: ["Dashboard", "Discovery", "Projects", "Mentorship", "Messaging"] },
              { title: "Community", links: ["Students", "Alumni", "Recruiters", "Universities", "Blog"] },
              { title: "Company", links: ["About", "Careers", "Privacy", "Terms", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white text-sm mb-4" style={{ fontWeight: 600 }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2026 GradConnect. All rights reserved.</p>
            <div className="flex items-center gap-1">
              <Shield size={12} className="text-[#14B8A6]" />
              <span className="text-gray-500 text-xs">Secure & Privacy-first platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}