import React, { useState } from 'react';
import { useRescue } from '../context/RescueContext';
import { 
  BarChart3, 
  Leaf, 
  Wind, 
  Droplets, 
  Users, 
  Building2, 
  Sparkles, 
  Calculator, 
  Calendar,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';

export const ImpactDashboardView: React.FC = () => {
  const { stats, donations } = useRescue();

  // Interactive Impact Calculator state
  const [calcEventType, setCalcEventType] = useState('wedding');
  const [guestCount, setGuestCount] = useState<number>(250);

  // Estimator logic based on catering surplus industry benchmarks (approx. 15-20% surplus buffer)
  const estimatedSurplusMeals = Math.round(guestCount * 0.18);
  const estimatedWastePreventedKg = Math.round(estimatedSurplusMeals * 0.45);
  const estimatedCo2Saved = Math.round(estimatedSurplusMeals * 2.2);
  const estimatedWaterSaved = Math.round(estimatedSurplusMeals * 80);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Environmental & Social Accounting
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Impact Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Real-time tracking of food diverted from municipal landfills, emissions mitigated, and hot meals delivered into local communities.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-100 p-2 rounded-lg font-mono">
          Demonstration dataset · Live calculator active
        </div>
      </div>

      {/* High-level KPI Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Meals Delivered</span>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-900 tabular-nums">
            {stats.totalMealsRescued.toLocaleString()}
          </div>
          <span className="text-xs text-emerald-700 block">Wholesome food portions</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Food Waste Diverted</span>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tabular-nums">
            {stats.totalKgWastePrevented.toLocaleString()} <span className="text-sm font-normal text-slate-500">kg</span>
          </div>
          <span className="text-xs text-slate-500 block">Prevented landfill dumping</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">CO₂e Emissions Prevented</span>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-800 tabular-nums">
            {stats.co2SavedKg.toLocaleString()} <span className="text-sm font-normal text-amber-600">kg</span>
          </div>
          <span className="text-xs text-amber-700 block">Avoided methane gas equivalent</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Water Conserved</span>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-sky-800 tabular-nums">
            {(stats.totalMealsRescued * 80).toLocaleString()} <span className="text-sm font-normal text-sky-600">L</span>
          </div>
          <span className="text-xs text-sky-700 block">Embedded agricultural water</span>
        </div>
      </div>

      {/* Interactive Surplus Calculator */}
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-900 shadow-lg space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Interactive Event Planning Tool</span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Estimate Your Upcoming Event's Rescue Potential
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-2xl">
            Input your expected event type and catering guest headcount to calculate potential surplus meals and ecological footprint mitigation.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-xs font-semibold text-emerald-200 mb-2">
              Select Celebration / Event Type
            </label>
            <select
              value={calcEventType}
              onChange={(e) => setCalcEventType(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-emerald-700 bg-emerald-950/80 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="wedding">Wedding Reception (Multi-course buffet)</option>
              <option value="conference">Corporate Conference / Summit</option>
              <option value="college_fest">College Festival / Campus Gathering</option>
              <option value="gala">Charity Gala / Annual Dinner</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-emerald-200 mb-2">
              <label className="font-semibold">Expected Guest Headcount</label>
              <span className="font-mono font-bold text-white text-sm tabular-nums">{guestCount} Guests</span>
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="25"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full h-2 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[11px] text-emerald-300/60 mt-1">
              <span>50 Guests</span>
              <span>750 Guests</span>
              <span>1,500 Guests</span>
            </div>
          </div>
        </div>

        {/* Real-time Calculated Outputs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-emerald-800/80">
          <div className="p-4 bg-emerald-900/60 rounded-xl border border-emerald-800">
            <span className="text-[11px] text-emerald-300 block">Surplus Meals Rescuable</span>
            <span className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
              ~{estimatedSurplusMeals} portions
            </span>
            <span className="text-[10px] text-emerald-400/80 block mt-0.5">Feeds 1–2 small shelters</span>
          </div>

          <div className="p-4 bg-emerald-900/60 rounded-xl border border-emerald-800">
            <span className="text-[11px] text-emerald-300 block">Landfill Waste Prevented</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              ~{estimatedWastePreventedKg} kg
            </span>
            <span className="text-[10px] text-emerald-400/80 block mt-0.5">Zero organic dumping</span>
          </div>

          <div className="p-4 bg-emerald-900/60 rounded-xl border border-emerald-800">
            <span className="text-[11px] text-emerald-300 block">GHG Emissions Prevented</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              ~{estimatedCo2Saved} kg CO₂e
            </span>
            <span className="text-[10px] text-emerald-400/80 block mt-0.5">Offset passenger driving</span>
          </div>

          <div className="p-4 bg-emerald-900/60 rounded-xl border border-emerald-800">
            <span className="text-[11px] text-emerald-300 block">Water Footprint Conserved</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              ~{estimatedWaterSaved.toLocaleString()} L
            </span>
            <span className="text-[10px] text-emerald-400/80 block mt-0.5">Agricultural resources saved</span>
          </div>
        </div>

      </div>

      {/* Sustainable Development Goals Alignment */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            UN Sustainable Development Goals (SDGs)
          </span>
          <h3 className="text-xl font-bold text-slate-900 font-display mt-1">
            Global Agenda Alignment
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            EventRescue directly advances 3 primary United Nations targets through targeted municipal resource recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
          <div className="p-5 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-600 text-white font-bold flex items-center justify-center font-mono">
                2
              </span>
              <strong className="text-slate-900 text-sm">Zero Hunger (SDG 2.1)</strong>
            </div>
            <p className="leading-relaxed">
              Diverting safe, edible gourmet food directly into neighborhood soup kitchens, family emergency shelters, and local community pantries.
            </p>
          </div>

          <div className="p-5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-700 text-white font-bold flex items-center justify-center font-mono">
                12
              </span>
              <strong className="text-slate-900 text-sm">Responsible Consumption (SDG 12.3)</strong>
            </div>
            <p className="leading-relaxed">
              Halving per-capita event and catering food waste by connecting banquet producers with certified distribution networks in real time.
            </p>
          </div>

          <div className="p-5 bg-sky-50/60 rounded-xl border border-sky-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-sky-600 text-white font-bold flex items-center justify-center font-mono">
                13
              </span>
              <strong className="text-slate-900 text-sm">Climate Action (SDG 13.2)</strong>
            </div>
            <p className="leading-relaxed">
              Preventing organic decomposition in landfills that produce methane (a greenhouse gas with 28x the warming potential of carbon dioxide).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
