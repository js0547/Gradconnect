import React, { useState } from "react";
import {
  Plus, Users, Clock, CheckCircle, Zap, MessageSquare, Filter,
  Search, ChevronRight, MoreHorizontal, Star, ArrowUpRight, X
} from "lucide-react";
import { PROJECTS, USERS } from "../components/mockData";

const SKILL_COLOR_MAP: Record<string, string> = {
  React: "#61DAFB", Python: "#3776AB", "Machine Learning": "#FF6F00",
  "UI/UX": "#A855F7", "Flutter": "#02569B", "Node.js": "#339933",
  "IoT": "#10B981", "Data Viz": "#F59E0B", Rust: "#DEA584",
  Cryptography: "#EF4444", "Next.js": "#000000", "TypeScript": "#3178C6",
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

const TABS = ["All Projects", "Open", "In Progress", "Completed", "My Projects"];

function ProjectCard({ project, onOpenChat }: { project: typeof PROJECTS[0]; onOpenChat: () => void }) {
  const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
    Open: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
    "In Progress": { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
    Completed: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  };
  const config = statusConfig[project.status] || statusConfig["Open"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="relative">
        <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 ${config.bg} ${config.text}`} style={{ fontWeight: 600 }}>
            <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {project.status}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-full" style={{ fontWeight: 600 }}>
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>{project.title}</h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{project.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.map(s => <SkillTag key={s} skill={s} />)}
        </div>

        {/* Progress */}
        {project.status !== "Open" && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-400">Progress</span>
              <span className="text-[#1E3A8A]" style={{ fontWeight: 700 }}>{project.progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Team */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, i) => (
              <img
                key={i}
                src={member.avatar}
                alt={member.name}
                className="w-7 h-7 rounded-full object-cover border-2 border-white"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {project.members} member{project.members !== 1 ? "s" : ""}
          </span>
          {project.openRoles.length > 0 && (
            <span className="ml-auto text-xs text-[#14B8A6] bg-[#F0FDFA] px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
              {project.openRoles.length} open role{project.openRoles.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Open Roles */}
        {project.openRoles.length > 0 && (
          <div className="mb-4 p-2 bg-[#F0FDFA] rounded-xl border border-[#14B8A6]/20">
            <p className="text-xs text-[#14B8A6] mb-1" style={{ fontWeight: 600 }}>Looking for:</p>
            <div className="flex flex-wrap gap-1">
              {project.openRoles.map(role => (
                <span key={role} className="text-xs bg-white border border-[#14B8A6]/30 text-teal-700 px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#1E3A8A] text-white text-xs py-2.5 rounded-xl hover:bg-[#1E3A8A]/90 transition-all" style={{ fontWeight: 600 }}>
            <Users size={13} />
            {project.status === "Open" ? "Join Project" : "View Project"}
          </button>
          <button
            onClick={onOpenChat}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-gray-200 text-gray-500 rounded-xl hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all"
          >
            <MessageSquare size={14} />
          </button>
          <button className="flex items-center justify-center p-2.5 border border-gray-200 text-gray-500 rounded-xl hover:border-gray-300 transition-all">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Tech",
    skills: [] as string[],
    roles: "",
  });

  const skillOptions = ["React", "Python", "Node.js", "Flutter", "ML", "Data Science", "UI/UX", "DevOps"];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-gray-800" style={{ fontWeight: 800, fontSize: "1.2rem" }}>Create New Project</h2>
            <p className="text-gray-400 text-xs mt-0.5">Find your perfect team based on skills</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Project Title *</label>
            <input
              type="text"
              placeholder="e.g., AI Study Partner App"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Description *</label>
            <textarea
              placeholder="What are you building and why? What impact will it have?"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] resize-none"
              rows={3}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Category</label>
            <select
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              {["Tech", "EdTech", "HealthTech", "Fintech", "Sustainability", "Social Good", "Gaming", "AI"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Required Skills</label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setForm(prev => ({
                    ...prev,
                    skills: prev.skills.includes(skill) ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill]
                  }))}
                  className={`text-xs px-3 py-1.5 rounded-full border-2 transition-all ${
                    form.skills.includes(skill)
                      ? "border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]"
                      : "border-gray-200 text-gray-600"
                  }`}
                  style={{ fontWeight: form.skills.includes(skill) ? 600 : 400 }}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Open Roles (comma separated)</label>
            <input
              type="text"
              placeholder="e.g., Backend Dev, Designer, PM"
              value={form.roles}
              onChange={e => setForm({ ...form, roles: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
            />
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-all" style={{ fontWeight: 600 }}>
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#1E3A8A] text-white py-2.5 rounded-xl text-sm hover:bg-[#1E3A8A]/90 transition-all shadow-lg"
            style={{ fontWeight: 600 }}
          >
            Create Project 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const msgs = [
    { sender: "Marcus", text: "Hey team! Just pushed the new ML model. Check it out!", time: "10:30 AM", avatar: USERS[1].avatar },
    { sender: "You", text: "Looks great! The accuracy improved significantly.", time: "10:32 AM", avatar: USERS[0].avatar },
    { sender: "Sofia", text: "Agreed! I'll update the frontend to display the results.", time: "10:35 AM", avatar: USERS[2].avatar },
    { sender: "Marcus", text: "Perfect. Next milestone is the user testing phase. Anyone free this weekend?", time: "10:40 AM", avatar: USERS[1].avatar },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <h3 className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>EduAI Team Chat</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {msgs.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.sender === "You" ? "flex-row-reverse" : ""}`}>
            {msg.avatar ? (
              <img src={msg.avatar} className="w-7 h-7 rounded-full object-cover flex-shrink-0" alt={msg.sender} />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
              </div>
            )}
            <div className={`max-w-xs ${msg.sender === "You" ? "items-end" : "items-start"} flex flex-col`}>
              {msg.sender !== "You" && (
                <span className="text-xs text-gray-400 mb-1" style={{ fontWeight: 500 }}>{msg.sender}</span>
              )}
              <div className={`px-3 py-2 rounded-xl text-xs ${
                msg.sender === "You"
                  ? "bg-[#1E3A8A] text-white rounded-tr-sm"
                  : "bg-gray-100 text-gray-700 rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
              <span className="text-xs text-gray-300 mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30"
          />
          <button
            onClick={() => setMessage("")}
            className="bg-[#1E3A8A] text-white px-3 py-2 rounded-xl text-xs"
            style={{ fontWeight: 600 }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export function CollaborationPage() {
  const [activeTab, setActiveTab] = useState("All Projects");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = PROJECTS.filter(p => {
    const statusMatch = activeTab === "All Projects" || activeTab === "My Projects" || p.status === activeTab;
    const searchMatch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#0F172A] mb-1" style={{ fontWeight: 800, fontSize: "1.6rem" }}>Collaboration Hub</h1>
          <p className="text-gray-500 text-sm">Build something amazing with the right team</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#1E3A8A] text-white px-5 py-2.5 rounded-xl hover:bg-[#1E3A8A]/90 transition-all shadow-md hover:shadow-lg text-sm"
          style={{ fontWeight: 600 }}
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active Projects", value: "2,847", icon: Zap, color: "#1E3A8A" },
          { label: "Open Positions", value: "1,203", icon: Users, color: "#14B8A6" },
          { label: "Completed", value: "8,421", icon: CheckCircle, color: "#10B981" },
          { label: "Avg. Duration", value: "12 wks", icon: Clock, color: "#F59E0B" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + "15" }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-gray-800" style={{ fontWeight: 800, fontSize: "1.1rem" }}>{value}</p>
              <p className="text-gray-400 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`flex gap-6 ${showChat ? "grid grid-cols-1 lg:grid-cols-3" : ""}`} style={{ display: showChat ? "grid" : "block" }}>
        <div className={showChat ? "lg:col-span-2" : ""}>
          {/* Search & Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-sm whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab
                      ? "border-[#1E3A8A] text-[#1E3A8A] bg-[#EFF6FF]/50"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                  style={{ fontWeight: activeTab === tab ? 700 : 500 }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                />
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenChat={() => setShowChat(true)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <Zap size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600" style={{ fontWeight: 600 }}>No projects found</p>
              <p className="text-gray-400 text-sm mt-1">Try a different filter or create a new project</p>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="lg:col-span-1 h-96 lg:h-auto">
            <ChatPanel onClose={() => setShowChat(false)} />
          </div>
        )}
      </div>

      {showCreateModal && <CreateProjectModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}