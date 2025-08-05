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
      "min-h-screen bg-gradient-to-br from-background to-muted/20",
      "max-w-md mx-auto relative",
      showSafeArea && "safe-area",
      className
    )}>
      {header && (
        <div className="sticky top-0 z-50 glass border-b border-border/20">
          {header}
        </div>
      )}
      <div className="relative pb-24">
        {children}
      </div>
    </div>
  );
}