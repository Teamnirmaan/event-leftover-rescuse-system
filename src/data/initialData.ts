import { DonationItem, UserProfile, ProjectRisk } from '../types';
import banquetImg from '../assets/images/banquet_leftovers_1791790095389.jpg';
import volunteerImg from '../assets/images/volunteer_delivery_1791790113261.jpg';
import reusableImg from '../assets/images/reusable_materials_1791790124637.jpg';
import heroImg from '../assets/images/hero_food_rescue_1791790078792.jpg';

export const BANQUET_IMAGE = banquetImg;
export const VOLUNTEER_IMAGE = volunteerImg;
export const REUSABLE_IMAGE = reusableImg;
export const HERO_IMAGE = heroImg;

export const DEMO_USERS: Record<string, UserProfile> = {
  guest: {
    id: 'user_guest',
    name: 'Guest Visitor',
    role: 'guest',
    email: 'visitor@eventrescue.org',
    phone: '+1 (555) 010-0000',
    verified: false,
    city: 'Metro City'
  },
  organizer: {
    id: 'user_org_1',
    name: 'Rohan Sharma',
    organization: 'Grand Sapphire Banquet & Events',
    role: 'organizer',
    email: 'rohan.sharma@grandsapphire.com',
    phone: '+1 (555) 234-5678',
    verified: true,
    city: 'Metro City'
  },
  ngo: {
    id: 'user_ngo_1',
    name: 'Elena Rostova',
    organization: 'Hope Community Kitchen & Shelter',
    role: 'ngo',
    email: 'elena@hopecommunitykitchen.org',
    phone: '+1 (555) 876-5432',
    verified: true,
    city: 'Metro City'
  },
  volunteer: {
    id: 'user_vol_1',
    name: 'Marcus Chen',
    organization: 'Green Wheels Volunteer Fleet',
    role: 'volunteer',
    email: 'marcus.chen@greenwheels.org',
    phone: '+1 (555) 345-6789',
    verified: true,
    city: 'Metro City'
  },
  admin: {
    id: 'user_admin_1',
    name: 'Priya Nair',
    organization: 'EventRescue Oversight Board',
    role: 'admin',
    email: 'admin.priya@eventrescue.org',
    phone: '+1 (555) 999-0001',
    verified: true,
    city: 'Metro City'
  }
};

