import React from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageContext';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Clock,
  Search
} from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

export function Notifications({ onBack }: NotificationsProps) {
  const { t } = useLanguage();

  const notifications = [
    {
      id: 1,
      type: 'match',
      title: 'Potential Match Found! 🎉',
      message: 'A phone matching your description was found on Bus #42',
      time: '5 minutes ago',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      unread: true,
      actionText: 'View Match'
    },
    {
      id: 2,
      type: 'update',
      title: 'Claim Status Update',
      message: 'Your wallet is ready for pickup at Central Depot',
      time: '2 hours ago',
      icon: <MapPin className="w-5 h-5 text-blue-500" />,
      unread: true,
      actionText: 'Get Directions'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Reminder: Verify Your Item',
      message: 'Please verify your backpack claim within 24 hours',
      time: '1 day ago',
      icon: <Clock className="w-5 h-5 text-orange-500" />,
      unread: false,
      actionText: 'Verify Now'
    },
    {
      id: 4,
      type: 'tip',
      title: 'Anonymous Tip Received',
      message: 'Someone reported seeing your lost keys in Metro Line 2',
      time: '2 days ago',
      icon: <Search className="w-5 h-5 text-purple-500" />,
      unread: false,
      actionText: 'View Details'
    },
    {
      id: 5,
      type: 'success',
      title: 'Item Successfully Returned! 🎊',
      message: 'Your headphones have been marked as returned. Thank you!',
      time: '3 days ago',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      unread: false
    }
  ];

  const Header = () => (
    <div className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-semibold">{t('notifications')}</h1>
        {notifications.filter(n => n.unread).length > 0 && (
          <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
            {notifications.filter(n => n.unread).length}
          </Badge>
        )}
      </div>
      <Button variant="ghost" size="sm" className="text-xs">
        Mark All Read
      </Button>
    </div>
  );

  return (
    <MobileLayout header={<Header />}>
      <div className="px-6 py-6">
        
        {/* Today Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Today
          </h2>
          <div className="space-y-3">
            {notifications.slice(0, 2).map((notification) => (
              <Card 
                key={notification.id}
                className={`p-4 hover-lift cursor-pointer ${
                  notification.unread ? 'border-primary/50 bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">
                        {notification.title}
                      </h3>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                      {notification.actionText && (
                        <Button size="sm" variant="ghost" className="text-xs h-7">
                          {notification.actionText}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Earlier Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Earlier
          </h2>
          <div className="space-y-3">
            {notifications.slice(2).map((notification) => (
              <Card 
                key={notification.id}
                className="p-4 hover-lift cursor-pointer opacity-80"
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                      {notification.actionText && (
                        <Button size="sm" variant="ghost" className="text-xs h-7">
                          {notification.actionText}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State (if no notifications) */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No notifications yet</h3>
            <p className="text-sm text-muted-foreground">
              We'll notify you about matches and updates here
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}