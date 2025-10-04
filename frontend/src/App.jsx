// import React from 'react'
// import { Route } from 'react-router-dom'
// import { Routes, Router } from 'react-router-dom'
// import Onboardingscreen from './components/Onboardingscreen'
// import Role from './components/Role'
// import SelectVibe from './components/SelectVibe'
// import Works from './components/Works'
// import HomeScreen from './components/Home'
// import Signin from './components/Signin'
// import Signup from './components/Signup'
// import Modal from './components/Modal'
// import MusicVoteScreen from './components/MusicVoteScreen'
// import SecondHome from './components/SecondHome'
// import ProfileScreen from './components/ProfileScreen'
// import FavouriteScreen from './components/FavouriteScreen'
// import StreamSection from './components/StreamSection'
// import DownloadSection from './components/DownloadSection'
// import VoteSection2 from './components/VoteSection2'
// import ChartSection from './components/ChartSection'
// import MusicSection from './components/MusicSection'
// import SettingsSection from './components/SettingsSection'
// import VerifyEmailScreen from './components/VerifyEmailScreen'
// import VerificationPage from './components/VerificationPage'
// import CritiqHomePage from './components/CritiqHomePage'
// import ArtisteDetails from './components/ArtisteDetails'
// import UserDetails from './components/UserDetails'
// import ArtisteSignUp from './components/ArtisteSignUp'
// import ArtisteSignIn from './components/ArtisteSignIn'
// import SsoCallback from './components/SsoCallback'
// import ArtisteHub from './components/ArtisteHub'
// import UploadHub from './components/UploadHub'
// import SuccessfulUploadHub from './components/SuccessfulUploadHub'
// import FailedSignUpScreen from './components/FailedSignUpScreen'
// import FailedSignInScreen from './components/FailedSignInScreen'
// import ForgotPassword from './components/ForgotPassword'
// import SetNewPassword from './components/SetNewPassword'
// import PasswordUpdated from './components/PasswordUpdated'
// import LoginSuccess from './components/LoginSuccess'
// import Profile from './components/Profile'
// import MyVotes from './components/MyVotes'
// import LeaderBoardNew from './components/LeaderBoardNew'
// import Layout from './components/LayOut'
// import AutoLogout from './components/AutoLogout'
// import ArtisteProfile from './components/ArtisteProfile'

// const App = () => {
//   return (
//      <>
//       <AutoLogout timeout={10 * 60 * 1000} /> {/* 5 mins */}
//     <Routes>
//        <Route path="/signin" element={<Signin />} />
//       <Route path="/signup" element={<Signup />} />
//          <Route path="/artiste-signup" element={<ArtisteSignUp />} />
//           <Route path="/artiste-signin" element={<ArtisteSignIn />} />
//       <Route path="/" element={<Onboardingscreen />} />

//       {/* Add more routes here as needed */}
//       <Route path="/role" element={<Role />} />
//       <Route path="/select-vibe" element={<SelectVibe />} />
//       <Route path="/works" element={<Works />} />
//        <Route path="/home" element={<HomeScreen />} />
     
//        <Route path="/modal" element={<Signup />} />
//         <Route path="/musicvotescreen" element={<MusicVoteScreen />} />

//         {/* create the routes for the nodal side  */}
//         <Route path="/secondhome" element={< SecondHome />} />
//         <Route path="/profile" element={<ProfileScreen />} />
//       <Route path="/favourite" element={<FavouriteScreen />} />
//       <Route path="/stream" element={<StreamSection />} />
     
//       <Route path="/artist-route" element={<ArtisteDetails />} />
//        <Route path="/user-details" element={<UserDetails/>} />
//       <Route path="/download" element={<DownloadSection />} />
//       <Route path="/vote" element={<VoteSection2 />} />
//       <Route path="/chart" element={<ChartSection />} />
//       <Route path="/music" element={<MusicSection />} />
//       <Route path="/settings" element={<SettingsSection />} />
//        <Route path="/verifyScreen" element={<VerifyEmailScreen />} />
//         <Route path="/verifiedPage" element={<VerificationPage />} />
      