export const INITIAL_DONATIONS: DonationItem[] = [
  {
    id: 'DON-2026-081',
    title: 'Surplus Gourmet Banquet Meals & Fresh Breads',
    eventName: 'Royal Heritage Wedding Reception',
    eventType: 'wedding',
    category: 'cooked_food',
    organizerId: 'user_org_1',
    organizerName: 'Rohan Sharma',
    organizerPhone: '+1 (555) 234-5678',
    organizerEmail: 'rohan.sharma@grandsapphire.com',
    venueName: 'The Grand Sapphire Ballroom (Service Entrance B)',
    address: '450 Boulevard of the Arts, Downtown',
    city: 'Metro City',
    postalCode: '94102',
    quantity: 140,
    quantityUnit: 'portions',
    description: 'Freshly prepared vegetarian paneer tikka masala, fragrant saffron pulao, roasted seasonal Mediterranean vegetables, and 80 artisanal dinner rolls. Chafing dishes held at 68°C until 10:15 PM.',
    ingredientsOrAllergens: 'Contains dairy (paneer, butter) and gluten (bread). 100% vegetarian, nut-free.',
    isVegetarian: true,
    isPerishable: true,
    preparedTime: 'Today at 7:30 PM',
    pickupWindowStart: '10:30 PM',
    pickupDeadline: '12:30 AM (Tonight)',
    storageInstructions: 'Stainless insulated food carriers recommended. Keep sealed above 60°C or immediately chill to 4°C upon arrival.',
    imageUrl: BANQUET_IMAGE,
    status: 'available',
    createdAt: '2026-10-12T20:45:00Z',
    foodSafetyConfirmed: true,
    hygieneDeclaration: 'Certified by Chef de Cuisine: Food maintained above HACCP hot-holding thresholds with temperature logs.',
    impactMetrics: {
      estimatedMeals: 140,
      co2SavedKg: 350,
      waterSavedLiters: 11200
    }
  },
  {
    id: 'DON-2026-082',
    title: 'Packaged Conference Box Lunches & Fruit Salads',
    eventName: 'Global Tech & Sustainability Summit 2026',
    eventType: 'corporate_conference',
    category: 'packaged_food',
    organizerId: 'user_org_tech',
    organizerName: 'Devon Miller (Apex Events)',
    organizerPhone: '+1 (555) 432-1098',
    organizerEmail: 'devon@apex-events.io',
    venueName: 'Convention Center West, Hall 3',
    address: '1200 Innovation Way, Tech District',
    city: 'Metro City',
    postalCode: '94107',
    quantity: 85,
    quantityUnit: 'boxed meals',
    description: 'Individually heat-sealed gourmet sandwich boxes (grilled vegetable hummus wraps & roasted chicken ciabattas), each with a sealed organic fruit cup and whole granola bar.',
    ingredientsOrAllergens: 'Individual ingredient stickers on each box. Mixed vegan and poultry options labeled clearly.',
    isVegetarian: false,
    isPerishable: true,
    preparedTime: 'Today at 1:00 PM',
    pickupWindowStart: '4:00 PM',
    pickupDeadline: '7:30 PM (Evening)',
    storageInstructions: 'Refrigerated van or ice coolers preferred. Keep sealed in original boxes.',
    imageUrl: HERO_IMAGE,
    status: 'requested',
    createdAt: '2026-10-12T15:20:00Z',
    foodSafetyConfirmed: true,
    hygieneDeclaration: 'Packed under certified catering standards with batch seals and production timestamps.',
    activeRequest: {
      id: 'REQ-501',
      ngoId: 'user_ngo_1',
      ngoName: 'Hope Community Kitchen & Shelter',
      contactPerson: 'Elena Rostova',
      contactPhone: '+1 (555) 876-5432',
      requestedAt: '2026-10-12T16:05:00Z',
      estimatedBeneficiaries: 75,
      deliveryLocation: 'Downtown Homeless Outreach Center, 304 4th Street',
      notes: 'Our temperature-controlled van is ready for pickup by 5:30 PM.',
      status: 'pending'
    },
    impactMetrics: {
      estimatedMeals: 85,
      co2SavedKg: 212,
      waterSavedLiters: 6800
    }
  },
  {
    id: 'DON-2026-083',
    title: 'Reusable Wooden Wedding Arches, Linens & Table Runners',
    eventName: 'Elegance & Blooms Autumn Gala',
    eventType: 'charity_gala',
    category: 'decorations',
    organizerId: 'user_org_decor',
    organizerName: 'Sophia Lorenzi',
    organizerPhone: '+1 (555) 765-4321',
    organizerEmail: 'sophia@bellafiore.design',
    venueName: 'The Botanical Conservatory Gardens',
    address: '88 Meadowbrook Lane, Park District',
    city: 'Metro City',
    postalCode: '94118',
    quantity: 18,
    quantityUnit: 'boxes & structural units',
    description: 'Hand-crafted cedar wood ceremonial arches (disassembled), 45 premium sage green cotton table runners, 30 woven rattan charger plates, and reusable fairy light lanterns.',
    ingredientsOrAllergens: 'Non-food item. Clean, dry, and thoroughly inspected.',
    isVegetarian: false,
    isPerishable: false,
    pickupWindowStart: '9:00 AM Tomorrow',
    pickupDeadline: 'Tomorrow 5:00 PM',
    storageInstructions: 'Dry storage. Boxes are stackable. Arch parts fit in standard SUV or pickup bed.',
    imageUrl: REUSABLE_IMAGE,
    status: 'accepted',
    createdAt: '2026-10-12T14:00:00Z',
    foodSafetyConfirmed: true,
    hygieneDeclaration: 'Sanitized decor items packaged in sturdy labeled corrugated cartons.',
    activeRequest: {
      id: 'REQ-498',
      ngoId: 'user_ngo_arts',
      ngoName: 'Youth Arts & Community Workshop Hub',
      contactPerson: 'David Morales',
      contactPhone: '+1 (555) 654-9870',
      requestedAt: '2026-10-12T14:30:00Z',
      estimatedBeneficiaries: 120,
      deliveryLocation: 'Youth Community Center, Arts Wing, 150 Oak St',
      notes: 'Approved for reuse in our youth theater program and community harvest festival.',
      status: 'accepted'
    },
    assignedVolunteerId: 'user_vol_1',
    assignedVolunteerName: 'Marcus Chen',
    impactMetrics: {
      estimatedMeals: 0,
      co2SavedKg: 180,
      waterSavedLiters: 2400
    }
  },
  {
    id: 'DON-2026-084',
    title: 'Chilled Fruit Juices, Sealed Water Jugs & Electrolytes',
    eventName: 'Annual University Marathon & Youth Festival',
    eventType: 'college_festival',
    category: 'beverages',
    organizerId: 'user_org_uni',
    organizerName: 'Prof. Ananya Patel (Student Council)',
    organizerPhone: '+1 (555) 901-2345',
    organizerEmail: 'council@metrouniversity.edu',
    venueName: 'University Athletics Complex - Field Gate 4',
    address: '600 Campus Drive, North Campus',
    city: 'Metro City',
    postalCode: '94132',
    quantity: 220,
    quantityUnit: 'bottles / containers',
    description: 'Factory-sealed 500ml cold-pressed orange & apple juices (120 units) and sealed 1-liter mineral water carafes (100 units). Expiry dates: March 2027.',
    ingredientsOrAllergens: '100% pure fruit juices, pasteurized, allergen free.',
    isVegetarian: true,
    isPerishable: false,
    preparedTime: 'Factory sealed inventory',
    pickupWindowStart: '1:00 PM',
    pickupDeadline: '8:00 PM (Tonight)',
    storageInstructions: 'Store in cool ambient conditions or refrigerate.',
    imageUrl: VOLUNTEER_IMAGE,
    status: 'collected',
    createdAt: '2026-10-12T11:00:00Z',
    foodSafetyConfirmed: true,
    hygieneDeclaration: 'Tamper-evident factory packaging intact.',
    activeRequest: {
      id: 'REQ-490',
      ngoId: 'user_ngo_1',
      ngoName: 'Hope Community Kitchen & Shelter',
      contactPerson: 'Elena Rostova',
      contactPhone: '+1 (555) 876-5432',
      requestedAt: '2026-10-12T11:45:00Z',
      estimatedBeneficiaries: 180,
      deliveryLocation: 'Hope Night Shelter & Pantry, 304 4th Street',
      notes: 'Urgent need for hydration supplies at the evening shelter line.',
      status: 'accepted'
    },
    assignedVolunteerId: 'user_vol_1',
    assignedVolunteerName: 'Marcus Chen',
    collectedAt: '2026-10-12T17:15:00Z',
    impactMetrics: {
      estimatedMeals: 220,
      co2SavedKg: 110,
      waterSavedLiters: 4400
    }
  },
  {
    id: 'DON-2026-085',
    title: 'Surplus Academic Conference Notebooks & Pens',
    eventName: 'International Medical Science Colloquium',
    eventType: 'corporate_conference',
    category: 'stationery',
    organizerId: 'user_org_med',
    organizerName: 'Dr. Catherine Reed',
    organizerPhone: '+1 (555) 321-7654',
    organizerEmail: 'catherine@medcolloquium.org',
    venueName: 'Hilton Bayfront Conference Pavilion',
    address: '900 Harbor View Court, Marina District',
    city: 'Metro City',
    postalCode: '94111',
    quantity: 350,
    quantityUnit: 'stationery sets',
    description: 'Unopened recycled paper hardcover notebooks with matching rollerball pens in original cartons. Ideal for under-resourced schools and tutoring centers.',
    ingredientsOrAllergens: 'Non-food educational resources.',
    isVegetarian: false,
    isPerishable: false,
    pickupWindowStart: 'Available Now',
    pickupDeadline: 'Completed Delivery',
    storageInstructions: 'Keep dry. Packed in 7 uniform cartons.',
    imageUrl: REUSABLE_IMAGE,
    status: 'delivered',
    createdAt: '2026-10-11T09:00:00Z',
    foodSafetyConfirmed: true,
    hygieneDeclaration: 'Factory fresh stationery.',
    activeRequest: {
      id: 'REQ-482',
      ngoId: 'user_ngo_edu',
      ngoName: 'Bright Horizons Afterschool Literacy Center',
      contactPerson: 'Tanya Washington',
      contactPhone: '+1 (555) 789-0123',
      requestedAt: '2026-10-11T10:15:00Z',
      estimatedBeneficiaries: 280,
      deliveryLocation: 'Bright Horizons Center, 77 Elmwood Ave',
      notes: 'Successfully distributed to 6th and 7th grade tutoring students!',
      status: 'accepted'
    },
    assignedVolunteerId: 'user_vol_1',
    assignedVolunteerName: 'Marcus Chen',
    collectedAt: '2026-10-11T13:30:00Z',
    deliveredAt: '2026-10-11T15:45:00Z',
    deliveryNotes: 'Delivered in mint condition directly to Director Tanya Washington. Signed acknowledgment received.',
    impactMetrics: {
      estimatedMeals: 0,
      co2SavedKg: 95,
      waterSavedLiters: 1500
    }
  }
];

