import React, { createContext, useContext, useState, useEffect } from 'react';
import { DonationItem, UserProfile, UserRole, ActivityNotification, NGORequest } from '../types';
import { INITIAL_DONATIONS, DEMO_USERS, HERO_IMAGE, BANQUET_IMAGE, VOLUNTEER_IMAGE, REUSABLE_IMAGE } from '../data/initialData';

interface RescueContextType {
  donations: DonationItem[];
  currentUser: UserProfile;
  setCurrentRole: (role: UserRole) => void;
  notifications: ActivityNotification[];
  createDonation: (data: Omit<DonationItem, 'id' | 'status' | 'createdAt' | 'impactMetrics'>) => string;
  requestPickup: (donationId: string, request: Omit<NGORequest, 'id' | 'requestedAt' | 'status'>) => void;
  reviewPickupRequest: (donationId: string, approve: boolean) => void;
  assignVolunteerMission: (donationId: string, volunteerId: string, volunteerName: string) => void;
  markCollected: (donationId: string) => void;
  markDelivered: (donationId: string, deliveryNotes: string) => void;
  cancelDonation: (donationId: string) => void;
  resetDemoData: () => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  clearToast: () => void;
  stats: {
    totalMealsRescued: number;
    totalKgWastePrevented: number;
    totalCompletedDonations: number;
    activePartners: number;
    co2SavedKg: number;
  };
}

const RescueContext = createContext<RescueContextType | undefined>(undefined);

const STORAGE_KEY = 'eventrescue_data_v1';
const ROLE_STORAGE_KEY = 'eventrescue_user_role_v1';

