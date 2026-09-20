import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { EmptyHouseBanner } from '../components/EmptyHouseBanner';
import { ListPropertySection } from '../components/ListPropertySection';
import { CommunityFeatures } from '../components/CommunityFeatures';
import { CtaBanner } from '../components/CtaBanner';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2421] font-sans antialiased selection:bg-[#A94C2B]/20">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <FeaturedProperties />
        <EmptyHouseBanner />
        <ListPropertySection />
        <CommunityFeatures />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Home;