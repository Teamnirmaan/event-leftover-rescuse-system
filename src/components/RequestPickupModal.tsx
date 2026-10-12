import React, { useState } from 'react';
import { DonationItem } from '../types';
import { useRescue } from '../context/RescueContext';
import { X, Building2, User, Phone, MapPin, Users, Truck, Clock, ShieldCheck } from 'lucide-react';

interface RequestPickupModalProps {
  donation: DonationItem | null;
  onClose: () => void;
}

export const RequestPickupModal: React.FC<RequestPickupModalProps> = ({ donation, onClose }) => {
  const { currentUser, requestPickup } = useRescue();

  const [ngoName, setNgoName] = useState(currentUser.organization || 'Hope Community Kitchen & Shelter');
  const [contactPerson, setContactPerson] = useState(currentUser.name || 'Elena Rostova');
  const [contactPhone, setContactPhone] = useState(currentUser.phone || '+1 (555) 876-5432');
  const [estimatedBeneficiaries, setEstimatedBeneficiaries] = useState(donation ? Math.min(donation.quantity, 100) : 50);
  const [deliveryLocation, setDeliveryLocation] = useState('Hope Night Shelter & Food Pantry, 304 4th Street, Metro City');
  const [transportType, setTransportType] = useState('Temperature-controlled insulated van');
  const [notes, setNotes] = useState('We will arrive with food-grade thermal containers within 45 minutes.');
  const [agreementChecked, setAgreementChecked] = useState(false);

  if (!donation) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreementChecked) return;

    requestPickup(donation.id, {
      ngoId: currentUser.id,
      ngoName,
      contactPerson,
      contactPhone,
      estimatedBeneficiaries: Number(estimatedBeneficiaries) || 1,
      deliveryLocation,
      notes: `${notes} (Transport: ${transportType})`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-900 text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
              NGO Pickup Dispatch
            </span>
            <h3 className="text-lg font-bold font-display mt-0.5">
              Request Pickup for {donation.title}
            </h3>
            <p className="text-xs text-emerald-200 mt-1">
              {donation.eventName} · {donation.quantity} {donation.quantityUnit} available
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-950 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Pickup Window: {donation.pickupWindowStart} — {donation.pickupDeadline}</span>
              Please ensure your team or assigned volunteer can arrive before the deadline at <strong>{donation.venueName}</strong>.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NGO / Charity Organization *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={ngoName}
                  onChange={(e) => setNgoName(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Coordinator Contact Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Direct Contact Phone *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Beneficiaries Fed / Served *
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  min="1"
                  required
                  value={estimatedBeneficiaries}
                  onChange={(e) => setEstimatedBeneficiaries(Number(e.target.value))}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Destination / Distribution Center Address *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Transport Mode
              </label>
              <select
                value={transportType}
                onChange={(e) => setTransportType(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="Temperature-controlled insulated van">Temperature-controlled insulated van</option>
                <option value="Standard vehicle with food-grade thermal containers">Standard vehicle with thermal coolers</option>
                <option value="Volunteer bicycle/courier squad">Volunteer courier cargo bike</option>
                <option value="NGO pickup truck (for non-food decor)">NGO pickup truck (for non-food decor)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Coordination Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Driver will call 15 mins prior"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Safety & Non-Commercial Distribution Pledge */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreementChecked}
                onChange={(e) => setAgreementChecked(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5"
              />
              <span className="text-xs text-slate-700 leading-relaxed">
                I certify that our organization is a registered non-profit / food charity, and these items will be distributed free of charge to individuals in need. We agree to follow safe handling guidelines.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!agreementChecked}
              className="py-2 px-5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all"
            >
              Confirm & Submit Pickup Request
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
