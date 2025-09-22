import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'


// Import your Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

   if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)


 {/* Confirm Password */}
          {/* <div className="mb-6">

            <div className='flex items-center gap-2'>
    <label className="block text-sm text-white mb-1">Confirm Password <span className="text-red-500">*</span></label>
      <img src={inquiryImg} alt="inquiry" className="w-3 h-3 opacity-70" />
            </div>
            
            <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-3 py-2">
              <img src={lockIcon} alt="lock" className="w-4 h-4 mr-2 opacity-70" />
              <input
                type="password"
                placeholder="••••••••••"
                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                value={password}
              />
              <img src={eyeIcon} alt="lock" className="w-4 h-4 mr-2 opacity-70" />
            </div>
          </div> */}


          // gideonogunronbi57@gmail.com
