import React from 'react';
import { Leaf, HeartHandshake, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openCreateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openCreateModal }) => {
  return (
    <footer className="bg-emerald-950 text-slate-300 border-t border-emerald-900 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center text-white">
                <Leaf className="w-5 h-5 text-emerald-300 transform -rotate-12" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                EventRescue
              </span>
            </div>
            
            <p className="text-sm text-emerald-100/70 leading-relaxed max-w-sm">
              Turning event leftovers into hope. Connecting weddings, festivals, and conferences with local food banks, shelters, and community kitchens in real time.
            </p>

            <div className="p-3 bg-emerald-900/40 rounded-lg border border-emerald-800/60 text-xs text-emerald-200/90 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-white">Food Safety Commitment</span>
                All cooked food donations follow strict 3-hour temperature holding protocols. Unsafe or spoiled food is strictly barred from redistribution.
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('browse')} className="hover:text-white transition-colors">
                  Browse Available Donations
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('impact')} className="hover:text-white transition-colors">
                  Impact Dashboard
                </button>
              </li>
              <li>
                <button onClick={openCreateModal} className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Donate Leftovers →
                </button>
              </li>
            </ul>
          </div>

          {/* Academic & Project Management */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">Project Management</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('project-overview')} className="hover:text-white transition-colors">
                  Project Charter & Objectives
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('project-overview')} className="hover:text-white transition-colors">
                  Stakeholders & Roles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('project-overview')} className="hover:text-white transition-colors">
                  Risk Management Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('project-overview')} className="hover:text-white transition-colors">
                  Workflow Pipeline Diagram
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin-dashboard')} className="hover:text-white transition-colors">
                  Operations Console
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">Support & Contact</h4>
            <div className="space-y-2.5 text-sm text-emerald-100/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>rescue@eventrescue.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+1 (800) 555-FOOD</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Community Action Center, Metro City</span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-emerald-900/60">
              <span className="text-xs text-amber-300/80 block">Demonstration Prototype</span>
              <span className="text-[11px] text-emerald-300/60 block mt-0.5">College Project Management Capstone</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <p className="text-center sm:text-left">
            &copy; 2026 EventRescue Initiative. Celebrate responsibly. Waste less. Share more.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Safe Redistribution</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Good Samaritan Protection Act</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
