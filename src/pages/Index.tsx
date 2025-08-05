import React, { useState } from 'react';
import { LanguageProvider } from '@/components/LanguageContext';
import { Onboarding } from '@/pages/Onboarding';
import { Dashboard } from '@/pages/Dashboard';
import { ReportLost } from '@/pages/ReportLost';
import { Settings } from '@/pages/Settings';
import { Notifications } from '@/pages/Notifications';
import { useToast } from '@/hooks/use-toast';

type Screen = 'onboarding' | 'dashboard' | 'report-lost' | 'settings' | 'notifications' | 'report-found' | 'track-claim' | 'map';

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

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        {renderScreen()}
      </div>
    </LanguageProvider>
  );
};

export default Index;
