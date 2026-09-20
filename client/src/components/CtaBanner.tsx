import React from 'react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] py-14 border-b border-[#EAE4DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#2A2421] font-normal mb-6">
          Your next home could be closer than you think.
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-[#A94C2B] hover:bg-[#933F22] text-white px-6 py-2.5 rounded font-medium text-sm transition">
            Find a Home
          </button>
          <button className="bg-transparent hover:bg-[#EFE9DF] text-[#2A2421] border border-[#DDD5C9] px-6 py-2.5 rounded font-medium text-sm transition">
            List Your Property
          </button>
        </div>
      </div>
    </section>
  );
};