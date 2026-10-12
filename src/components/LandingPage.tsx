import React, { useState } from 'react';
import { useRescue } from '../context/RescueContext';
import { DonationItem } from '../types';
import { HERO_IMAGE, BANQUET_IMAGE, VOLUNTEER_IMAGE, REUSABLE_IMAGE, TESTIMONIALS } from '../data/initialData';
import { getCategoryMeta } from '../utils/categoryIcons';
import { 
  HeartHandshake, 
  Leaf, 
  ArrowRight, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Package, 
  Truck, 
  Sparkles,
  BarChart2,
  Calendar,
  Eye,
  HandHeart,
  Droplets,
  Wind
} from 'lucide-react';

interface LandingPageProps {
  onSelectDonation: (donation: DonationItem) => void;
  onRequestPickup: (donation: DonationItem) => void;
  openCreateModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectDonation,
  onRequestPickup,
  openCreateModal,
  setActiveTab
}) => {
  const { donations, stats } = useRescue();
  const [activeCategoryPreview, setActiveCategoryPreview] = useState<string>('all');

  const previewDonations = donations
    .filter((d) => activeCategoryPreview === 'all' || d.category === activeCategoryPreview)
    .slice(0, 3);

  const steps = [
    {
      num: '01',
      title: 'Report Surplus',
      desc: 'Event hosts or caterers submit available leftover food, portions, and safety details immediately as the event wraps up.',
      icon: Package
    },
    {
      num: '02',
      title: 'Instant Match',
      desc: 'Verified local charities, homeless shelters, and food banks discover nearby donations matching their immediate capacity.',
      icon: Users
    },
    {
      num: '03',
      title: 'Collect & Dispatch',
      desc: 'Trained community volunteers or NGO vans pick up the donations using food-grade insulated carriers within safe time windows.',
      icon: Truck
    },
    {
      num: '04',
      title: 'Measured Impact',
      desc: 'Meals reach those who need them most. Carbon emissions prevented and community impact are recorded transparently.',
      icon: Leaf
    }
  ];

  return (
    <div className="space-y-24">
      
      {/* 1. HERO SECTION (Split-screen layout with 16:9 generated asset, strict 2-column balance) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Narrative & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Surplus Food & Resource Rescue Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.1] text-balance">
              Your Event Ends. <br />
              <span className="text-emerald-800">Your Impact Doesn't.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Rescue surplus food, redistribute reusable resources, and turn every wedding, festival, and corporate conference into an opportunity to feed those in need.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={openCreateModal}
                className="px-6 py-3.5 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Donate Leftovers</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>

              <button
                onClick={() => setActiveTab('browse')}
                className="px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors"
              >
                Find Available Donations
              </button>
            </div>

            {/* Micro Trust Indicators (Clearly Labeled Sample Demonstration Figures) */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Demonstration Network Metrics</span>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Sample Data
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    3,840+
                  </span>
                  <span className="text-xs text-slate-500">Meals Rescued</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    42+
                  </span>
                  <span className="text-xs text-slate-500">Donations Done</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    38
                  </span>
                  <span className="text-xs text-slate-500">Partner NGOs</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Hero Image Asset */}
          <div className="lg:col-span-5 relative">
            <div className="h-full min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative group bg-emerald-950">
              <img
                src={HERO_IMAGE}
                alt="Community volunteers packing fresh food donations into containers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Subtle Live Floating Rescue Card */}
              <div className="absolute bottom-5 inset-x-5 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/40 shadow-lg space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Active Rescue Underway
                  </span>
                  <span className="font-mono text-slate-500 text-[11px]">Downtown Hub</span>
                </div>
                <p className="text-xs text-slate-800 font-medium line-clamp-1">
                  140 banquet meals packed & transit-certified to Hope Shelter
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS (4 Illustrated/Visual Steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Streamlined Redistribution
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            How EventRescue Works
          </h2>
          <p className="text-sm text-slate-600">
            From event conclusion to warm shelter distribution in under 3 hours, preserving nutritional dignity and environmental value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                      <Icon className="w-6 h-6 text-emerald-700" />
                    </div>
                    <span className="text-2xl font-extrabold font-mono text-slate-200">
                      {st.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                  <span>Standardized protocol</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. BROWSE AVAILABLE DONATIONS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Live Redistribution Feed
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
              Surplus Ready for Claim
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Currently available food and reusable event resources seeking immediate collection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCategoryPreview('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategoryPreview === 'all' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategoryPreview('cooked_food')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategoryPreview === 'cooked_food' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Cooked Food
            </button>
            <button
              onClick={() => setActiveCategoryPreview('decorations')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategoryPreview === 'decorations' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Decorations
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 ml-2"
            >
              <span>View All ({donations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewDonations.map((item) => {
            const catMeta = getCategoryMeta(item.category);
            const CatIcon = catMeta.Icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />

                    {/* Category-specific icon badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-white/60">
                      <CatIcon className={`w-3.5 h-3.5 ${catMeta.textColor}`} />
                      <span>{catMeta.label}</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-emerald-800 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-xs capitalize">
                      {item.status}
                    </div>
                    <div className="absolute bottom-2.5 left-3 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded font-mono">
                      {item.quantity} {item.quantityUnit}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className={`flex items-center gap-1 font-semibold ${catMeta.textColor}`}>
                        <CatIcon className="w-3.5 h-3.5" />
                        <span>{catMeta.label}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{item.eventType.replace('_', ' ')}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-display line-clamp-1">
                      {item.title}
                    </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.venueName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Deadline: <strong className="text-slate-800">{item.pickupDeadline}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-2 border-t border-slate-100 flex items-center gap-2 bg-slate-50/50">
                <button
                  onClick={() => onSelectDonation(item)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50"
                >
                  View Details
                </button>
                {item.status === 'available' ? (
                  <button
                    onClick={() => onRequestPickup(item)}
                    className="flex-1 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-2xs"
                  >
                    Request Pickup
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium px-2 py-1 text-center flex-1">
                    Under Request
                  </span>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </section>

      {/* 4. IMPACT SECTION (Quantitative Rigor & Environmental Calculators) */}
      <section id="impact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-900 pb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Measurable Social & Ecological Returns
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display mt-1">
                Platform Impact Dashboard
              </h2>
              <p className="text-sm text-emerald-200/80 mt-1 max-w-xl">
                Every event rescue directly prevents municipal landfill methane emissions while providing wholesome meals to local community kitchens.
              </p>
            </div>

            <div className="px-3 py-1 bg-emerald-900/60 rounded-lg border border-emerald-800 text-[11px] text-emerald-300 font-mono">
              Academic Demonstration Dataset
            </div>
          </div>

          {/* 4 Large Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-emerald-900/40 rounded-2xl border border-emerald-800/80 space-y-1">
              <span className="text-xs font-semibold text-emerald-300 block">Meals Rescued</span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                {stats.totalMealsRescued.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-400/80 block">Portions distributed</span>
            </div>

            <div className="p-5 bg-emerald-900/40 rounded-2xl border border-emerald-800/80 space-y-1">
              <span className="text-xs font-semibold text-emerald-300 block">Food Waste Diverted</span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                {stats.totalKgWastePrevented.toLocaleString()} <span className="text-sm font-normal text-emerald-300">kg</span>
              </div>
              <span className="text-[11px] text-emerald-400/80 block">Kept out of landfills</span>
            </div>

            <div className="p-5 bg-emerald-900/40 rounded-2xl border border-emerald-800/80 space-y-1">
              <span className="text-xs font-semibold text-emerald-300 block">Estimated CO₂e Avoided</span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-300 tabular-nums">
                {stats.co2SavedKg.toLocaleString()} <span className="text-sm font-normal text-amber-200">kg</span>
              </div>
              <span className="text-[11px] text-emerald-400/80 block">Greenhouse gas offset</span>
            </div>

            <div className="p-5 bg-emerald-900/40 rounded-2xl border border-emerald-800/80 space-y-1">
              <span className="text-xs font-semibold text-emerald-300 block">Active NGO Partners</span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                {stats.activePartners}
              </div>
              <span className="text-[11px] text-emerald-400/80 block">Shelters, pantries & fridges</span>
            </div>
          </div>

          {/* Environmental Equivalency Indicators */}
          <div className="p-6 bg-emerald-900/30 rounded-2xl border border-emerald-800/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Real-World Ecological Equivalency
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-emerald-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center shrink-0">
                  <Wind className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <strong className="block text-white text-sm">~19,400 km Driven</strong>
                  Equivalent passenger vehicle emissions avoided by diverting organic matter from anaerobic landfill decomposition.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4 text-sky-300" />
                </div>
                <div>
                  <strong className="block text-white text-sm">~307,000 Liters Water</strong>
                  Agricultural embedded water conserved by ensuring produced food reaches consumption.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <strong className="block text-white text-sm">100% Free Redistribution</strong>
                  Zero charges to charity beneficiaries under Good Samaritan safe food donation laws.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. COMMUNITY TESTIMONIALS (Attributable, Clearly Labeled Sample Content) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Community Voices
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            Stories from the Field
          </h2>
          <p className="text-xs text-slate-500">
            Illustrative sample testimonials from partner event venues, community kitchens, and volunteer fleet drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block">
                  {t.highlight}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <strong className="block text-slate-900 text-sm font-display">{t.author}</strong>
                <span className="block text-xs text-slate-500">{t.role}</span>
                <span className="block text-xs text-emerald-700 font-medium">{t.organization}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Hosting an Upcoming Event?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Don't let extraordinary catering go to waste. Sign up your venue or register your non-profit in under 2 minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={openCreateModal}
                className="px-6 py-3.5 text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Report Surplus Food Now</span>
                <ArrowRight className="w-4 h-4 text-emerald-950" />
              </button>
              <button
                onClick={() => setActiveTab('project-overview')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-700 rounded-xl transition-colors"
              >
                View Project Management Charter
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
