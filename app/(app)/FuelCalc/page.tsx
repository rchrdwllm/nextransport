// app/trip-planner/page.tsx
'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import {
  Header,
  TripInfoCard,
  BudgetSelector,
  TransportOptionCard,
  ComparisonInsight,
  FeedbackCard
} from '@/components/ui/FuelCalc';

export default function TripPlannerPage() {
  const [isComputed, setIsComputed] = useState(false);
  const [isComputing, setIsComputing] = useState(false);
  const [tripData] = useState({
    from: "SM City North EDSA",
    to: "Makati CBD",
    distance: 12.5,
    estimatedTime: 35
  });

  const [rideOptions] = useState({
    publicTransport: {
      type: "Jeepney/Bus",
      cost: 45,
      estimatedTime: 55,
      waitTime: 15,
      co2: 2.1
    },
    ridehailing: {
      type: "Book a Ride",
      cost: 185,
      estimatedTime: 28,
      waitTime: 5,
      co2: 4.8
    }
  });

  const [confidence, setConfidence] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedOption, setSelectedOption] = useState<'publicTransport' | 'ridehailing' | null>(null);
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const calculateSavings = () => {
    return (rideOptions.ridehailing.cost - rideOptions.publicTransport.cost).toFixed(0);
  };

  const calculateTimeDiff = () => {
    return (rideOptions.publicTransport.estimatedTime - rideOptions.ridehailing.estimatedTime);
  };

  const getRecommendation = (): 'publicTransport' | 'ridehailing' => {
    if (confidence === 'high') {
      return calculateTimeDiff() > 20 ? 'ridehailing' : 'publicTransport';
    } else if (confidence === 'low') {
      return 'publicTransport';
    }
    return Number(calculateSavings()) > 100 ? 'publicTransport' : 'ridehailing';
  };

  const recommendation = isComputed ? getRecommendation() : null;

  const handleCompute = () => {
    setIsComputing(true);
    // Simulate API call for computation
    setTimeout(() => {
      setIsComputing(false);
      setIsComputed(true);
    }, 1500);
  };

  const handleSelection = (option: 'publicTransport' | 'ridehailing') => {
    setSelectedOption(option);
  };

  const submitFeedback = (helpful: boolean) => {
    setFeedback(helpful);
    // Log user behavior for analytics
    console.log('User feedback:', {
      helpful,
      selected: selectedOption,
      recommended: recommendation,
      timestamp: new Date().toISOString()
    });
  };

  const handleBook = () => {
    if (!selectedOption) {
      alert('Please select a transport option first');
      return;
    }
    
    // Log booking data
    console.log('Booking:', {
      option: selectedOption,
      tripData,
      confidence,
      timestamp: new Date().toISOString()
    });
    
    alert(`Booking ${selectedOption === 'publicTransport' ? 'Public Transport' : 'a Ride'}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-green-50">
      <Header />

      <div className="max-w-md mx-auto px-4 py-6">
        <TripInfoCard 
          from={tripData.from}
          to={tripData.to}
          distance={tripData.distance}
          estimatedTime={tripData.estimatedTime}
        />

        <BudgetSelector 
          confidence={confidence}
          setConfidence={setConfidence}
        />

        {/* Compute Button */}
        {!isComputed && (
          <button
            onClick={handleCompute}
            disabled={isComputing}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
          >
            <Calculator className="w-5 h-5" />
            {isComputing ? 'Computing...' : 'Compute Trip Options'}
          </button>
        )}

        {/* Transport Options */}
        <div className="space-y-4">
          <TransportOptionCard
            option={rideOptions.publicTransport}
            type="publicTransport"
            isRecommended={recommendation === 'publicTransport'}
            isSelected={selectedOption === 'publicTransport'}
            onSelect={handleSelection}
            isComputed={isComputed}
          />

          <TransportOptionCard
            option={rideOptions.ridehailing}
            type="ridehailing"
            isRecommended={recommendation === 'ridehailing'}
            isSelected={selectedOption === 'ridehailing'}
            onSelect={handleSelection}
            isComputed={isComputed}
          />

          {isComputed && (
            <>
              <ComparisonInsight 
                savings={calculateSavings()}
                timeDiff={calculateTimeDiff()}
              />

              {selectedOption && (
                <FeedbackCard 
                  onFeedback={submitFeedback}
                  feedback={feedback}
                />
              )}

              {/* Book Button */}
              <button 
                onClick={handleBook}
                className={`w-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all ${
                  !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {selectedOption 
                  ? `Book ${selectedOption === 'publicTransport' ? 'Public Transport' : 'a Ride'}`
                  : 'Select an Option to Book'
                }
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}