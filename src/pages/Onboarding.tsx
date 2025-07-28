import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/components/LanguageContext';
import { MobileLayout } from '@/components/MobileLayout';
import { MapPin, Search, Shield } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta' as const, name: 'தமிழ்', flag: '🇮🇳' }
  ];

  return (
    <MobileLayout className="bg-gradient-primary">
      <div className="px-6 py-12 min-h-screen flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Search className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            {t('welcome')}
          </h1>
          <p className="text-white/80 text-lg mb-8">
            {t('subtitle')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 mb-12">
          <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-white font-medium">Real-time Tracking</h3>
                <p className="text-white/70 text-sm">Find items across the transport network</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-white font-medium">Secure & Private</h3>
                <p className="text-white/70 text-sm">Your data is protected and encrypted</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Language Selection */}
        <div className="mb-8">
          <h2 className="text-white font-semibold text-lg mb-4 text-center">
            {t('selectLanguage')}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "secondary" : "outline"}
                className={`
                  h-14 justify-start text-left
                  ${language === lang.code 
                    ? 'bg-white text-primary border-white' 
                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                  }
                `}
                onClick={() => setLanguage(lang.code)}
              >
                <span className="mr-3 text-xl">{lang.flag}</span>
                <span className="text-lg">{lang.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <Button 
          onClick={onComplete}
          className="w-full h-14 text-lg font-semibold bg-white text-primary hover:bg-white/90"
        >
          {t('continue')}
        </Button>
      </div>
    </MobileLayout>
  );
}