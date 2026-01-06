"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

function SplashScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 px-4">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[-30%] left-[-20%] w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full bg-gradient-to-br from-emerald-400/20 via-teal-300/15 to-transparent blur-[120px] animate-pulse" 
          style={{ animationDuration: '8s' }}
        />
        <div 
          className="absolute bottom-[-30%] right-[-20%] w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] rounded-full bg-gradient-to-tl from-emerald-300/15 via-green-200/10 to-transparent blur-[100px] animate-pulse" 
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
        <div 
          className="absolute top-[40%] right-[15%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-teal-200/10 blur-[90px] animate-pulse" 
          style={{ animationDuration: '7s', animationDelay: '1s' }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400/30 animate-float-particle" style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute top-[60%] left-[20%] w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-teal-300/25 animate-float-particle" style={{ animationDelay: '1s', animationDuration: '8s' }} />
        <div className="absolute top-[30%] right-[15%] w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-300/20 animate-float-particle" style={{ animationDelay: '2s', animationDuration: '7s' }} />
        <div className="absolute top-[70%] right-[25%] w-1 h-1 rounded-full bg-green-400/30 animate-float-particle" style={{ animationDelay: '3s', animationDuration: '9s' }} />
        <div className="absolute top-[45%] left-[30%] w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-teal-400/20 animate-float-particle" style={{ animationDelay: '1.5s', animationDuration: '7.5s' }} />
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(16, 185, 129) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(16, 185, 129) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-md">
        {/* Pin Logo with enhanced effects */}
        <div
          className={`-mb-20 sm:-mb-32 md:-mb-48 transition-all duration-700 ease-out ${
            loaded
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 -translate-y-6"
          }`}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-2xl scale-110 animate-pulse" style={{ animationDuration: '3s' }} />
            
            {/* Main logo container */}
            <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[130px] md:h-[130px] rounded-full bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/30 border-[2px] sm:border-[3px] border-white shadow-[0_8px_32px_rgba(16,185,129,0.2),0_0_80px_rgba(16,185,129,0.1),inset_0_0_20px_rgba(255,255,255,0.8)] flex items-center justify-center backdrop-blur-sm overflow-hidden">
              {/* Inner decorative rings */}
              <div className="absolute inset-2 sm:inset-3 rounded-full border border-emerald-200/30" />
              <div className="absolute inset-4 sm:inset-6 rounded-full border border-emerald-100/20" />
              
              {/* Rotating accent */}
              <div className="absolute inset-0 rounded-full animate-spin-slow">
                <div className="absolute top-1 sm:top-2 left-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 -translate-x-1/2 blur-[1px] shadow-lg shadow-emerald-400/50" />
              </div>

              <div className="animate-float scale-150">
                <Image 
                  src="/assets/icons/pinlogo.png" 
                  alt="NexTranspo Pin Logo" 
                  width={65} 
                  height={75}
                  className="drop-shadow-[0_4px_20px_rgba(16,185,129,0.4)] sm:w-[80px] sm:h-[90px] md:w-[95px] md:h-[105px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* NexTranspo Logo with glow */}
        <div
          className={`mb-4 sm:mb-6 transition-all duration-700 delay-200 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative w-full flex justify-center">
            <div className="absolute inset-0 blur-xl opacity-30 flex justify-center">
              <Image 
                src="/assets/icons/nextranspo.png" 
                alt="NexTranspo Logo" 
                width={320}
                height={70}
                className="object-contain sm:hidden"
              />
              <Image 
                src="/assets/icons/nextranspo.png" 
                alt="NexTranspo Logo" 
                width={480}
                height={80}
                className="object-contain hidden sm:block md:hidden"
              />
              <Image 
                src="/assets/icons/nextranspo.png" 
                alt="NexTranspo Logo" 
                width={620}
                height={90}
                className="object-contain hidden md:block"
              />
            </div>
            <Image 
              src="/assets/icons/nextranspo.png" 
              alt="NexTranspo Logo" 
              width={320}
              height={70}
              className="relative z-10 drop-shadow-[0_4px_16px_rgba(16,185,129,0.15)] object-contain sm:hidden"
            />
            <Image 
              src="/assets/icons/nextranspo.png" 
              alt="NexTranspo Logo" 
              width={480}
              height={80}
              className="relative z-10 drop-shadow-[0_4px_16px_rgba(16,185,129,0.15)] object-contain hidden sm:block md:hidden"
            />
            <Image 
              src="/assets/icons/nextranspo.png" 
              alt="NexTranspo Logo" 
              width={620}
              height={90}
              className="relative z-10 drop-shadow-[0_4px_16px_rgba(16,185,129,0.15)] object-contain hidden md:block"
            />
          </div>
        </div>

        {/* Enhanced Loading indicator */}
        <div
          className={`flex flex-col items-center gap-3 sm:gap-4 transition-all duration-700 delay-400 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Loading dots with trail effect */}
          <div className="flex gap-2 sm:gap-3 relative">
            <span className="relative">
              <span className="absolute inset-0 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400/30 blur-sm animate-bounce" />
              <span className="relative block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-400/40 animate-bounce" />
            </span>
            <span
              className="relative"
              style={{ animationDelay: "0.15s" }}
            >
              <span className="absolute inset-0 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-teal-400/30 blur-sm animate-bounce" style={{ animationDelay: "0.15s" }} />
              <span className="relative block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 shadow-lg shadow-teal-400/40 animate-bounce" style={{ animationDelay: "0.15s" }} />
            </span>
            <span
              className="relative"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="absolute inset-0 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400/30 blur-sm animate-bounce" style={{ animationDelay: "0.3s" }} />
              <span className="relative block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-400/40 animate-bounce" style={{ animationDelay: "0.3s" }} />
            </span>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm tracking-[0.15em] font-light uppercase">
            Loading your routes
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.4;
          }
          75% {
            opacity: 0.5;
          }
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;