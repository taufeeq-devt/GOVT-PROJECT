import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Mic,
  Pin,
  MoreVertical,
  Check,
  CheckCheck,
  Eye,
  FileText,
  Image,
  Download,
  X,
  Plus,
  Filter,
  Bell,
  Volume2,
  VolumeX,
  Users,
  Building,
  Shield,
  Crown,
  MessageSquare,
  Clock,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatThread, MessageBubble, MessageInput } from "../components/messaging";

// Mock data for chat threads
const chatThreads = [
  {
    id: 1,
    name: "Amit Sharma",
    role: "Project Manager",
    roleColor: "bg-blue-600",
    roleIcon: <Building className="w-3 h-3" />,
    avatar: "AS",
    lastMessage: "Please confirm the delivery schedule for next week",
    timestamp: "2 min ago",
    unreadCount: 3,
    isOnline: true,
    project: "Municipal Infrastructure Upgrade",
    pinned: false,
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Supervisor",
    roleColor: "bg-emerald-600",
    roleIcon: <Users className="w-3 h-3" />,
    avatar: "PV",
    lastMessage: "The materials have been inspected and approved",
    timestamp: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    project: "Bridge Construction",
    pinned: true,
  },
  {
    id: 3,
    name: "Rakesh Singh",
    role: "Admin",
    roleColor: "bg-purple-600",
    roleIcon: <Shield className="w-3 h-3" />,
    avatar: "RS",
    lastMessage: "Payment processed for invoice #INV-2024-001",
    timestamp: "3 hours ago",
    unreadCount: 1,
    isOnline: true,
    project: "School Renovation",
    pinned: false,
  },
  {
    id: 4,
    name: "Suresh Kumar",
    role: "Supervisor",
    roleColor: "bg-emerald-600",
    roleIcon: <Users className="w-3 h-3" />,
    avatar: "SK",
    lastMessage: "Quality check completed for steel rods",
    timestamp: "Yesterday",
    unreadCount: 0,
    isOnline: false,
    project: "Municipal Infrastructure Upgrade",
    pinned: false,
  },
];

// Mock messages for selected chat
const mockMessages = {
  1: [
    {
      id: 1,
      sender: "Amit Sharma",
      senderRole: "Project Manager",
      text: "Hi, I need to discuss the delivery schedule for the Municipal Infrastructure project.",
      timestamp: "10:30 AM",
      status: "seen",
      isOwn: false,
      attachments: [],
    },
    {
      id: 2,
      sender: "You",
      senderRole: "Supplier",
      text: "Hello Amit, I'm available to discuss. What specific details do you need?",
      timestamp: "10:32 AM",
      status: "delivered",
      isOwn: true,
      attachments: [],
    },
    {
      id: 3,
      sender: "Amit Sharma",
      senderRole: "Project Manager",
      text: "Please confirm the delivery schedule for next week",
      timestamp: "10:35 AM",
      status: "sent",
      isOwn: false,
      attachments: [
        {
          name: "delivery_schedule.pdf",
          type: "pdf",
          size: "2.4 MB",
          url: "#",
        },
      ],
    },
  ],
  2: [
    {
      id: 1,
      sender: "Priya Verma",
      senderRole: "Supervisor",
      text: "The materials have been inspected and approved. Great quality!",
      timestamp: "Yesterday",
      status: "seen",
      isOwn: false,
      attachments: [
        {
          name: "inspection_report.pdf",
          type: "pdf",
          size: "1.8 MB",
          url: "#",
        },
        {
          name: "quality_check.jpg",
          type: "image",
          size: "856 KB",
          url: "#",
        },
      ],
    },
  ],
  3: [
    {
      id: 1,
      sender: "Rakesh Singh",
      senderRole: "Admin",
      text: "Payment processed for invoice #INV-2024-001. You should receive the transfer within 24 hours.",
      timestamp: "3 hours ago",
      status: "seen",
      isOwn: false,
      attachments: [
        {
          name: "payment_receipt.pdf",
          type: "pdf",
          size: "3.2 MB",
          url: "#",
        },
      ],
    },
  ],
};

