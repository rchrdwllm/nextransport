// components/ui/FuelCalc.tsx
'use client';

import React from 'react';
import { Navigation, Clock, Bus, Car, Zap, ThumbsUp, ThumbsDown, MapPin } from 'lucide-react';

// ==================== HEADER ====================
export const Header = () => (
  <div className="bg-white shadow-sm">
    <div className="max-w-md mx-auto px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
          <Navigation className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold">
            <span className="text-green-500">NEX</span>
            <span className="text-gray-900">TRANSPO</span>
          </h1>
          <p className="text-xs text-gray-500">Smart Route Planning</p>
        </div>
      </div>
    </div>
  </div>
);

// ==================== TRIP INFO CARD ====================
interface TripInfoCardProps {
  from: string;
  to: string;
  distance: number;
  estimatedTime: number;
}

export const TripInfoCard: React.FC<TripInfoCardProps> = ({ from, to, distance, estimatedTime }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
    <h2 className="font-semibold text-gray-800 mb-3">Your Trip</h2>
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">From</p>
          <p className="font-medium text-gray-900">{from}</p>
        </div>
      </div>
      <div className="border-l-2 border-dashed border-gray-300 ml-1.5 h-4"></div>
      <div className="flex items-start gap-3">
        <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">To</p>
          <p className="font-medium text-gray-900">{to}</p>
        </div>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">{distance} km</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">~{estimatedTime} min</span>
      </div>
    </div>
  </div>
);

// ==================== BUDGET SELECTOR ====================
interface BudgetSelectorProps {
  confidence: 'low' | 'medium' | 'high';
  setConfidence: (level: 'low' | 'medium' | 'high') => void;
}

export const BudgetSelector: React.FC<BudgetSelectorProps> = ({ confidence, setConfidence }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
    <h3 className="font-semibold text-gray-800 mb-3">How's your budget today?</h3>
    <div className="flex gap-2">
      {(['low', 'medium', 'high'] as const).map((level) => (
        <button
          key={level}
          onClick={() => setConfidence(level)}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            confidence === level
              ? 'bg-green-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

// ==================== TRANSPORT OPTION CARD ====================
interface TransportOption {
  type: string;
  cost: number;
  estimatedTime: number;
  waitTime: number;
  co2: number;
}

interface TransportOptionCardProps {
  option: TransportOption;
  type: 'publicTransport' | 'ridehailing';
  isRecommended: boolean;
  isSelected: boolean;
  onSelect: (type: 'publicTransport' | 'ridehailing') => void;
  isComputed: boolean;
}

export const TransportOptionCard: React.FC<TransportOptionCardProps> = ({ 
  option, 
  type, 
  isRecommended, 
  isSelected, 
  onSelect,
  isComputed 
}) => {
  const iconBg = type === 'publicTransport' ? 'bg-blue-100' : 'bg-purple-100';
  const iconColor = type === 'publicTransport' ? 'text-blue-600' : 'text-purple-600';
  const Icon = type === 'publicTransport' ? Bus : Car;

  return (
    <div
      onClick={() => isComputed && onSelect(type)}
      className={`bg-white rounded-2xl shadow-md p-5 transition-all ${
        isComputed ? 'cursor-pointer' : 'opacity-60'
      } ${
        isSelected ? 'ring-2 ring-green-500' : ''
      } ${isRecommended && isComputed ? 'ring-2 ring-blue-400' : ''}`}
    >
      {isRecommended && isComputed && (
        <div className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
          ⭐ RECOMMENDED
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{option.type}</h3>
            <p className="text-xs text-gray-500">
              {type === 'publicTransport' ? 'Public Transport' : 'Ride-hailing'}
            </p>
          </div>
        </div>
        <div className="text-right">
          {isComputed ? (
            <p className="text-2xl font-bold text-gray-900">₱{option.cost}</p>
          ) : (
            <p className="text-sm text-gray-400">Tap compute</p>
          )}
        </div>
      </div>
      {isComputed && (
        <>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{option.estimatedTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${type === 'publicTransport' ? 'text-green-500' : 'text-orange-500'}`} />
              <span className="text-gray-600">{option.co2} kg CO₂</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Wait time: ~{option.waitTime} min</p>
          </div>
        </>
      )}
    </div>
  );
};

// ==================== COMPARISON INSIGHT ====================
interface ComparisonInsightProps {
  savings: string;
  timeDiff: number;
}

export const ComparisonInsight: React.FC<ComparisonInsightProps> = ({ savings, timeDiff }) => (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
    <h4 className="font-semibold text-gray-800 mb-2">💡 Quick Insight</h4>
    <p className="text-sm text-gray-700">
      Taking public transport saves you <span className="font-bold">₱{savings}</span> but 
      adds <span className="font-bold">{timeDiff} minutes</span> to your journey.
    </p>
  </div>
);

// ==================== FEEDBACK CARD ====================
interface FeedbackCardProps {
  onFeedback: (helpful: boolean) => void;
  feedback: boolean | null;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ onFeedback, feedback }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 animate-fadeIn">
    <h4 className="font-semibold text-gray-800 mb-3">Was this recommendation helpful?</h4>
    <div className="flex gap-3">
      <button
        onClick={() => onFeedback(true)}
        className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
          feedback === true
            ? 'bg-green-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <ThumbsUp className="w-5 h-5" />
        Yes
      </button>
      <button
        onClick={() => onFeedback(false)}
        className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
          feedback === false
            ? 'bg-red-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <ThumbsDown className="w-5 h-5" />
        No
      </button>
    </div>
    {feedback !== null && (
      <p className="text-sm text-center text-gray-600 mt-3">
        Thank you for your feedback! 🙏
      </p>
    )}
  </div>
);