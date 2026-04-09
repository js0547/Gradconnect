import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { GraduationCap, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle, Users, Briefcase } from "lucide-react";

type AuthMode = "login" | "signup";
type RoleType = "student" | "alumni" | "recruiter" | null;

const ROLES = [
  {
    id: "student" as const,
    label: "Student",
    icon: GraduationCap,
    description: "Currently enrolled at a university",
    color: "#1E3A8A",
    bg: "#EFF6FF",
  },
  {
    id: "alumni" as const,
    label: "Alumni",
    icon: CheckCircle,
    description: "Graduated and working in industry",
    color: "#14B8A6",
    bg: "#F0FDFA",
  },
  {
    id: "recruiter" as const,
    label: "Recruiter",
    icon: Briefcase,
    description: "Looking for skilled candidates",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
];

interface AuthPageProps {
  mode: AuthMode;
}

export function AuthPage({ mode: initialMode }: AuthPageProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    university: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && step === 1) {
      setStep(2);
    } else if (mode === "signup" && step === 2) {
      navigate("/onboarding");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#0369A1] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#14B8A6]/20 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap size={22} className="text-white" />
            </div>
            <span className="text-white" style={{ fontWeight: 800, fontSize: "1.3rem" }}>
              GRAD<span className="text-[#14B8A6]">CONNECT</span>
            </span>
          </div>

          <h2 className="text-white mb-4" style={{ fontWeight: 800, fontSize: "2.2rem", lineHeight: 1.2 }}>
            {mode === "login" ? "Welcome back! 👋" : "Join the community 🚀"}
          </h2>
          <p className="text-white/70 leading-relaxed mb-12">
            {mode === "login"
              ? "Connect with your network, check on your projects, and discover new opportunities."
              : "Build your skill profile, collaborate on projects, and connect with mentors who get it."
            }
          </p>

          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              { icon: "🎯", text: "Skills-first profiles that showcase your real abilities" },
              { icon: "🤝", text: "Connect with 50,000+ students and alumni worldwide" },
              { icon: "🚀", text: "Launch projects with talented teammates" },
              { icon: "💼", text: "Get discovered by top companies & startups" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                <p className="text-white/80 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Testimonial */}
        <div className="relative z-10 bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
          <p className="text-white/90 text-sm italic mb-3">
            "GradConnect helped me find my co-founder and land my dream internship — all because of my project portfolio."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
            </div>
            <div>
              <p className="text-white text-sm" style={{ fontWeight: 600 }}>Marcus Chen</p>
              <p className="text-white/60 text-xs">Alumni at Stanford</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F8FAFC]">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button
            onClick={() => {
              if (mode === "signup" && step === 2) {
                setStep(1);
              } else {
                navigate("/");
              }
            }}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            {mode === "signup" && step === 2 ? "Back" : "Back to home"}
          </button>

          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-[#1E3A8A] rounded-xl flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span style={{ fontWeight: 800, color: "#1E3A8A", fontSize: "1.2rem" }}>
              GRAD<span style={{ color: "#14B8A6" }}>CONNECT</span>
            </span>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                {mode === "signup" && (
                  <span className="text-xs text-gray-400">Step {step} of 2</span>
                )}
              </div>
              <h1 className="text-[#0F172A]" style={{ fontWeight: 800, fontSize: "1.6rem" }}>
                {mode === "login" ? "Log in to GradConnect" : step === 1 ? "Create your account" : "What describes you?"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {mode === "login"
                  ? "Enter your credentials to continue"
                  : step === 1
                  ? "Get started in under 2 minutes"
                  : "Choose your role to personalize your experience"
                }
              </p>
            </div>

            {/* Progress bar for signup */}
            {mode === "signup" && (
              <div className="mb-6">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] rounded-full transition-all duration-500"
                    style={{ width: `${(step / 2) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Form */}
              {(mode === "login" || (mode === "signup" && step === 1)) && (
                <div className="space-y-4">
                  {mode === "signup" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-600 mb-1 block" style={{ fontWeight: 600 }}>First Name</label>
                        <input
                          type="text"
                          placeholder="First name"
                          value={form.firstName}
                          onChange={e => setForm({ ...form, firstName: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 mb-1 block" style={{ fontWeight: 600 }}>Last Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          value={form.lastName}
                          onChange={e => setForm({ ...form, lastName: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs text-gray-600 mb-1 block" style={{ fontWeight: 600 }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@university.edu"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] transition-all"
                      required
                    />
                  </div>

                  {mode === "signup" && (
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block" style={{ fontWeight: 600 }}>University</label>
                      <input
                        type="text"
                        placeholder="MIT, Stanford, etc."
                        value={form.university}
                        onChange={e => setForm({ ...form, university: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] transition-all"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-xs text-gray-600 mb-1 block" style={{ fontWeight: 600 }}>Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {mode === "login" && (
                    <div className="flex justify-end">
                      <a href="#" className="text-xs text-[#1E3A8A]" style={{ fontWeight: 500 }}>Forgot password?</a>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Role Selection */}
              {mode === "signup" && step === 2 && (
                <div className="space-y-3">
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                        selectedRole === role.id
                          ? "border-[#1E3A8A] bg-[#EFF6FF]"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: role.bg }}>
                        <role.icon size={22} style={{ color: role.color }} />
                      </div>
                      <div>
                        <p className="text-gray-800" style={{ fontWeight: 600 }}>{role.label}</p>
                        <p className="text-gray-400 text-xs">{role.description}</p>
                      </div>
                      {selectedRole === role.id && (
                        <CheckCircle size={20} className="ml-auto text-[#1E3A8A]" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={mode === "signup" && step === 2 && !selectedRole}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-[#1E3A8A] text-white py-3.5 rounded-xl hover:bg-[#1E3A8A]/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontWeight: 600 }}
              >
                {mode === "login" ? "Log In" : step === 1 ? "Continue" : "Complete Setup"}
                <ArrowRight size={18} />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-gray-400 text-xs">or</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Social login */}
              <button
                type="button"
                className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2"
                style={{ fontWeight: 500 }}
              >
                <span style={{ fontSize: "1.1rem" }}>G</span>
                Continue with Google
              </button>
            </form>

            {/* Toggle mode */}
            <p className="text-center text-sm text-gray-500 mt-6">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => { setMode(mode === "login" ? "signup" : "login"); setStep(1); }}
                className="text-[#1E3A8A] hover:underline"
                style={{ fontWeight: 600 }}
              >
                {mode === "login" ? "Sign up free" : "Log in"}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            By continuing, you agree to our{" "}
            <a href="#" className="text-[#1E3A8A]">Terms</a> and{" "}
            <a href="#" className="text-[#1E3A8A]">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}