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
  AlertCircle
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
      item: 'Phone',
      time: '2 hours ago',
      status: 'searching',
      route: 'Bus #42'
    },
    {
      id: 2,
      type: 'found',
      item: 'Wallet',
      time: '1 day ago',
      status: 'matched',
      route: 'Metro Line 2'
    },
    {
      id: 3,
      type: 'claim',
      item: 'Backpack',
      time: '3 days ago',
      status: 'completed',
      route: 'Bus #15'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'searching':
        return <Search className="w-4 h-4 text-primary" />;
      case 'matched':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const Header = () => (
    <div className="p-6 bg-gradient-primary">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 bg-white/20 border-2 border-white/30">
            <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">U</span>
            </div>
          </Avatar>
          <div>
            <h1 className="text-white text-xl font-bold">Good morning!</h1>
            <p className="text-white/80 text-sm">How can we help you today?</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('notifications')}
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
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
      <div className="px-6 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <ActionCard
            icon={<Search />}
            title={t('reportLostItem')}
            description="Tell us what you've lost"
            gradient="primary"
            onClick={() => onNavigate('report-lost')}
          />
          
          <ActionCard
            icon={<Package />}
            title={t('foundSomething')}
            description="Help someone find their item"
            gradient="warm"
            onClick={() => onNavigate('report-found')}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <ActionCard
              icon={<Clock />}
              title={t('trackClaim')}
              description="Check status"
              gradient="trust"
              onClick={() => onNavigate('track-claim')}
            />
            
            <ActionCard
              icon={<MapPin />}
              title={t('nearbyDepots')}
              description="Find locations"
              gradient="primary"
              onClick={() => onNavigate('map')}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">{t('recentActivity')}</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <Card key={activity.id} className="p-4 hover-lift">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary rounded-full">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.item}</h3>
                      <p className="text-sm text-muted-foreground">
                        {activity.route} • {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'matched' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'}
                  `}>
                    {activity.status}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="p-6 bg-gradient-trust">
          <div className="text-center">
            <h3 className="text-white text-lg font-semibold mb-2">
              Community Impact
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-white/80 text-sm">Items Found</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">96%</div>
                <div className="text-white/80 text-sm">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-white/80 text-sm">Avg Time</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
}