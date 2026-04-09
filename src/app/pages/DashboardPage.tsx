import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp, Users, Briefcase, BookOpen, ArrowRight,
  Star, ChevronRight, Flame, Plus, Clock, MapPin, ExternalLink
} from "lucide-react";
import { USERS, PROJECTS, MENTORS, OPPORTUNITIES } from "../components/mockData";

const SKILL_COLOR_MAP: Record<string, string> = {
  React: "#61DAFB", Python: "#3776AB", "Machine Learning": "#FF6F00",
  "UI/UX": "#A855F7", "Data Analysis": "#10B981", JavaScript: "#F7DF1E",
  TypeScript: "#3178C6", "Node.js": "#339933", Swift: "#FA7343",
  Kotlin: "#7F52FF", Flutter: "#02569B", Go: "#00ADD8",
  Rust: "#DEA584", GraphQL: "#E10098", SQL: "#336791",
};

function SkillTag({ skill, size = "sm" }: { skill: string; size?: "xs" | "sm" }) {
  const color = SKILL_COLOR_MAP[skill] || "#1E3A8A";
  const bg = color + "15";
  return (
    <span
      className={`inline-flex items-center rounded-full border ${size === "xs" ? "px-2 py-0.5" : "px-3 py-1"}`}
      style={{ backgroundColor: bg, borderColor: color + "40", color, fontSize: size === "xs" ? "0.65rem" : "0.75rem", fontWeight: 600 }}
    >
      {skill}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, delta, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "15" }}>
          <Icon size={20} style={{ color }} />
        </div>
        {delta && (
          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
            +{delta}
          </span>
        )}
      </div>
      <p className="text-gray-800 mb-0.5" style={{ fontWeight: 800, fontSize: "1.6rem" }}>{value}</p>
      <p className="text-gray-400 text-xs">{label}</p>
    </div>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const currentUser = USERS[0];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#0369A1] rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10">
          <div className="w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="absolute right-8 bottom-0 opacity-10">
          <div className="w-32 h-32 bg-[#14B8A6] rounded-full translate-y-1/2" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm mb-1">Good morning 👋</p>
            <h2 className="text-white mb-1" style={{ fontWeight: 800, fontSize: "1.5rem" }}>
              Welcome back, Marcus!
            </h2>
            <p className="text-white/70 text-sm">You have 3 new connection requests and 2 collaboration invites.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/discovery")}
              className="bg-white text-[#1E3A8A] px-4 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-all shadow-lg flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              <Users size={16} />
              Discover People
            </button>
            <button
              onClick={() => navigate("/collaborate")}
              className="bg-[#14B8A6] text-white px-4 py-2.5 rounded-xl text-sm hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              <Plus size={16} />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Connections" value="248" delta="12" color="#1E3A8A" />
        <StatCard icon={Briefcase} label="Projects" value="5" delta="1" color="#14B8A6" />
        <StatCard icon={BookOpen} label="Mentor Sessions" value="8" delta="2" color="#8B5CF6" />
        <StatCard icon={TrendingUp} label="Profile Views" value="1.2K" delta="24%" color="#F59E0B" />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recommended Connections */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-[#1E3A8A]" />
                <h3 className="text-gray-800" style={{ fontWeight: 700 }}>People You May Know</h3>
              </div>
              <button onClick={() => navigate("/discovery")} className="text-xs text-[#1E3A8A] flex items-center gap-1" style={{ fontWeight: 600 }}>
                See all <ChevronRight size={14} />
              </button>
            </div>
            <div className="p-4 grid sm:grid-cols-2 gap-3">
              {USERS.slice(1, 5).map((user) => (
                <div key={user.id} className="border border-gray-100 rounded-xl p-4 hover:border-[#14B8A6]/50 hover:bg-gray-50/50 transition-all cursor-pointer" onClick={() => navigate(`/profile`)}>
                  <div className="flex items-start gap-3 mb-3">
                    <img src={user.avatar} alt={user.name} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-800 text-sm truncate" style={{ fontWeight: 700 }}>{user.name}</p>
                      <p className="text-gray-400 text-xs truncate">{user.role} • {user.university}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-1.5 h-1.5 bg-[#14B8A6] rounded-full"></div>
                        <span className="text-[#14B8A6] text-xs">{user.matchScore}% match</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {user.skills.slice(0, 2).map(s => <SkillTag key={s} skill={s} size="xs" />)}
                  </div>
                  <button className="w-full text-center bg-[#EFF6FF] text-[#1E3A8A] text-xs py-1.5 rounded-lg hover:bg-[#1E3A8A] hover:text-white transition-all" style={{ fontWeight: 600 }}>
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Projects */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-orange-500" />
                <h3 className="text-gray-800" style={{ fontWeight: 700 }}>Trending Projects</h3>
              </div>
              <button onClick={() => navigate("/collaborate")} className="text-xs text-[#1E3A8A] flex items-center gap-1" style={{ fontWeight: 600 }}>
                Explore <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {PROJECTS.slice(0, 3).map((project) => (
                <div key={project.id} className="p-4 flex gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => navigate("/collaborate")}>
                  <img src={project.image} alt={project.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-gray-800 text-sm truncate" style={{ fontWeight: 700 }}>{project.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                        project.status === "Open" ? "bg-emerald-100 text-emerald-700" :
                        project.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-600"
                      }`} style={{ fontWeight: 600 }}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-1">{project.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-wrap gap-1">
                        {project.skills.slice(0, 2).map(s => <SkillTag key={s} skill={s} size="xs" />)}
                      </div>
                      {project.openRoles.length > 0 && (
                        <span className="text-xs text-[#14B8A6]" style={{ fontWeight: 500 }}>+{project.openRoles.length} open roles</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunities */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-[#1E3A8A]" />
                <h3 className="text-gray-800" style={{ fontWeight: 700 }}>Skill-Matched Opportunities</h3>
              </div>
              <button className="text-xs text-[#1E3A8A] flex items-center gap-1" style={{ fontWeight: 600 }}>
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {OPPORTUNITIES.map((opp) => (
                <div key={opp.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:border-[#14B8A6]/40 hover:bg-gray-50/50 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-[#1E3A8A] flex-shrink-0" style={{ fontWeight: 800, fontSize: "1rem" }}>
                    {opp.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{opp.title}</p>
                    <p className="text-gray-400 text-xs">{opp.company} • {opp.location}</p>
                    <div className="flex gap-1 mt-1">
                      {opp.skills.slice(0, 2).map(s => <SkillTag key={s} skill={s} size="xs" />)}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full block mb-1 ${
                      opp.type === "Internship" ? "bg-blue-100 text-blue-700" :
                      opp.type === "Full-time" ? "bg-purple-100 text-purple-700" :
                      "bg-orange-100 text-orange-700"
                    }`} style={{ fontWeight: 600 }}>
                      {opp.type}
                    </span>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock size={10} />
                      {opp.deadline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Profile Completion */}
          <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0FDFA] rounded-2xl p-5 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center border-2 border-[#14B8A6] flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
              </div>
              <div>
                <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{currentUser.name}</p>
                <p className="text-gray-500 text-xs">{currentUser.role} • {currentUser.university}</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-600" style={{ fontWeight: 500 }}>Profile Strength</span>
                <span className="text-[#1E3A8A]" style={{ fontWeight: 700 }}>78%</span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] rounded-full" style={{ width: "78%" }} />
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              {[
                { done: true, text: "Added skills (5)" },
                { done: true, text: "Wrote a bio" },
                { done: false, text: "Add a project" },
                { done: false, text: "Get 3 endorsements" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-[#14B8A6]" : "border-2 border-gray-300"}`}>
                    {item.done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={item.done ? "text-gray-400 line-through" : "text-gray-600"}>{item.text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("/profile")} className="w-full mt-4 text-[#1E3A8A] text-xs py-2 border border-[#1E3A8A]/30 rounded-xl hover:bg-[#1E3A8A] hover:text-white transition-all" style={{ fontWeight: 600 }}>
              Complete Profile
            </button>
          </div>

          {/* Suggested Mentors */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-purple-600" />
                <h3 className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>Suggested Mentors</h3>
              </div>
              <button onClick={() => navigate("/mentorship")} className="text-xs text-[#1E3A8A]" style={{ fontWeight: 600 }}>See all</button>
            </div>
            <div className="p-4 space-y-3">
              {MENTORS.slice(0, 3).map((mentor) => (
                <div key={mentor.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition-colors" onClick={() => navigate("/mentorship")}>
                  {mentor.avatar ? (
                    <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-xs truncate" style={{ fontWeight: 700 }}>{mentor.name}</p>
                    <p className="text-gray-400 text-xs truncate">{mentor.title} at {mentor.company}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-500">{mentor.rating} • {mentor.reviews} reviews</span>
                    </div>
                  </div>
                  <button className="text-xs bg-[#EFF6FF] text-[#1E3A8A] px-3 py-1.5 rounded-lg hover:bg-[#1E3A8A] hover:text-white transition-all flex-shrink-0" style={{ fontWeight: 600 }}>
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>Your Top Skills</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { skill: "React", level: 85, endorsements: 12 },
                { skill: "Python", level: 78, endorsements: 9 },
                { skill: "Machine Learning", level: 65, endorsements: 6 },
                { skill: "UI/UX", level: 72, endorsements: 8 },
              ].map(({ skill, level, endorsements }) => (
                <div key={skill}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600" style={{ fontWeight: 600 }}>{skill}</span>
                    <span className="text-xs text-gray-400">{endorsements} endorsements</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${level}%`, backgroundColor: SKILL_COLOR_MAP[skill] || "#1E3A8A" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events / Upcoming */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>Upcoming Events</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { title: "AI Hackathon 2026", date: "Mar 5", type: "Hackathon", color: "#1E3A8A" },
                { title: "Career Fair – MIT", date: "Mar 12", type: "Career", color: "#14B8A6" },
                { title: "Mentor Session: Dr. Mitchell", date: "Mar 8", type: "Mentorship", color: "#8B5CF6" },
              ].map((event) => (
                <div key={event.title} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl p-2 -mx-2 transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-col text-white flex-shrink-0" style={{ backgroundColor: event.color }}>
                    <span style={{ fontSize: "0.55rem", fontWeight: 700 }}>MAR</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, lineHeight: 1 }}>{event.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <p className="text-gray-800 text-xs" style={{ fontWeight: 600 }}>{event.title}</p>
                    <span className="text-xs text-gray-400">{event.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}