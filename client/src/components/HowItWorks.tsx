import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-[#FAF7F2] py-16 border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Step 01 */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C9] mb-4">
              <span className="font-serif text-3xl text-[#A94C2B] font-semibold">01</span>
              <span className="text-[#A94C2B]">
                <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#2A2421] mb-2 font-medium">Search</h3>
            <p className="text-sm text-[#6B635B] leading-relaxed">
              Search the veation of locatis that consonnnes onless mamecore, property, and rents.
            </p>
          </div>

          {/* Step 02 */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C9] mb-4">
              <span className="font-serif text-3xl text-[#A94C2B] font-semibold">02</span>
              <span className="text-[#A94C2B]">
                <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#2A2421] mb-2 font-medium">Connect</h3>
            <p className="text-sm text-[#6B635B] leading-relaxed">
              Connect connect minss and olwment connectioe so sroocenrrletorate connect with sheocoles.
            </p>
          </div>

          {/* Step 03 */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C9] mb-4">
              <span className="font-serif text-3xl text-[#A94C2B] font-semibold">03</span>
              <span className="text-[#A94C2B]">
                <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <circle cx="7.5" cy="15.5" r="4.5" />
                  <path d="m21 2-9.6 9.6" />
                  <path d="m15.5 7.5 3 3" />
                </svg>
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#2A2421] mb-2 font-medium">Move In</h3>
            <p className="text-sm text-[#6B635B] leading-relaxed">
              Move in in preview wors for the next residential building orienceetonat move locatitie locations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};