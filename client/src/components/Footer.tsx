import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2A2421] text-[#E5DFD7] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-10 border-b border-[#413935]">
          {/* Brand and Description */}
          <div className="max-w-sm">
            <div className="flex items-center space-x-2 text-[#FAF7F2] mb-3">
              <div className="text-[#FAF7F2]">
                <svg
                  className="w-5 h-5 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2.5"
                >
                  <path d="m18 15-6-6-6 6" />
                  <path d="m18 9-6-6-6 6" />
                </svg>
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">Ashray</span>
            </div>
            <p className="text-xs text-[#A69E96] leading-relaxed">
              Ashray is a Local rental and description communitis conurititng. 70% opacity.
            </p>
          </div>

          {/* Nav Links Column 1 */}
          <div className="flex flex-col space-y-2 text-xs">
            <a href="#properties" className="hover:text-white transition">Properties</a>
            <a href="#report-vacancy" className="hover:text-white transition">Report Vacancy</a>
            <a href="#list-property" className="hover:text-white transition">List Property</a>
          </div>

          {/* Nav Links Column 2 */}
          <div className="flex flex-col space-y-2 text-xs">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          {/* Nav Links Column 3 */}
          <div className="flex flex-col space-y-2 text-xs">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms</a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C837A] gap-2">
          <span>Copyright © 2023-2026 Ashray. All rights reserved.</span>
          <span className="text-[#736A63]">Local framing</span>
        </div>
      </div>
    </footer>
  );
};