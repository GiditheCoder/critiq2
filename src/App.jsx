import React from 'react'
import { Route } from 'react-router-dom'
import { Routes, Router } from 'react-router-dom'
import Onboardingscreen from './components/Onboardingscreen'
import Role from './components/Role'
import SelectVibe from './components/SelectVibe'
import Works from './components/Works'
import HomeScreen from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Modal from './components/Modal'
import MusicVoteScreen from './components/MusicVoteScreen'
import SecondHome from './components/SecondHome'
import ProfileScreen from './components/ProfileScreen'
import FavouriteScreen from './components/FavouriteScreen'
import StreamSection from './components/StreamSection'
import DownloadSection from './components/DownloadSection'
import VoteSection2 from './components/VoteSection2'
import ChartSection from './components/ChartSection'
import MusicSection from './components/MusicSection'
import SettingsSection from './components/SettingsSection'
import VerifyEmailScreen from './components/VerifyEmailScreen'
import VerificationPage from './components/VerificationPage'
import CritiqHomePage from './components/CritiqHomePage'
import ArtisteDetails from './components/ArtisteDetails'
import UserDetails from './components/UserDetails'
import ArtisteSignUp from './components/ArtisteSignUp'
import ArtisteSignIn from './components/ArtisteSignIn'
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const App = () => {
  return (
   
    <Routes>
       <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
         <Route path="/artiste-signup" element={<ArtisteSignUp />} />
          <Route path="/artiste-signin" element={<ArtisteSignIn />} />
      <Route path="/" element={<Onboardingscreen />} />

      {/* Add more routes here as needed */}
      <Route path="/role" element={<Role />} />
      <Route path="/select-vibe" element={<SelectVibe />} />
      <Route path="/works" element={<Works />} />
       <Route path="/home" element={<HomeScreen />} />
     
       <Route path="/modal" element={<Signup />} />
        <Route path="/musicvotescreen" element={<MusicVoteScreen />} />

        {/* create the routes for the nodal side  */}
        <Route path="/secondhome" element={< SecondHome />} />
        <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/favourite" element={<FavouriteScreen />} />
      <Route path="/stream" element={<StreamSection />} />
     
      <Route path="/artist-route" element={<ArtisteDetails />} />
       <Route path="/user-details" element={<UserDetails/>} />
      <Route path="/download" element={<DownloadSection />} />
      <Route path="/vote" element={<VoteSection2 />} />
      <Route path="/chart" element={<ChartSection />} />
      <Route path="/music" element={<MusicSection />} />
      <Route path="/settings" element={<SettingsSection />} />
       <Route path="/verifyScreen" element={<VerifyEmailScreen />} />
        <Route path="/verifiedPage" element={<VerificationPage />} />
         <Route path="/homePage" element={<CritiqHomePage />} />



      {/* Add more routes here as needed */}


    
    </Routes>
  
  )
}

export default App
