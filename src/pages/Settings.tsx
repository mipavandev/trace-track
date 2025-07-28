import React from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/components/LanguageContext';
import { 
  ArrowLeft, 
  Bell, 
  Globe, 
  Moon, 
  Shield, 
  HelpCircle,
  Star,
  ChevronRight
} from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const { t, language, setLanguage } = useLanguage();

  const Header = () => (
    <div className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <h1 className="text-lg font-semibold">{t('settings')}</h1>
      <div className="w-10" />
    </div>
  );

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta' as const, name: 'தமிழ்', flag: '🇮🇳' }
  ];

  return (
    <MobileLayout header={<Header />}>
      <div className="px-6 py-6 space-y-6">
        
        {/* Language Settings */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-semibold">Language</span>
            </div>
          </div>
          <div className="space-y-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => setLanguage(lang.code)}
              >
                <div className="flex items-center space-x-3">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {language === lang.code && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </Button>
            ))}
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-primary" />
              <span className="font-semibold">Notifications</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Match Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when items match your reports
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Claim Updates</p>
                <p className="text-sm text-muted-foreground">
                  Status updates on your claims
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nearby Items</p>
                <p className="text-sm text-muted-foreground">
                  Items found near your usual routes
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Theme Settings */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch to dark theme
                </p>
              </div>
            </div>
            <Switch />
          </div>
        </Card>

        {/* Other Options */}
        <div className="space-y-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-semibold">Privacy & Security</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="font-semibold">Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-primary" />
                <span className="font-semibold">Rate the App</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* App Version */}
        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">
            TraceTrack v1.0.0
          </p>
          <p className="text-xs text-muted-foreground">
            Making public transport safer, one item at a time
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
