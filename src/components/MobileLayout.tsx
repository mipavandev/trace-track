import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  showSafeArea?: boolean;
}

export function MobileLayout({ 
  children, 
  className, 
  header,
  showSafeArea = true 
}: MobileLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-background",
      "max-w-md mx-auto relative",
      showSafeArea && "pt-safe-top pb-safe-bottom",
      className
    )}>
      {header && (
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
          {header}
        </div>
      )}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}