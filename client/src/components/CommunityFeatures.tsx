import React from 'react';

export const CommunityFeatures: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] py-16 border-b border-[#EAE4DC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-[11px] text-[#8C837A] font-medium tracking-wide block mb-1">
          680px narrow measure
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2421] font-normal mb-12">
          Built around your local community.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase font-bold tracking-wider text-[#2A2421] mb-1">
              Direct Contact
            </span>
            <span className="text-xs text-[#7A726A] max-w-[130px]">
              Direct your tive to direct contact
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs uppercase font-bold tracking-wider text-[#2A2421] mb-1">
              Property
            </span>
            <span className="text-xs text-[#7A726A] max-w-[130px]">
              Property details
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs uppercase font-bold tracking-wider text-[#2A2421] mb-1">
              Direct
            </span>
            <span className="text-xs text-[#7A726A] max-w-[130px]">
              Direct connection vacancies
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs uppercase font-bold tracking-wider text-[#2A2421] mb-1">
              Neighbos
            </span>
            <span className="text-xs text-[#7A726A] max-w-[130px]">
              Neighbour-reported vacancies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};