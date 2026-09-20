import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  Key, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Heart, 
  Share2, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  X, 
  SlidersHorizontal,
  ChevronRight,
  PhoneCall,
  Calendar,
  Layers,
  Compass,
  PlusCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  type: '1 BHK' | '2 BHK' | '3 BHK' | 'Independent House' | 'Studio';
  rent: number;
  deposit: number;
  locality: string;
  city: string;
  baths: number;
  sqft: number;
  furnishing: 'Semi-Furnished' | 'Fully Furnished' | 'Unfurnished';
  amenities: string[];
  availableFrom: string;
  image: string;
  isOwnerDirect: boolean;
  discoveredByCommunity?: boolean;
  description: string;
  ownerName: string;
  ownerContact: string;
}

const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Sunlit First-Floor Flat with Courtyard Balcony',
    type: '2 BHK',
    rent: 16500,
    deposit: 33000,
    locality: 'Indiranagar 2nd Stage',
    city: 'Bengaluru',
    baths: 2,
    sqft: 1050,
    furnishing: 'Semi-Furnished',
    amenities: ['Private Balcony', 'Covered Two-Wheeler Parking', 'Borewell + Cauvery', 'Pet Friendly'],
    availableFrom: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
    isOwnerDirect: true,
    discoveredByCommunity: true,
    description: 'Quiet residential street with leafy trees. The owner lives in Mysore and prefers a family or working professionals. No broker fees whatsoever.',
    ownerName: 'Ramesh Kulkarni',
    ownerContact: '+91 98450 12345'
  },
  {
    id: 'prop-2',
    title: 'Independent Ground Floor House with Garden Porch',
    type: 'Independent House',
    rent: 24000,
    deposit: 50000,
    locality: 'Aundh Green Park',
    city: 'Pune',
    baths: 2,
    sqft: 1350,
    furnishing: 'Unfurnished',
    amenities: ['Private Garden', 'Car Parking', 'Spacious Terrace', 'Security Cameras'],
    availableFrom: 'From 1st Next Month',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
    isOwnerDirect: true,
    discoveredByCommunity: false,
    description: 'Traditional spacious bungalow annexe with independent gate access and small tulsi courtyard. Perfect for long-term peaceful stay.',
    ownerName: 'Sunita Joshi',
    ownerContact: '+91 94220 87654'
  },
  {
    id: 'prop-3',
    title: 'Minimalist Airy Studio near Metro Station',
    type: 'Studio',
    rent: 11500,
    deposit: 20000,
    locality: 'Lajpat Nagar IV',
    city: 'New Delhi',
    baths: 1,
    sqft: 480,
    furnishing: 'Fully Furnished',
    amenities: ['Split AC', 'High Speed Wi-Fi Ready', 'Geyser', 'Metro 400m Away'],
    availableFrom: 'Immediate',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    isOwnerDirect: true,
    discoveredByCommunity: true,
    description: 'Recently renovated rooftop studio with natural light on 3 sides. Reported vacant by neighbourhood café owner after long vacancy.',
    ownerName: 'Manpreet Singh',
    ownerContact: '+91 98110 54321'
  },
  {
    id: 'prop-4',
    title: 'Warm 3 BHK Family Apartment with Cross Ventilation',
    type: '3 BHK',
    rent: 32000,
    deposit: 64000,
    locality: 'Anna Nagar West',
    city: 'Chennai',
    baths: 3,
    sqft: 1620,
    furnishing: 'Semi-Furnished',
    amenities: ['Lift Access', 'Power Backup', 'Dedicated Car Parking', 'Modular Kitchen'],
    availableFrom: 'Within 15 Days',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    isOwnerDirect: true,
    discoveredByCommunity: false,
    description: 'Reputable standalone residential society. Owner moving to Coimbatore. Direct lease agreement, zero brokerage or hidden administration fees.',
    ownerName: 'Dr. V. Natarajan',
    ownerContact: '+91 98401 99887'
  }
];