//       {/* Add more routes here as needed */}
//       <Route path="/artistehub" element={<ArtisteHub/>} />
//         <Route path="/uploadhub" element={<UploadHub/>} />
//       <Route path="/successful-upload" element={<SuccessfulUploadHub />} />

 
//         {/* for failed sign up and sign in screen */}
//       <Route path="/failed-signup" element={<FailedSignUpScreen />} />
//       <Route path="/failed-signin" element={<FailedSignInScreen />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/set-new-password" element={<SetNewPassword />} />
//       <Route path="/password-updated" element={<PasswordUpdated />} />
//       <Route path="/login-success" element={<LoginSuccess />} />

     


//       {/* the routes */}
//          {/* <Route path="/homePage" element={<CritiqHomePage />} />
//       <Route path="/profile-page" element={<Profile/>} />
//        <Route path="/myvotes-page" element={<MyVotes/>} />
//         <Route path="/leaderboard-page" element={<LeaderBoardNew/>} /> */}

//       {/* the nav-wrapped pages */}
//   <Route
//     path="/homePage"
//     element={
//       <Layout>
//         <CritiqHomePage />
//       </Layout>
//     }
//   />
//   <Route
//     path="/myvotes-page"
//     element={
//       <Layout>
//         <MyVotes />
//       </Layout>
//     }
//   />
//   <Route
//     path="/leaderboard-page"
//     element={
//       <Layout>
//         <LeaderBoardNew />
//       </Layout>
//     }
//   />
//   <Route
//     path="/profile-page"
//     element={
//       <Layout>
//         <Profile />
//       </Layout>
//     }
//   />
    

    
//     </Routes>
//   </>
//   )
// }

// export default App


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
import SsoCallback from './components/SsoCallback'
import ArtisteHub from './components/ArtisteHub'
import UploadHub from './components/UploadHub'
import SuccessfulUploadHub from './components/SuccessfulUploadHub'
import FailedSignUpScreen from './components/FailedSignUpScreen'
import FailedSignInScreen from './components/FailedSignInScreen'
import ForgotPassword from './components/ForgotPassword'
import SetNewPassword from './components/SetNewPassword'
import PasswordUpdated from './components/PasswordUpdated'
import LoginSuccess from './components/LoginSuccess'
import Profile from './components/Profile'
import MyVotes from './components/MyVotes'
import LeaderBoardNew from './components/LeaderBoardNew'
import Layout from './components/LayOut'
import AutoLogout from './components/AutoLogout'
import ArtisteProfile from './components/ArtisteProfile'
import ProfileRouter from './components/ProfileRouter' // Import the new ProfileRouter

const App = () => {
  return (
     <>
      <AutoLogout timeout={10 * 60 * 1000} /> {/* 5 mins */}
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
      
      {/* Add more routes here as needed */}
      <Route path="/artistehub" element={<ArtisteHub/>} />
        <Route path="/uploadhub" element={<UploadHub/>} />
      <Route path="/successful-upload" element={<SuccessfulUploadHub />} />

        {/* for failed sign up and sign in screen */}
      <Route path="/failed-signup" element={<FailedSignUpScreen />} />
      <Route path="/failed-signin" element={<FailedSignInScreen />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/set-new-password" element={<SetNewPassword />} />
      <Route path="/password-updated" element={<PasswordUpdated />} />
      <Route path="/login-success" element={<LoginSuccess />} />

      {/* the nav-wrapped pages */}
      <Route
        path="/homePage"
        element={
          <Layout>
            <CritiqHomePage />
          </Layout>
        }
      />
      <Route
        path="/myvotes-page"
        element={
          <Layout>
            <MyVotes />
          </Layout>
        }
      />
      <Route
        path="/leaderboard-page"
        element={
          <Layout>
            <LeaderBoardNew />
          </Layout>
        }
      />
      {/* Updated profile route to use ProfileRouter for role-based routing */}
      <Route
        path="/profile-page"
        element={
          <Layout>
            <ProfileRouter />
          </Layout>
        }
      />
    </Routes>
  </>
  )
}

export default App