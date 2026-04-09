import React, { useState } from "react";
import {
  Search, Filter, Bookmark, TrendingUp, Users, Briefcase, Star,
  Plus, BarChart2, ChevronRight, MapPin, Clock, CheckCircle,
  ArrowUpRight, Bell, Target, Eye
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import { USERS, RECRUITER_STATS, OPPORTUNITIES } from "../components/mockData";

const SKILL_COLOR_MAP: Record<string, string> = {
  React: "#61DAFB", Python: "#3776AB", "Machine Learning": "#FF6F00",
  TypeScript: "#3178C6", "Node.js": "#339933", "Data Science": "#6366F1",
  Cybersecurity: "#EF4444", Flutter: "#02569B",
};

function SkillTag({ skill }: { skill: string }) {
  const color = SKILL_COLOR_MAP[skill] || "#1E3A8A";
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full border"
      style={{ backgroundColor: color + "15", color, borderColor: color + "40", fontWeight: 600 }}
    >
      {skill}
    </span>
  );
}

const TABS = ["Dashboard", "Search Candidates", "Saved", "Post Opportunity"];

const skillTrendData = RECRUITER_STATS.topSkillsNeeded.map(s => ({
  name: s.skill,
  demand: s.demand,
}));

const weeklyData = [
  { day: "Mon", views: 24, applications: 8 },
  { day: "Tue", views: 38, applications: 12 },
  { day: "Wed", views: 31, applications: 10 },
  { day: "Thu", views: 47, applications: 18 },
  { day: "Fri", views: 42, applications: 15 },
  { day: "Sat", views: 20, applications: 5 },
  { day: "Sun", views: 15, applications: 3 },
];

const candidateSourceData = [
  { name: "Students", value: 55 },
  { name: "Alumni", value: 35 },
  { name: "Other", value: 10 },
];
const PIE_COLORS = ["#1E3A8A", "#14B8A6", "#E2E8F0"];

