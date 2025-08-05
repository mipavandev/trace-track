import React, { useState } from 'react';
import { LanguageProvider } from '@/components/LanguageContext';
import { BottomNavbar } from '@/components/BottomNavbar';
import { Onboarding } from '@/pages/Onboarding';
import { Dashboard } from '@/pages/Dashboard';
import { ReportLost } from '@/pages/ReportLost';
import { Settings } from '@/pages/Settings';
import { Notifications } from '@/pages/Notifications';
import { Search } from '@/pages/Search';
import { useToast } from '@/hooks/use-toast';

type Screen = 'onboarding' | 'dashboard' | 'reportLost' | 'report-lost' | 'settings' | 'notifications' | 'search' | 'report-found' | 'track-claim' | 'map';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const { toast } = useToast();

  const handleOnboardingComplete = () => {
    setHasOnboarded(true);
    setCurrentScreen('dashboard');
    toast({
      title: "Welcome to TraceTrack! 🚀",
      description: "Start by reporting a lost item or helping others find theirs.",
    });
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBottomNavChange = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        setCurrentScreen('dashboard');
        break;
      case 'report':
        setCurrentScreen('reportLost');
        break;
      case 'notifications':
        setCurrentScreen('notifications');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
      case 'search':
        setCurrentScreen('search');
        break;
    }
  };

  const handleSubmitReport = () => {
    toast({
      title: "Report Submitted Successfully! ✅",
      description: "We'll notify you immediately when a matching item is found.",
    });
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      
      case 'report-lost':
      case 'reportLost':
        return (
          <ReportLost 
            onBack={() => setCurrentScreen('dashboard')} 
            onSubmit={handleSubmitReport}
          />
        );
      
      case 'settings':
        return <Settings onBack={() => setCurrentScreen('dashboard')} />;
      
      case 'notifications':
        return <Notifications onBack={() => setCurrentScreen('dashboard')} />;
      
      case 'search':
        return <Search onBack={() => setCurrentScreen('dashboard')} />;
      
      
      case 'report-found':
        toast({
          title: "Feature Coming Soon! 🚧",
          description: "Report found items feature is in development.",
        });
        setCurrentScreen('dashboard');
        return null;
      
      case 'track-claim':
        toast({
          title: "Feature Coming Soon! 🚧", 
          description: "Track claim feature is in development.",
        });
        setCurrentScreen('dashboard');
        return null;
      
      case 'map':
        toast({
          title: "Feature Coming Soon! 🚧",
          description: "Map view feature is in development.",
        });
        setCurrentScreen('dashboard');
        return null;
      
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const getActiveTab = () => {
    switch (currentScreen) {
      case 'dashboard': return 'dashboard';
      case 'reportLost': return 'report';
      case 'report-lost': return 'report';
      case 'notifications': return 'notifications';
      case 'search': return 'search';
      case 'settings': return 'settings';
      default: return 'dashboard';
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/10">
        {renderScreen()}
        {hasOnboarded && (
          <BottomNavbar 
            activeTab={getActiveTab()} 
            onTabChange={handleBottomNavChange}
          />
        )}
      </div>
    </LanguageProvider>
  );
};

export default Index;
