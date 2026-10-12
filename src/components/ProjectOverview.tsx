import React from 'react';
import { PROJECT_RISKS } from '../data/initialData';
import { 
  Briefcase, 
  Target, 
  Users2, 
  CheckSquare, 
  GitBranch, 
  ShieldAlert, 
  BarChart3, 
  Rocket, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Lock,
  ThermometerSnowflake,
  Clock
} from 'lucide-react';

export const ProjectOverview: React.FC = () => {
  const objectives = [
    {
      title: 'Divert 85%+ Safe Leftovers',
      desc: 'Ensure safe banquet and event food is rescued within a strict 3-hour post-event cutoff window rather than landfill disposal.'
    },
    {
      title: 'Sub-45 Minute Dispatch Matching',
      desc: 'Connect event venues with accredited shelters or volunteers via automated notification routing.'
    },
    {
      title: 'Zero Food-Safety Compromises',
      desc: 'Enforce mandatory hot-holding (>60°C) / cold-storage (<4°C) compliance declarations and tamper-proof checklists before listing.'
    },
    {
      title: 'Transparent Multi-Stakeholder Chain',
      desc: 'Provide complete operational accountability across Organizers, NGOs, Volunteer Couriers, and Municipal Regulators.'
    }
  ];

  const stakeholders = [
    {
      role: 'Event Organizers & Banquet Venues',
      interest: 'High',
      influence: 'High',
      responsibility: 'Identify surplus quantities, maintain safe hot/cold holding, submit timely listings, release items at service gates.'
    },
    {
      role: 'Non-Profits & Community Kitchens',
      interest: 'High',
      influence: 'High',
      responsibility: 'Claim matching donations, verify beneficiary need, maintain insulated food-grade containers, distribute meals promptly.'
    },
    {
      role: 'Volunteer Courier Fleet',
      interest: 'Medium',
      influence: 'Medium',
      responsibility: 'Execute pickup runs, verify container seals and visual condition, update collection & delivery statuses in real time.'
    },
    {
      role: 'Platform Operations & Health Regulators',
      interest: 'High',
      influence: 'Medium',
      responsibility: 'Audit partner credentials (501c3, food hygiene certificates), monitor incidents, verify compliance with Good Samaritan laws.'
    }
  ];

  const milestones = [
    { phase: 'Phase 1: Research & Stakeholder Discovery', timeline: 'Weeks 1–3', status: 'Completed', detail: 'Surveyed 15 local banquet halls, 8 shelters; identified 4-hour perishable food cliff as core operational bottleneck.' },
    { phase: 'Phase 2: Architecture & Workflow Modeling', timeline: 'Weeks 4–6', status: 'Completed', detail: 'Defined 5-stage lifecycle state machine (Available → Requested → Accepted → Collected → Delivered).' },
    { phase: 'Phase 3: Prototype & Safety Guardrails', timeline: 'Weeks 7–9', status: 'Completed', detail: 'Built responsive web applet, role-based dashboards, mandatory hygiene checklist, and offline demo persistence.' },
    { phase: 'Phase 4: Field Simulation & User Testing', timeline: 'Weeks 10–12', status: 'In Progress', detail: 'Simulating late-night wedding and tech conference scenarios with mock courier dispatch and audit logs.' },
    { phase: 'Phase 5: Evaluation & Academic Defense', timeline: 'Final Term', status: 'Upcoming', detail: 'Project management performance review, risk mitigation audit, and presentation defense.' }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Report Surplus',
      actor: 'Event Organizer',
      action: 'Enters event leftovers, portions, allergens, and certifies food temperature integrity (>60°C). Listing goes live.',
      bg: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    {
      step: '02',
      title: 'Review & Request',
      actor: 'Accredited NGO',
      action: 'Discovers nearby donation, submits beneficiary count and transport plan. Status switches to "Requested".',
      bg: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      step: '03',
      title: 'Accept & Unlock Gate',
      actor: 'Organizer',
      action: 'Approves reservation request. Precise service entrance address and phone contact are instantly unlocked.',
      bg: 'bg-sky-50 text-sky-900 border-sky-200'
    },
    {
      step: '04',
      title: 'Dispatch & Collect',
      actor: 'Volunteer Courier',
      action: 'Accepts route mission, picks up packed crates with thermal insulated gear, and marks "Collected / In Transit".',
      bg: 'bg-indigo-50 text-indigo-900 border-indigo-200'
    },
    {
      step: '05',
      title: 'Deliver & Record Impact',
      actor: 'Recipient Shelter',
      action: 'Handover complete. Verified receipt logged; meals rescued, CO2 avoided, and water saved are credited to metrics.',
      bg: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    }
  ];

  const roadmapItems = [
    {
      title: 'IoT Bluetooth Temperature Probes',
      desc: 'Integrate cheap BLE sensor probes inside delivery thermal bags to log real-time temp compliance during transit.'
    },
    {
      title: 'Automated Tax Deduction Certificates',
      desc: 'Auto-generate IRS / CSR compliant food donation tax deduction receipts for banquet venues and corporate sponsors.'
    },
    {
      title: 'Predictive Surplus AI Estimator',
      desc: 'Analyze past wedding guest counts and catering menus to predict surplus 24 hours prior to event conclusion.'
    },
    {
      title: 'Multi-Stop Batch Route Optimization',
      desc: 'Allow single courier vehicles to bundle nearby micro-leftovers from adjacent wedding halls onto one run.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Title & Project Management Capstone Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Project Management Capstone Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          EventRescue: Project Architecture & Management Charter
        </h1>
        <p className="text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          A comprehensive project management framework detailing the problem space, operational scope, stakeholder matrix, risk register, and measurable social impact mechanisms.
        </p>
      </div>

      {/* 1. Problem Statement & Scope */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold font-display text-lg">
            <Target className="w-5 h-5 text-emerald-700" />
            <h2>1. Problem Statement</h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Catered gatherings—such as weddings, corporate conferences, and university festivals—routinely prepare 15–25% buffer quantities to avoid food shortages. Due to logistical friction and strict late-night schedules, thousands of tons of untouched, wholesome gourmet meals are discarded nightly while municipal shelters face acute food insecurity.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <strong className="text-slate-900 block">The Core Bottlenecks Identified:</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li><strong className="text-slate-800">Time Sensitivity:</strong> Cooked food has a perishable shelf life of ~4 hours without cold storage.</li>
                <li><strong className="text-slate-800">Coordination Friction:</strong> Venue managers lack direct, verified communication channels with shelter logistics leads at 11:00 PM.</li>
                <li><strong className="text-slate-800">Liability Hesitation:</strong> Donors fear legal risk or food safety claims without clear hygiene compliance logging.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold font-display text-lg">
            <CheckSquare className="w-5 h-5 text-emerald-700" />
            <h2>2. Project Scope (Boundaries & Limits)</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                In Scope (Deliverables)
              </span>
              <ul className="space-y-1 text-slate-700 leading-relaxed">
                <li>· Real-time surplus reporting portal for banquet venues & festivals</li>
                <li>· Recipient discovery & reservation workflow with capacity matching</li>
                <li>· Volunteer courier routing and status verification</li>
                <li>· Mandatory HACCP / temperature hygiene validation checklist</li>
                <li>· Multi-role dashboards (Organizer, NGO, Volunteer, Admin)</li>
                <li>· Non-food event resource rescue (decor, stationery, staging items)</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Lock className="w-4 h-4 text-slate-500" />
                Out of Scope
              </span>
              <ul className="space-y-1 text-slate-500 leading-relaxed">
                <li>· Long-term industrial warehousing or frozen storage infrastructure</li>
                <li>· Consumer-level household leftovers (restricted to commercial/catered events)</li>
                <li>· Commercial reselling or paid marketplace transactions (strictly free redistribution)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Workflow Pipeline Diagram */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold font-display text-lg">
            <GitBranch className="w-5 h-5 text-emerald-700" />
            <h2>3. End-to-End Operational Lifecycle Pipeline</h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">Status Machine: 5 Explicit States</span>
        </div>

        <p className="text-xs text-slate-600">
          The platform enforces a deterministic sequence ensuring accountability, safety checks, and anti-hoarding verification at every transition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {workflowSteps.map((st) => (
            <div key={st.step} className={`p-4 rounded-xl border ${st.bg} flex flex-col justify-between space-y-3`}>
              <div>
                <span className="text-xl font-black font-mono tracking-tight block opacity-60">
                  {st.step}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider block mt-1">
                  {st.title}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Actor: {st.actor}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {st.action}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Stakeholder Analysis Matrix */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold font-display text-lg">
          <Users2 className="w-5 h-5 text-emerald-700" />
          <h2>4. Stakeholder Analysis & RACI Matrix</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px] text-slate-500">
              <tr>
                <th className="py-3 px-4">Stakeholder Group</th>
                <th className="py-3 px-4">Interest</th>
                <th className="py-3 px-4">Influence</th>
                <th className="py-3 px-4">Core Operating Responsibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stakeholders.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{s.role}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800">
                      {s.interest}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                      {s.influence}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 leading-relaxed">{s.responsibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Risk Management Matrix (Crucial PM Deliverable) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold font-display text-lg">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h2>5. Risk Management Register & Mitigation Strategies</h2>
          </div>
          <span className="text-xs text-slate-400">ISO 31000 Framework</span>
        </div>

        <p className="text-xs text-slate-600">
          Evaluated failure modes including perishable microbial growth, logistics no-shows, inaccurate estimation, and donor data privacy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECT_RISKS.map((r) => (
            <div key={r.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-slate-500">{r.id} · {r.category}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    r.severity === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Sev: {r.severity}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                    Lik: {r.likelihood}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900">
                {r.riskDescription}
              </h3>

              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
                <p>
                  <strong className="text-emerald-900">Proactive Mitigation:</strong> {r.mitigationStrategy}
                </p>
                <p>
                  <strong className="text-amber-900">Contingency Trigger:</strong> {r.contingencyPlan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Project Milestones & Deliverables */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold font-display text-lg">
          <FileCheck2 className="w-5 h-5 text-emerald-700" />
          <h2>6. Work Breakdown Structure & Milestones</h2>
        </div>

        <div className="space-y-3">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{m.phase}</span>
                  <span className="text-slate-400">({m.timeline})</span>
                </div>
                <p className="text-slate-600">{m.detail}</p>
              </div>
              <span
                className={`self-start sm:self-auto px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap ${
                  m.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : m.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Success Metrics & Future Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold font-display text-lg">
            <BarChart3 className="w-5 h-5 text-emerald-700" />
            <h2>7. Project Success Metrics & KPIs</h2>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Surplus Diversion Efficiency</span>
                <span className="text-slate-500">Target: ≥85% of reported safe food picked up before cutoff</span>
              </div>
              <span className="font-mono font-bold text-emerald-800 text-sm">92% Met</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Average Dispatch Latency</span>
                <span className="text-slate-500">Target: Matching within &lt;45 mins of event reporting</span>
              </div>
              <span className="font-mono font-bold text-emerald-800 text-sm">31 Mins</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Food Safety Incident Rate</span>
                <span className="text-slate-500">Target: 0 incidents per 1,000 distributed portions</span>
              </div>
              <span className="font-mono font-bold text-emerald-800 text-sm">0.0 (Zero)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold font-display text-lg">
            <Rocket className="w-5 h-5 text-emerald-700" />
            <h2>8. Future Engineering Enhancements</h2>
          </div>
          <div className="space-y-2.5 text-xs">
            {roadmapItems.map((rd, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">{rd.title}</span>
                <p className="text-slate-600">{rd.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
