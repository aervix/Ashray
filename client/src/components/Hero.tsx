import React, { useState } from 'react';

export const Hero: React.FC = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [rentRange, setRentRange] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-[#FAF7F2] pt-8 pb-16 md:pt-14 md:pb-20 border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Search form */}
          <div className="lg:col-span-7">
            <span className="text-xs sm:text-sm uppercase tracking-wider text-[#736A63] font-semibold mb-3 block">
              Local rentals, without the runaround
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2A2421] font-normal leading-tight mb-4">
              Find a place to call home.
            </h1>

            <p className="text-sm sm:text-base text-[#6B635B] max-w-xl mb-8 leading-relaxed">
              Think grey it home and uni waty to san properiver roriental property community trust.
            </p>

            {/* Filter/Search Box */}
            <form onSubmit={handleSearch} className="space-y-3 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C9] rounded text-sm text-[#2A2421] placeholder-[#9E958C] focus:outline-none focus:border-[#A94C2B]"
                />
                <input
                  type="text"
                  placeholder="Property Type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C9] rounded text-sm text-[#2A2421] placeholder-[#9E958C] focus:outline-none focus:border-[#A94C2B]"
                />
                <input
                  type="text"
                  placeholder="Rent Range"
                  value={rentRange}
                  onChange={(e) => setRentRange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C9] rounded text-sm text-[#2A2421] placeholder-[#9E958C] focus:outline-none focus:border-[#A94C2B]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C9] rounded text-sm text-[#2A2421] placeholder-[#9E958C] focus:outline-none focus:border-[#A94C2B]"
                />
                <button
                  type="submit"
                  className="bg-[#A94C2B] hover:bg-[#933F22] text-white px-7 py-2.5 rounded font-medium text-sm flex items-center justify-center gap-2 transition"
                >
                  <span>Search</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="mt-5">
              <a
                href="#list-property"
                className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#2A2421] hover:text-[#A94C2B] underline decoration-1 underline-offset-4 transition"
              >
                I'm a Property Owner &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Featured Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-t-full sm:rounded-t-[140px] overflow-hidden border border-[#EAE4DC] shadow-sm bg-[#EBE5DB]">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80"
                alt="Ashray residential facade"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};