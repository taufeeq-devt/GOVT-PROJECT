import React, { useState } from "react";
import { Home, Box, ClipboardList, Truck, CreditCard, History, MessageCircle } from "lucide-react";

const navSections = [
  {
    heading: "Operations",
    items: [
      { label: "Overview", icon: Home },
      { label: "Product Catalog", icon: Box },
      { label: "Incoming Orders", icon: ClipboardList },
      { label: "Delivery Management", icon: Truck },
      { label: "Payment & Fund Tracker", icon: CreditCard },
      { label: "Delivery History", icon: History },
    ],
  },
  {
    heading: "Communication",
    items: [
      { label: "Messaging", icon: MessageCircle },
    ],
  },
];

export default function Sidebar({ active, onSelect, collapsed = false }) {
  const [hovered, setHovered] = useState(null);
  return (
    <aside className={`flex flex-col h-screen ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-[#16204d] to-[#15192c] border-r border-slate-800 shadow-md dark:bg-govt-dark transition-all duration-200 rounded-r-2xl flex-shrink-0`}> 
      <div className={`flex items-center gap-2 px-6 py-6 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-700 rounded-lg flex items-center justify-center">
          <span className="font-bold text-lg text-white">S</span>
        </div>
        {!collapsed && <span className="text-xl font-bold text-white tracking-wide">SecurePortal</span>}
      </div>
      <nav className="flex-1 px-2 space-y-4">
        {navSections.map((section, sIdx) => (
          <div key={section.heading}>
            {!collapsed && <div className="text-xs text-gray-500 font-bold px-2 mb-2 mt-4 uppercase tracking-widest">{section.heading}</div>}
            <div className="space-y-1">
              {section.items.map((item, idx) => {
                const globalIdx = navSections.slice(0, sIdx).reduce((a, s) => a + s.items.length, 0) + idx;
                const isActive = active === globalIdx;
                return (
                  <div key={item.label} className="relative group">
                    <button
                      className={`group flex items-center w-full px-4 py-3 rounded-lg font-semibold text-gray-300 hover:bg-[#1A2536] transition ${isActive ? 'border-l-4 border-emerald-500 bg-[#1A2536] text-white shadow' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
                      onClick={() => onSelect(globalIdx)}
                      onMouseEnter={() => setHovered(globalIdx)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-300'} group-hover:text-white transition-colors flex-shrink-0`} strokeWidth={1.5} />
                      {!collapsed && <span className="font-sans whitespace-normal break-words block text-left w-full leading-snug">{item.label}</span>}
                    </button>
                    {collapsed && hovered === globalIdx && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded bg-[#23294a] text-white text-xs shadow-lg z-50 whitespace-nowrap">
                        {item.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
} 