import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/components/LanguageContext';
import { MobileLayout } from '@/components/MobileLayout';
import { Search, Shield, Sparkles, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <MobileLayout className="bg-white">
      <div className="px-8 py-16 min-h-screen flex flex-col justify-center">
        
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Search className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">
            {t('welcome')}
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-12">
          <Card className="p-5 bg-white border-neutral-200 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Smart Matching</h3>
                <p className="text-neutral-600 text-sm">AI-powered item recognition</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 bg-white border-neutral-200 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Secure & Private</h3>
                <p className="text-neutral-600 text-sm">Your data is protected</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Language Selection */}
        <div className="mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-neutral-600" />
              <h2 className="font-semibold text-neutral-900">
                {t('selectLanguage')}
              </h2>
            </div>
          </div>
          
          <div className="space-y-3">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                className={cn(
                  "w-full h-14 justify-start text-left border-neutral-200",
                  language === lang.code 
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm' 
                    : 'bg-white text-neutral-900 hover:bg-neutral-50'
                )}
                onClick={() => setLanguage(lang.code)}
              >
                <span className="mr-3 text-xl">{lang.flag}</span>
                <span className="text-base font-medium">{lang.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <Button 
          onClick={onComplete}
          className="w-full h-14 text-base font-semibold bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm"
        >
          {t('continue')}
        </Button>
      </div>
    </MobileLayout>
  );
}