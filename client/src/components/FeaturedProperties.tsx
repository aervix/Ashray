import React from 'react';
import { Property } from '../types';

const properties: Property[] = [
  {
    id: '1',
    price: '₹14,000',
    period: '/month',
    type: '2 BHK Apartment',
    location: 'Baniariph',
    features: ['Furnished', 'Parking', 'Water supply'],
    status: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    price: '₹14,000',
    period: '/month',
    type: '2 BHK Apartment',
    location: 'Baniariph',
    features: ['Furnished', 'Parking', 'Water supply'],
    status: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    price: '₹14,000',
    period: '/month',
    type: '2 BHK Apartment',
    location: 'Baniariph',
    features: ['Furnished', 'Parking', 'Water supply'],
    status: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    price: '₹14,000',
    period: '/month',
    type: '2 BHK Apartment',
    location: 'Baniariph',
    features: ['Furnished', 'Parking', 'Water supply'],
    status: 'Available now',
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80',
  },
];

export const FeaturedProperties: React.FC = () => {
  return (
    <section id="properties" className="bg-[#FAF7F2] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF7F2] border border-[#DDD5C9] rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] w-full bg-[#E5DFD5] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.type}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body */}
              <div className="p-3.5 flex flex-col flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-lg text-[#2A2421]">{item.price}</span>
                  <span className="text-xs text-[#7A726A]">{item.period}</span>
                </div>
                <h4 className="text-xs font-semibold text-[#2A2421] mt-0.5">{item.type}</h4>

                <div className="flex items-center text-[11px] text-[#7A726A] mt-1 gap-1">
                  <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{item.location}</span>
                </div>

                <div className="text-[10px] text-[#8C837A] mt-2 pb-3 border-b border-[#EAE4DC]">
                  {item.features.join(' • ')}
                </div>

                <div className="mt-auto pt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#387B4C] font-medium text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#387B4C]"></span>
                    <span>{item.status}</span>
                  </div>
                  <button className="text-[11px] font-medium text-[#2A2421] hover:text-[#A94C2B] underline">
                    View Property
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Link */}
        <div className="flex justify-end mt-6">
          <a
            href="#all-properties"
            className="text-xs sm:text-sm font-semibold text-[#2A2421] hover:text-[#A94C2B] inline-flex items-center gap-1"
          >
            <span>Explore all properties</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};