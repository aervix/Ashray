import React from 'react';

export const ListPropertySection: React.FC = () => {
  const points = [
    'publish your property',
    'receive enquiries directly',
    'receive ennaiss your property',
    'receive your rebone property',
  ];

  return (
    <section id="list-property" className="bg-[#FAF7F2] py-16 border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Left: Keys on table photograph */}
          <div className="md:col-span-6 flex justify-center">
            <div className="w-full max-w-md aspect-[4/3] rounded overflow-hidden shadow-sm bg-[#EBE5DB]">
              <img
                src="https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80"
                alt="House keys"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Have a property to rent */}
          <div className="md:col-span-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2421] font-normal mb-3">
              Have a property to rent?
            </h2>
            <p className="text-sm text-[#6B635B] mb-6 leading-relaxed">
              Have a property to rent? Paregular eansines and property even a m provide rulul to keep comunity.
            </p>

            <ul className="space-y-3 mb-8">
              {points.map((point, index) => (
                <li
                  key={index}
                  className="text-xs sm:text-sm text-[#2A2421] pb-2 border-b border-[#EAE4DC] flex items-center justify-between"
                >
                  <span className="capitalize">{point}</span>
                </li>
              ))}
            </ul>

            <button className="bg-[#A94C2B] hover:bg-[#933F22] text-white px-6 py-2.5 rounded font-medium text-sm transition">
              List Your Property
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};