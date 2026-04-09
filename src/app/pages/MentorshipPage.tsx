import React, { useState } from "react";
import {
  Star, Clock, Calendar, MessageCircle, Users, Search, Filter,
  X, ChevronLeft, ChevronRight, CheckCircle, Video, BookOpen,
  Award, Zap, ArrowRight
} from "lucide-react";
import { MENTORS, USERS } from "../components/mockData";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

function MentorCard({ mentor, onBook }: { mentor: typeof MENTORS[0]; onBook: (mentor: typeof MENTORS[0]) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="h-20 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-4 top-4 w-16 h-16 bg-white rounded-full" />
        </div>
      </div>
      <div className="px-5 pb-5 -mt-10">
        <div className="flex items-end gap-3 mb-3">
          {mentor.avatar ? (
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-16 h-16 rounded-2xl object-cover border-3 border-white shadow-lg"
              style={{ border: "3px solid white" }}
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center shadow-lg" style={{ border: "3px solid white" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
            </div>
          )}
          <div className="mb-1">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-gray-600" style={{ fontWeight: 700 }}>{mentor.rating}</span>
              <span className="text-xs text-gray-400">({mentor.reviews})</span>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
              {mentor.price}
            </span>
          </div>
        </div>

        <h3 className="text-gray-800 mb-0.5" style={{ fontWeight: 800 }}>{mentor.name}</h3>
        <p className="text-[#1E3A8A] text-xs mb-1" style={{ fontWeight: 600 }}>{mentor.title}</p>
        <p className="text-gray-400 text-xs mb-3">{mentor.company} • {mentor.university}</p>

        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{mentor.bio}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {mentor.skills.slice(0, 3).map(skill => (
            <span key={skill} className="bg-[#EFF6FF] text-[#1E3A8A] text-xs px-2 py-0.5 rounded-full border border-blue-100" style={{ fontWeight: 600 }}>
              {skill}
            </span>
          ))}
        </div>

        {/* Topics */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-1.5" style={{ fontWeight: 600 }}>Mentors on:</p>
          <div className="flex flex-wrap gap-1">
            {mentor.topics.map(topic => (
              <span key={topic} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1"><Users size={11} />{mentor.sessions} sessions</span>
          <span className="flex items-center gap-1"><Clock size={11} />{mentor.availability}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onBook(mentor)}
            className="flex-1 bg-[#1E3A8A] text-white py-2.5 rounded-xl text-xs hover:bg-[#1E3A8A]/90 transition-all" style={{ fontWeight: 600 }}
          >
            Book Session
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2.5 border border-gray-200 text-gray-500 rounded-xl text-xs hover:border-[#14B8A6] hover:text-[#14B8A6] transition-all" style={{ fontWeight: 600 }}>
            <MessageCircle size={13} />
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ mentor, onClose }: { mentor: typeof MENTORS[0]; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<"video" | "chat">("video");
  const [question, setQuestion] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();
  const calDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const availableSlots = TIME_SLOTS.filter((_, i) => i % 2 === 0 || selectedDate !== null);

  const handleBook = () => {
    if (step === 1 && selectedDate !== null && selectedTime) {
      setStep(2);
    } else if (step === 2) {
      setConfirmed(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {confirmed ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-gray-800 mb-2" style={{ fontWeight: 800, fontSize: "1.4rem" }}>Session Booked! 🎉</h2>
            <p className="text-gray-500 text-sm mb-4">
              Your session with <strong>{mentor.name}</strong> has been confirmed for{" "}
              {selectedDate !== null && calDays[selectedDate].toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}{" "}
              at {selectedTime}.
            </p>
            <p className="text-gray-400 text-xs mb-6">You'll receive a confirmation email with the video link.</p>
            <button onClick={onClose} className="w-full bg-[#1E3A8A] text-white py-3 rounded-xl" style={{ fontWeight: 600 }}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {mentor.avatar ? (
                  <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-xl object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
                  </div>
                )}
                <div>
                  <h2 className="text-gray-800 text-sm" style={{ fontWeight: 800 }}>Book with {mentor.name}</h2>
                  <p className="text-gray-400 text-xs">{mentor.title} at {mentor.company}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-5">
                {["Choose Time", "Add Details"].map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`flex items-center gap-1.5 text-xs ${step > i + 1 ? "text-[#14B8A6]" : step === i + 1 ? "text-[#1E3A8A]" : "text-gray-400"}`} style={{ fontWeight: step === i + 1 ? 700 : 500 }}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step > i + 1 ? "bg-[#14B8A6] text-white" : step === i + 1 ? "bg-[#1E3A8A] text-white" : "bg-gray-100 text-gray-400"}`} style={{ fontWeight: 700 }}>
                        {step > i + 1 ? "✓" : i + 1}
                      </div>
                      {s}
                    </div>
                    {i === 0 && <div className="flex-1 h-px bg-gray-100" />}
                  </React.Fragment>
                ))}
              </div>

              {step === 1 && (
                <>
                  {/* Session Type */}
                  <div className="mb-5">
                    <p className="text-xs text-gray-600 mb-2" style={{ fontWeight: 600 }}>Session Type</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { type: "video" as const, icon: Video, label: "Video Call", desc: "30 or 60 min" },
                        { type: "chat" as const, icon: MessageCircle, label: "Text Chat", desc: "Async Q&A" },
                      ].map(({ type, icon: Icon, label, desc }) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSessionType(type)}
                          className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                            sessionType === type ? "border-[#1E3A8A] bg-[#EFF6FF]" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Icon size={20} className={sessionType === type ? "text-[#1E3A8A]" : "text-gray-400"} />
                          <span className={`text-xs mt-1 ${sessionType === type ? "text-[#1E3A8A]" : "text-gray-600"}`} style={{ fontWeight: 600 }}>{label}</span>
                          <span className="text-xs text-gray-400">{desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="mb-5">
                    <p className="text-xs text-gray-600 mb-2" style={{ fontWeight: 600 }}>Select a Date</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {calDays.map((day, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedDate(i)}
                          className={`flex flex-col items-center p-2.5 rounded-xl border-2 min-w-12 transition-all ${
                            selectedDate === i ? "border-[#1E3A8A] bg-[#EFF6FF]" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className={`text-xs ${selectedDate === i ? "text-[#1E3A8A]" : "text-gray-400"}`} style={{ fontWeight: 500 }}>
                            {DAYS[day.getDay()]}
                          </span>
                          <span className={`text-sm ${selectedDate === i ? "text-[#1E3A8A]" : "text-gray-700"}`} style={{ fontWeight: 700 }}>
                            {day.getDate()}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate !== null && (
                    <div className="mb-5">
                      <p className="text-xs text-gray-600 mb-2" style={{ fontWeight: 600 }}>Available Times</p>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((time, i) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            disabled={i % 3 === 2}
                            className={`py-2 rounded-xl text-xs border-2 transition-all ${
                              i % 3 === 2 ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50" :
                              selectedTime === time ? "border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]" :
                              "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                            style={{ fontWeight: selectedTime === time ? 700 : 400 }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-[#EFF6FF] rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar size={14} className="text-[#1E3A8A]" />
                      <span className="text-xs text-[#1E3A8A]" style={{ fontWeight: 600 }}>
                        {selectedDate !== null && calDays[selectedDate].toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{sessionType === "video" ? "Video Call • 30 minutes" : "Text Chat • Async"}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>What would you like to discuss?</label>
                    <textarea
                      value={question}
                      onChange={e => setQuestion(e.target.value)}
                      placeholder="e.g., I'm interested in transitioning into ML engineering. I'd love to hear your story and get advice on building my skills..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] resize-none"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Your Background (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., CS Junior at MIT, interested in ML"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-100 flex gap-3">
              {step > 1 && (
                <button onClick={() => setStep(1)} className="border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm hover:bg-gray-50" style={{ fontWeight: 600 }}>
                  Back
                </button>
              )}
              <button
                onClick={handleBook}
                disabled={step === 1 && (!selectedDate || !selectedTime)}
                className="flex-1 bg-[#1E3A8A] text-white py-2.5 rounded-xl text-sm hover:bg-[#1E3A8A]/90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontWeight: 600 }}
              >
                {step === 1 ? "Continue" : "Confirm Booking"}
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function MentorshipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [bookingMentor, setBookingMentor] = useState<typeof MENTORS[0] | null>(null);
  const [activeTab, setActiveTab] = useState("find");

  const topics = ["All", "Career Transition", "Interview Prep", "Startup Advice", "ML Research", "Product Management"];

  const filteredMentors = MENTORS.filter(m => {
    const matchSearch = !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchTopic = selectedTopic === "All" || m.topics.includes(selectedTopic);
    return matchSearch && matchTopic;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#0F172A] mb-1" style={{ fontWeight: 800, fontSize: "1.6rem" }}>Mentorship</h1>
        <p className="text-gray-500 text-sm">Learn from those who've walked your path</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "find", label: "Find a Mentor", icon: Search },
          { id: "sessions", label: "My Sessions", icon: Calendar },
          { id: "ask", label: "Ask a Question", icon: MessageCircle },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
              activeTab === id
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
            }`}
            style={{ fontWeight: activeTab === id ? 600 : 500 }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Find a Mentor Tab */}
      {activeTab === "find" && (
        <>
          {/* Search & Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mentors by name, skill, or company..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {topics.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 rounded-full text-xs border-2 transition-all ${
                    selectedTopic === topic
                      ? "bg-[#1E3A8A] border-[#1E3A8A] text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                  style={{ fontWeight: selectedTopic === topic ? 600 : 400 }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Mentor */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 opacity-10">
              <div className="w-48 h-48 bg-white rounded-full translate-x-1/2 -translate-y-1/4" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} className="text-yellow-300 fill-yellow-300" />
              <span className="text-xs text-white/80" style={{ fontWeight: 600 }}>Featured Mentor of the Week</span>
            </div>
            <div className="flex items-center gap-4">
              <img src={MENTORS[0].avatar} alt={MENTORS[0].name} className="w-16 h-16 rounded-xl object-cover border-2 border-white/30" />
              <div className="flex-1">
                <h3 className="text-white mb-0.5" style={{ fontWeight: 800, fontSize: "1.1rem" }}>{MENTORS[0].name}</h3>
                <p className="text-white/70 text-sm">{MENTORS[0].title} at {MENTORS[0].company}</p>
                <p className="text-white/60 text-xs mt-1">{MENTORS[0].sessions}+ sessions • {MENTORS[0].rating} ⭐ rating</p>
              </div>
              <button
                onClick={() => setBookingMentor(MENTORS[0])}
                className="bg-white text-[#1E3A8A] px-4 py-2 rounded-xl text-xs hover:bg-gray-50 transition-all flex-shrink-0"
                style={{ fontWeight: 700 }}
              >
                Book Free Session
              </button>
            </div>
          </div>

          {/* Mentor Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMentors.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} onBook={setBookingMentor} />
            ))}
          </div>
        </>
      )}

      {/* My Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="space-y-4">
          {/* Upcoming */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-gray-800" style={{ fontWeight: 700 }}>Upcoming Sessions</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { mentor: MENTORS[0], date: "Mar 8, 2026", time: "2:00 PM", type: "Video Call", topic: "ML Career Path" },
                { mentor: MENTORS[1], date: "Mar 15, 2026", time: "10:00 AM", type: "Video Call", topic: "PM Interview Prep" },
              ].map((session, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:border-[#14B8A6]/40 transition-all">
                  {session.mentor.avatar ? (
                    <img src={session.mentor.avatar} alt={session.mentor.name} className="w-12 h-12 rounded-xl object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{session.mentor.name}</p>
                    <p className="text-gray-400 text-xs">{session.topic} • {session.type}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={11} className="text-[#1E3A8A]" />
                      <span className="text-xs text-[#1E3A8A]" style={{ fontWeight: 500 }}>{session.date} at {session.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 bg-[#1E3A8A] text-white px-3 py-2 rounded-xl text-xs" style={{ fontWeight: 600 }}>
                      <Video size={12} /> Join
                    </button>
                    <button className="border border-gray-200 text-gray-500 px-3 py-2 rounded-xl text-xs" style={{ fontWeight: 500 }}>
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Sessions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-gray-800" style={{ fontWeight: 700 }}>Past Sessions</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { mentor: MENTORS[2], date: "Feb 10, 2026", topic: "Data Science Career", rating: 5 },
                { mentor: MENTORS[3], date: "Jan 28, 2026", topic: "Startup Advice", rating: 5 },
              ].map((session, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl">
                  {session.mentor.avatar ? (
                    <img src={session.mentor.avatar} alt={session.mentor.name} className="w-12 h-12 rounded-xl object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{session.mentor.name}</p>
                    <p className="text-gray-400 text-xs">{session.topic}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(session.rating)].map((_, j) => (
                        <Star key={j} size={11} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">{session.date}</span>
                    <button className="block text-xs text-[#1E3A8A] mt-1" style={{ fontWeight: 500 }}>Book again</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ask a Question Tab */}
      {activeTab === "ask" && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
                <MessageCircle size={22} className="text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="text-gray-800" style={{ fontWeight: 700 }}>Ask the Community</h3>
                <p className="text-gray-400 text-xs">Get answers from mentors and experienced alumni</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Your Question</label>
                <textarea
                  placeholder="Ask anything about career, skills, projects, or industry..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] resize-none"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Topic</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none">
                  {topics.filter(t => t !== "All").map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <button className="w-full bg-[#1E3A8A] text-white py-3 rounded-xl text-sm hover:bg-[#1E3A8A]/90 transition-all shadow-md" style={{ fontWeight: 600 }}>
                Post Question
              </button>
            </div>
          </div>

          {/* Recent Questions */}
          <div className="mt-6">
            <h3 className="text-gray-800 mb-3" style={{ fontWeight: 700 }}>Recent Questions</h3>
            <div className="space-y-3">
              {[
                { question: "How do I transition from SWE to Product Management?", answers: 8, user: USERS[2] },
                { question: "What ML projects are most impressive to recruiters?", answers: 12, user: USERS[0] },
                { question: "How do I negotiate my first full-time offer?", answers: 15, user: USERS[3] },
              ].map((q, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    {q.user.avatar ? (
                      <img src={q.user.avatar} className="w-8 h-8 rounded-full object-cover flex-shrink-0" alt="" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm mb-1" style={{ fontWeight: 600 }}>{q.question}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{q.answers} answers</span>
                        <span>2 days ago</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {bookingMentor && (
        <BookingModal mentor={bookingMentor} onClose={() => setBookingMentor(null)} />
      )}
    </div>
  );
}