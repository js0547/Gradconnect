import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search, Filter, Grid, List, MapPin, Users, Star, MessageCircle,
  UserPlus, SlidersHorizontal, X, ChevronDown, Briefcase
} from "lucide-react";
import { USERS } from "../components/mockData";

const SKILL_COLOR_MAP: Record<string, string> = {
  React: "#61DAFB", Python: "#3776AB", "Machine Learning": "#FF6F00",
  "UI/UX": "#A855F7", "Data Analysis": "#10B981", JavaScript: "#F7DF1E",
  TypeScript: "#3178C6", "iOS Dev": "#FA7343", Cybersecurity: "#EF4444",
  "Data Science": "#6366F1",
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

const ALL_SKILLS = ["React", "Python", "Machine Learning", "iOS Dev", "Data Science", "Cybersecurity", "TypeScript", "Node.js", "Flutter"];
const ROLES = ["All", "Student", "Alumni", "Recruiter"];
const INDUSTRIES = ["All", "Tech", "HealthTech", "FinTech", "EdTech", "Sustainability"];
const GRAD_YEARS = ["All", "2024", "2025", "2026", "2027", "Alumni"];
const UNIVERSITIES = ["All", "MIT", "Stanford", "UC Berkeley", "Carnegie Mellon", "Georgia Tech"];

export function DiscoveryPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleConnect = (userId: string) => {
    setConnectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const filteredUsers = USERS.filter(user => {
    const matchesSearch = !searchQuery ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesYear = selectedYear === "All" || user.year === selectedYear;
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some(s => user.skills.includes(s));
    return matchesSearch && matchesRole && matchesYear && matchesSkills;
  });

  const activeFilters = selectedSkills.length + (selectedRole !== "All" ? 1 : 0) + (selectedYear !== "All" ? 1 : 0);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#0F172A] mb-1" style={{ fontWeight: 800, fontSize: "1.6rem" }}>Discover Talent</h1>
        <p className="text-gray-500 text-sm">Find your next collaborator, mentor, or connection</p>
      </div>

      {/* Search & Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, skill, university..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                showFilters ? "bg-[#1E3A8A] text-white border-[#1E3A8A]" : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
              style={{ fontWeight: 600 }}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilters > 0 && (
                <span className="bg-[#14B8A6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-[#1E3A8A] text-white" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-[#1E3A8A] text-white" : "text-gray-400 hover:text-gray-600"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              {/* Role Filter */}
              <div>
                <label className="text-xs text-gray-500 mb-2 block" style={{ fontWeight: 600 }}>Role</label>
                <div className="flex flex-wrap gap-1.5">
                  {ROLES.map(role => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        selectedRole === role
                          ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                      style={{ fontWeight: selectedRole === role ? 600 : 400 }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grad Year */}
              <div>
                <label className="text-xs text-gray-500 mb-2 block" style={{ fontWeight: 600 }}>Graduation Year</label>
                <div className="flex flex-wrap gap-1.5">
                  {GRAD_YEARS.map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        selectedYear === year
                          ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                      style={{ fontWeight: selectedYear === year ? 600 : 400 }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div>
                <label className="text-xs text-gray-500 mb-2 block" style={{ fontWeight: 600 }}>Industry</label>
                <div className="flex flex-wrap gap-1.5">
                  {INDUSTRIES.slice(0, 4).map(ind => (
                    <button
                      key={ind}
                      onClick={() => setSelectedIndustry(ind)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        selectedIndustry === ind
                          ? "bg-[#14B8A6] text-white border-[#14B8A6]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                      style={{ fontWeight: selectedIndustry === ind ? 600 : 400 }}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Match % */}
              <div>
                <label className="text-xs text-gray-500 mb-2 block" style={{ fontWeight: 600 }}>Min. Skill Match</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={70}
                    className="flex-1 accent-[#1E3A8A]"
                  />
                  <span className="text-sm text-[#1E3A8A]" style={{ fontWeight: 700 }}>70%</span>
                </div>
              </div>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="text-xs text-gray-500 mb-2 block" style={{ fontWeight: 600 }}>Filter by Skills</label>
              <div className="flex flex-wrap gap-2">
                {ALL_SKILLS.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-xs border-2 transition-all ${
                      selectedSkills.includes(skill)
                        ? "border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                    style={{ fontWeight: selectedSkills.includes(skill) ? 600 : 400 }}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && " ×"}
                  </button>
                ))}
              </div>
            </div>

            {activeFilters > 0 && (
              <button
                onClick={() => { setSelectedSkills([]); setSelectedRole("All"); setSelectedYear("All"); setSelectedIndustry("All"); }}
                className="mt-3 text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                style={{ fontWeight: 500 }}
              >
                <X size={12} />
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing <span className="text-gray-800" style={{ fontWeight: 700 }}>{filteredUsers.length}</span> results
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none" style={{ fontWeight: 500 }}>
          <option>Sort: Best Match</option>
          <option>Sort: Most Connected</option>
          <option>Sort: Recently Active</option>
        </select>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map(user => (
            <div key={user.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
              {/* Card Header */}
              <div className="h-16 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>
                {/* Match Score Badge */}
                <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#14B8A6] rounded-full" />
                  <span className="text-xs text-[#1E3A8A]" style={{ fontWeight: 700 }}>{user.matchScore}% match</span>
                </div>
              </div>

              <div className="p-4 -mt-8">
                <div className="flex items-end gap-3 mb-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-xl object-cover border-3 border-white shadow-lg"
                    style={{ border: "3px solid white" }}
                  />
                  <div className="mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.role === "Student" ? "bg-blue-100 text-blue-700" :
                        user.role === "Alumni" ? "bg-teal-100 text-teal-700" :
                        "bg-purple-100 text-purple-700"
                      }`} style={{ fontWeight: 600 }}>
                        {user.role}
                      </span>
                      {user.available && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" title="Available for collaboration" />
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="text-gray-800 mb-0.5" style={{ fontWeight: 700 }}>{user.name}</h3>
                <p className="text-gray-400 text-xs mb-1">{user.university}</p>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                  <MapPin size={11} />
                  {user.location}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {user.skills.slice(0, 3).map(s => <SkillTag key={s} skill={s} />)}
                  {user.skills.length > 3 && (
                    <span className="text-xs text-gray-400 px-2 py-0.5">+{user.skills.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                  <Users size={12} />
                  <span>{user.connections} connections</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleConnect(user.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs transition-all ${
                      connectedUsers.includes(user.id)
                        ? "bg-gray-100 text-gray-600"
                        : "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    <UserPlus size={13} />
                    {connectedUsers.includes(user.id) ? "Connected" : "Connect"}
                  </button>
                  <button
                    onClick={() => navigate("/collaborate")}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#14B8A6]/50 text-[#14B8A6] rounded-xl text-xs hover:bg-[#14B8A6] hover:text-white transition-all"
                    style={{ fontWeight: 600 }}
                  >
                    <Users size={13} />
                    Invite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {filteredUsers.map(user => (
            <div key={user.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{user.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user.role === "Student" ? "bg-blue-100 text-blue-700" :
                      user.role === "Alumni" ? "bg-teal-100 text-teal-700" :
                      "bg-purple-100 text-purple-700"
                    }`} style={{ fontWeight: 600 }}>{user.role}</span>
                    {user.available && (
                      <span className="text-xs text-emerald-600 flex items-center gap-1" style={{ fontWeight: 500 }}>
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        Available
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mb-2">{user.university} • {user.location}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {user.skills.slice(0, 4).map(s => <SkillTag key={s} skill={s} />)}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-[#14B8A6]" style={{ fontWeight: 800, fontSize: "1.1rem" }}>{user.matchScore}%</p>
                    <p className="text-xs text-gray-400">match</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleConnect(user.id)}
                      className={`px-4 py-2 rounded-xl text-xs transition-all ${
                        connectedUsers.includes(user.id)
                          ? "bg-gray-100 text-gray-600"
                          : "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {connectedUsers.includes(user.id) ? "Connected" : "Connect"}
                    </button>
                    <button
                      onClick={() => navigate("/collaborate")}
                      className="px-4 py-2 border border-[#14B8A6]/50 text-[#14B8A6] rounded-xl text-xs hover:bg-[#14B8A6] hover:text-white transition-all"
                      style={{ fontWeight: 600 }}
                    >
                      Invite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-gray-400" />
          </div>
          <p className="text-gray-600 mb-2" style={{ fontWeight: 600 }}>No results found</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
