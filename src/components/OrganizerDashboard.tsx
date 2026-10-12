import React, { useState } from 'react';
import { useRescue } from '../context/RescueContext';
import { DonationItem } from '../types';
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  ChevronRight, 
  Building2, 
  Phone, 
  Calendar,
  Sparkles,
  ShieldCheck,
  Package
} from 'lucide-react';

interface OrganizerDashboardProps {
  openCreateModal: () => void;
  onSelectDonation: (donation: DonationItem) => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({
  openCreateModal,
  onSelectDonation
}) => {
  const { currentUser, donations, reviewPickupRequest } = useRescue();

  // Filter donations created by this organizer (or show sample if demo)
  const organizerDonations = donations.filter(
    (d) => d.organizerId === currentUser.id || d.organizerId.includes('org')
  );

  const pendingRequests = organizerDonations.filter((d) => d.status === 'requested');
  const completedDonations = organizerDonations.filter((d) => d.status === 'delivered');
  const activeDonations = organizerDonations.filter((d) => d.status !== 'delivered' && d.status !== 'cancelled');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
            <span>Organizer Portal</span>
            <span>·</span>
            <span>{currentUser.organization || 'Event Host'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-sm text-emerald-100/80 mt-1 max-w-xl">
            Monitor surplus food from your banquets and venues. Ensure zero safe food goes to waste by approving verified charity pickup requests.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="self-start md:self-auto px-5 py-3 text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-5 h-5 text-emerald-950" />
          <span>Post Event Leftovers</span>
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Donations Created</span>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-2">
            {organizerDonations.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Across all banquet & wedding events</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-2xs bg-amber-50/30">
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">Pending NGO Pickup Requests</span>
          <div className="text-3xl font-extrabold text-amber-900 font-mono tabular-nums mt-2">
            {pendingRequests.length}
          </div>
          <p className="text-xs text-amber-700 mt-1">Requires your approval to release contact info</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-2xs bg-emerald-50/30">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">Rescued & Delivered</span>
          <div className="text-3xl font-extrabold text-emerald-900 font-mono tabular-nums mt-2">
            {completedDonations.length}
          </div>
          <p className="text-xs text-emerald-700 mt-1">Successfully fed shelter residents</p>
        </div>
      </div>

      {/* Pending NGO Requests Section (Actionable Approval Workflow) */}
      {pendingRequests.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Action Required: Review Pending NGO Requests
            </h2>
          </div>

          <div className="space-y-3">
            {pendingRequests.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-amber-200 p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-emerald-800">{item.title}</span>
                    <span>·</span>
                    <span>{item.quantity} {item.quantityUnit}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {item.activeRequest?.ngoName} requested this donation
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Coordinator: <strong>{item.activeRequest?.contactPerson}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.activeRequest?.contactPhone}</span>
                    </div>
                    <span>Estimated beneficiaries: <strong className="text-slate-900">{item.activeRequest?.estimatedBeneficiaries}</strong></span>
                  </div>

                  {item.activeRequest?.notes && (
                    <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                      "{item.activeRequest.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => reviewPickupRequest(item.id, true)}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors"
                  >
                    Accept & Confirm Pickup
                  </button>
                  <button
                    onClick={() => reviewPickupRequest(item.id, false)}
                    className="px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active and Past Donations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">
              Your Listed Event Surplus
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time dispatch and fulfillment status
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {organizerDonations.length} items logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Event & Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Quantity</th>
                <th className="py-3 px-4">Pickup Deadline</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {organizerDonations.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{d.title}</span>
                    <span className="text-slate-400 text-[11px]">{d.eventName}</span>
                  </td>
                  <td className="py-3.5 px-4 capitalize">
                    {d.category.replace('_', ' ')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-slate-900">
                    {d.quantity} {d.quantityUnit}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {d.pickupDeadline}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                        d.status === 'available'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : d.status === 'requested'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : d.status === 'accepted'
                          ? 'bg-sky-50 text-sky-800 border border-sky-200'
                          : d.status === 'collected'
                          ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onSelectDonation(d)}
                      className="text-emerald-800 hover:text-emerald-950 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      <span>Track</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