export const PROJECT_RISKS: ProjectRisk[] = [
  {
    id: 'RSK-01',
    category: 'Quality & Safety',
    riskDescription: 'Perishable cooked food compromised due to temperature abuse (>4 hrs in danger zone 4°C–60°C).',
    severity: 'High',
    likelihood: 'Medium',
    mitigationStrategy: 'Strict mandatory food safety declaration, 3-hour pickup cutoff window, hot-holding validation, and volunteer thermal carrier check.',
    contingencyPlan: 'Immediate quarantine and rejection at pickup if visual or sensory checks indicate risk; direct to composting instead of human consumption.'
  },
  {
    id: 'RSK-02',
    category: 'Logistics',
    riskDescription: 'Volunteer or NGO no-show leaving perishable donations stranded at closing event venue.',
    severity: 'High',
    likelihood: 'Medium',
    mitigationStrategy: 'Automated 45-minute countdown reminders, dual-confirmation SMS/app prompts, and backup volunteer dispatch alert.',
    contingencyPlan: 'Secondary fallback NGO routing with late-night shelter partners on standby within a 5-mile radius.'
  },
  {
    id: 'RSK-03',
    category: 'Operations',
    riskDescription: 'Inaccurate quantity estimation causing recipient mismatch or insufficient carrier capacity.',
    severity: 'Medium',
    likelihood: 'High',
    mitigationStrategy: 'Standardized portion estimation tool in submission form (trays, portions, volume) with mandatory photo upload.',
    contingencyPlan: 'Flexible partial pickups enabled; leftover balance immediately relisted to secondary community fridges.'
  },
  {
    id: 'RSK-04',
    category: 'Privacy',
    riskDescription: 'Donor and venue private contact info publicly scraped or exposed to unauthorized parties.',
    severity: 'Medium',
    likelihood: 'Low',
    mitigationStrategy: 'Contact details and precise service entrance instructions hidden from general public; revealed only to verified NGOs upon request approval.',
    contingencyPlan: 'Audit log of contact views; automated phone masking for in-app coordination.'
  }
];

export const TESTIMONIALS = [
  {
    quote: "At our hotel banquet hall, we used to throw away over 150 kg of untouched catering food after weddings. EventRescue turned our closing hours into a celebration of giving. In 30 minutes, an NGO had picked up hot meals for an elderly community shelter.",
    author: "Rohan Sharma",
    role: "Banquet Operations Director",
    organization: "Grand Sapphire Banquet & Events",
    highlight: "1,200+ meals rescued this season"
  },
  {
    quote: "Late-night food rescues are vital for our 24/7 crisis center. Before EventRescue, coordination was frantic phone calls. Now, we see verified hot food items, ingredients, and pickup timeframes right on our screen.",
    author: "Elena Rostova",
    role: "Logistics Lead",
    organization: "Hope Community Kitchen & Shelter",
    highlight: "Feeds 180 shelter residents nightly"
  },
  {
    quote: "Being a volunteer courier gives tangible purpose to my weekends. I pick up food from celebrations and deliver it directly to local pantries. The app makes the route, contact person, and status updates effortless.",
    author: "Marcus Chen",
    role: "Eco-Fleet Volunteer Lead",
    organization: "Green Wheels Volunteer Fleet",
    highlight: "42 successful rescue runs completed"
  }
];
