import React, { useState } from 'react';
import { useRescue } from '../context/RescueContext';
import { DonationItem } from '../types';
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  Phone, 
  ShieldCheck, 
  HandHeart, 
  Eye, 
  Search,
  Filter
} from 'lucide-react';

interface NgoDashboardProps {
  onSelectDonation: (donation: DonationItem) => void;
  onRequestPickup: (donation: DonationItem) => void;
}

export const NgoDashboard: React.FC<NgoDashboardProps> = ({
  onSelectDonation,
  onRequestPickup
}) => {
  const { currentUser, donations } = useRescue();
  const [activeTabFilter, setActiveTabFilter] = useState<'available' | 'my-requests'>('available');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // NGO's requested / accepted donations
  const myRequests = donations.filter(
    (d) => d.activeRequest?.ngoId === currentUser.id || d.activeRequest?.ngoName.includes('Hope')
  );

  // Available donations in the platform
  const availableDonations = donations.filter((d) => d.status === 'available');

  const filteredAvailable = availableDonations.filter((d) => {
    if (categoryFilter === 'all') return true;
    return d.category === categoryFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
            <span>NGO & Shelter Distribution Hub</span>
            <span>·</span>
            <span>{currentUser.organization || 'Hope Community Kitchen'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Recipient Partner Dashboard
          </h1>
          <p className="text-sm text-emerald-100/80 mt-1 max-w-xl">
            Discover freshly packed banquet leftovers, food supplies, and community resources to serve vulnerable families and individuals in need.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-900/60 p-1.5 rounded-xl border border-emerald-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTabFilter('available')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTabFilter === 'available'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            Available for Claim ({availableDonations.length})
          </button>
          <button
            onClick={() => setActiveTabFilter('my-requests')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTabFilter === 'my-requests'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            My Active Pickups ({myRequests.length})
          </button>
        </div>
      </div>

      {/* Main View: Available Donations or Active Pickups */}
      {activeTabFilter === 'available' ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Immediate Surplus Ready for Pickup
              </h2>
              <p className="text-xs text-slate-500">
                All food donations verified with temperature logs and hygiene certificates.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="all">All Categories</option>
                <option value="cooked_food">Cooked Banquet Food</option>
                <option value="packaged_food">Packaged Box Meals</option>
                <option value="beverages">Beverages</option>
                <option value="decorations">Reusable Decor</option>
                <option value="stationery">Stationery</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAvailable.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                      Available Now
                    </div>
                    <div className="absolute bottom-2.5 right-3 bg-black/70 text-white text-[11px] px-2 py-0.5 rounded font-mono">
                      {item.quantity} {item.quantityUnit}
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <div className="text-xs text-slate-500">
                      <span>{item.eventName}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-display line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
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

                <div className="p-4 pt-2 border-t border-slate-100 flex items-center gap-2 bg-slate-50/50">
                  <button
                    onClick={() => onSelectDonation(item)}
                    className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onRequestPickup(item)}
                    className="flex-1 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-2xs"
                  >
                    Request Pickup
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* My Requests & Pickup Instructions */
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Track Requested & Dispatched Rescues
            </h2>
            <p className="text-xs text-slate-500">
              When an organizer accepts your request, direct venue gate instructions and contact numbers will appear here.
            </p>
          </div>

          <div className="space-y-4">
            {myRequests.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-800">{item.id}</span>
                      <span>·</span>
                      <span>{item.eventName}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <span
                    className={`self-start sm:self-auto px-3 py-1 rounded-md text-xs font-bold capitalize ${
                      item.status === 'requested'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : item.status === 'accepted'
                        ? 'bg-sky-50 text-sky-800 border border-sky-200'
                        : item.status === 'collected'
                        ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    Status: {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900 block mb-1">Pickup Venue & Gate</span>
                    <p>{item.venueName}</p>
                    <p className="text-slate-500 mt-0.5">{item.address}, {item.city}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900 block mb-1">Organizer Contact</span>
                    {item.status !== 'requested' ? (
                      <div>
                        <p className="font-bold text-slate-900">{item.organizerName}</p>
                        <p className="text-emerald-800 font-mono mt-0.5">{item.organizerPhone}</p>
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">Unlocked once organizer accepts request</p>
                    )}
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900 block mb-1">Courier / Logistics</span>
                    <p>{item.assignedVolunteerName ? `Volunteer Courier: ${item.assignedVolunteerName}` : 'Self-pickup / NGO Fleet'}</p>
                    <p className="text-slate-500 mt-0.5">Deadline: {item.pickupDeadline}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    Beneficiaries expected: <strong className="text-slate-900">{item.activeRequest?.estimatedBeneficiaries} meals</strong>
                  </span>
                  <button
                    onClick={() => onSelectDonation(item)}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                  >
                    View Full Dispatch Timeline →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
