"use client";

import React, { useState, useEffect } from "react";
import { User, MapPin, HelpCircle, Star, Users, Settings, ChevronRight, Wallet, Edit, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// UserProfile component
function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juan.delacruz@email.com",
    phone: "0917****123",
    avatar: null as string | null,
    balance: 250.0
  });

  // Load saved user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Listen for updates
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("userProfile");
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("profileUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileUpdated", handleStorageChange);
    };
  }, []);

  const menuItems = [
    { icon: <MapPin className="w-5 h-5" />, label: "Region: Quezon City", onClick: () => console.log("Region clicked") },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Support", onClick: () => console.log("Support clicked") },
    { icon: <Star className="w-5 h-5" />, label: "Rate App", onClick: () => console.log("Rate App clicked") },
    { icon: <Users className="w-5 h-5" />, label: "Share with Friends", onClick: () => console.log("Share clicked") },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", onClick: () => console.log("Settings clicked") }
  ];

  const fullName = `${user?.firstName || "User"} ${user?.lastName || ""}`.trim();

  const handleEditProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    router.push("/profile/edit");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40">
      {/* Header with Back Arrow */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10 flex items-center">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-4"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Account</h1>
      </div>

      {/* Profile Section */}
      <div className="px-4 py-6">
        <div className="flex flex-col items-center">
          {/* Avatar with Edit Badge */}
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-1 shadow-xl shadow-emerald-200/50">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-emerald-500" />
                )}
              </div>
            </div>
            {/* Edit Badge */}
            <button
              onClick={handleEditProfile}
              className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-emerald-600 transition-colors"
            >
              <Edit className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* User Details */}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{fullName}</h2>
          <p className="text-sm text-gray-500 mb-1">{user.email}</p>
          <p className="text-sm text-gray-500 mb-4">{user.phone}</p>

          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfile}
            className="px-8 py-3 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-colors duration-200 shadow-sm flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Balance Widget */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Balance</span>
            </div>
            <p className="text-2xl font-bold">₱{user.balance.toFixed(2)}</p>
          </div>

          {/* Mobile Widget */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600">Mobile</span>
            </div>
            <p className="text-sm font-bold text-gray-900">{user.phone}</p>
          </div>
        </div>
      </div>

      {/* My Account Section */}
      <div className="px-4 pb-24">
        <h3 className="text-gray-500 font-medium text-sm mb-3 px-2">My Account</h3>
        <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  {item.icon}
                </div>
                <span className="text-gray-900 font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
