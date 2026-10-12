import React, { useState } from 'react';
import { RescueProvider } from './context/RescueContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { LandingPage } from './components/LandingPage';
import { BrowseDonations } from './components/BrowseDonations';
import { HowItWorksView } from './components/HowItWorksView';
import { ImpactDashboardView } from './components/ImpactDashboardView';
import { ProjectOverview } from './components/ProjectOverview';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { NgoDashboard } from './components/NgoDashboard';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CreateDonationModal } from './components/CreateDonationModal';
import { DonationDetailModal } from './components/DonationDetailModal';
import { RequestPickupModal } from './components/RequestPickupModal';
import { DonationItem } from './types';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);
  const [pickupTargetDonation, setPickupTargetDonation] = useState<DonationItem | null>(null);

  const handleSelectDonation = (donation: DonationItem) => {
    setSelectedDonation(donation);
  };

  const handleRequestPickup = (donation: DonationItem) => {
    setSelectedDonation(null);
    setPickupTargetDonation(donation);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <LandingPage
            onSelectDonation={handleSelectDonation}
            onRequestPickup={handleRequestPickup}
            openCreateModal={() => setIsCreateModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        );
      case 'browse':
        return (
          <BrowseDonations
            onSelectDonation={handleSelectDonation}
            onRequestPickup={handleRequestPickup}
            openCreateModal={() => setIsCreateModalOpen(true)}
          />
        );
      case 'how-it-works':
        return (
          <HowItWorksView
            openCreateModal={() => setIsCreateModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        );
      case 'impact':
        return <ImpactDashboardView />;
      case 'project-overview':
        return <ProjectOverview />;
      case 'organizer-dashboard':
        return (
          <OrganizerDashboard
            openCreateModal={() => setIsCreateModalOpen(true)}
            onSelectDonation={handleSelectDonation}
          />
        );
      case 'ngo-dashboard':
        return (
          <NgoDashboard
            onSelectDonation={handleSelectDonation}
            onRequestPickup={handleRequestPickup}
          />
        );
      case 'volunteer-dashboard':
        return (
          <VolunteerDashboard
            onSelectDonation={handleSelectDonation}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard
            onSelectDonation={handleSelectDonation}
          />
        );
      default:
        return (
          <LandingPage
            onSelectDonation={handleSelectDonation}
            onRequestPickup={handleRequestPickup}
            openCreateModal={() => setIsCreateModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Modals */}
      <CreateDonationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccessNavigate={() => setActiveTab('browse')}
      />

      <DonationDetailModal
        donation={selectedDonation}
        onClose={() => setSelectedDonation(null)}
        onRequestPickupClick={handleRequestPickup}
      />

      <RequestPickupModal
        donation={pickupTargetDonation}
        onClose={() => setPickupTargetDonation(null)}
      />

      {/* Non-blocking Toast Feedback */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <RescueProvider>
      <MainApp />
    </RescueProvider>
  );
}
