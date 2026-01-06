"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function SplashScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 px-4 min-h-screen overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="top-[-30%] left-[-20%] absolute bg-gradient-to-br from-emerald-400/20 via-teal-300/15 to-transparent blur-[120px] rounded-full w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="right-[-20%] bottom-[-30%] absolute bg-gradient-to-tl from-emerald-300/15 via-green-200/10 to-transparent blur-[100px] rounded-full w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div
          className="top-[40%] right-[15%] absolute bg-teal-200/10 blur-[90px] rounded-full w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "1s" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="top-[20%] left-[10%] absolute bg-emerald-400/30 rounded-full w-1.5 sm:w-2 h-1.5 sm:h-2 animate-float-particle"
          style={{ animationDelay: "0s", animationDuration: "6s" }}
        />
        <div
          className="top-[60%] left-[20%] absolute bg-teal-300/25 rounded-full w-1 sm:w-1.5 h-1 sm:h-1.5 animate-float-particle"
          style={{ animationDelay: "1s", animationDuration: "8s" }}
        />
        <div
          className="top-[30%] right-[15%] absolute bg-emerald-300/20 rounded-full w-2 sm:w-2.5 h-2 sm:h-2.5 animate-float-particle"
          style={{ animationDelay: "2s", animationDuration: "7s" }}
        />
        <div
          className="top-[70%] right-[25%] absolute bg-green-400/30 rounded-full w-1 h-1 animate-float-particle"
          style={{ animationDelay: "3s", animationDuration: "9s" }}
        />
        <div
          className="top-[45%] left-[30%] absolute bg-teal-400/20 rounded-full w-1 sm:w-1.5 h-1 sm:h-1.5 animate-float-particle"
          style={{ animationDelay: "1.5s", animationDuration: "7.5s" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(16, 185, 129) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(16, 185, 129) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <div className="z-10 relative flex flex-col items-center w-full max-w-md text-center">
        {/* Pin Logo with enhanced effects */}
        <div
          className={`relative z-20 transition-all duration-700 ease-out ${
            loaded
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 -translate-y-6"
          }`}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-2xl rounded-full scale-110 animate-pulse"
              style={{ animationDuration: "3s" }}
            />

            {/* Main logo container */}
            <div className="relative flex justify-center items-center bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/30 shadow-[0_8px_32px_rgba(16,185,129,0.2),0_0_80px_rgba(16,185,129,0.1),inset_0_0_20px_rgba(255,255,255,0.8)] backdrop-blur-sm border-[2px] border-white sm:border-[3px] rounded-full w-[100px] sm:w-[120px] md:w-[130px] h-[100px] sm:h-[120px] md:h-[130px] overflow-hidden">
              {/* Inner decorative rings */}
              <div className="absolute inset-2 sm:inset-3 border border-emerald-200/30 rounded-full" />
              <div className="absolute inset-4 sm:inset-6 border border-emerald-100/20 rounded-full" />

              {/* Rotating accent */}
              <div className="absolute inset-0 rounded-full animate-spin-slow">
                <div className="top-1 sm:top-2 left-1/2 absolute bg-gradient-to-r from-emerald-400 to-teal-400 shadow-emerald-400/50 shadow-lg blur-[1px] rounded-full w-1.5 sm:w-2 h-1.5 sm:h-2 -translate-x-1/2" />
              </div>

              <div className="scale-150 animate-float">
                <Image
                  src="/assets/icons/pinlogo.png"
                  alt="NexTranspo Pin Logo"
                  width={65}
                  height={75}
                  className="drop-shadow-[0_4px_20px_rgba(16,185,129,0.4)] sm:w-[80px] md:w-[95px] sm:h-[90px] md:h-[105px]"
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
          <div className="relative flex justify-center w-full">
            <div className="absolute inset-0 flex justify-center opacity-30 blur-xl">
              <Image
                src="/assets/icons/nextranspo.png"
                alt="NexTranspo Logo"
                width={320}
                height={70}
                className="sm:hidden object-contain"
              />
              <Image
                src="/assets/icons/nextranspo.png"
                alt="NexTranspo Logo"
                width={480}
                height={80}
                className="hidden md:hidden sm:block object-contain"
              />
              <Image
                src="/assets/icons/nextranspo.png"
                alt="NexTranspo Logo"
                width={620}
                height={90}
                className="hidden md:block object-contain"
              />
            </div>
            <Image
              src="/assets/icons/nextranspo.png"
              alt="NexTranspo Logo"
              width={320}
              height={70}
              className="sm:hidden z-10 relative drop-shadow-[0_4px_16px_rgba(16,185,129,0.15)] object-contain"
            />
            <Image
              src="/assets/icons/nextranspo.png"
              alt="NexTranspo Logo"
              width={480}
              height={80}
              className="hidden md:hidden sm:block z-10 relative drop-shadow-[0_4px_16px_rgba(16,185,129,0.15)] object-contain"
            />
            <Image
              src="/assets/icons/nextranspo.png"
              alt="NexTranspo Logo"
              width={620}
              height={90}
              className="hidden md:block z-10 relative drop-shadow-[0_4px_16px_rgba(16,185,129,0.15)] object-contain"
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
          <div className="relative flex gap-2 sm:gap-3">
            <span className="relative">
              <span className="absolute inset-0 bg-emerald-400/30 blur-sm rounded-full w-2 sm:w-2.5 h-2 sm:h-2.5 animate-bounce" />
              <span className="block relative bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-emerald-400/40 shadow-lg rounded-full w-2 sm:w-2.5 h-2 sm:h-2.5 animate-bounce" />
            </span>
            <span className="relative" style={{ animationDelay: "0.15s" }}>
              <span
                className="absolute inset-0 bg-teal-400/30 blur-sm rounded-full w-2 sm:w-2.5 h-2 sm:h-2.5 animate-bounce"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="block relative bg-gradient-to-br from-teal-400 to-teal-500 shadow-lg shadow-teal-400/40 rounded-full w-2 sm:w-2.5 h-2 sm:h-2.5 animate-bounce"
                style={{ animationDelay: "0.15s" }}
              />
            </span>
            <span className="relative" style={{ animationDelay: "0.3s" }}>
              <span
                className="absolute inset-0 bg-emerald-400/30 blur-sm rounded-full w-2 sm:w-2.5 h-2 sm:h-2.5 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className="block relative bg-gradient-to-br from-emerald-400 to-green-500 shadow-emerald-400/40 shadow-lg rounded-full w-2 sm:w-2.5 h-2 sm:h-2.5 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              />
            </span>
          </div>

          <p className="font-light text-gray-600 text-xs sm:text-sm uppercase tracking-[0.15em]">
            Loading your routes
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-particle {
          0%,
          100% {
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
