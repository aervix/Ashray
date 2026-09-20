import React from 'react';

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '500+', label: 'Properties Listed' },
  { value: '350+', label: 'Homes Available' },
  { value: '200+', label: 'Owners Connected' },
  { value: '1,000+', label: 'People Searching' },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] py-10 border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-[#8C837A] font-semibold mb-6">
          Platform activity
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2A2421] font-semibold">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-[#736A63] mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};