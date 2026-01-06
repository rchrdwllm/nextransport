"use client";

import React, { useState, useEffect } from "react";
import { 
  User, MapPin, HelpCircle, Star, Users, Settings, ChevronRight, 
  ArrowLeft, Wallet, Edit 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();

  const defaultUser = {
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan.delacruz@email.com',
    phone: '0917****123',
    avatar: null as string | null,
    balance: 250.00
  };

  const [user, setUser] = useState(defaultUser);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) setUser(JSON.parse(savedUser));
    else localStorage.setItem('userProfile', JSON.stringify(defaultUser));
  }, []);

  // Listen for updates to keep profile data in sync
  useEffect(() => {
    const handleUpdate = () => {
      const savedUser = localStorage.getItem('userProfile');
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('profileUpdated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('profileUpdated', handleUpdate);
    };
  }, []);

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  const menuItems = [
    { icon: <MapPin className="w-6 h-6 text-blue-600" />, label: "Region: Mega Manila", onClick: () => console.log("Region clicked") },
    { icon: <HelpCircle className="w-6 h-6 text-blue-600" />, label: "Support", onClick: () => console.log("Support clicked") },
    { icon: <Star className="w-6 h-6 text-blue-600" />, label: "Rate App", onClick: () => console.log("Rate App clicked") },
    { icon: <Users className="w-6 h-6 text-blue-600" />, label: "Drive with NexTranspo", onClick: () => console.log("Drive clicked") },
    { icon: <Settings className="w-6 h-6 text-blue-600" />, label: "Settings", onClick: () => console.log("Settings clicked") },
  ];

  const handleEditProfile = () => router.push('/profile/edit');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- FIXED HEADER SECTION --- */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 flex items-center border-b border-gray-100">
        <button 
          onClick={() => router.push('/dashboard')}
          className="p-2 hover:bg-gray-100 rounded-full mr-4 transition-colors group"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600 group-active:scale-95 transition-transform" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Account</h1>
      </div>

      {/* --- PROFILE SECTION --- */}
      <div className="bg-gray-50 px-4 py-8 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-44 h-44 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-white">
            {user.avatar ? (
              <img src={user.avatar} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-5xl">
                  {user.firstName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleEditProfile}
            className="absolute bottom-2 right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-emerald-600 transition-colors"
          >
            <Edit className="w-5 h-5 text-white" />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{fullName}</h2>
        <p className="text-sm text-gray-500 mb-6">{user.email}</p>
        <p className="text-sm text-gray-500 mb-4">{user.phone}</p>
        <button
          onClick={handleEditProfile}
          className="px-12 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-full hover:bg-emerald-50 transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* --- WIDGETS SECTION --- */}
      <div className="px-4 py-4">
        <div className="bg-emerald-500 rounded-2xl p-6 shadow-md text-white">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Current Balance</span>
          </div>
          <p className="text-3xl font-bold">₱{user.balance.toFixed(2)}</p>
        </div>
      </div>

      {/* --- MENU SECTION --- */}
      <div className="px-4 pb-24 mt-4">
        <h3 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-3 px-2">My Account</h3>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-gray-900 font-bold text-sm">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
