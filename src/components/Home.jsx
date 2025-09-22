import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedArtiste from './FeaturedArtiste';
import MusicVote from '../components/MusicVote';
import VoteSection from './VoteSection';
import Genre from '../components/Genre';
import Footer from '../components/Footer';
import TopVote from './TopVote';
import Modal from './Modal';

const HomeScreen = () => {
  return (
    <div className="flex">
      {/* Sidebar - Hidden on mobile and tablet, visible on desktop */}
      <Modal className="z-50 p-2 hidden lg:block" />

      {/* Main content with responsive left padding */}
      <div className="flex-1 pl-0 lg:pl-20">
        <Header />
        <Hero />
        <FeaturedArtiste />
        <MusicVote />
        <VoteSection />
        <Genre />
        <TopVote />
        <Footer />
      </div>
    </div>
  );
};

export default HomeScreen;