export default function App() {
  // Navigation & modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(['prop-1']);

  // Search & Filter State
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [maxRent, setMaxRent] = useState<number>(40000);
  const [appliedFilters, setAppliedFilters] = useState({
    location: '',
    type: 'All',
    maxRent: 40000
  });

  // Vacancy submission form state
  const [vacancyForm, setVacancyForm] = useState({
    address: '',
    locality: '',
    landmark: '',
    ownerNameOrPhone: '',
    details: '',
    submittedBy: ''
  });
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  // Landlord listing form state
  const [landlordForm, setLandlordForm] = useState({
    name: '',
    phone: '',
    locality: '',
    type: '2 BHK',
    expectedRent: '',
    description: ''
  });
  const [listSuccess, setListSuccess] = useState<boolean>(false);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter(prop => {
      const matchLoc = appliedFilters.location 
        ? prop.locality.toLowerCase().includes(appliedFilters.location.toLowerCase()) || 
          prop.city.toLowerCase().includes(appliedFilters.location.toLowerCase())
        : true;
      const matchType = appliedFilters.type === 'All' ? true : prop.type === appliedFilters.type;
      const matchRent = prop.rent <= appliedFilters.maxRent;
      return matchLoc && matchType && matchRent;
    });
  }, [appliedFilters]);

  const handleApplySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedFilters({
      location: searchLocation,
      type: selectedType,
      maxRent: maxRent
    });
    // Smooth scroll to property list
    const el = document.getElementById('featured-properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleVacancySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setIsReportModalOpen(false);
      setVacancyForm({ address: '', locality: '', landmark: '', ownerNameOrPhone: '', details: '', submittedBy: '' });
    }, 2000);
  };

  const handleListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setListSuccess(true);
    setTimeout(() => {
      setListSuccess(false);
      setIsListModalOpen(false);
      setLandlordForm({ name: '', phone: '', locality: '', type: '2 BHK', expectedRent: '', description: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1A1A1A] font-sans relative selection:bg-[#FF8370] selection:text-black">
      {/* Background Notebook Graph Paper Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E2DDD3 1px, transparent 1px),
            linear-gradient(to bottom, #E2DDD3 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Floating Whimsical Playful Accent Shapes (inspired by user design reference) */}
      <div className="fixed -top-12 -left-12 w-36 h-36 rounded-full bg-[#FF8370]/60 border-2 border-[#1A1A1A] pointer-events-none z-0 hidden lg:block" />
      <div className="fixed top-72 -right-10 w-44 h-44 rounded-full bg-[#56CCF2]/60 border-2 border-[#1A1A1A] pointer-events-none z-0 hidden md:block" />
      <div className="fixed bottom-40 left-8 w-24 h-24 rounded-full bg-[#F9E784]/70 border-2 border-[#1A1A1A] pointer-events-none z-0 hidden xl:block" />
      <div className="fixed bottom-12 right-28 w-16 h-16 rounded-full bg-[#FDBB9B]/80 border-2 border-[#1A1A1A] pointer-events-none z-0 hidden lg:block" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">

        {}
        <header className="sticky top-4 z-40 mb-10">
          <nav className="bg-[#FAF7EE] border-2 border-[#1A1A1A] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[4px_4px_0px_#1A1A1A] transition-all">
            
            {/* Ashray Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-[#FF8370] border-2 border-[#1A1A1A] flex items-center justify-center font-serif text-lg font-black text-black shadow-[2px_2px_0px_#1A1A1A] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
                आ
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#1A1A1A] font-serif">Ashray</span>
                <span className="text-[9px] uppercase tracking-widest -mt-1 font-semibold text-[#666]">Local Rentals</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2A2A2A]">
              <a href="#properties" className="hover:text-[#FF8370] transition-colors">Properties</a>
              <a href="#how-it-works" className="hover:text-[#FF8370] transition-colors">How It Works</a>
              <button 
                onClick={() => setIsReportModalOpen(true)}
                className="hover:text-[#FF8370] transition-colors flex items-center gap-1.5"
              >
                <span>Report Vacancy</span>
                <span className="text-[10px] bg-[#F9E784] px-1.5 py-0.5 rounded-full border border-black font-semibold">Community</span>
              </button>
              <a href="#about" className="hover:text-[#FF8370] transition-colors">About</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button 
                onClick={() => setIsListModalOpen(true)}
                className="text-xs font-semibold text-[#1A1A1A] hover:underline px-2"
              >
                Owner Login
              </button>

              <button 
                onClick={() => setIsListModalOpen(true)}
                className="bg-[#56CCF2] hover:bg-[#45bfe6] text-[#1A1A1A] text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-full border-2 border-[#1A1A1A] shadow-[2.5px_2.5px_0px_#1A1A1A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                List Your Property
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-1.5 rounded-full border-2 border-black bg-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 bg-[#FAF7EE] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#1A1A1A] flex flex-col gap-3.5 text-sm font-medium">
              <a 
                href="#properties" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-black/10"
              >
                Properties
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-black/10"
              >
                How It Works
              </a>
              <button 
                onClick={() => { setMobileMenuOpen(false); setIsReportModalOpen(true); }}
                className="text-left py-1 border-b border-black/10 flex justify-between items-center"
              >
                <span>Report Vacancy</span>
                <span className="text-[10px] bg-[#F9E784] px-2 py-0.5 rounded-full border border-black font-bold">Community</span>
              </button>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-black/10"
              >
                About Ashray
              </a>
              <div className="pt-2 flex flex-col gap-2">
                <button 
                  onClick={() => { setMobileMenuOpen(false); setIsListModalOpen(true); }}
                  className="w-full bg-[#56CCF2] py-2.5 rounded-full border-2 border-black font-bold text-center shadow-[2px_2px_0px_#000]"
                >
                  List Your Property
                </button>
              </div>
            </div>
          )}
        </header>

        {}
        <section className="relative pt-6 pb-14 sm:pb-20">
          
          {/* Handwritten Style Greeting like screenshot */}
          <div className="flex items-center gap-2 mb-3">
            <span 
              className="text-[#E0533C] text-lg sm:text-xl tracking-wide select-none"
              style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", cursive, sans-serif', fontStyle: 'italic' }}
            >
              namaste, welcome home 🏡
            </span>
          </div>

          {/* Sub-badge pill like screenshot */}
          <div className="inline-flex items-center gap-2 bg-[#FAF7EE] border-2 border-[#1A1A1A] rounded-full px-3.5 py-1 text-xs font-semibold text-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF8370] animate-pulse" />
            <span>Currently uncovering hidden neighbourhood rentals</span>
          </div>

          {/* Main Headline with dual-color typography (Jiya Jain style) */}
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-serif leading-[1.08] text-[#1A1A1A] mb-5">
              Find a place to <br className="hidden sm:inline" />
              <span className="text-[#FF8370] relative inline-block">
                call home.
                {/* Playful curved underline */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#1A1A1A] pointer-events-none" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9C40 2 120 2 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#4A4A4A] max-w-2xl font-normal leading-relaxed mb-8">
              Discover rental homes in your local area, or help someone find a tenant for a vacant property. 
              Bridging the gap between hidden vacancies and genuine seekers.
            </p>
          </div>

          {/* Interactive Property Search Engine Box */}
          <div className="bg-[#FAF7EE] border-2 border-[#1A1A1A] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[5px_5px_0px_#1A1A1A] max-w-4xl relative">
            <form onSubmit={handleApplySearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Location Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#333] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF8370]" />
                  Locality / City
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="e.g. Indiranagar, Aundh..." 
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-white border-2 border-[#1A1A1A] rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#56CCF2]"
                  />
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#333] flex items-center gap-1">
                  <Home className="w-3.5 h-3.5 text-[#56CCF2]" />
                  Property Type
                </label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-white border-2 border-[#1A1A1A] rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#56CCF2]"
                >
                  <option value="All">All Property Types</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Studio">Studio Apartment</option>
                </select>
              </div>

              {/* Rent Range Slider / Label */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#333]">
                  <span>Max Rent</span>
                  <span className="text-[#FF8370]">₹{maxRent.toLocaleString()}</span>
                </div>
                <div className="pt-2 px-1">
                  <input 
                    type="range" 
                    min="8000" 
                    max="50000" 
                    step="1000"
                    value={maxRent}
                    onChange={(e) => setMaxRent(Number(e.target.value))}
                    className="w-full accent-[#FF8370] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                    <span>₹8k</span>
                    <span>₹25k</span>
                    <span>₹50k</span>
                  </div>
                </div>
              </div>

              {/* Submit Search Button */}
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full bg-[#FF8370] hover:bg-[#ff6f59] text-[#1A1A1A] font-bold py-2.5 px-4 rounded-xl border-2 border-[#1A1A1A] shadow-[2.5px_2.5px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Homes</span>
                </button>
              </div>
            </form>

            {/* Quick Helper Badges */}
            <div className="mt-4 pt-4 border-t border-dashed border-black/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#555]">
                <span className="font-semibold text-black">Popular:</span>
                <button 
                  onClick={() => { setSearchLocation('Indiranagar'); setSelectedType('2 BHK'); }}
                  className="bg-white px-2.5 py-1 rounded-md border border-black hover:bg-[#F9E784] transition-colors"
                >
                  Indiranagar 2 BHK
                </button>
                <button 
                  onClick={() => { setSearchLocation('Aundh'); setSelectedType('Independent House'); }}
                  className="bg-white px-2.5 py-1 rounded-md border border-black hover:bg-[#F9E784] transition-colors"
                >
                  Aundh Independent
                </button>
              </div>

              <button 
                onClick={() => setIsListModalOpen(true)}
                className="text-xs font-bold text-[#1A1A1A] hover:text-[#FF8370] flex items-center gap-1 group"
              >
                <span>I'm a Property Owner</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Floating Pill Tags under Hero (Neo-brutalist style) */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-white border-2 border-black rounded-full px-3.5 py-1 text-xs font-bold shadow-[2px_2px_0px_#1A1A1A]">
              <span className="text-base">📍</span> Zero Brokerage Direct
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[#FAF7EE] border-2 border-black rounded-full px-3.5 py-1 text-xs font-bold shadow-[2px_2px_0px_#1A1A1A]">
              <span className="text-base">🔑</span> Verified Owners
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[#F9E784] border-2 border-black rounded-full px-3.5 py-1 text-xs font-bold shadow-[2px_2px_0px_#1A1A1A]">
              <span className="text-base">🏘️</span> Local Word-of-Mouth Vacancies
            </div>
          </div>
        </section>

        {}
        <section className="my-10">
          <div className="bg-[#FAF7EE] border-2 border-[#1A1A1A] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-black/10">
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-[#E0533C]">Verified Community Activity</p>
                <h3 className="text-xl font-bold font-serif text-[#1A1A1A]">Real homes, no inflated marketing figures</h3>
              </div>
              <p className="text-xs text-neutral-600 max-w-sm">
                Live metrics representing local rentals listed directly by owners and reported by verified community neighbours.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              <div className="border-l-2 border-black pl-4">
                <div className="text-3xl sm:text-4xl font-black font-serif text-[#1A1A1A]">500+</div>
                <div className="text-xs sm:text-sm font-semibold text-[#555] mt-0.5">Properties Listed</div>
                <div className="text-[11px] text-gray-500 mt-1">Directly added by landlords</div>
              </div>

              <div className="border-l-2 border-[#FF8370] pl-4">
                <div className="text-3xl sm:text-4xl font-black font-serif text-[#1A1A1A]">350+</div>
                <div className="text-xs sm:text-sm font-semibold text-[#555] mt-0.5">Homes Available</div>
                <div className="text-[11px] text-gray-500 mt-1">Ready for occupancy today</div>
              </div>

              <div className="border-l-2 border-[#56CCF2] pl-4">
                <div className="text-3xl sm:text-4xl font-black font-serif text-[#1A1A1A]">200+</div>
                <div className="text-xs sm:text-sm font-semibold text-[#555] mt-0.5">Owners Connected</div>
                <div className="text-[11px] text-gray-500 mt-1">Zero intermediary commission</div>
              </div>

              <div className="border-l-2 border-[#F9E784] pl-4">
                <div className="text-3xl sm:text-4xl font-black font-serif text-[#1A1A1A]">1,000+</div>
                <div className="text-xs sm:text-sm font-semibold text-[#555] mt-0.5">People Searching</div>
                <div className="text-[11px] text-gray-500 mt-1">Active local seekers this month</div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section id="how-it-works" className="my-16 sm:my-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#F9E784] border border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_#000]">
              Transparent Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif mt-3 text-[#1A1A1A]">
              How Ashray works
            </h2>
            <p className="text-sm sm:text-base text-[#555] mt-2">
              No endless broker commissions, no fake photos. Just real homes discovered locally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#FAF7EE] border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_#1A1A1A] relative group hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black font-mono bg-white border border-black px-2.5 py-1 rounded-lg">
                  01
                </span>
                <div className="w-10 h-10 rounded-full bg-[#56CCF2] border border-black flex items-center justify-center">
                  <Search className="w-5 h-5 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-serif mb-2 text-[#1A1A1A]">Search</h3>
              <p className="text-sm text-[#444] leading-relaxed">
                Find available rental homes in your preferred area and budget. Access properties uncovered directly by neighbours.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF7EE] border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_#1A1A1A] relative group hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black font-mono bg-white border border-black px-2.5 py-1 rounded-lg">
                  02
                </span>
                <div className="w-10 h-10 rounded-full bg-[#FF8370] border border-black flex items-center justify-center">
                  <Users className="w-5 h-5 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-serif mb-2 text-[#1A1A1A]">Connect</h3>
              <p className="text-sm text-[#444] leading-relaxed">
                View genuine property details and connect directly with the owner. Have honest conversations without high-pressure sales pitches.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF7EE] border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_#1A1A1A] relative group hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black font-mono bg-white border border-black px-2.5 py-1 rounded-lg">
                  03
                </span>
                <div className="w-10 h-10 rounded-full bg-[#F9E784] border border-black flex items-center justify-center">
                  <Key className="w-5 h-5 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-serif mb-2 text-[#1A1A1A]">Move In</h3>
              <p className="text-sm text-[#444] leading-relaxed">
                Inspect the property at your convenience, agree on mutual terms, and settle into your new neighbourhood hassle-free.
              </p>
            </div>
          </div>
        </section>

        {}
        <section id="properties" className="my-16 sm:my-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8370]">Direct Owner Listings</span>
              <h2 className="text-3xl sm:text-4xl font-black font-serif mt-1 text-[#1A1A1A]">
                Featured homes in your area
              </h2>
              <p className="text-sm text-[#555] mt-1">
                Showing {filteredProperties.length} active residential homes ready for physical visits.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', '1 BHK', '2 BHK', '3 BHK', 'Independent House'].map((type) => (
                <button
                  key={type}
                  onClick={() => setAppliedFilters(prev => ({ ...prev, type }))}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-black transition-all ${
                    appliedFilters.type === type
                      ? 'bg-black text-white shadow-none'
                      : 'bg-[#FAF7EE] text-black shadow-[2px_2px_0px_#000] hover:bg-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredProperties.length === 0 ? (
            <div className="bg-[#FAF7EE] border-2 border-dashed border-black rounded-3xl p-12 text-center">
              <HelpCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <h4 className="text-lg font-bold font-serif">No matching homes found</h4>
              <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                Try widening your search rent limit or selecting "All Property Types".
              </p>
              <button 
                onClick={() => setAppliedFilters({ location: '', type: 'All', maxRent: 50000 })}
                className="mt-4 bg-[#56CCF2] border-2 border-black text-xs font-bold px-4 py-2 rounded-full shadow-[2px_2px_0px_#000]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProperties.map((prop) => {
                const isFav = savedFavorites.includes(prop.id);
                return (
                  <div 
                    key={prop.id}
                    onClick={() => setSelectedProperty(prop)}
                    className="bg-[#FAF7EE] border-2 border-[#1A1A1A] rounded-2xl overflow-hidden shadow-[4px_4px_0px_#1A1A1A] hover:shadow-[6px_6px_0px_#1A1A1A] hover:-translate-y-1 transition-all flex flex-col cursor-pointer group"
                  >
                    {/* Realistic Photo with Badge Overlays */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100 border-b-2 border-black">
                      <img 
                        src={prop.image} 
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
                        <span className="bg-[#FAF7EE] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-black shadow-[1.5px_1.5px_0px_#000]">
                          {prop.type}
                        </span>
                        {prop.discoveredByCommunity && (
                          <span className="bg-[#F9E784] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-black shadow-[1.5px_1.5px_0px_#000] flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" /> Word-of-Mouth
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button 
                        onClick={(e) => toggleFavorite(prop.id, e)}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full border border-black flex items-center justify-center transition-transform active:scale-90 ${
                          isFav ? 'bg-[#FF8370] text-black' : 'bg-white text-gray-600'
                        }`}
                        title={isFav ? "Saved" : "Save"}
                      >
                        <Heart className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
                      </button>

                      {/* Availability Tag */}
                      <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-medium backdrop-blur-xs">
                        {prop.availableFrom}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Location */}
                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                          <MapPin className="w-3 h-3 text-[#FF8370] shrink-0" />
                          <span className="truncate">{prop.locality}, {prop.city}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-sm leading-snug line-clamp-2 text-[#1A1A1A] group-hover:text-[#FF8370] transition-colors mb-2 font-serif">
                          {prop.title}
                        </h3>

                        {/* Amenities Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {prop.amenities.slice(0, 2).map((amenity, idx) => (
                            <span key={idx} className="bg-white text-[10px] text-gray-700 px-2 py-0.5 rounded border border-black/30">
                              {amenity}
                            </span>
                          ))}
                          {prop.amenities.length > 2 && (
                            <span className="text-[10px] text-gray-500 font-bold self-center">
                              +{prop.amenities.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer: Rent + CTA */}
                      <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-gray-500">Rent</div>
                          <div className="text-base font-extrabold text-[#1A1A1A]">
                            ₹{prop.rent.toLocaleString()}
                            <span className="text-[11px] font-normal text-gray-500">/mo</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedProperty(prop)}
                          className="bg-[#56CCF2] group-hover:bg-[#FF8370] text-black text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] transition-colors"
                        >
                          View Property
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Link */}
          <div className="text-center mt-10">
            <a 
              href="#properties"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1A1A1A] hover:text-[#FF8370] group underline underline-offset-4"
            >
              <span>Explore all properties in your city</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {}
        <section className="my-16 sm:my-24">
          <div className="bg-[#FAF7EE] border-3 border-[#1A1A1A] rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#1A1A1A] relative overflow-hidden">
            
            {/* Playful background badge */}
            <div className="absolute top-4 right-4 bg-[#F9E784] border-2 border-black px-3 py-1 rounded-full text-xs font-bold rotate-2 shadow-[2px_2px_0px_#000] hidden sm:block">
              Neighbourhood First
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7">
                <span className="text-xs font-extrabold tracking-wider uppercase text-[#FF8370] bg-white border border-black px-2.5 py-0.5 rounded-md">
                  Community-Powered Discovery
                </span>

                <h2 className="text-3xl sm:text-5xl font-black font-serif mt-3 text-[#1A1A1A] leading-tight">
                  Know an empty house? <br />
                  <span className="text-[#FF8370]">Help it find a tenant.</span>
                </h2>

                <p className="text-base text-[#444] mt-4 leading-relaxed max-w-xl">
                  Across every city, countless houses sit vacant for months because elderly owners don’t use apps, or brokers withhold listings. 
                  Only nearby neighbours, tea-stall owners, and friends know they're empty. 
                  Ashray lets you report these vacant homes so genuine families find shelter faster.
                </p>

                {/* Micro Steps Diagram: Empty Home -> Ashray -> New Tenant */}
                <div className="mt-8 bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000]">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">How word-of-mouth becomes a home:</p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold text-[#1A1A1A]">
                    
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FAF7EE] border border-black flex items-center justify-center text-[11px]">1</span>
                      <span>Neighbour spots empty house</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#F9E784] border border-black flex items-center justify-center text-[11px]">2</span>
                      <span>Brief report on Ashray</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#56CCF2] border border-black flex items-center justify-center text-[11px]">3</span>
                      <span>Direct tenant match</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => setIsReportModalOpen(true)}
                    className="bg-[#FF8370] hover:bg-[#ff6f59] text-black font-bold px-6 py-3 rounded-full border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Report a Vacant Property
                  </button>

                  <span className="text-xs text-gray-600 font-medium">
                    Takes under 60 seconds • No account required
                  </span>
                </div>
              </div>

              {/* Realistic Neighborhood Graphic / Photograph */}
              <div className="lg:col-span-5">
                <div className="relative border-2 border-black rounded-2xl overflow-hidden bg-white shadow-[4px_4px_0px_#000]">
                  <img 
                    src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80" 
                    alt="Quiet residential home street"
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-3.5 bg-[#FAF7EE] border-t-2 border-black text-xs font-semibold text-[#333] flex items-center justify-between">
                    <span>Shantinagar Colony, Bengaluru</span>
                    <span className="bg-[#56CCF2] px-2 py-0.5 rounded border border-black text-[10px]">Reported by Neighbor Anand</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {}
        <section className="my-16 sm:my-24">
          <div className="bg-[#FAF7EE] border-2 border-black rounded-3xl p-6 sm:p-10 shadow-[5px_5px_0px_#1A1A1A]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000]">
                    <div className="w-8 h-8 rounded-full bg-[#56CCF2] border border-black flex items-center justify-center font-bold text-xs mb-2">
                      0%
                    </div>
                    <h4 className="font-bold text-sm">Zero Broker Spam</h4>
                    <p className="text-xs text-gray-600 mt-1">We don't sell your phone number to local agents or telemetry databases.</p>
                  </div>

                  <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000]">
                    <div className="w-8 h-8 rounded-full bg-[#FF8370] border border-black flex items-center justify-center font-bold text-xs mb-2">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm">Direct Enquiries</h4>
                    <p className="text-xs text-gray-600 mt-1">Talk straight to tenants looking for your exact location and terms.</p>
                  </div>

                  <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000]">
                    <div className="w-8 h-8 rounded-full bg-[#F9E784] border border-black flex items-center justify-center font-bold text-xs mb-2">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm">Total Control</h4>
                    <p className="text-xs text-gray-600 mt-1">Mark your home as "Rented" in a tap when you find your preferred tenant.</p>
                  </div>

                  <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000]">
                    <div className="w-8 h-8 rounded-full bg-[#FAF7EE] border border-black flex items-center justify-center font-bold text-xs mb-2">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm">Fair Agreement</h4>
                    <p className="text-xs text-gray-600 mt-1">Free standard digital rental agreement templates tailored for local laws.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-[#56CCF2] border border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_#000]">
                  For Property Owners
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-serif mt-3 text-[#1A1A1A]">
                  Have a property to rent?
                </h2>
                <p className="text-base text-[#444] mt-3 leading-relaxed">
                  List your residential home directly without paying half-a-month’s rent to brokers. 
                  Manage tenant viewings on your own schedule, discuss deposits openly, and maintain full control of your asset.
                </p>

                <div className="mt-6">
                  <button 
                    onClick={() => setIsListModalOpen(true)}
                    className="bg-[#1A1A1A] hover:bg-neutral-800 text-white font-bold px-6 py-3 rounded-full border-2 border-black shadow-[3px_3px_0px_#FF8370] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm inline-flex items-center gap-2"
                  >
                    <span>List Your Property</span>
                    <ArrowRight className="w-4 h-4 text-[#56CCF2]" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {}
        <section id="about" className="my-16 sm:my-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#FF8370] border border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_#000]">
              Honest Platform
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif mt-3 text-[#1A1A1A]">
              Built around your local community.
            </h2>
            <p className="text-base text-[#555] mt-2">
              Instead of depending only on brokers, relatives, or neighbors to discover vacant homes, Ashray brings local rental information into one clean, honest place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#FAF7EE] border-2 border-black rounded-2xl p-6 shadow-[3px_3px_0px_#000] flex flex-col items-start">
              <div className="w-10 h-10 rounded-full bg-[#56CCF2] border border-black flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-black" />
              </div>
              <h4 className="font-bold text-base font-serif mb-1">Clear Property Details</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Accurate carpet area, exact water sources (Cauvery, Borewell, Tanker), electricity meter isolation, and clear pet policies right upfront.
              </p>
            </div>

            <div className="bg-[#FAF7EE] border-2 border-black rounded-2xl p-6 shadow-[3px_3px_0px_#000] flex flex-col items-start">
              <div className="w-10 h-10 rounded-full bg-[#F9E784] border border-black flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-black" />
              </div>
              <h4 className="font-bold text-base font-serif mb-1">Direct Owner Connection</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Connect with the actual homeowner. No middlemen posing as owners, no demand for upfront "viewing fees" or unauthorized commission tokens.
              </p>
            </div>

            <div className="bg-[#FAF7EE] border-2 border-black rounded-2xl p-6 shadow-[3px_3px_0px_#000] flex flex-col items-start">
              <div className="w-10 h-10 rounded-full bg-[#FF8370] border border-black flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5 text-black" />
              </div>
              <h4 className="font-bold text-base font-serif mb-1">Neighbourhood Verification</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Listings are vetted through spot-checks or community confirmations to ensure the home is genuinely vacant and properly represented.
              </p>
            </div>
          </div>
        </section>

        {}
        <section className="my-20">
          <div className="bg-[#FAF7EE] border-3 border-black rounded-3xl p-8 sm:p-14 shadow-[7px_7px_0px_#1A1A1A] text-center max-w-4xl mx-auto relative overflow-hidden">
            
            <div className="relative z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E0533C]">
                Ashray • Shelter • Home
              </span>
              
              <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#1A1A1A] mt-2 mb-4 leading-tight">
                Your next home could be <br />
                <span className="text-[#56CCF2] underline decoration-black decoration-2">closer than you think.</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-700 max-w-lg mx-auto mb-8">
                Explore authentic local rentals in your city today, or list an empty property to help a neighbour settle down.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a 
                  href="#properties"
                  className="bg-[#FF8370] hover:bg-[#ff6f59] text-black font-bold px-7 py-3 rounded-full border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm"
                >
                  Find a Home
                </a>

                <button 
                  onClick={() => setIsListModalOpen(true)}
                  className="bg-white hover:bg-neutral-50 text-black font-bold px-7 py-3 rounded-full border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm"
                >
                  List Your Property
                </button>
              </div>
            </div>
          </div>
        </section>

        {}
        <footer className="border-t-2 border-black pt-12 pb-8 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            {/* Col 1: Brand */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FF8370] border-2 border-black flex items-center justify-center font-serif font-black text-black">
                  आ
                </div>
                <span className="font-serif font-black text-xl text-black">Ashray</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                A community rental platform bridging hidden neighbourhood vacancies with genuine tenants. Simple, direct, and broker-free.
              </p>
              <div className="text-[11px] font-mono text-gray-500">
                Crafted for local communities.
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-black mb-3">Explore</h5>
              <ul className="space-y-2 text-xs font-medium text-gray-700">
                <li><a href="#properties" className="hover:underline">All Properties</a></li>
                <li><a href="#how-it-works" className="hover:underline">How It Works</a></li>
                <li>
                  <button onClick={() => setIsReportModalOpen(true)} className="hover:underline text-left">
                    Report a Vacant Home
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsListModalOpen(true)} className="hover:underline text-left">
                    Landlord Dashboard
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Legal & Trust */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-black mb-3">Trust & Legal</h5>
              <ul className="space-y-2 text-xs font-medium text-gray-700">
                <li><a href="#about" className="hover:underline">About Ashray</a></li>
                <li><a href="#" className="hover:underline">Verification Guidelines</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>

            {/* Col 4: Community Newsletter / Updates */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-black mb-1">Local Rental Bulletin</h5>
              <p className="text-xs text-gray-600">
                Receive a weekly summary of newly reported vacancies in your neighbourhood.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); }} className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white border-2 border-black rounded-xl px-3 py-1.5 text-xs w-full focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
                <button 
                  type="submit"
                  className="bg-[#56CCF2] border-2 border-black text-black px-3 py-1.5 rounded-xl text-xs font-bold shadow-[2px_2px_0px_#000] shrink-0"
                >
                  Join
                </button>
              </form>
            </div>

          </div>

          {/* Copyright Row */}
          <div className="border-t border-black/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Ashray Technologies. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Zero-commission local shelter network.</span>
            </p>
          </div>
        </footer>

      </div>

      {}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF7EE] border-3 border-black rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_#000] p-6 relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-[#FF8370] transition-colors shadow-[2px_2px_0px_#000]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Property Image Banner */}
            <div className="rounded-2xl border-2 border-black overflow-hidden h-60 w-full mb-5 relative">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#FAF7EE] border border-black text-xs font-bold px-3 py-1 rounded-full shadow-[2px_2px_0px_#000]">
                {selectedProperty.type} • {selectedProperty.furnishing}
              </div>
            </div>

            {/* Location & Title */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF8370]" />
              <span>{selectedProperty.locality}, {selectedProperty.city}</span>
            </div>

            <h3 className="text-2xl font-black font-serif text-[#1A1A1A] mb-3">
              {selectedProperty.title}
            </h3>

            {/* Rent and Key Numbers Strip */}
            <div className="grid grid-cols-3 gap-3 bg-white border-2 border-black rounded-xl p-3 mb-5 shadow-[2px_2px_0px_#000]">
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-500">Monthly Rent</div>
                <div className="text-lg font-extrabold text-black">₹{selectedProperty.rent.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-500">Security Deposit</div>
                <div className="text-lg font-extrabold text-black">₹{selectedProperty.deposit.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-500">Carpet Area</div>
                <div className="text-lg font-extrabold text-black">{selectedProperty.sqft} sq.ft</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-1.5">Owner's Note</h4>
              <p className="text-sm text-gray-700 leading-relaxed bg-[#FBF9F4] p-3 rounded-xl border border-black/20">
                "{selectedProperty.description}"
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2">Amenities & Details</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProperty.amenities.map((item, idx) => (
                  <span key={idx} className="bg-white text-xs font-semibold px-2.5 py-1 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000]">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Landlord Contact Box */}
            <div className="bg-[#56CCF2]/20 border-2 border-black rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-gray-700">Property Owner</div>
                <div className="text-base font-bold text-black">{selectedProperty.ownerName}</div>
                <div className="text-xs text-gray-600">Zero broker commission guaranteed</div>
              </div>

              <a 
                href={`tel:${selectedProperty.ownerContact}`}
                className="bg-[#1A1A1A] hover:bg-neutral-800 text-white text-sm font-bold px-5 py-2.5 rounded-full border-2 border-black shadow-[2.5px_2.5px_0px_#FF8370] flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#56CCF2]" />
                <span>Call {selectedProperty.ownerContact}</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF7EE] border-3 border-black rounded-3xl max-w-lg w-full shadow-[8px_8px_0px_#000] p-6 relative">
            
            <button 
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-[#FF8370] transition-colors shadow-[2px_2px_0px_#000]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8370]" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Community Scout</span>
            </div>

            <h3 className="text-2xl font-black font-serif text-[#1A1A1A] mb-1">
              Report an Empty House
            </h3>
            <p className="text-xs text-gray-600 mb-5">
              Spot a vacant house or flat on your street? Share basic details so genuine seekers can find it.
            </p>

            {reportSuccess ? (
              <div className="bg-[#F9E784] border-2 border-black rounded-2xl p-6 text-center">
                <CheckCircle2 className="w-10 h-10 mx-auto text-black mb-2" />
                <h4 className="font-bold text-base">Thank you for helping the neighborhood!</h4>
                <p className="text-xs text-gray-700 mt-1">
                  Our community volunteers will verify the location and list it to help local seekers.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVacancySubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    House / Building Address or Street *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 14th Cross, 3rd Main, near Ganesh Temple" 
                    value={vacancyForm.address}
                    onChange={(e) => setVacancyForm({...vacancyForm, address: e.target.value})}
                    className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF8370]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      Locality / Colony *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Indiranagar, Koramangala" 
                      value={vacancyForm.locality}
                      onChange={(e) => setVacancyForm({...vacancyForm, locality: e.target.value})}
                      className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF8370]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      Landmark
                    </label>
                    <input 
                      type="text" 
                      placeholder="Opposite Post Office" 
                      value={vacancyForm.landmark}
                      onChange={(e) => setVacancyForm({...vacancyForm, landmark: e.target.value})}
                      className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF8370]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Owner's Name or Contact (if you know it)
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Uncle Sharma or to-let board phone number" 
                    value={vacancyForm.ownerNameOrPhone}
                    onChange={(e) => setVacancyForm({...vacancyForm, ownerNameOrPhone: e.target.value})}
                    className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF8370]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Brief Notes (Floor, type, balcony, condition)
                  </label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. 2nd floor 2BHK flat, has 'To-Let' sign, vacant for 3 weeks."
                    value={vacancyForm.details}
                    onChange={(e) => setVacancyForm({...vacancyForm, details: e.target.value})}
                    className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF8370]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Your Name (Optional)
                  </label>
                  <input 
                    type="text" 
                    placeholder="Your name or neighbour identity" 
                    value={vacancyForm.submittedBy}
                    onChange={(e) => setVacancyForm({...vacancyForm, submittedBy: e.target.value})}
                    className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF8370]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#FF8370] hover:bg-[#ff6f59] text-black font-bold py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-sm mt-2"
                >
                  Submit Vacant Property Report
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {}
      {isListModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF7EE] border-3 border-black rounded-3xl max-w-lg w-full shadow-[8px_8px_0px_#000] p-6 relative">
            
            <button 
              onClick={() => setIsListModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-[#56CCF2] transition-colors shadow-[2px_2px_0px_#000]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#56CCF2]" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Landlord Direct</span>
            </div>

            <h3 className="text-2xl font-black font-serif text-[#1A1A1A] mb-1">
              List Your Property
            </h3>
            <p className="text-xs text-gray-600 mb-5">
              Publish directly to verified seekers in your locality. No brokerage commissions.
            </p>

            {listSuccess ? (
              <div className="bg-[#56CCF2]/30 border-2 border-black rounded-2xl p-6 text-center">
                <CheckCircle2 className="w-10 h-10 mx-auto text-black mb-2" />
                <h4 className="font-bold text-base">Listing Created Successfully!</h4>
                <p className="text-xs text-gray-700 mt-1">
                  Your listing is now active in the local directory. Tenants can view details and reach out.
                </p>
              </div>
            ) : (
              <form onSubmit={handleListSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      Your Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Sunita Devi" 
                      value={landlordForm.name}
                      onChange={(e) => setLandlordForm({...landlordForm, name: e.target.value})}
                      className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#56CCF2]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      Contact Phone *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="10-digit Mobile" 
                      value={landlordForm.phone}
                      onChange={(e) => setLandlordForm({...landlordForm, phone: e.target.value})}
                      className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#56CCF2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      Locality & City *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Anna Nagar, Chennai" 
                      value={landlordForm.locality}
                      onChange={(e) => setLandlordForm({...landlordForm, locality: e.target.value})}
                      className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#56CCF2]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      Property Type *
                    </label>
                    <select 
                      value={landlordForm.type}
                      onChange={(e) => setLandlordForm({...landlordForm, type: e.target.value})}
                      className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#56CCF2]"
                    >
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Studio">Studio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Expected Monthly Rent (₹) *
                  </label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 18500" 
                    value={landlordForm.expectedRent}
                    onChange={(e) => setLandlordForm({...landlordForm, expectedRent: e.target.value})}
                    className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#56CCF2]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Property Description & Preference
                  </label>
                  <textarea 
                    rows={2}
                    placeholder="Quiet residential flat, families or working professionals welcome. 24h water."
                    value={landlordForm.description}
                    onChange={(e) => setLandlordForm({...landlordForm, description: e.target.value})}
                    className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#56CCF2]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#56CCF2] hover:bg-[#45bfe6] text-black font-bold py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-sm mt-2"
                >
                  Publish Free Listing
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}