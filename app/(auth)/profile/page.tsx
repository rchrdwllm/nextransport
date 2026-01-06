"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  HelpCircle,
  Star,
  Users,
  Settings,
  ChevronRight,
  ArrowLeft,
  Edit,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { User as UserType } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      console.log({ user });
    };

    getUser();
  }, [router]);

  // Listen for updates to keep profile data in sync
  useEffect(() => {
    const handleUpdate = () => {
      const savedUser = localStorage.getItem("userProfile");
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("profileUpdated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("profileUpdated", handleUpdate);
    };
  }, []);

  const fullName =
    `${user?.user_metadata.firstName} ${user?.user_metadata.lastName}`.trim();

  const menuItems = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      label: "Region: Mega Manila",
      onClick: () => console.log("Region clicked"),
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-blue-600" />,
      label: "Support",
      onClick: () => console.log("Support clicked"),
    },
    {
      icon: <Star className="w-6 h-6 text-blue-600" />,
      label: "Rate App",
      onClick: () => console.log("Rate App clicked"),
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      label: "Drive with NexTranspo",
      onClick: () => console.log("Drive clicked"),
    },
    {
      icon: <Settings className="w-6 h-6 text-blue-600" />,
      label: "Settings",
      onClick: () => console.log("Settings clicked"),
    },
  ];

  const handleEditProfile = () => router.push("/profile/edit");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* --- FIXED HEADER SECTION --- */}
      <div className="top-0 z-10 sticky flex items-center bg-white px-4 py-4 border-gray-100 border-b">
        <button
          onClick={() => router.push("/dashboard")}
          className="group hover:bg-gray-100 mr-4 p-2 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600 group-active:scale-95 transition-transform" />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl">Account</h1>
      </div>

      {/* --- PROFILE SECTION --- */}
      <div className="flex flex-col items-center bg-gray-50 px-4 py-8">
        <div className="relative mb-4">
          <div className="flex justify-center items-center bg-white shadow-lg border-4 border-white rounded-full w-44 h-44 overflow-hidden">
            <div className="flex justify-center items-center bg-emerald-50 w-full h-full">
              <span className="font-bold text-emerald-600 text-5xl">
                {user?.user_metadata.firstName.charAt(0) || "J"}
              </span>
            </div>
          </div>
          <button
            onClick={handleEditProfile}
            className="right-2 bottom-2 absolute flex justify-center items-center bg-emerald-500 hover:bg-emerald-600 shadow-lg border-2 border-white rounded-full w-10 h-10 transition-colors"
          >
            <Edit className="w-5 h-5 text-white" />
          </button>
        </div>
        <h2 className="mb-2 font-bold text-gray-900 text-2xl">{fullName}</h2>
        <p className="mb-6 text-gray-500 text-sm">
          {user?.user_metadata.email || "juandela.cruz@gmail.com"}
        </p>
        <p className="mb-4 text-gray-500 text-sm">
          {user?.user_metadata.contactNo || "09994328588"}
        </p>
        <button
          onClick={handleEditProfile}
          className="hover:bg-emerald-50 px-12 py-3 border-2 border-emerald-600 rounded-full font-bold text-emerald-600 transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* --- MENU SECTION --- */}
      <div className="mt-4 px-4 pb-24">
        <h3 className="mb-3 px-2 font-bold text-[10px] text-gray-400 uppercase tracking-widest">
          My Account
        </h3>
        <div className="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className="flex justify-between items-center hover:bg-gray-50 px-6 py-5 border-gray-100 border-b last:border-b-0 w-full transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center bg-gray-50 rounded-xl w-10 h-10">
                  {item.icon}
                </div>
                <span className="font-bold text-gray-900 text-sm">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
