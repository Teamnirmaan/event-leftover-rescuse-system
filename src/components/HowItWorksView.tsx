import React, { useState } from 'react';
import { 
  Package, 
  Users, 
  Truck, 
  Leaf, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  Thermometer, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

interface HowItWorksViewProps {
  openCreateModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ openCreateModal, setActiveTab }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are food donors legally protected against liability?',
      a: 'Yes. Under the Bill Emerson Good Samaritan Food Donation Act (and corresponding regional Good Samaritan statutes), event organizers, hotels, restaurants, and catering companies who donate wholesome surplus food in good faith to non-profit organizations are shielded from criminal and civil liability, provided there is no gross negligence.'
    },
    {
      q: 'What types of food can and cannot be listed?',
      a: 'We accept unserved buffet trays maintained at safe temperatures (>60°C hot or <4°C chilled), packaged boxed meals, factory-sealed beverages, bakery items, and unopened dry goods. We STRICTLY PROHIBIT partially eaten table scraps, unpackaged food left at room temperature for over 4 hours, and items showing any signs of spoilage.'
    },
    {
      q: 'Can non-food event items also be donated?',
      a: 'Absolutely! EventRescue actively rescues non-perishable event materials including reusable wedding arch pieces, table runners and linens, floral staging structures, clean conference stationery, notebooks, pens, and promotional lanterns for schools, community theaters, and youth centers.'
    },
    {
      q: 'How does an NGO get accredited on EventRescue?',
      a: 'Charities, shelters, and soup kitchens submit their registered 501(c)(3) / non-profit registration certificate, proof of physical distribution kitchen/shelter, and a signed food handling commitment. Our platform admins verify credentials before grant pickup request privileges.'
    },
    {
      q: 'How fast do pickups usually happen after an event ends?',
      a: 'Because banquet surplus is perishable, our network operates within rapid time windows. Most pickups are claimed by an NGO within 30–45 minutes of listing and collected by volunteer couriers or NGO vans within 90 minutes.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Operational Standard Operating Procedures</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          How EventRescue Turns Leftovers into Hope
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          A closed-loop protocol designed with food safety experts, logistics planners, and community organizers to eliminate waste while feeding people in need.
        </p>
      </div>

      {/* Deep-Dive 4 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Step 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-lg font-mono">
            01
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display">1. Report Surplus</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            As your wedding, banquet, or conference concludes, the catering team catalogs untouched portions, allergens, and certifies safe temperature holding.
          </p>
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <span className="block font-semibold text-slate-800">Requirements:</span>
            <span>· Hot-holding &gt;60°C or chill &lt;4°C</span>
            <span className="block">· Visual photo of containers</span>
            <span className="block">· Safe pickup window (e.g. 10:30 PM)</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-lg font-mono">
            02
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display">2. Instant Match</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nearby registered food banks, homeless shelters, and community pantries receive instant SMS and push notifications tailored to their capacity.
          </p>
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <span className="block font-semibold text-slate-800">Requirements:</span>
            <span>· Verified 501(c)(3) / NGO status</span>
            <span className="block">· Estimated beneficiaries served</span>
            <span className="block">· Guaranteed free distribution</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold text-lg font-mono">
            03
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display">3. Collect & Transport</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Accredited couriers or volunteer drivers arrive at the venue's designated service entrance with food-grade thermal containers to collect the batch.
          </p>
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <span className="block font-semibold text-slate-800">Requirements:</span>
            <span>· Insulated transport carriers</span>
            <span className="block">· Rapid direct-to-destination transit</span>
            <span className="block">· Real-time tracking status in app</span>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold text-lg font-mono">
            04
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display">4. Feed & Record Impact</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Meals are served hot or prepped into pantry packages. Handover confirmation updates our public ledger with meals served and CO₂ emissions saved.
          </p>
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <span className="block font-semibold text-slate-800">Requirements:</span>
            <span>· Shelter coordinator sign-off</span>
            <span className="block">· Temperature check on receipt</span>
            <span className="block">· Transparent impact certificate</span>
          </div>
        </div>

      </div>

      {/* Food Safety & Legal Framework */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Quality Assurance & Legal Protections
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display mt-1">
            The EventRescue Food Safety Standard
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-2xl">
            Redistributing surplus food requires uncompromising hygiene protocols to protect dignity, health, and partner organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-200">
          <div className="p-5 bg-emerald-900/40 rounded-xl border border-emerald-800/80 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              <span>The 2-Hour / 4-Hour Rule</span>
            </div>
            <p className="text-emerald-100/80 leading-relaxed">
              Cooked food held between 4°C and 60°C must be consumed or safely chilled within 4 hours maximum. EventRescue enforces strict 3-hour listing and pickup deadlines.
            </p>
          </div>

          <div className="p-5 bg-emerald-900/40 rounded-xl border border-emerald-800/80 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Good Samaritan Act</span>
            </div>
            <p className="text-emerald-100/80 leading-relaxed">
              Protects food donors and non-profit organizations from civil and criminal liability when donating wholesome food in good faith. Donors cannot be sued for unintentional harm.
            </p>
          </div>

          <div className="p-5 bg-emerald-900/40 rounded-xl border border-emerald-800/80 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Pre-Screened Recipients</span>
            </div>
            <p className="text-emerald-100/80 leading-relaxed">
              Only verified NGOs, community kitchens with commercial refrigeration, and accredited food banks can reserve food donations on the platform.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">
            Common questions from event managers, banquet caterers, and volunteer couriers.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm hover:text-emerald-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-800 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-100 rounded-2xl p-8 text-center space-y-4 max-w-2xl mx-auto border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 font-display">Ready to make your next event zero-waste?</h3>
        <p className="text-xs text-slate-600">
          Whether you're planning a 500-person wedding reception or an international university conference, our network is ready to assist.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-xs"
          >
            Create Surplus Listing
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
          >
            Browse Live Listings
          </button>
        </div>
      </div>

    </div>
  );
};
