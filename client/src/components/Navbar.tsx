import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#FAF7F2] border-b border-[#EAE4DC] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-[#A94C2B]">
            <svg
              className="w-6 h-6 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
              <path d="m18 9-6-6-6 6" />
            </svg>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2A2421]">
            Ashray
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#4D4540]">
          <a href="#properties" className="hover:text-[#A94C2B] transition-colors">Properties</a>
          <a href="#how-it-works" className="hover:text-[#A94C2B] transition-colors">How It Works</a>
          <a href="#report-vacancy" className="hover:text-[#A94C2B] transition-colors">Report Vacancy</a>
          <a href="#about" className="hover:text-[#A94C2B] transition-colors">About</a>
        </nav>

        {/* Right CTA / Auth */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-sm font-medium text-[#2A2421] hover:text-[#A94C2B] transition-colors">
            Login
          </button>
          <button className="bg-[#A94C2B] hover:bg-[#933F22] text-white text-sm font-medium px-5 py-2.5 rounded transition shadow-sm">
            List Your Property
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#2A2421] focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EAE4DC] px-4 pt-2 pb-6 space-y-3">
          <a
            href="#properties"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#2A2421] py-2"
          >
            Properties
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#2A2421] py-2"
          >
            How It Works
          </a>
          <a
            href="#report-vacancy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#2A2421] py-2"
          >
            Report Vacancy
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#2A2421] py-2"
          >
            About
          </a>
          <div className="pt-4 border-t border-[#EAE4DC] flex flex-col gap-3">
            <button className="w-full text-left font-medium text-[#2A2421] py-2">
              Login
            </button>
            <button className="w-full bg-[#A94C2B] text-white py-2.5 rounded font-medium text-center">
              List Your Property
            </button>
          </div>
        </div>
      )}
    </header>
  );
};