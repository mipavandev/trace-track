import React from 'react';
import { cn } from '@/lib/utils';
import { Home, Search, Bell, Settings, Plus } from 'lucide-react';

interface BottomNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavbar({ activeTab, onTabChange }: BottomNavbarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'report', label: 'Report', icon: Plus, isSpecial: true },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
      <div className="glass border-t border-white/10 px-4 py-2 safe-area-bottom">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200",
                  tab.isSpecial
                    ? "w-14 h-14 bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg hover:scale-105 active:scale-95"
                    : isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon 
                  className={cn(
                    "transition-all",
                    tab.isSpecial 
                      ? "w-6 h-6" 
                      : isActive 
                      ? "w-5 h-5" 
                      : "w-5 h-5"
                  )} 
                />
                {!tab.isSpecial && (
                  <span className="text-xs font-medium mt-1">
                    {tab.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}