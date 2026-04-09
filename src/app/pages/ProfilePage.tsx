import React, { useState } from "react";
import {
  MapPin, Link, MessageCircle, UserPlus, Award, Star, Briefcase,
  CheckCircle, Edit3, Share2, ExternalLink, Github, Twitter, Linkedin,
  Users, TrendingUp, BookOpen, Plus, User
} from "lucide-react";
import { USERS, PROJECTS } from "../components/mockData";

const SKILL_COLOR_MAP: Record<string, string> = {
  React: "#61DAFB", Python: "#3776AB", "Machine Learning": "#FF6F00",
  "UI/UX": "#A855F7", "Data Analysis": "#10B981", JavaScript: "#F7DF1E",
  TypeScript: "#3178C6", "Node.js": "#339933",
};

function SkillBar({ skill, level, endorsements }: { skill: string; level: number; endorsements: number }) {
  const color = SKILL_COLOR_MAP[skill] || "#1E3A8A";
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-xs"
            style={{ backgroundColor: color + "15", color, fontWeight: 700, border: `1.5px solid ${color}30` }}
          >
            {skill}
          </span>
          {level >= 80 && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
              Expert
            </span>
          )}
          {level >= 60 && level < 80 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
              Proficient
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{endorsements} endorsements</span>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#1E3A8A] border border-[#1E3A8A]/30 px-2 py-0.5 rounded-full hover:bg-[#1E3A8A] hover:text-white" style={{ fontWeight: 500 }}>
            + Endorse
          </button>
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${level}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("skills");
  const [isConnected, setIsConnected] = useState(false);
  const user = USERS[0];

  const TABS = ["skills", "projects", "certifications", "endorsements"];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Cover Photo */}
      <div className="relative h-40 md:h-56 bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#0369A1] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-20 w-32 h-32 bg-white rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-32 bg-[#14B8A6] rounded-full blur-3xl" />
        </div>
        <button className="absolute top-4 right-4 bg-white/20 backdrop-blur text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 hover:bg-white/30 transition-all" style={{ fontWeight: 500 }}>
          <Edit3 size={12} />
          Edit Cover
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 -mt-12 md:-mt-16 mb-6 p-5 md:p-6">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-200 flex items-center justify-center border-4 border-white shadow-xl">
                <User size={40} className="text-gray-400" />
              </div>
              <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#1E3A8A] rounded-xl flex items-center justify-center shadow-lg">
                <Edit3 size={14} className="text-white" />
              </button>
              <div className="absolute -top-2 -right-2 bg-[#14B8A6] text-white text-xs px-2 py-0.5 rounded-full shadow-md" style={{ fontWeight: 700 }}>
                ✓ Verified
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-[#0F172A]" style={{ fontWeight: 800, fontSize: "1.5rem" }}>{user.name}</h1>
                    <span className="bg-[#EFF6FF] text-[#1E3A8A] text-xs px-3 py-1 rounded-full" style={{ fontWeight: 700 }}>
                      {user.role}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-0.5">Computer Science • Class of {user.year}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Briefcase size={12} />
                      {user.university}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {user.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {user.connections} connections
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIsConnected(!isConnected)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all shadow-md ${
                      isConnected
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    <UserPlus size={16} />
                    {isConnected ? "Connected" : "Connect"}
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F0FDFA] text-[#14B8A6] rounded-xl text-sm hover:bg-[#14B8A6] hover:text-white transition-all border border-[#14B8A6]/30" style={{ fontWeight: 600 }}>
                    <MessageCircle size={16} />
                    Message
                  </button>
                  <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-all">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm leading-relaxed mb-3 max-w-2xl">{user.bio}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {user.available && (
                  <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full border border-emerald-200" style={{ fontWeight: 600 }}>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Open to Collaboration
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs px-3 py-1.5 rounded-full border border-purple-200" style={{ fontWeight: 600 }}>
                  <BookOpen size={12} />
                  Open to Mentorship
                </span>
                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-200" style={{ fontWeight: 600 }}>
                  <Briefcase size={12} />
                  Seeking Internship
                </span>
              </div>

              {/* Socials */}
              <div className="flex gap-2 mt-3">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <button key={i} className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:border-[#1E3A8A] transition-all">
                    <Icon size={14} />
                  </button>
                ))}
                <button className="flex items-center gap-1 text-xs text-[#1E3A8A] border border-[#1E3A8A]/30 px-3 py-1 rounded-lg hover:bg-[#EFF6FF] transition-all" style={{ fontWeight: 500 }}>
                  <Link size={12} />
                  portfolio.dev
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 pb-8">
          {/* Left: Sidebar Stats */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-gray-800 mb-4" style={{ fontWeight: 700 }}>Profile Analytics</h3>
              <div className="space-y-3">
                {[
                  { label: "Profile Views (30d)", value: "1,248", icon: TrendingUp, color: "#1E3A8A" },
                  { label: "Search Appearances", value: "342", icon: Star, color: "#F59E0B" },
                  { label: "Connection Requests", value: "18", icon: Users, color: "#14B8A6" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + "15" }}>
                        <Icon size={14} style={{ color }} />
                      </div>
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                    <span className="text-sm text-gray-800" style={{ fontWeight: 700 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-gray-800 mb-4" style={{ fontWeight: 700 }}>Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span key={interest} className="bg-[#F8FAFC] border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full" style={{ fontWeight: 500 }}>
                    {interest}
                  </span>
                ))}
                <button className="border border-dashed border-gray-300 text-gray-400 text-xs px-3 py-1.5 rounded-full hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-all" style={{ fontWeight: 500 }}>
                  + Add
                </button>
              </div>
            </div>

            {/* Mutual Connections */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-gray-800 mb-4" style={{ fontWeight: 700 }}>People Also Viewed</h3>
              <div className="space-y-3">
                {USERS.slice(1, 4).map((u) => (
                  <div key={u.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl p-1.5 -mx-1.5 transition-colors">
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-xs truncate" style={{ fontWeight: 600 }}>{u.name}</p>
                      <p className="text-gray-400 text-xs truncate">{u.university}</p>
                    </div>
                    <span className="text-xs text-[#14B8A6]" style={{ fontWeight: 600 }}>{u.matchScore}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Tabs Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-xs capitalize transition-all ${
                      activeTab === tab
                        ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A] bg-[#EFF6FF]/50"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    style={{ fontWeight: activeTab === tab ? 700 : 500 }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500">Skills are matched to collaboration requests</p>
                      <button className="flex items-center gap-1 text-xs text-[#1E3A8A] border border-[#1E3A8A]/30 px-3 py-1.5 rounded-lg hover:bg-[#EFF6FF] transition-all" style={{ fontWeight: 600 }}>
                        <Plus size={12} />
                        Add Skill
                      </button>
                    </div>
                    {[
                      { skill: "React", level: 85, endorsements: 12 },
                      { skill: "Python", level: 78, endorsements: 9 },
                      { skill: "Machine Learning", level: 65, endorsements: 6 },
                      { skill: "UI/UX", level: 72, endorsements: 8 },
                      { skill: "Data Analysis", level: 70, endorsements: 5 },
                    ].map((item) => (
                      <SkillBar key={item.skill} {...item} />
                    ))}
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === "projects" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {PROJECTS.slice(0, 4).map((project) => (
                      <div key={project.id} className="border border-gray-100 rounded-xl overflow-hidden hover:border-[#14B8A6]/50 hover:shadow-md transition-all cursor-pointer">
                        <img src={project.image} alt={project.title} className="w-full h-32 object-cover" />
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{project.title}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                              project.status === "Open" ? "bg-emerald-100 text-emerald-700" :
                              project.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                              "bg-gray-100 text-gray-600"
                            }`} style={{ fontWeight: 600 }}>{project.status}</span>
                          </div>
                          <p className="text-gray-400 text-xs mb-2 line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.skills.slice(0, 3).map(s => (
                              <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
                                {s}
                              </span>
                            ))}
                          </div>
                          {project.progress < 100 && (
                            <div className="mt-2">
                              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#14B8A6] rounded-full" style={{ width: `${project.progress}%` }} />
                              </div>
                              <p className="text-right text-xs text-gray-400 mt-0.5">{project.progress}%</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <button className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-all">
                      <Plus size={24} className="mb-2" />
                      <span className="text-sm" style={{ fontWeight: 500 }}>Add Project</span>
                    </button>
                  </div>
                )}

                {/* Certifications Tab */}
                {activeTab === "certifications" && (
                  <div className="space-y-3">
                    {user.certifications.map((cert) => (
                      <div key={cert} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-[#14B8A6]/40 hover:bg-gray-50 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#F0FDFA] flex items-center justify-center flex-shrink-0">
                          <Award size={22} className="text-[#1E3A8A]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{cert}</p>
                          <p className="text-gray-400 text-xs">Verified • Earned 2025</p>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 text-xs" style={{ fontWeight: 600 }}>
                          <CheckCircle size={14} />
                          Verified
                        </div>
                      </div>
                    ))}
                    <button className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-gray-400 hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-all text-sm flex items-center justify-center gap-2">
                      <Plus size={16} />
                      Add Certification
                    </button>
                  </div>
                )}

                {/* Endorsements Tab */}
                {activeTab === "endorsements" && (
                  <div className="space-y-3">
                    {[
                      { from: USERS[1], skill: "React", text: "Marcus built an incredible React dashboard for our project. One of the best frontend devs I've worked with." },
                      { from: USERS[3], skill: "Python", text: "His Python scripts automated our entire data pipeline. Very clean and efficient code." },
                      { from: USERS[4], skill: "Machine Learning", text: "Marcus's ML model improved our prediction accuracy by 23%. Truly impressive work." },
                    ].map(({ from, skill, text }, i) => (
                      <div key={i} className="p-4 border border-gray-100 rounded-xl bg-[#FAFAFA] hover:border-gray-200 transition-all">
                        <div className="flex items-start gap-3 mb-2">
                          <img src={from.avatar} alt={from.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                          <div>
                            <p className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{from.name}</p>
                            <p className="text-gray-400 text-xs">{from.role} • {from.university}</p>
                          </div>
                          <span className="ml-auto bg-[#EFF6FF] text-[#1E3A8A] text-xs px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                            {skill}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm italic">"{text}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}