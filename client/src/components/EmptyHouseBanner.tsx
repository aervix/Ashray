import React from 'react';

export const EmptyHouseBanner: React.FC = () => {
  return (
    <section id="report-vacancy" className="bg-[#2A2421] text-white py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Text & Action */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-normal leading-snug">
              Know an empty house?
              <br />
              Help it find a tenant.
            </h2>
            <p className="text-sm text-[#C4BCB3] max-w-md leading-relaxed">
              Know an empty house mars soon to fer a tenant and smart the bust to inolid your property.
            </p>
            <div className="pt-2">
              <button className="bg-white text-[#2A2421] hover:bg-[#FAF7F2] font-medium text-xs sm:text-sm px-5 py-2.5 rounded transition">
                Report a Vacant Property
              </button>
            </div>
          </div>

          {/* Right Column: Visual Diagram / Step Flow */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Card 1: Shuttered House */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF7F2] rounded-xl flex items-center justify-center p-3 text-[#2A2421] shadow">
                  <svg className="w-10 h-10 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <rect x="9" y="13" width="6" height="8" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-[#FAF7F2] mt-2">Shuttered house</span>
                <span className="text-[10px] text-[#A69E96]">Empty home</span>
              </div>

              {/* Arrow */}
              <div className="text-[#8C837A] text-lg font-light">&rarr;</div>

              {/* Card 2: Ashray Logo */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF7F2] rounded-xl flex items-center justify-center p-3 text-[#A94C2B] shadow">
                  <svg className="w-9 h-9 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="m18 15-6-6-6 6" />
                    <path d="m18 9-6-6-6 6" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-[#FAF7F2] mt-2">Ashray</span>
              </div>

              {/* Arrow */}
              <div className="text-[#8C837A] text-lg font-light">&rarr;</div>

              {/* Card 3: Lit House */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF7F2] rounded-xl flex items-center justify-center p-3 text-[#E2933C] shadow">
                  <svg className="w-10 h-10 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <circle cx="12" cy="14" r="2" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-[#FAF7F2] mt-2">Lit house</span>
                <span className="text-[10px] text-[#A69E96]">New tenant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};