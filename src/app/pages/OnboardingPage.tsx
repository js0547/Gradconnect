import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowLeft, GraduationCap, CheckCircle, Zap } from "lucide-react";
import { SKILL_OPTIONS, INTEREST_OPTIONS } from "../components/mockData";

const CAREER_GOALS = [
  "Land a tech internship",
  "Build a startup",
  "Find a co-founder",
  "Get mentored by industry experts",
  "Contribute to open source",
  "Break into a new field",
  "Network with alumni",
  "Collaborate on projects",
  "Find full-time job",
  "Explore research opportunities",
];

const STEPS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Skills" },
  { id: 3, label: "Interests" },
  { id: 4, label: "Goals" },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "Python"]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["AI / Machine Learning"]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["Land a tech internship"]);
  const [bio, setBio] = useState("");
  const [gradYear, setGradYear] = useState("2026");

  const toggleItem = (
    item: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter(s => s !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span style={{ fontWeight: 800, color: "#1E3A8A" }}>
              GRAD<span style={{ color: "#14B8A6" }}>CONNECT</span>
            </span>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Step {step} of {STEPS.length}</span>
            <span className="text-sm text-[#14B8A6]" style={{ fontWeight: 600 }}>{Math.round((step / STEPS.length) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] rounded-full transition-all duration-500"
              style={{ width: `${(step / STEPS.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {STEPS.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                  s.id < step ? "bg-[#14B8A6] text-white" :
                  s.id === step ? "bg-[#1E3A8A] text-white" :
                  "bg-gray-100 text-gray-400"
                }`} style={{ fontWeight: 600 }}>
                  {s.id < step ? <CheckCircle size={14} /> : s.id}
                </div>
                <span className={`text-xs hidden sm:block ${s.id <= step ? "text-[#1E3A8A]" : "text-gray-400"}`} style={{ fontWeight: s.id === step ? 600 : 400 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Step 1: Profile */}
          {step === 1 && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap size={32} className="text-[#1E3A8A]" />
                </div>
                <h2 className="text-[#0F172A] mb-2" style={{ fontWeight: 800, fontSize: "1.6rem" }}>
                  Let's build your profile 👤
                </h2>
                <p className="text-gray-500 text-sm">Tell us a bit about yourself to help us personalize your experience.</p>
              </div>

              <div className="space-y-5">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-[#14B8A6]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600 mb-1 block" style={{ fontWeight: 600 }}>Short Bio</label>
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Tell people what you're passionate about and what you're building..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] resize-none"
                    rows={3}
                  />
                  <p className="text-right text-xs text-gray-400 mt-1">{bio.length}/200</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block" style={{ fontWeight: 600 }}>Graduation Year</label>
                    <select
                      value={gradYear}
                      onChange={e => setGradYear(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                    >
                      {["2024", "2025", "2026", "2027", "2028", "Alumni"].map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block" style={{ fontWeight: 600 }}>Availability</label>
                    <select
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                    >
                      <option>Open to collaborate</option>
                      <option>Open to mentor</option>
                      <option>Looking for internship</option>
                      <option>Busy right now</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#F0FDFA] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap size={32} className="text-[#14B8A6]" />
                </div>
                <h2 className="text-[#0F172A] mb-2" style={{ fontWeight: 800, fontSize: "1.6rem" }}>
                  What are your skills? ⚡
                </h2>
                <p className="text-gray-500 text-sm">Select all skills that apply. This powers our matching algorithm.</p>
                <p className="text-[#14B8A6] text-xs mt-1" style={{ fontWeight: 600 }}>{selectedSkills.length} selected</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {SKILL_OPTIONS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills)}
                    className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                      selectedSkills.includes(skill)
                        ? "bg-[#1E3A8A] border-[#1E3A8A] text-white shadow-md"
                        : "border-gray-200 text-gray-600 hover:border-[#1E3A8A]/50 hover:bg-gray-50"
                    }`}
                    style={{ fontWeight: selectedSkills.includes(skill) ? 600 : 400 }}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {selectedSkills.length > 0 && (
                <div className="bg-[#EFF6FF] rounded-xl p-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#1E3A8A]" />
                  <p className="text-[#1E3A8A] text-xs" style={{ fontWeight: 500 }}>
                    Great! You've selected: {selectedSkills.slice(0, 4).join(", ")}{selectedSkills.length > 4 ? ` +${selectedSkills.length - 4} more` : ""}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FFF7ED] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span style={{ fontSize: "2rem" }}>🌟</span>
                </div>
                <h2 className="text-[#0F172A] mb-2" style={{ fontWeight: 800, fontSize: "1.6rem" }}>
                  What excites you? 🌟
                </h2>
                <p className="text-gray-500 text-sm">Pick your areas of interest to find like-minded collaborators.</p>
                <p className="text-[#14B8A6] text-xs mt-1" style={{ fontWeight: 600 }}>{selectedInterests.length} selected</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {INTEREST_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleItem(interest, selectedInterests, setSelectedInterests)}
                    className={`px-4 py-3 rounded-xl text-sm border-2 transition-all text-left ${
                      selectedInterests.includes(interest)
                        ? "bg-[#F0FDFA] border-[#14B8A6] text-[#14B8A6]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    style={{ fontWeight: selectedInterests.includes(interest) ? 600 : 400 }}
                  >
                    {selectedInterests.includes(interest) && <CheckCircle size={14} className="inline mr-2" />}
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Career Goals */}
          {step === 4 && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#F5F3FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span style={{ fontSize: "2rem" }}>🎯</span>
                </div>
                <h2 className="text-[#0F172A] mb-2" style={{ fontWeight: 800, fontSize: "1.6rem" }}>
                  What are your goals? 🎯
                </h2>
                <p className="text-gray-500 text-sm">Tell us what you want to achieve so we can point you in the right direction.</p>
              </div>

              <div className="space-y-2 mb-6">
                {CAREER_GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleItem(goal, selectedGoals, setSelectedGoals)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left ${
                      selectedGoals.includes(goal)
                        ? "bg-[#EFF6FF] border-[#1E3A8A] text-[#1E3A8A]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedGoals.includes(goal) ? "border-[#1E3A8A] bg-[#1E3A8A]" : "border-gray-300"
                    }`}>
                      {selectedGoals.includes(goal) && <CheckCircle size={12} className="text-white" />}
                    </div>
                    <span className="text-sm" style={{ fontWeight: selectedGoals.includes(goal) ? 600 : 400 }}>{goal}</span>
                  </button>
                ))}
              </div>

              {/* Summary Preview */}
              {selectedGoals.length > 0 && (
                <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0FDFA] rounded-2xl p-4 border border-blue-100">
                  <p className="text-[#1E3A8A] text-sm mb-2" style={{ fontWeight: 600 }}>🎉 Your profile looks great!</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedSkills.slice(0, 3).map(s => (
                      <span key={s} className="bg-[#1E3A8A] text-white text-xs px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                    {selectedInterests.slice(0, 2).map(i => (
                      <span key={i} className="bg-[#14B8A6] text-white text-xs px-2 py-0.5 rounded-full">{i}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                style={{ fontWeight: 600 }}
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white py-3 rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              style={{ fontWeight: 600 }}
            >
              {step === 4 ? "Finish & Explore GradConnect" : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}