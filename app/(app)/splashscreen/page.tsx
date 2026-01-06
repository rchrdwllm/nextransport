'use client';
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/ui/SplashScreen';
import { MobileLayout } from "@/components/layout/mobile-layout";

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to NexTranspo
          </h1>
          <p className="text-gray-600">
            Dashboard coming soon...
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}