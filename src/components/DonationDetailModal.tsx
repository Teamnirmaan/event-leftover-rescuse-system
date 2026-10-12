import React, { useState } from 'react';
import { DonationItem } from '../types';
import { useRescue } from '../context/RescueContext';
import { getCategoryMeta } from '../utils/categoryIcons';
import { 
  X, 
  MapPin, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Truck, 
  Building2, 
  User, 
  Phone, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Package,
  Layers
} from 'lucide-react';

interface DonationDetailModalProps {
  donation: DonationItem | null;
  onClose: () => void;
  onRequestPickupClick?: (donation: DonationItem) => void;
}

export const DonationDetailModal: React.FC<DonationDetailModalProps> = ({
  donation,
  onClose,
  onRequestPickupClick
}) => {
  const { currentUser, reviewPickupRequest, assignVolunteerMission, markCollected, markDelivered } = useRescue();
  const [deliveryNotesInput, setDeliveryNotesInput] = useState('');
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  if (!donation) return null;

  const getStatusStep = () => {
    switch (donation.status) {
      case 'available': return 1;
      case 'requested': return 2;
      case 'accepted': return 3;
      case 'collected': return 4;
      case 'delivered': return 5;
      default: return 0;
    }
  };

  const steps = [
    { num: 1, label: 'Reported', desc: 'Listed by organizer' },
    { num: 2, label: 'Requested', desc: 'NGO reservation pending' },
    { num: 3, label: 'Accepted', desc: 'Pickup confirmed' },
    { num: 4, label: 'Collected', desc: 'In transit with volunteer' },
    { num: 5, label: 'Delivered', desc: 'Reached beneficiaries' }
  ];

  const currentStep = getStatusStep();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header Image and Quick Badges */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
          <img
            src={donation.imageUrl}
            alt={donation.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            {(() => {
              const catMeta = getCategoryMeta(donation.category);
              const CatIcon = catMeta.Icon;
              return (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold mb-2 shadow-xs">
                  <CatIcon className={`w-3.5 h-3.5 ${catMeta.textColor}`} />
                  <span className={catMeta.textColor}>{catMeta.label}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-600 font-medium capitalize">{donation.eventType.replace('_', ' ')}</span>
                </div>
              );
            })()}
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white drop-shadow-xs">
              {donation.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-200 mt-1">
              <span className="font-semibold text-amber-300">{donation.eventName}</span>
              <span>·</span>
              <span>Listed {new Date(donation.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Workflow Progress Bar */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Rescue Lifecycle</h3>
            <div className="grid grid-cols-5 gap-2">
              {steps.map((s) => {
                const isPassed = s.num < currentStep;
                const isCurrent = s.num === currentStep;
                return (
                  <div key={s.num} className="text-center">
                    <div
                      className={`h-2 rounded-full mb-2 transition-all ${
                        isPassed || isCurrent
                          ? 'bg-emerald-600'
                          : 'bg-slate-200'
                      }`}
                    />
                    <span
                      className={`block text-xs font-semibold ${
                        isCurrent ? 'text-emerald-800' : isPassed ? 'text-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:block">{s.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(() => {
              const catMeta = getCategoryMeta(donation.category);
              const CatIcon = catMeta.Icon;
              return (
                <div className={`p-3 rounded-xl border ${catMeta.bgColor} ${catMeta.borderColor}`}>
                  <span className="text-[11px] font-semibold uppercase tracking-wider block text-slate-500">Category</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <CatIcon className={`w-4 h-4 ${catMeta.textColor} shrink-0`} />
                    <span className={`text-xs font-bold ${catMeta.textColor} truncate`}>
                      {catMeta.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 capitalize block mt-0.5 truncate">{donation.eventType.replace('_', ' ')}</span>
                </div>
              );
            })()}

            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">Quantity</span>
              <span className="text-lg font-bold text-emerald-950 font-mono tabular-nums">
                {donation.quantity} <span className="text-xs font-normal">{donation.quantityUnit}</span>
              </span>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl">
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">Pickup Window</span>
              <span className="text-xs font-bold text-amber-950 block truncate">
                {donation.pickupWindowStart}
              </span>
              <span className="text-[11px] text-amber-700 block truncate">Deadline: {donation.pickupDeadline}</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Venue</span>
              <span className="text-xs font-semibold text-slate-900 block truncate" title={donation.venueName}>
                {donation.venueName}
              </span>
              <span className="text-[11px] text-slate-500 block truncate">{donation.city}</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Estimated Impact</span>
              <span className="text-sm font-bold text-emerald-800 font-mono tabular-nums">
                {donation.impactMetrics.estimatedMeals > 0 ? `${donation.impactMetrics.estimatedMeals} meals` : `${donation.impactMetrics.co2SavedKg} kg CO2e`}
              </span>
            </div>
          </div>

          {/* Item Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Item Description</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-xl p-4">
              {donation.description}
            </p>
          </div>

          {/* Food Safety & Dietary Details */}
          {donation.category.includes('food') || donation.category === 'beverages' ? (
            <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Food Safety & Handling Verification</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div>
                  <span className="font-semibold text-slate-900 block">Ingredients & Allergens:</span>
                  <span>{donation.ingredientsOrAllergens || 'None reported'}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Storage Instructions:</span>
                  <span>{donation.storageInstructions}</span>
                </div>
              </div>

              {donation.hygieneDeclaration && (
                <p className="text-xs text-emerald-800 bg-white/80 p-2.5 rounded-lg border border-emerald-200/60 italic">
                  "{donation.hygieneDeclaration}"
                </p>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm mb-1">
                <Package className="w-4 h-4 text-emerald-700" />
                <span>Resource Storage & Packing</span>
              </div>
              <p className="text-xs text-slate-600">{donation.storageInstructions}</p>
            </div>
          )}

          {/* Pickup Address & Contact Details */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Pickup Location</h4>
            <div className="flex items-start gap-2.5 text-sm text-slate-800">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">{donation.venueName}</p>
                <p className="text-slate-600">{donation.address}, {donation.city} {donation.postalCode}</p>
              </div>
            </div>

            {/* Contact details revealed if requested/accepted or if admin/organizer */}
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Organizer Contact: <strong className="text-slate-900">{donation.organizerName}</strong></span>
              </div>
              {donation.status !== 'available' ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{donation.organizerPhone}</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400 italic">
                  (Phone number revealed upon pickup request confirmation)
                </span>
              )}
            </div>
          </div>

          {/* Active NGO Request Info (if requested or accepted) */}
          {donation.activeRequest && (
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900">
                  Recipient NGO Request ({donation.activeRequest.status})
                </h4>
                <span className="text-xs font-semibold text-sky-800">
                  {donation.activeRequest.estimatedBeneficiaries} beneficiaries expected
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-700">
                <p><strong className="text-slate-900">NGO:</strong> {donation.activeRequest.ngoName}</p>
                <p><strong className="text-slate-900">Contact:</strong> {donation.activeRequest.contactPerson} ({donation.activeRequest.contactPhone})</p>
                <p><strong className="text-slate-900">Destination:</strong> {donation.activeRequest.deliveryLocation}</p>
                {donation.activeRequest.notes && (
                  <p className="text-sky-900 bg-white/70 p-2 rounded mt-2">"{donation.activeRequest.notes}"</p>
                )}
              </div>

              {/* Organizer Action to Accept/Decline */}
              {currentUser.role === 'organizer' && donation.activeRequest.status === 'pending' && (
                <div className="mt-4 pt-3 border-t border-sky-200/80 flex items-center gap-3">
                  <button
                    onClick={() => reviewPickupRequest(donation.id, true)}
                    className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs"
                  >
                    Accept Pickup Request
                  </button>
                  <button
                    onClick={() => reviewPickupRequest(donation.id, false)}
                    className="py-2 px-3 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold"
                  >
                    Decline & Relist
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Assigned Volunteer Mission Tracking */}
          {donation.assignedVolunteerName && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Volunteer Courier: <strong>{donation.assignedVolunteerName}</strong></span>
              </div>
              <span className="font-semibold capitalize text-emerald-800">
                {donation.status === 'collected' ? 'In Transit' : donation.status === 'delivered' ? 'Delivered' : 'Assigned'}
              </span>
            </div>
          )}

          {/* Workflow Action Buttons for Volunteer / Recipient / Visitor */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
            <button
              onClick={onClose}
              className="py-2.5 px-4 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              {donation.status === 'available' && onRequestPickupClick && (
                <button
                  onClick={() => onRequestPickupClick(donation)}
                  className="py-2.5 px-5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Request Pickup as NGO</span>
                </button>
              )}

              {/* Volunteer Actions */}
              {currentUser.role === 'volunteer' && (
                <>
                  {donation.status === 'accepted' && !donation.assignedVolunteerId && (
                    <button
                      onClick={() => assignVolunteerMission(donation.id, currentUser.id, currentUser.name)}
                      className="py-2 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
                    >
                      Accept Volunteer Mission
                    </button>
                  )}

                  {donation.status === 'accepted' && donation.assignedVolunteerId === currentUser.id && (
                    <button
                      onClick={() => markCollected(donation.id)}
                      className="py-2 px-4 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg flex items-center gap-1.5"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Confirm Picked Up / In Transit</span>
                    </button>
                  )}

                  {donation.status === 'collected' && (
                    <button
                      onClick={() => setShowDeliveryForm(!showDeliveryForm)}
                      className="py-2 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Safe Delivery</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Volunteer Delivery Completion Form */}
          {showDeliveryForm && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
              <label className="text-xs font-semibold text-emerald-950 block">
                Delivery Handover Notes (Recipient recipient signed, temperature status, items confirmed):
              </label>
              <textarea
                value={deliveryNotesInput}
                onChange={(e) => setDeliveryNotesInput(e.target.value)}
                placeholder="e.g. Delivered 140 warm portions to shelter manager Maria. Temperature measured 62°C upon arrival. Received signature."
                rows={2}
                className="w-full text-xs p-2 rounded-lg border border-emerald-300 bg-white"
              />
              <button
                onClick={() => {
                  markDelivered(donation.id, deliveryNotesInput || 'Delivered safely and verified by volunteer courier.');
                  setShowDeliveryForm(false);
                }}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
              >
                Submit Delivery Confirmation & Record Impact
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
