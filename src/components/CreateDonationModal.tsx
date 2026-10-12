import React, { useState } from 'react';
import { useRescue } from '../context/RescueContext';
import { DonationCategory, EventType } from '../types';
import { BANQUET_IMAGE, HERO_IMAGE, VOLUNTEER_IMAGE, REUSABLE_IMAGE } from '../data/initialData';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  Camera, 
  MapPin, 
  Clock, 
  FileText, 
  Tag, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

interface CreateDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNavigate?: () => void;
}

export const CreateDonationModal: React.FC<CreateDonationModalProps> = ({
  isOpen,
  onClose,
  onSuccessNavigate
}) => {
  const { currentUser, createDonation } = useRescue();

  const [title, setTitle] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<EventType>('wedding');
  const [category, setCategory] = useState<DonationCategory>('cooked_food');
  const [quantity, setQuantity] = useState<number>(100);
  const [quantityUnit, setQuantityUnit] = useState('portions');
  const [description, setDescription] = useState('');
  const [ingredientsOrAllergens, setIngredientsOrAllergens] = useState('');
  const [venueName, setVenueName] = useState('Imperial Crystal Ballroom');
  const [address, setAddress] = useState('725 Grand Promenade');
  const [city, setCity] = useState('Metro City');
  const [pickupWindowStart] = useState('10:00 PM Tonight');
  const [pickupDeadline, setPickupDeadline] = useState('12:30 AM (Tonight)');
  const [preparedTime, setPreparedTime] = useState('7:00 PM Tonight');
  const [storageInstructions, setStorageInstructions] = useState('Hot holding at 65°C maintained in chafing trays. Seal in thermal food boxes.');
  const [imageUrl, setImageUrl] = useState(BANQUET_IMAGE);
  
  // Food Safety Checklist
  const [safetyTempVerified, setSafetyTempVerified] = useState(false);
  const [safetyHygieneVerified, setSafetyHygieneVerified] = useState(false);
  const [safetyNoSpoilageVerified, setSafetyNoSpoilageVerified] = useState(false);
  const [hygieneDeclaration, setHygieneDeclaration] = useState('All items prepared under professional food handling guidelines and maintained at safe holding temperatures.');

  if (!isOpen) return null;

  const isFoodCategory = category === 'cooked_food' || category === 'packaged_food' || category === 'beverages';
  const canSubmit = isFoodCategory 
    ? (safetyTempVerified && safetyHygieneVerified && safetyNoSpoilageVerified && title.trim() && eventName.trim() && description.trim())
    : (title.trim() && eventName.trim() && description.trim());

  const handleCategoryChange = (newCat: DonationCategory) => {
    setCategory(newCat);
    if (newCat === 'cooked_food') {
      setImageUrl(BANQUET_IMAGE);
      setQuantityUnit('portions');
      setStorageInstructions('Keep hot above 60°C or chill rapidly to 4°C.');
    } else if (newCat === 'packaged_food') {
      setImageUrl(HERO_IMAGE);
      setQuantityUnit('boxed meals');
      setStorageInstructions('Keep in sealed dry original boxes.');
    } else if (newCat === 'beverages') {
      setImageUrl(VOLUNTEER_IMAGE);
      setQuantityUnit('bottles');
      setStorageInstructions('Ambient or chilled conditions.');
    } else {
      setImageUrl(REUSABLE_IMAGE);
      setQuantityUnit('boxes');
      setStorageInstructions('Dry storage. Packaged in labeled recyclable cartons.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    createDonation({
      title,
      eventName,
      eventType,
      category,
      organizerId: currentUser.id,
      organizerName: currentUser.name || 'Event Host',
      organizerPhone: currentUser.phone || '+1 (555) 234-5678',
      organizerEmail: currentUser.email || 'host@events.org',
      venueName,
      address,
      city,
      quantity: Number(quantity) || 1,
      quantityUnit,
      description,
      ingredientsOrAllergens: ingredientsOrAllergens || 'None reported',
      isVegetarian: ingredientsOrAllergens.toLowerCase().includes('veg'),
      isPerishable: isFoodCategory,
      preparedTime: isFoodCategory ? preparedTime : undefined,
      pickupWindowStart,
      pickupDeadline,
      storageInstructions,
      imageUrl,
      foodSafetyConfirmed: isFoodCategory ? (safetyTempVerified && safetyHygieneVerified) : true,
      hygieneDeclaration: isFoodCategory ? hygieneDeclaration : 'Inspected safe reusable material'
    });

    onClose();
    if (onSuccessNavigate) {
      onSuccessNavigate();
    }
  };

  const handleFillQuickSample = () => {
    setTitle('Surplus Mediterranean Buffet & Artisan Focaccia');
    setEventName('Silverwood Anniversary Banquet');
    setEventType('wedding');
    setCategory('cooked_food');
    setQuantity(120);
    setQuantityUnit('portions');
    setDescription('Fresh roasted lemon herb chicken, seasoned saffron rice, grilled zucchini & peppers, and 60 pieces of garlic rosemary focaccia bread.');
    setIngredientsOrAllergens('Poultry, garlic, herbs, gluten (focaccia). Nut-free.');
    setVenueName('Silverwood Grand Pavilion');
    setAddress('820 Heritage Boulevard');
    setPickupDeadline('11:45 PM Tonight');
    setStorageInstructions('Keep hot-holding trays covered until volunteer vehicle arrival.');
    setSafetyTempVerified(true);
    setSafetyHygieneVerified(true);
    setSafetyNoSpoilageVerified(true);
    setImageUrl(BANQUET_IMAGE);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-start justify-between sticky top-0 z-10 border-b border-emerald-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Event Leftover Rescue
              </span>
              <button
                type="button"
                onClick={handleFillQuickSample}
                className="text-[11px] bg-emerald-800 hover:bg-emerald-700 text-emerald-200 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                Fill Sample Data
              </button>
            </div>
            <h3 className="text-xl font-bold font-display mt-1">
              Create New Donation
            </h3>
            <p className="text-xs text-emerald-200/80">
              Report surplus event food or reusable resources to connect with local charities.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Category Selector Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Donation Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'cooked_food', label: 'Cooked Food' },
                { id: 'packaged_food', label: 'Packaged Food' },
                { id: 'beverages', label: 'Beverages' },
                { id: 'decorations', label: 'Decorations' },
                { id: 'stationery', label: 'Stationery' },
                { id: 'reusable_materials', label: 'Other Materials' },
              ].map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id as DonationCategory)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-left transition-all ${
                    category === cat.id
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Donation Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Surplus Gourmet Banquet Meals"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Event Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Heritage Wedding"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Event Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventType)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                <option value="wedding">Wedding Reception</option>
                <option value="corporate_conference">Corporate Conference</option>
                <option value="college_festival">College Festival</option>
                <option value="birthday_party">Birthday Gathering</option>
                <option value="charity_gala">Charity Gala</option>
                <option value="exhibition">Exhibition / Expo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quantity *
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Unit
              </label>
              <input
                type="text"
                value={quantityUnit}
                onChange={(e) => setQuantityUnit(e.target.value)}
                placeholder="portions, kg, boxes"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Description *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="List specific dishes, packaging conditions, or contents..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
            />
          </div>

          {/* Ingredients / Allergens for Food */}
          {isFoodCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ingredients & Allergens
                </label>
                <input
                  type="text"
                  value={ingredientsOrAllergens}
                  onChange={(e) => setIngredientsOrAllergens(e.target.value)}
                  placeholder="e.g. Contains dairy, gluten. Nut-free."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preparation / Cooked Time
                </label>
                <input
                  type="text"
                  value={preparedTime}
                  onChange={(e) => setPreparedTime(e.target.value)}
                  placeholder="e.g. 7:30 PM Tonight"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Pickup Location & Timing */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Pickup Location & Timing
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Venue / Facility Name *
                </label>
                <input
                  type="text"
                  required
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="e.g. Grand Crystal Banquet Hall"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Street Address & Service Gate *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 450 Arts Blvd, Service Entrance B"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Pickup Deadline / Safe Window Cutoff *
                </label>
                <input
                  type="text"
                  required
                  value={pickupDeadline}
                  onChange={(e) => setPickupDeadline(e.target.value)}
                  placeholder="e.g. 11:30 PM (Tonight)"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Storage & Handling Notes
                </label>
                <input
                  type="text"
                  value={storageInstructions}
                  onChange={(e) => setStorageInstructions(e.target.value)}
                  placeholder="e.g. Keep hot in chafing dishes"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Select Photo / Visual Asset */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Photographic Proof / Representation
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { url: BANQUET_IMAGE, label: 'Banquet Food' },
                { url: HERO_IMAGE, label: 'Packed Meals' },
                { url: VOLUNTEER_IMAGE, label: 'Beverages' },
                { url: REUSABLE_IMAGE, label: 'Decor / Goods' },
              ].map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageUrl(img.url)}
                  className={`relative rounded-lg overflow-hidden border-2 aspect-video transition-all ${
                    imageUrl === img.url ? 'border-emerald-600 ring-2 ring-emerald-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] py-0.5 text-center">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mandatory Food Safety Checklist for Cooked/Perishable Food */}
          {isFoodCategory ? (
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Mandatory Food Safety & Hygiene Declaration</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                To protect community recipients, unsafe, expired, or temperature-abused food must NEVER be listed. All three confirmations below are required before publishing.
              </p>

              <div className="space-y-2 pt-1 text-xs text-slate-800">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyTempVerified}
                    onChange={(e) => setSafetyTempVerified(e.target.checked)}
                    className="rounded border-amber-400 text-emerald-700 focus:ring-emerald-600 mt-0.5"
                  />
                  <span>
                    <strong>Temperature Integrity:</strong> The food has been held at safe hot-holding (&gt;60°C) or refrigeration (&lt;4°C) standards and was prepared within the last 4 hours.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyHygieneVerified}
                    onChange={(e) => setSafetyHygieneVerified(e.target.checked)}
                    className="rounded border-amber-400 text-emerald-700 focus:ring-emerald-600 mt-0.5"
                  />
                  <span>
                    <strong>Unused & Untouched:</strong> Only back-of-house or unserved buffet portions are listed. No half-eaten table plates or contaminated items.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyNoSpoilageVerified}
                    onChange={(e) => setSafetyNoSpoilageVerified(e.target.checked)}
                    className="rounded border-amber-400 text-emerald-700 focus:ring-emerald-600 mt-0.5"
                  />
                  <span>
                    <strong>Freshness Guarantee:</strong> Visual, olfactory, and sensory checks confirm pristine freshness suitable for immediate charity consumption.
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Non-perishable materials verified clean, reusable, and free from hazardous components.</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!canSubmit}
              className="py-2.5 px-6 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-sm hover:shadow transition-all"
            >
              Publish Rescue Donation
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
