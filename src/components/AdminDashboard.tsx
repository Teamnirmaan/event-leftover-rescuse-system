import React, { useState } from 'react';
import { useRescue } from '../context/RescueContext';
import { DonationItem } from '../types';
import { 
  ShieldCheck, 
  Users, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  Truck, 
  Leaf, 
  RotateCcw,
  Download,
  Filter
} from 'lucide-react';

interface AdminDashboardProps {
  onSelectDonation: (donation: DonationItem) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectDonation }) => {
  const { donations, stats, resetDemoData, showToast } = useRescue();
  const [partnerFilter, setPartnerFilter] = useState('all');

  // Breakdown calculations
  const total = donations.length;
  const availableCount = donations.filter((d) => d.status === 'available').length;
  const requestedCount = donations.filter((d) => d.status === 'requested').length;
  const acceptedCount = donations.filter((d) => d.status === 'accepted').length;
  const collectedCount = donations.filter((d) => d.status === 'collected').length;
  const deliveredCount = donations.filter((d) => d.status === 'delivered').length;

  // Categories breakdown
  const foodCount = donations.filter((d) => d.category === 'cooked_food' || d.category === 'packaged_food').length;
  const bevCount = donations.filter((d) => d.category === 'beverages').length;
  const decorCount = donations.filter((d) => d.category === 'decorations').length;
  const statCount = donations.filter((d) => d.category === 'stationery' || d.category === 'reusable_materials').length;

  const completionRate = total > 0 ? Math.round(((deliveredCount + collectedCount) / total) * 100) : 85;

  const safetyReports = [
    {
      id: 'REP-104',
      venue: 'Crystal Palace Hall',
      category: 'Temperature Verification Warning',
      date: '2 hours ago',
      status: 'Resolved',
      actionTaken: 'Inspected hot chafing logs. Temperature verified >65°C before dispatch.'
    },
    {
      id: 'REP-103',
      venue: 'North Bay Convention Hall',
      category: 'Portion Overestimate',
      date: 'Yesterday',
      status: 'Resolved',
      actionTaken: 'Volunteer vehicle accommodated 80 of 120 portions; secondary courier rerouted for balance.'
    }
  ];

  const pendingVerifications = [
    { name: 'St. Jude Community Outreach', type: 'NGO Charity', regNumber: '501(c)(3) #849-2041', city: 'Metro City' },
    { name: 'Grand Horizon Ballrooms', type: 'Banquet Venue', regNumber: 'HACCP Cert #FC-9204', city: 'Metro City' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Operational Command & Integrity Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            EventRescue System Administration
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Audit surplus redistribution pipelines, verify non-profit credentials, enforce food-safety compliance, and monitor network throughput.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              showToast('Exporting audit log CSV manifest...', 'info');
            }}
            className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit CSV</span>
          </button>

          <button
            onClick={resetDemoData}
            className="px-3.5 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 rounded-lg border border-amber-800/80 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>

      {/* KPI System Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Registered Partners</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
            48
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">24 Venues · 16 NGOs · 8 Fleets</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Listed Rescues</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
            {total}
          </div>
          <p className="text-[11px] text-emerald-700 mt-0.5">{deliveredCount} successfully completed</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Pickup Completion Rate</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono tabular-nums mt-1">
            {completionRate}%
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">&lt;45 min average response</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Safety Audit Score</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-900 font-mono tabular-nums mt-1">
            100%
          </div>
          <p className="text-[11px] text-purple-700 mt-0.5">Zero spoilage incidents reported</p>
        </div>
      </div>

      {/* Visual Workflow Distribution & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Status Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Pipeline Status Distribution
            </h3>
            <span className="text-xs text-slate-400 font-mono">{total} active instances</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Available for Claim</span>
                <span className="font-mono font-semibold">{availableCount}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all"
                  style={{ width: `${total ? (availableCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Requested by NGO (Pending Confirmation)</span>
                <span className="font-mono font-semibold">{requestedCount}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{ width: `${total ? (requestedCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Accepted & Courier Assigned</span>
                <span className="font-mono font-semibold">{acceptedCount}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all"
                  style={{ width: `${total ? (acceptedCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>In Transit (Picked Up)</span>
                <span className="font-mono font-semibold">{collectedCount}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${total ? (collectedCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Safely Delivered & Logged</span>
                <span className="font-mono font-semibold">{deliveredCount}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-800 rounded-full transition-all"
                  style={{ width: `${total ? (deliveredCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Resource Classification Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-mono">Real-time mix</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
              <span className="text-slate-500 block">Cooked & Packaged Food</span>
              <span className="text-xl font-bold font-mono text-emerald-900 mt-1 block">{foodCount}</span>
              <span className="text-[10px] text-emerald-700 mt-0.5">Primary hunger relief</span>
            </div>

            <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl">
              <span className="text-slate-500 block">Beverages & Hydration</span>
              <span className="text-xl font-bold font-mono text-sky-900 mt-1 block">{bevCount}</span>
              <span className="text-[10px] text-sky-700 mt-0.5">Sealed juices & waters</span>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl">
              <span className="text-slate-500 block">Reusable Decorations</span>
              <span className="text-xl font-bold font-mono text-amber-900 mt-1 block">{decorCount}</span>
              <span className="text-[10px] text-amber-700 mt-0.5">Linens, arches, lights</span>
            </div>

            <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-xl">
              <span className="text-slate-500 block">Stationery & Staging</span>
              <span className="text-xl font-bold font-mono text-purple-900 mt-1 block">{statCount}</span>
              <span className="text-[10px] text-purple-700 mt-0.5">Paper, pens, kits</span>
            </div>
          </div>
        </div>

      </div>

      {/* Safety Logs and Pending Verifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Food Safety & Anomaly Log */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Food Safety & Incident Resolution Logs
            </h3>
          </div>

          <div className="space-y-2.5">
            {safetyReports.map((r) => (
              <div key={r.id} className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{r.category}</span>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    {r.status}
                  </span>
                </div>
                <p className="text-slate-600">Venue: <strong>{r.venue}</strong> · {r.date}</p>
                <p className="text-slate-500 text-[11px] italic bg-white p-1.5 rounded border border-slate-200/60">
                  Resolution: {r.actionTaken}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Accreditation Verifications */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-700" />
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Accreditation Queue (2 Pending)
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">KYC & Charity Registry</span>
          </div>

          <div className="space-y-2.5">
            {pendingVerifications.map((p, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg text-xs flex items-center justify-between border border-slate-100">
                <div>
                  <span className="font-bold text-slate-900 block">{p.name}</span>
                  <span className="text-slate-500 text-[11px]">{p.type} · {p.regNumber}</span>
                </div>
                <button
                  onClick={() => showToast(`Accreditation confirmed for ${p.name}`, 'success')}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  Verify Partner
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
