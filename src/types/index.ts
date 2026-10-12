export type DonationCategory = 
  | 'cooked_food'
  | 'packaged_food'
  | 'beverages'
  | 'decorations'
  | 'stationery'
  | 'reusable_materials';

export type DonationStatus = 
  | 'available'
  | 'requested'
  | 'accepted'
  | 'collected'
  | 'delivered'
  | 'cancelled';

export type EventType = 
  | 'wedding'
  | 'corporate_conference'
  | 'college_festival'
  | 'birthday_party'
  | 'charity_gala'
  | 'exhibition';

export type UserRole = 'guest' | 'organizer' | 'ngo' | 'volunteer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  organization?: string;
  email: string;
  phone: string;
  verified: boolean;
  city: string;
  avatar?: string;
}

export interface NGORequest {
  id: string;
  ngoId: string;
  ngoName: string;
  contactPerson: string;
  contactPhone: string;
  requestedAt: string;
  estimatedBeneficiaries: number;
  deliveryLocation: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface DonationItem {
  id: string;
  title: string;
  eventName: string;
  eventType: EventType;
  category: DonationCategory;
  organizerId: string;
  organizerName: string;
  organizerPhone: string;
  organizerEmail: string;
  venueName: string;
  address: string;
  city: string;
  postalCode?: string;
  quantity: number;
  quantityUnit: string; // e.g. "meals", "kg", "boxes", "portions"
  description: string;
  ingredientsOrAllergens?: string;
  isVegetarian?: boolean;
  isPerishable: boolean;
  preparedTime?: string;
  pickupWindowStart: string;
  pickupDeadline: string;
  storageInstructions: string;
  imageUrl: string;
  status: DonationStatus;
  createdAt: string;
  foodSafetyConfirmed: boolean;
  hygieneDeclaration?: string;
  activeRequest?: NGORequest;
  assignedVolunteerId?: string;
  assignedVolunteerName?: string;
  collectedAt?: string;
  deliveredAt?: string;
  deliveryNotes?: string;
  impactMetrics: {
    estimatedMeals: number;
    co2SavedKg: number; // approximate 2.5 kg CO2 per kg food saved
    waterSavedLiters: number;
  };
}

export interface ActivityNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  donationId?: string;
}

export interface ProjectRisk {
  id: string;
  category: 'Quality & Safety' | 'Logistics' | 'Operations' | 'Privacy';
  riskDescription: string;
  severity: 'High' | 'Medium' | 'Low';
  likelihood: 'High' | 'Medium' | 'Low';
  mitigationStrategy: string;
  contingencyPlan: string;
}