export const RescueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<DonationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_DONATIONS;
  });

  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    try {
      const savedRole = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole;
      if (savedRole && DEMO_USERS[savedRole]) {
        return savedRole;
      }
    } catch {
      // ignore
    }
    return 'guest';
  });

  const [notifications, setNotifications] = useState<ActivityNotification[]>([
    {
      id: 'notif-1',
      timestamp: '10 mins ago',
      title: 'New Donation Listed',
      message: 'Surplus Gourmet Banquet Meals listed by Grand Sapphire Ballroom.',
      type: 'info',
      donationId: 'DON-2026-081'
    },
    {
      id: 'notif-2',
      timestamp: '25 mins ago',
      title: 'Pickup Requested',
      message: 'Hope Community Kitchen requested pickup for Tech Summit Box Lunches.',
      type: 'info',
      donationId: 'DON-2026-082'
    },
    {
      id: 'notif-3',
      timestamp: '1 hour ago',
      title: 'Mission Dispatched',
      message: 'Volunteer Marcus Chen assigned to pickup event decor materials.',
      type: 'success',
      donationId: 'DON-2026-083'
    }
  ]);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
    } catch {
      // storage full or disabled
    }
  }, [donations]);

  useEffect(() => {
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, currentRole);
    } catch {
      // ignore
    }
  }, [currentRole]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const clearToast = () => setToast(null);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    const roleName = DEMO_USERS[role]?.name || role;
    showToast(`Switched persona to: ${role.toUpperCase()} (${roleName})`, 'info');
  };

  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'warning', donationId?: string) => {
    const newNotif: ActivityNotification = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title,
      message,
      type,
      donationId
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  const createDonation = (data: Omit<DonationItem, 'id' | 'status' | 'createdAt' | 'impactMetrics'>): string => {
    const id = `DON-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    
    // Estimate meals & metrics based on quantity and category
    let meals = 0;
    if (data.category === 'cooked_food' || data.category === 'packaged_food') {
      meals = Number(data.quantity) || 50;
    } else if (data.category === 'beverages') {
      meals = Math.round((Number(data.quantity) || 50) * 0.7);
    }

    const co2SavedKg = Math.round(meals > 0 ? meals * 2.2 : (Number(data.quantity) || 20) * 5.0);
    const waterSavedLiters = Math.round(meals > 0 ? meals * 80 : (Number(data.quantity) || 20) * 120);

    const newDonation: DonationItem = {
      ...data,
      id,
      status: 'available',
      createdAt: new Date().toISOString(),
      impactMetrics: {
        estimatedMeals: meals,
        co2SavedKg,
        waterSavedLiters
      }
    };

    setDonations(prev => [newDonation, ...prev]);
    addNotification('Donation Published', `"${newDonation.title}" is now visible to verified NGOs for pickup.`, 'success', id);
    showToast(`Success! Donation "${newDonation.title}" created. Nearby NGOs are alerted.`, 'success');
    return id;
  };

  const requestPickup = (donationId: string, requestData: Omit<NGORequest, 'id' | 'requestedAt' | 'status'>) => {
    const requestId = `REQ-${Date.now().toString().slice(-4)}`;
    const fullRequest: NGORequest = {
      ...requestData,
      id: requestId,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };

    setDonations(prev =>
      prev.map(item => {
        if (item.id === donationId) {
          return {
            ...item,
            status: 'requested',
            activeRequest: fullRequest
          };
        }
        return item;
      })
    );

    addNotification('Pickup Requested', `${requestData.ngoName} requested pickup for ${donationId}.`, 'info', donationId);
    showToast(`Pickup request submitted! The event organizer has been notified for confirmation.`, 'success');
  };

  const reviewPickupRequest = (donationId: string, approve: boolean) => {
    setDonations(prev =>
      prev.map(item => {
        if (item.id === donationId && item.activeRequest) {
          if (approve) {
            return {
              ...item,
              status: 'accepted',
              activeRequest: {
                ...item.activeRequest,
                status: 'accepted'
              }
            };
          } else {
            return {
              ...item,
              status: 'available',
              activeRequest: undefined
            };
          }
        }
        return item;
      })
    );

    if (approve) {
      addNotification('Request Approved', `Organizer approved pickup for ${donationId}. Ready for dispatch.`, 'success', donationId);
      showToast('Pickup request approved! Contact details and address are now accessible to the recipient.', 'success');
    } else {
      addNotification('Request Declined', `Pickup request for ${donationId} was declined and relisted.`, 'warning', donationId);
      showToast('Pickup request declined. Donation is relisted as available.', 'info');
    }
  };

  const assignVolunteerMission = (donationId: string, volunteerId: string, volunteerName: string) => {
    setDonations(prev =>
      prev.map(item => {
        if (item.id === donationId) {
          return {
            ...item,
            assignedVolunteerId: volunteerId,
            assignedVolunteerName: volunteerName
          };
        }
        return item;
      })
    );

    addNotification('Volunteer En Route', `${volunteerName} took charge of pickup mission for ${donationId}.`, 'info', donationId);
    showToast(`Volunteer ${volunteerName} assigned to mission!`, 'success');
  };

  const markCollected = (donationId: string) => {
    setDonations(prev =>
      prev.map(item => {
        if (item.id === donationId) {
          return {
            ...item,
            status: 'collected',
            collectedAt: new Date().toISOString()
          };
        }
        return item;
      })
    );

    addNotification('Donation Collected', `Volunteer has picked up items for ${donationId} and is en route to recipient.`, 'info', donationId);
    showToast('Marked as Collected! Rescue items are in transit.', 'success');
  };

  const markDelivered = (donationId: string, deliveryNotes: string) => {
    setDonations(prev =>
      prev.map(item => {
        if (item.id === donationId) {
          return {
            ...item,
            status: 'delivered',
            deliveredAt: new Date().toISOString(),
            deliveryNotes
          };
        }
        return item;
      })
    );

    addNotification('Delivery Completed', `Items safely delivered for ${donationId}. Impact successfully recorded!`, 'success', donationId);
    showToast('Delivery completed! Thank you for turning leftovers into hope.', 'success');
  };

  const cancelDonation = (donationId: string) => {
    setDonations(prev =>
      prev.map(item => {
        if (item.id === donationId) {
          return {
            ...item,
            status: 'cancelled'
          };
        }
        return item;
      })
    );
    showToast('Donation listing has been cancelled.', 'info');
  };

  const resetDemoData = () => {
    setDonations(INITIAL_DONATIONS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Demo data reset to initial showcase state.', 'info');
  };

  // Aggregated dynamic stats
  const stats = {
    totalMealsRescued: donations.reduce((sum, d) => sum + (d.status === 'delivered' || d.status === 'collected' ? d.impactMetrics.estimatedMeals : 0), 3840),
    totalKgWastePrevented: donations.reduce((sum, d) => sum + (d.status === 'delivered' || d.status === 'collected' ? Math.round(d.impactMetrics.co2SavedKg * 0.45) : 0), 1950),
    totalCompletedDonations: donations.filter(d => d.status === 'delivered').length + 42,
    activePartners: 38,
    co2SavedKg: donations.reduce((sum, d) => sum + (d.status === 'delivered' || d.status === 'collected' ? d.impactMetrics.co2SavedKg : 0), 4850)
  };

  const currentUser = DEMO_USERS[currentRole] || DEMO_USERS.guest;

  return (
    <RescueContext.Provider
      value={{
        donations,
        currentUser,
        setCurrentRole,
        notifications,
        createDonation,
        requestPickup,
        reviewPickupRequest,
        assignVolunteerMission,
        markCollected,
        markDelivered,
        cancelDonation,
        resetDemoData,
        toast,
        showToast,
        clearToast,
        stats
      }}
    >
      {children}
    </RescueContext.Provider>
  );
};

export const useRescue = () => {
  const context = useContext(RescueContext);
  if (!context) {
    throw new Error('useRescue must be used within a RescueProvider');
  }
  return context;
};
