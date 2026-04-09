import React, { useState, useRef, useEffect } from "react";
import {
  Search, Send, Paperclip, Smile, MoreVertical, Phone, Video,
  ChevronLeft, Users, Check, CheckCheck, ArrowLeft
} from "lucide-react";
import { CONVERSATIONS, NOTIFICATIONS } from "../components/mockData";

export function MessagingPage() {
  const [activeConversation, setActiveConversation] = useState<typeof CONVERSATIONS[0] | null>(CONVERSATIONS[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(CONVERSATIONS[0]?.messages || []);
  const [activePanel, setActivePanel] = useState<"messages" | "notifications">("messages");
  const [showList, setShowList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = (conv: typeof CONVERSATIONS[0]) => {
    setActiveConversation(conv);
    setMessages(conv.messages);
    setShowList(false);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text: message.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
    };
    setMessages(prev => [...prev, newMsg]);
    setMessage("");
  };

  return (
    <div className="flex h-full bg-[#F8FAFC] overflow-hidden">
      {/* Left Panel: Conversation List (desktop always, mobile toggleable) */}
      <div className={`${showList ? "flex" : "hidden md:flex"} flex-col w-full md:w-80 lg:w-96 bg-white border-r border-gray-100 flex-shrink-0`}>
        {/* Panel Header */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-800" style={{ fontWeight: 800, fontSize: "1.1rem" }}>Messages</h2>
            <div className="flex gap-1.5">
              <button
                onClick={() => setActivePanel("messages")}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${activePanel === "messages" ? "bg-[#1E3A8A] text-white" : "text-gray-400 hover:text-gray-600"}`}
                style={{ fontWeight: activePanel === "messages" ? 600 : 500 }}
              >
                Chats
              </button>
              <button
                onClick={() => setActivePanel("notifications")}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all relative ${activePanel === "notifications" ? "bg-[#1E3A8A] text-white" : "text-gray-400 hover:text-gray-600"}`}
                style={{ fontWeight: activePanel === "notifications" ? 600 : 500 }}
              >
                Alerts
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" style={{ fontSize: "0.6rem" }}>
                  {NOTIFICATIONS.filter(n => !n.read).length}
                </span>
              </button>
            </div>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
            />
          </div>
        </div>

        {/* Conversations */}
        {activePanel === "messages" && (
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map(conv => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left ${
                  activeConversation?.id === conv.id ? "bg-[#EFF6FF] border-l-2 border-l-[#1E3A8A]" : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img src={conv.user.avatar} alt={conv.user.name} className="w-11 h-11 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-gray-800 text-sm truncate" style={{ fontWeight: conv.unread > 0 ? 700 : 600 }}>
                      {conv.user.name}
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                  </div>
                  <p className={`text-xs truncate ${conv.unread > 0 ? "text-gray-700" : "text-gray-400"}`} style={{ fontWeight: conv.unread > 0 ? 500 : 400 }}>
                    {conv.lastMessage}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{conv.user.role}</span>
                    {conv.unread > 0 && (
                      <span className="bg-[#1E3A8A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" style={{ fontWeight: 700, fontSize: "0.65rem" }}>
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Notifications Panel */}
        {activePanel === "notifications" && (
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500" style={{ fontWeight: 600 }}>All Notifications</span>
              <button className="text-xs text-[#14B8A6]" style={{ fontWeight: 600 }}>Mark all read</button>
            </div>
            {NOTIFICATIONS.map(notif => (
              <div
                key={notif.id}
                className={`px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.read ? "bg-blue-50/30" : ""}`}
              >
                <div className="flex items-start gap-3">
                  {notif.avatar ? (
                    <img src={notif.avatar} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                      <Users size={16} className="text-[#1E3A8A]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-relaxed">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-2 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Panel: Chat */}
      <div className={`${!showList ? "flex" : "hidden md:flex"} flex-1 flex-col overflow-hidden`}>
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0 shadow-sm">
              <button
                onClick={() => setShowList(true)}
                className="md:hidden text-gray-500 hover:text-gray-700 mr-1"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="relative">
                <img
                  src={activeConversation.user.avatar}
                  alt={activeConversation.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{activeConversation.user.name}</p>
                <p className="text-emerald-500 text-xs" style={{ fontWeight: 500 }}>● Online now</p>
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-gray-400 hover:text-[#1E3A8A] hover:bg-gray-50 rounded-xl transition-all">
                  <Phone size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#1E3A8A] hover:bg-gray-50 rounded-xl transition-all">
                  <Video size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#1E3A8A] hover:bg-gray-50 rounded-xl transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* User Info Banner */}
            <div className="bg-gradient-to-r from-[#EFF6FF] to-[#F0FDFA] border-b border-gray-100 px-4 py-2 flex items-center gap-3">
              <div className="flex flex-wrap gap-1.5">
                {activeConversation.user.skills.slice(0, 3).map(s => (
                  <span key={s} className="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
                    {s}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-400 ml-auto">{activeConversation.user.university}</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8FAFC]">
              {messages.map((msg, i) => {
                const isMe = msg.sender === "me";
                return (
                  <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                    {!isMe && (
                      <img
                        src={activeConversation.user.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-auto"
                      />
                    )}
                    {isMe && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
                      </div>
                    )}
                    <div className={`max-w-xs md:max-w-md flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          isMe
                            ? "bg-[#1E3A8A] text-white rounded-br-sm"
                            : "bg-white text-gray-700 rounded-bl-sm shadow-sm border border-gray-100"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 ${isMe ? "flex-row-reverse" : ""}`}>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                        {isMe && <CheckCheck size={12} className="text-[#14B8A6]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Responses */}
            <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
              {["Sounds great! 👍", "Let's schedule a call", "I'd love to collaborate!", "Tell me more"].map(r => (
                <button
                  key={r}
                  onClick={() => setMessage(r)}
                  className="flex-shrink-0 text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-[#1E3A8A] hover:text-[#1E3A8A] hover:bg-[#EFF6FF] transition-all"
                  style={{ fontWeight: 500 }}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0">
              <div className="flex items-end gap-3">
                <button className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex-shrink-0 mb-0.5">
                  <Paperclip size={18} />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Type a message... (Enter to send)"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6] resize-none"
                    rows={1}
                    style={{ maxHeight: "120px" }}
                  />
                </div>
                <button className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex-shrink-0 mb-0.5">
                  <Smile size={18} />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="flex-shrink-0 w-10 h-10 bg-[#1E3A8A] text-white rounded-2xl flex items-center justify-center hover:bg-[#1E3A8A]/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-0.5"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center bg-[#F8FAFC]">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#EFF6FF] rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Users size={36} className="text-[#1E3A8A]" />
              </div>
              <h3 className="text-gray-700 mb-2" style={{ fontWeight: 700 }}>Your Messages</h3>
              <p className="text-gray-400 text-sm">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}