export function RecruiterPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [savedCandidates, setSavedCandidates] = useState<string[]>(["1", "4"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedCandidates(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const filteredUsers = USERS.filter(u => u.role !== "Recruiter").filter(u => {
    const matchSearch = !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchSkills = selectedSkills.length === 0 ||
      selectedSkills.some(s => u.skills.includes(s));
    return matchSearch && matchSkills;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#0F172A] mb-1" style={{ fontWeight: 800, fontSize: "1.6rem" }}>Recruiter Dashboard</h1>
          <p className="text-gray-500 text-sm">Find exceptional talent based on real skills</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1E3A8A] text-white px-5 py-2.5 rounded-xl hover:bg-[#1E3A8A]/90 transition-all shadow-md text-sm" style={{ fontWeight: 600 }}>
          <Plus size={18} />
          Post Opportunity
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
            }`}
            style={{ fontWeight: activeTab === tab ? 600 : 500 }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === "Dashboard" && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Total Candidates", value: RECRUITER_STATS.totalCandidates.toLocaleString(), icon: Users, color: "#1E3A8A", delta: "+127" },
              { label: "Saved Candidates", value: RECRUITER_STATS.savedCandidates, icon: Bookmark, color: "#14B8A6", delta: "+5" },
              { label: "Active Listings", value: RECRUITER_STATS.activeOpportunities, icon: Briefcase, color: "#8B5CF6", delta: "+2" },
              { label: "Applications", value: RECRUITER_STATS.applicationsReceived, icon: Target, color: "#F59E0B", delta: "+48" },
              { label: "Avg Match Score", value: `${RECRUITER_STATS.avgMatchScore}%`, icon: Star, color: "#10B981", delta: "+3%" },
            ].map(({ label, value, icon: Icon, color, delta }) => (
              <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "15" }}>
                    <Icon size={17} style={{ color }} />
                  </div>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>{delta}</span>
                </div>
                <p className="text-gray-800 mb-0.5" style={{ fontWeight: 800, fontSize: "1.4rem" }}>{value}</p>
                <p className="text-gray-400 text-xs">{label}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-5 mb-6">
            {/* Weekly Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-gray-800" style={{ fontWeight: 700 }}>Weekly Activity</h3>
                  <p className="text-gray-400 text-xs">Profile views vs applications</p>
                </div>
                <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 focus:outline-none">
                  <option>This Week</option>
                  <option>Last Month</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "12px" }}
                  />
                  <Line type="monotone" dataKey="views" stroke="#1E3A8A" strokeWidth={2.5} dot={{ fill: "#1E3A8A", r: 4 }} name="Views" />
                  <Line type="monotone" dataKey="applications" stroke="#14B8A6" strokeWidth={2.5} dot={{ fill: "#14B8A6", r: 4 }} name="Applications" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Candidate Types */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-gray-800 mb-1" style={{ fontWeight: 700 }}>Candidate Breakdown</h3>
              <p className="text-gray-400 text-xs mb-4">By role type</p>
              <div className="flex justify-center mb-4">
                <PieChart width={160} height={160}>
                  <Pie data={candidateSourceData} cx={75} cy={75} innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                    {candidateSourceData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="space-y-2">
                {candidateSourceData.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="text-gray-800" style={{ fontWeight: 700 }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Demand Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-800" style={{ fontWeight: 700 }}>Top Skill Demand</h3>
                <p className="text-gray-400 text-xs">Skills most in demand on GradConnect</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-xs" style={{ fontWeight: 600 }}>
                <TrendingUp size={14} />
                Updated today
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={skillTrendData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#9CA3AF" }} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#374151" }} width={100} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "12px" }}
                  formatter={(val: any) => [`${val}% demand`, "Demand"]}
                />
                <Bar dataKey="demand" radius={[0, 6, 6, 0]}>
                  {skillTrendData.map((entry, i) => (
                    <Cell key={i} fill={i < 3 ? "#1E3A8A" : i < 5 ? "#14B8A6" : "#94A3B8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Candidates */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-gray-800" style={{ fontWeight: 700 }}>Top Matching Candidates</h3>
              <button onClick={() => setActiveTab("Search Candidates")} className="text-xs text-[#1E3A8A] flex items-center gap-1" style={{ fontWeight: 600 }}>
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {USERS.filter(u => u.role !== "Recruiter").slice(0, 4).map(user => (
                <div key={user.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                  <img src={user.avatar} alt={user.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{user.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${user.role === "Student" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`} style={{ fontWeight: 600 }}>
                        {user.role}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mb-1">{user.university} • {user.location}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {user.skills.slice(0, 3).map(s => <SkillTag key={s} skill={s} />)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="text-center">
                      <p className="text-[#14B8A6]" style={{ fontWeight: 800, fontSize: "1rem" }}>{user.matchScore}%</p>
                      <p className="text-xs text-gray-400">match</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => toggleSave(user.id)}
                        className={`p-1.5 rounded-lg border transition-all ${savedCandidates.includes(user.id) ? "bg-[#EFF6FF] border-[#1E3A8A] text-[#1E3A8A]" : "border-gray-200 text-gray-400 hover:border-gray-300"}`}
                      >
                        <Bookmark size={13} />
                      </button>
                      <button className="flex items-center gap-1 bg-[#1E3A8A] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#1E3A8A]/90 transition-all" style={{ fontWeight: 600 }}>
                        Invite
                        <ArrowUpRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Search Candidates Tab */}
      {activeTab === "Search Candidates" && (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, skill, university, or interest..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-gray-300 transition-all" style={{ fontWeight: 500 }}>
                <Filter size={15} />
                Filters
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "Python", "Machine Learning", "TypeScript", "Node.js"].map(skill => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill])}
                  className={`px-3 py-1.5 rounded-full text-xs border-2 transition-all ${
                    selectedSkills.includes(skill) ? "border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]" : "border-gray-200 text-gray-600"
                  }`}
                  style={{ fontWeight: selectedSkills.includes(skill) ? 600 : 400 }}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredUsers.map(user => (
              <div key={user.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-gray-800 text-sm" style={{ fontWeight: 800 }}>{user.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${user.role === "Student" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`} style={{ fontWeight: 600 }}>{user.role}</span>
                      {user.available && (
                        <span className="text-xs text-emerald-600 flex items-center gap-1" style={{ fontWeight: 500 }}>
                          <CheckCircle size={11} />
                          Available
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{user.university} • {user.location} • Class of {user.year}</p>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-1">{user.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {user.skills.map(s => <SkillTag key={s} skill={s} />)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0FDFA] rounded-xl px-3 py-2 text-center">
                      <p className="text-[#1E3A8A]" style={{ fontWeight: 800, fontSize: "1.2rem" }}>{user.matchScore}%</p>
                      <p className="text-xs text-gray-400">match</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSave(user.id)}
                        className={`p-2 rounded-lg border transition-all ${savedCandidates.includes(user.id) ? "bg-[#EFF6FF] border-[#1E3A8A] text-[#1E3A8A]" : "border-gray-200 text-gray-400 hover:border-gray-300"}`}
                      >
                        <Bookmark size={14} />
                      </button>
                      <button className="flex items-center gap-1.5 bg-[#14B8A6] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#0D9488] transition-all shadow-md" style={{ fontWeight: 600 }}>
                        Invite to Apply
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Saved Tab */}
      {activeTab === "Saved" && (
        <div className="space-y-3">
          {USERS.filter(u => savedCandidates.includes(u.id)).map(user => (
            <div key={user.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{user.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${user.role === "Student" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`} style={{ fontWeight: 600 }}>{user.role}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">{user.university} • {user.location}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {user.skills.slice(0, 3).map(s => <SkillTag key={s} skill={s} />)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleSave(user.id)}
                    className="p-2 rounded-lg border border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]"
                  >
                    <Bookmark size={14} />
                  </button>
                  <button className="flex items-center gap-1.5 bg-[#1E3A8A] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#1E3A8A]/90 transition-all" style={{ fontWeight: 600 }}>
                    Invite <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {savedCandidates.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <Bookmark size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500" style={{ fontWeight: 600 }}>No saved candidates yet</p>
              <p className="text-gray-400 text-sm mt-1">Browse candidates and bookmark the ones you like</p>
            </div>
          )}
        </div>
      )}

      {/* Post Opportunity Tab */}
      {activeTab === "Post Opportunity" && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-gray-800 mb-5" style={{ fontWeight: 800, fontSize: "1.2rem" }}>Post a New Opportunity</h3>
            <div className="space-y-4">
              {[
                { label: "Job Title *", type: "text", placeholder: "e.g., Frontend Engineer Intern" },
                { label: "Company Name *", type: "text", placeholder: "e.g., Stripe" },
                { label: "Location", type: "text", placeholder: "e.g., Remote or San Francisco, CA" },
                { label: "Application Deadline", type: "date", placeholder: "" },
              ].map(({ label, type, placeholder }) => (
                <div key={label}>
                  <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Opportunity Type</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none">
                  <option>Internship</option>
                  <option>Full-time</option>
                  <option>Co-op</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Description *</label>
                <textarea
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] resize-none"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Required Skills</label>
                <input
                  type="text"
                  placeholder="e.g., React, TypeScript, Node.js"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                />
              </div>
              <button className="w-full bg-[#1E3A8A] text-white py-3.5 rounded-xl text-sm hover:bg-[#1E3A8A]/90 transition-all shadow-lg" style={{ fontWeight: 600 }}>
                Post Opportunity 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
