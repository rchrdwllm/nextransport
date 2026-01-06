"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: null as string | null,
    balance: 0
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user
  useEffect(() => {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData(user);
      setPreviewImage(user.avatar);
    } else {
      const defaultUser = { firstName:'Juan', lastName:'Dela Cruz', email:'juan.delacruz@email.com', phone:'0917****123', avatar:null, balance:250 };
      setFormData(defaultUser);
      localStorage.setItem('userProfile', JSON.stringify(defaultUser));
    }
    setIsLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => fileInputRef.current?.click();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('Only images allowed');
    if (file.size > 5 * 1024 * 1024) return alert('Max 5MB');

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setFormData(prev => ({ ...prev, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) return alert('First and last name are required');
    setIsSaving(true);
    localStorage.setItem('userProfile', JSON.stringify(formData));
    window.dispatchEvent(new Event('profileUpdated'));
    setTimeout(() => { setIsSaving(false); router.push('/profile'); }, 500);
  };

  const handleCancel = () => router.back();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10 flex items-center">
        <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-4">Edit Profile</h1>
      </div>

      {/* Form */}
      <div className="px-4 py-8 pb-24 space-y-6 max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {previewImage ? <img src={previewImage} alt="Avatar" className="w-full h-full object-cover"/> : <Camera className="w-12 h-12 text-gray-400" />}
            </div>
            <button onClick={handleImageClick} className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white hover:bg-emerald-600 transition-colors">
              <Camera className="w-5 h-5 text-white" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
          </div>
        </div>

        {['firstName','lastName','email','phone'].map(field => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field === 'firstName' ? 'First Name *' : field === 'lastName' ? 'Last Name *' : field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input
              type={field==='email'?'email':'text'}
              name={field}
              value={(formData as any)[field]}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <div className="space-y-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : <><Check className="w-5 h-5"/> Save Changes</>}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
