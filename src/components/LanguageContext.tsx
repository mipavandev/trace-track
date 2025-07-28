import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'ta';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    ta: string;
  };
}

const translations: Translations = {
  appName: {
    en: 'TraceTrack',
    hi: 'ट्रेसट्रैक',
    ta: 'டிரேஸ்ட்ராக்'
  },
  welcome: {
    en: 'Welcome to TraceTrack',
    hi: 'ट्रेसट्रैक में आपका स्वागत है',
    ta: 'டிரேஸ்ட்ராக்கில் உங்களை வரவேற்கிறோம்'
  },
  subtitle: {
    en: 'Smart Lost & Found for Public Transport',
    hi: 'सार्वजनिक परिवहन के लिए स्मार्ट खो गया और मिल गया',
    ta: 'பொது போக்குவரத்துக்கான ஸ்மார்ட் இழந்த மற்றும் கண்டுபிடித்தல்'
  },
  selectLanguage: {
    en: 'Select Language',
    hi: 'भाषा चुनें',
    ta: 'மொழியைத் தேர்ந்தெடுக்கவும்'
  },
  continue: {
    en: 'Continue',
    hi: 'जारी रखें',
    ta: 'தொடர்க'
  },
  reportLostItem: {
    en: 'Report Lost Item',
    hi: 'खोई वस्तु की रिपोर्ट करें',
    ta: 'இழந்த பொருளைப் புகாரளிக்கவும்'
  },
  foundSomething: {
    en: 'Found Something?',
    hi: 'कुछ मिला?',
    ta: 'ஏதாவது கண்டுபிடித்தீர்களா?'
  },
  trackClaim: {
    en: 'Track Claim',
    hi: 'दावे को ट्रैक करें',
    ta: 'கோரிக்கையைக் கண்காணிக்கவும்'
  },
  nearbyDepots: {
    en: 'Nearby Depots',
    hi: 'नजदीकी डिपो',
    ta: 'அருகிலுள்ள டிப்போக்கள்'
  },
  recentActivity: {
    en: 'Recent Activity',
    hi: 'हाल की गतिविधि',
    ta: 'சமீபத்திய செயல்பாடு'
  },
  notifications: {
    en: 'Notifications',
    hi: 'सूचनाएं',
    ta: 'அறிவிப்புகள்'
  },
  settings: {
    en: 'Settings',
    hi: 'सेटिंग्स',
    ta: 'அமைப்புகள்'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}