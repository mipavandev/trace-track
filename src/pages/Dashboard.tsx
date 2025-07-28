import React from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { ActionCard } from '@/components/ActionCard';
import { useLanguage } from '@/components/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  Search, 
  MapPin, 
  Bell, 
  Settings, 
  Clock,
  Package,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { t } = useLanguage();

  const recentActivities = [
    {
      id: 1,
      type: 'lost',
      item: 'iPhone 15',
      time: '2h ago',
      status: 'searching',
      route: 'Metro Line 2'
    },
    {
      id: 2,
      type: 'match',
      item: 'Black Wallet',
      time: '1d ago',
      status: 'matched',
      route: 'Bus #42'
    },
    {
      id: 3,
      type: 'claim',
      item: 'Backpack',
      time: '3d ago',
      status: 'completed',
      route: 'Central Station'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'searching':
        return <Search className="w-4 h-4 text-amber-500" />;
      case 'matched':
        return <AlertCircle className="w-4 h-4 text-indigo-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default:
        return <Clock className="w-4 h-4 text-neutral-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'searching':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'matched':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    }
  };

  const Header = () => (
    <div className="p-6 bg-white border-b border-neutral-100">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 bg-neutral-100 border border-neutral-200">
            <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">U</span>
            </div>
          </Avatar>
          <div>
            <h1 className="text-neutral-900 text-xl font-bold">Good morning!</h1>
            <p className="text-neutral-500 text-sm">How can we help you today?</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-neutral-600 hover:bg-neutral-100 h-9 w-9"
            onClick={() => onNavigate('notifications')}
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-neutral-600 hover:bg-neutral-100 h-9 w-9"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <MobileLayout header={<Header />} showSafeArea={false}>
      <div className="px-6 py-8">
        
        {/* Quick Actions */}
        <div className="space-y-4 mb-10">
          <ActionCard
            icon={<Search />}
            title={t('reportLostItem')}
            description="Tell us what you've lost"
            variant="primary"
            onClick={() => onNavigate('report-lost')}
          />
          
          <ActionCard
            icon={<Package />}
            title={t('foundSomething')}
            description="Help someone find their item"
            variant="emerald"
            onClick={() => onNavigate('report-found')}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <ActionCard
              icon={<Clock />}
              title={t('trackClaim')}
              description="Check status"
              variant="amber"
              size="sm"
              onClick={() => onNavigate('track-claim')}
            />
            
            <ActionCard
              icon={<MapPin />}
              title={t('nearbyDepots')}
              description="Find locations"
              variant="rose"
              size="sm"
              onClick={() => onNavigate('map')}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-5">{t('recentActivity')}</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <Card key={activity.id} className="p-4 hover-lift bg-white border-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-200">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{activity.item}</h3>
                      <p className="text-sm text-neutral-600">
                        {activity.route} • {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-medium border
                    ${getStatusColor(activity.status)}
                  `}>
                    {activity.status}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Card */}
        <Card className="p-6 bg-white border-neutral-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-neutral-900 text-lg font-semibold">
              Community Impact
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900 mb-1">1,247</div>
              <div className="text-neutral-500 text-sm">Items Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900 mb-1">96%</div>
              <div className="text-neutral-500 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900 mb-1">24h</div>
              <div className="text-neutral-500 text-sm">Avg Time</div>
            </div>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
}