export default function Messaging() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const selectedChatData = chatThreads.find(chat => chat.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  // Simulate typing indicator
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() || attachments.length > 0) {
      const newMessage = {
        id: Date.now(),
        sender: "You",
        senderRole: "Supplier",
        text: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "sent",
        isOwn: true,
        attachments: [...attachments],
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage],
      }));

      setInput("");
      setAttachments([]);
      
      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [selectedChat]: prev[selectedChat].map(msg => 
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          ),
        }));
      }, 1000);

      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [selectedChat]: prev[selectedChat].map(msg => 
            msg.id === newMessage.id ? { ...msg, status: "seen" } : msg
          ),
        }));
      }, 2000);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      url: URL.createObjectURL(file),
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-slate-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      case "seen":
        return <Eye className="w-3 h-3 text-emerald-400" />;
      default:
        return null;
    }
  };

  const filteredChats = chatThreads.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "unread" && chat.unreadCount > 0) ||
                         (filterType === "pinned" && chat.pinned);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-screen bg-[#20294a] flex">
      {/* Left Sidebar - Chat Threads */}
      <div className="w-80 bg-[#1a1f36] border-r border-slate-700 flex flex-col min-h-0">
        {/* Header and Filters - fixed at top */}
        <div className="shrink-0 sticky top-0 z-30 bg-[#1a1f36]">
          <div className="p-3 border-b border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white">Messages</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 text-white" />
              </motion.button>
            </div>
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#23263a] border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Filter Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filterType === "all" 
                    ? "bg-blue-600 text-white" 
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("unread")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filterType === "unread" 
                    ? "bg-blue-600 text-white" 
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilterType("pinned")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filterType === "pinned" 
                    ? "bg-blue-600 text-white" 
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Pinned
              </button>
            </div>
          </div>
        </div>
        {/* Chat Threads List - only this is scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <AnimatePresence>
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ backgroundColor: "#23263a" }}
                className={`p-4 cursor-pointer border-b border-slate-700/50 transition-colors ${
                  selectedChat === chat.id ? "bg-[#23263a] border-l-4 border-l-blue-500" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {chat.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#1a1f36] ${
                      chat.isOnline ? "bg-emerald-500" : "bg-slate-500"
                    }`} />
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm truncate">{chat.name}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${chat.roleColor} text-white`}>
                          {chat.roleIcon}
                          {chat.role}
                        </span>
                        {chat.pinned && <Pin className="w-3 h-3 text-amber-400" />}
                      </div>
                      <span className="text-xs text-slate-400">{chat.timestamp}</span>
                    </div>
                    
                    <p className="text-sm text-slate-300 truncate mb-1">{chat.lastMessage}</p>
                    <p className="text-xs text-slate-500">{chat.project}</p>
                  </div>

                  {/* Unread Badge */}
                  {chat.unreadCount > 0 && (
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-xs text-white font-medium">{chat.unreadCount}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Chat Header - fixed at top */}
        {selectedChatData && (
          <div className="p-3 border-b border-slate-700 bg-[#1a1f36] min-h-[56px] sticky top-0 z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {selectedChatData.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#1a1f36] ${
                    selectedChatData.isOnline ? "bg-emerald-500" : "bg-slate-500"
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{selectedChatData.name}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${selectedChatData.roleColor} text-white`}>
                      {selectedChatData.roleIcon}
                      {selectedChatData.role}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{selectedChatData.project}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-slate-400" />}
                </button>
                <button className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                  <Pin className="w-4 h-4 text-slate-400" />
                </button>
                <button className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Messages Area - only this is scrollable */}
        <div className="flex-1 overflow-y-auto px-2 py-2 bg-[#20294a] backdrop-blur-sm min-h-0">
          <div className="max-w-3xl mx-auto space-y-2">
            <AnimatePresence>
              {currentMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-md ${message.isOwn ? "order-2" : "order-1"}`}>
                    <div className={`px-3 py-2 rounded-2xl shadow-lg backdrop-blur-sm ${
                      message.isOwn 
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white" 
                        : "bg-[#1a1f36] border border-slate-600 text-slate-200"
                    }`}>
                      {/* Message Header */}
                      {!message.isOwn && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-sm">{message.sender}</span>
                          <span className="text-xs text-slate-400">{message.senderRole}</span>
                        </div>
                      )}
                      
                      {/* Message Text */}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      
                      {/* Attachments */}
                      {message.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50">
                              {attachment.type === "image" ? (
                                <Image className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <FileText className="w-4 h-4 text-blue-400" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{attachment.name}</p>
                                <p className="text-xs text-slate-400">{attachment.size}</p>
                              </div>
                              <button className="p-1 rounded hover:bg-slate-700 transition-colors">
                                <Download className="w-3 h-3 text-slate-400" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Message Footer */}
                      <div className={`flex items-center justify-between mt-2 ${
                        message.isOwn ? "text-blue-100" : "text-slate-400"
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.isOwn && (
                          <div className="flex items-center gap-1">
                            {getStatusIcon(message.status)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-3 rounded-2xl bg-[#1a1f36] border border-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                      <span className="text-sm text-slate-400">{selectedChatData?.name} is typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        {/* Message Input - fixed at bottom */}
        <div className="p-2 border-t border-slate-700 bg-[#1a1f36] sticky bottom-0 z-20">
          <form onSubmit={handleSend} className="flex items-end gap-2">
            {/* Attachment Preview */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50">
                    {attachment.type === "image" ? (
                      <Image className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-blue-400" />
                    )}
                    <span className="text-xs text-slate-300">{attachment.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="p-1 rounded hover:bg-slate-700 transition-colors"
                    >
                      <X className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex-1 flex items-end gap-1">
              {/* Attachment Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                <Paperclip className="w-4 h-4 text-slate-400" />
              </button>
              
              {/* Voice Message Button */}
              <button
                type="button"
                className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                <Mic className="w-4 h-4 text-slate-400" />
              </button>
              
              {/* Message Input */}
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-lg bg-[#23263a] border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                />
                
                {/* Emoji Button */}
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-slate-700 transition-colors"
                >
                  <Smile className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              
              {/* Send Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </form>
          
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
} 