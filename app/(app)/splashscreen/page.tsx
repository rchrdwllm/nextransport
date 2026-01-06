'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/ui/SplashScreen';
import { MobileLayout } from "@/components/layout/mobile-layout";

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.push('/sign-in');
    }, 3500);
    return () => clearTimeout(timer);
  }, [router]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return null;
}