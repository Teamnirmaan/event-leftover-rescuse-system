import React, { useState } from 'react';
import { useRescue } from '../context/RescueContext';
import { DonationItem } from '../types';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Award, 
  Sparkles,
  Calendar,
  PackageCheck
} from 'lucide-react';

interface VolunteerDashboardProps {
  onSelectDonation: (donation: DonationItem) => void;
}

export const VolunteerDashboard: React.FC<VolunteerDashboardProps> = ({ onSelectDonation }) => {
  const { currentUser, donations, assignVolunteerMission, markCollected, markDelivered } = useRescue();
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [completingId, setCompletingId] = useState<string | null>(null);

  // Available missions waiting for volunteer
  const unassignedMissions = donations.filter(
    (d) => d.status === 'accepted' && !d.assignedVolunteerId
  );

  // Volunteer's active assignments
  const activeAssignments = donations.filter(
    (d) => (d.status === 'accepted' || d.status === 'collected') && d.assignedVolunteerId === currentUser.id
  );

  // Completed missions by this volunteer
  const completedMissions = donations.filter(
    (d) => d.status === 'delivered' && (d.assignedVolunteerId === currentUser.id || d.assignedVolunteerId?.includes('vol'))
  );

  const totalMealsDelivered = completedMissions.reduce((acc, m) => acc + m.impactMetrics.estimatedMeals, 220);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider mb-1">
            <span>Volunteer Courier Fleet</span>
            <span>·</span>
            <span>{currentUser.organization || 'Green Wheels Volunteer Fleet'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Volunteer Dispatch Center
          </h1>
          <p className="text-sm text-slate-200 mt-1 max-w-xl">
            You are the critical bridge between surplus banquets and community shelters. Pick up hot meals and ensure rapid, hygienic delivery.
          </p>
        </div>

        {/* Volunteer Stats Badge */}
        <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-300 block">Missions Done</span>
            <span className="text-xl font-bold font-mono text-white tabular-nums">{completedMissions.length}</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <span className="text-slate-300 block">Meals Transported</span>
            <span className="text-xl font-bold font-mono text-amber-300 tabular-nums">{totalMealsDelivered}</span>
          </div>
        </div>
      </div>

      {/* Active Missions in Progress */}
      {activeAssignments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Your Current Missions in Progress ({activeAssignments.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeAssignments.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border-2 border-emerald-600/40 p-6 shadow-sm space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                      Mission Code: {item.id}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      {item.title}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-bold capitalize self-start sm:self-auto ${
                      item.status === 'collected'
                        ? 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    {item.status === 'collected' ? 'In Transit to Shelter' : 'En Route to Pickup'}
                  </span>
                </div>

                {/* Pickup and Delivery Route Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Step 1: Pickup Location */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      <span className="flex items-center gap-1.5 text-amber-800">
                        <MapPin className="w-4 h-4 text-amber-600" />
                        1. Pickup Venue
                      </span>
                      <span className="text-slate-500 font-mono">By {item.pickupDeadline}</span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm">{item.venueName}</p>
                    <p className="text-slate-600">{item.address}, {item.city}</p>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-700">
                      <span>Contact: <strong>{item.organizerName}</strong></span>
                      <span className="font-mono text-emerald-800 font-semibold">{item.organizerPhone}</span>
                    </div>
                  </div>

                  {/* Step 2: Delivery Location */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      <span className="flex items-center gap-1.5 text-emerald-800">
                        <Truck className="w-4 h-4 text-emerald-700" />
                        2. Destination Shelter
                      </span>
                      <span className="text-emerald-700 font-semibold">{item.activeRequest?.estimatedBeneficiaries} meals</span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm">{item.activeRequest?.ngoName || 'Community Shelter'}</p>
                    <p className="text-slate-600">{item.activeRequest?.deliveryLocation}</p>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-700">
                      <span>Receiver: <strong>{item.activeRequest?.contactPerson}</strong></span>
                      <span className="font-mono text-emerald-800 font-semibold">{item.activeRequest?.contactPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Storage and Safety Advice */}
                <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span><strong>Handling Protocol:</strong> {item.storageInstructions}</span>
                </div>

                {/* Status Update Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectDonation(item)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                  >
                    View Checklist & Manifest
                  </button>

                  <div className="flex items-center gap-2">
                    {item.status === 'accepted' && (
                      <button
                        onClick={() => markCollected(item.id)}
                        className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow-xs flex items-center gap-2"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Step 1 Complete: Mark as Picked Up & In Transit</span>
                      </button>
                    )}

                    {item.status === 'collected' && (
                      <button
                        onClick={() => setCompletingId(completingId === item.id ? null : item.id)}
                        className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Step 2 Complete: Finalize Delivery</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline Delivery Confirmation Modal */}
                {completingId === item.id && (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3 animate-in fade-in duration-200">
                    <label className="text-xs font-bold text-emerald-950 block">
                      Delivery Handover Confirmation
                    </label>
                    <textarea
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Handed 140 warm meals to shelter coordinator Maria. Food temperature verified hot. Signed acknowledgment received."
                      rows={2}
                      className="w-full text-xs p-2.5 rounded-lg border border-emerald-300 bg-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setCompletingId(null)}
                        className="px-3 py-1.5 text-xs text-slate-600 bg-white rounded border border-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          markDelivered(item.id, deliveryNotes || 'Safely delivered to shelter team.');
                          setCompletingId(null);
                        }}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded"
                      >
                        Verify & Complete Mission
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Missions Waiting for Volunteers */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display">
          Available Pickup Missions Nearby ({unassignedMissions.length})
        </h2>
        <p className="text-xs text-slate-500">
          These event leftovers have been accepted by an NGO and need a dedicated courier with thermal containers or vehicle.
        </p>

        {unassignedMissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unassignedMissions.map((mission) => (
              <div
                key={mission.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-shadow space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-emerald-800">{mission.category.replace('_', ' ')}</span>
                    <span className="font-mono">{mission.quantity} {mission.quantityUnit}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-1">
                    From {mission.venueName} → To {mission.activeRequest?.ngoName}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pickup Window: {mission.pickupWindowStart} (Deadline: {mission.pickupDeadline})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{mission.venueName}, {mission.city}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onSelectDonation(mission)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => assignVolunteerMission(mission.id, currentUser.id, currentUser.name)}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors"
                  >
                    Accept This Mission
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-white rounded-xl border border-slate-200 text-center text-xs text-slate-500">
            No unassigned missions at this moment. Great job! Check back as new banquet donations are accepted.
          </div>
        )}
      </div>

      {/* Completed Missions History */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 font-display">
          Your Completed Volunteering Impact ({completedMissions.length})
        </h2>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4">Event Surplus</th>
                <th className="py-3 px-4">Recipient Shelter</th>
                <th className="py-3 px-4 text-right">Impact</th>
                <th className="py-3 px-4">Delivery Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {completedMissions.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{m.title}</span>
                    <span className="text-slate-400 text-[11px]">{m.eventName}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {m.activeRequest?.ngoName || 'Community Shelter'}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-emerald-800">
                    {m.impactMetrics.estimatedMeals > 0 ? `${m.impactMetrics.estimatedMeals} meals` : `${m.impactMetrics.co2SavedKg} kg CO2e`}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 italic">
                    "{m.deliveryNotes || 'Verified safely received.'}"
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
