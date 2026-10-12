import React, { useState, useMemo } from 'react';
import { DonationItem, DonationCategory, DonationStatus } from '../types';
import { useRescue } from '../context/RescueContext';
import { getCategoryMeta } from '../utils/categoryIcons';
import { 
  Search, 
  MapPin, 
  Clock, 
  ArrowUpDown, 
  Filter, 
  Sparkles, 
  Eye, 
  HandHeart, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Layers
} from 'lucide-react';

interface BrowseDonationsProps {
  onSelectDonation: (donation: DonationItem) => void;
  onRequestPickup: (donation: DonationItem) => void;
  openCreateModal: () => void;
}

export const BrowseDonations: React.FC<BrowseDonationsProps> = ({
  onSelectDonation,
  onRequestPickup,
  openCreateModal
}) => {
  const { donations } = useRescue();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'recent' | 'quantity'>('deadline');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'cooked_food', label: 'Cooked Meals' },
    { id: 'packaged_food', label: 'Packaged Food' },
    { id: 'beverages', label: 'Beverages' },
    { id: 'decorations', label: 'Decorations' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'reusable_materials', label: 'Other Materials' },
  ];

  const statuses = [
    { id: 'all', label: 'All Statuses' },
    { id: 'available', label: 'Available Now' },
    { id: 'requested', label: 'Requested' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'collected', label: 'In Transit' },
    { id: 'delivered', label: 'Delivered' }
  ];

  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      // Search
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Status
      const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'deadline') {
        // prioritize available first, then creation
        if (a.status === 'available' && b.status !== 'available') return -1;
        if (b.status === 'available' && a.status !== 'available') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'quantity') {
        return b.quantity - a.quantity;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [donations, searchTerm, selectedCategory, selectedStatus, sortBy]);

  const getStatusBadge = (status: DonationStatus) => {
    switch (status) {
      case 'available':
        return (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Available for Pickup
          </span>
        );
      case 'requested':
        return (
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Pickup Requested
          </span>
        );
      case 'accepted':
        return (
          <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
            Accepted / Dispatching
          </span>
        );
      case 'collected':
        return (
          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            In Transit
          </span>
        );
      case 'delivered':
        return (
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            Delivered & Rescued
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Real-Time Resource Exchange
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
            Browse Available Donations
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Live catalog of safe event leftovers, surplus catering, and reusable staging items ready for pickup by accredited non-profits.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors shrink-0"
        >
          + Report Event Surplus
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        
        {/* Search input + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by meal, event name, venue, ingredients, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="deadline">Pickup Urgency (Soonest)</option>
              <option value="recent">Recently Added</option>
              <option value="quantity">Largest Quantity</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Functional Button Controls with Clean Styling) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 mr-2">Category:</span>
          {categories.map((cat) => {
            const meta = cat.id !== 'all' ? getCategoryMeta(cat.id as DonationCategory) : null;
            const Icon = meta ? meta.Icon : Layers;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 mr-2">Status:</span>
          {statuses.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStatus(st.id)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedStatus === st.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

      </div>

      {/* Results Count & Active Filters Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>
          Showing <span className="font-semibold text-slate-900 tabular-nums">{filteredDonations.length}</span> listed rescue items
        </p>
        {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="text-emerald-700 hover:underline font-medium"
          >
            Clear active filters
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((item) => {
            const catMeta = getCategoryMeta(item.category);
            const CatIcon = catMeta.Icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Visual Image Slot */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden group">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    
                    {/* Visual Category-Specific Icon Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-white/60">
                      <CatIcon className={`w-3.5 h-3.5 ${catMeta.textColor}`} />
                      <span>{catMeta.label}</span>
                    </div>

                    <div className="absolute top-3 right-3">
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="absolute bottom-2.5 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded font-mono">
                      {item.quantity} {item.quantityUnit}
                    </div>
                  </div>

                  {/* Card Content (Zero-Pill Discipline: Unboxed Text Metadata with '·' Separators) */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className={`flex items-center gap-1 font-semibold ${catMeta.textColor}`}>
                        <CatIcon className="w-3.5 h-3.5" />
                        <span>{catMeta.label}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{item.eventType.replace('_', ' ')}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-display line-clamp-1 hover:text-emerald-800 transition-colors cursor-pointer" onClick={() => onSelectDonation(item)}>
                      {item.title}
                    </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Location & Time Metadata */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.venueName}, {item.city}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">Pickup by: <strong className="text-slate-800">{item.pickupDeadline}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-5 pb-5 pt-2 flex items-center gap-2 border-t border-slate-100 bg-slate-50/50">
                <button
                  onClick={() => onSelectDonation(item)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Details</span>
                </button>

                {item.status === 'available' ? (
                  <button
                    onClick={() => onRequestPickup(item)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <HandHeart className="w-3.5 h-3.5 text-amber-200" />
                    <span>Request Pickup</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium px-2 py-1 text-center">
                    Reserved
                  </span>
                )}
              </div>

            </div>
          );
        })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 font-display">No donations found matching criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, clearing category filters, or check back shortly as events report new surplus.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="mt-2 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
