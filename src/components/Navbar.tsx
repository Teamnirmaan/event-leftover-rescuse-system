import React, { useState } from 'react';
import { useRescue } from '../context/RescueContext';
import { UserRole } from '../types';
import { DEMO_USERS } from '../data/initialData';
import { 
  HeartHandshake, 
  Leaf, 
  Menu, 
  X, 
  PlusCircle, 
  UserCheck, 
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Building2,
  Truck,
  RotateCcw
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openCreateModal }) => {
  const { currentUser, setCurrentRole, resetDemoData } = useRescue();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'browse', label: 'Browse Donations' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'impact', label: 'Impact Dashboard' },
    { id: 'project-overview', label: 'Project Overview' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setRoleDropdownOpen(false);
    if (role === 'organizer') setActiveTab('organizer-dashboard');
    else if (role === 'ngo') setActiveTab('ngo-dashboard');
    else if (role === 'volunteer') setActiveTab('volunteer-dashboard');
    else if (role === 'admin') setActiveTab('admin-dashboard');
    else setActiveTab('home');
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'organizer': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'ngo': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'volunteer': return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'admin': return 'bg-purple-100 text-purple-900 border-purple-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <>
      {/* Demo Persona Switcher Banner */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-300">Demo Mode:</span>
            <span>Current Persona:</span>
            <span className="font-semibold text-white capitalize">{currentUser.role}</span>
            <span className="text-emerald-400/80 hidden sm:inline">({currentUser.name})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-emerald-300 hidden md:inline">Quick switch:</span>
            <div className="flex items-center gap-1 bg-emerald-900/80 p-0.5 rounded-md border border-emerald-800">
              <button
                onClick={() => handleRoleSelect('guest')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${currentUser.role === 'guest' ? 'bg-emerald-700 text-white font-medium' : 'text-emerald-300 hover:text-white'}`}
              >
                Visitor
              </button>
              <button
                onClick={() => handleRoleSelect('organizer')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${currentUser.role === 'organizer' ? 'bg-amber-600 text-white font-medium' : 'text-emerald-300 hover:text-white'}`}
              >
                Organizer
              </button>
              <button
                onClick={() => handleRoleSelect('ngo')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${currentUser.role === 'ngo' ? 'bg-emerald-600 text-white font-medium' : 'text-emerald-300 hover:text-white'}`}
              >
                NGO
              </button>
              <button
                onClick={() => handleRoleSelect('volunteer')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${currentUser.role === 'volunteer' ? 'bg-sky-600 text-white font-medium' : 'text-emerald-300 hover:text-white'}`}
              >
                Volunteer
              </button>
              <button
                onClick={() => handleRoleSelect('admin')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${currentUser.role === 'admin' ? 'bg-purple-600 text-white font-medium' : 'text-emerald-300 hover:text-white'}`}
              >
                Admin
              </button>
            </div>

            <button
              onClick={resetDemoData}
              title="Reset sample demonstration data"
              className="flex items-center gap-1 px-2 py-0.5 text-[11px] text-emerald-300 hover:text-white hover:bg-emerald-800 rounded transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation (Adheres strictly to Top Bar Contract: 3 Zones separated by gap-8) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            
            {/* Zone 1: Single text element wordmark with icon */}
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-700 transition-colors">
                <div className="relative">
                  <Leaf className="w-5 h-5 text-emerald-300 transform -rotate-12" />
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-300 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-emerald-950 font-display">
                  EventRescue
                </span>
                <span className="block text-[11px] font-medium text-emerald-700 tracking-normal -mt-1">
                  Turning Leftovers into Hope
                </span>
              </div>
            </button>

            {/* Zone 2: 4–5 single-line clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    activeTab === link.id
                      ? 'text-emerald-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700'
                      : 'hover:text-emerald-900 text-slate-700'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Quick portal link based on active role */}
              {currentUser.role !== 'guest' && (
                <button
                  onClick={() => {
                    if (currentUser.role === 'organizer') setActiveTab('organizer-dashboard');
                    else if (currentUser.role === 'ngo') setActiveTab('ngo-dashboard');
                    else if (currentUser.role === 'volunteer') setActiveTab('volunteer-dashboard');
                    else if (currentUser.role === 'admin') setActiveTab('admin-dashboard');
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md border whitespace-nowrap transition-colors ${
                    activeTab.includes('dashboard')
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  My Portal
                </button>
              )}
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
              >
                <PlusCircle className="w-4 h-4 text-emerald-200" />
                <span>Donate Leftovers</span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-emerald-900 rounded-md focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === link.id
                      ? 'bg-emerald-50 text-emerald-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3">Role Dashboards</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => {
                      handleRoleSelect('organizer');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 text-xs rounded-md bg-amber-50 text-amber-900 font-medium"
                  >
                    Organizer Portal
                  </button>
                  <button
                    onClick={() => {
                      handleRoleSelect('ngo');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 text-xs rounded-md bg-emerald-50 text-emerald-900 font-medium"
                  >
                    NGO / Shelter Portal
                  </button>
                  <button
                    onClick={() => {
                      handleRoleSelect('volunteer');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 text-xs rounded-md bg-sky-50 text-sky-900 font-medium"
                  >
                    Volunteer Fleet
                  </button>
                  <button
                    onClick={() => {
                      handleRoleSelect('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 text-xs rounded-md bg-purple-50 text-purple-900 font-medium"
                  >
                    Admin Console
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
