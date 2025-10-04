import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lock, Mail, User, Bell, Palette, HelpCircle, MessageCircle, FileText, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const settingsOptions = [
    {
      section: 'Account',
      items: [
        { icon: Lock, title: 'Change Password', subtitle: 'Update your password', path: '/change-password' },
        { icon: Mail, title: 'Email', subtitle: 'Change your email address', path: '/change-email' },
        { icon: User, title: 'Profile Details', subtitle: 'Update your information', path: '/profile-details' }
      ]
    },
    {
      section: 'App Preferences',
      items: [
        { icon: Bell, title: 'Notifications', subtitle: 'Manage notifications', path: '/notifications' },
        { icon: Palette, title: 'Theme', subtitle: 'Dark mode', toggle: true }
      ]
    },
    {
      section: 'Help & Support',
      items: [
        { icon: HelpCircle, title: 'FAQ', subtitle: 'Frequently Asked Questions', path: '/faq' },
        { icon: MessageCircle, title: 'Contact Us', subtitle: 'Get in touch with support', path: '/contact' }
      ]
    },
    {
      section: 'About Critiq',
      items: [
        { icon: FileText, title: 'Terms of Service', subtitle: 'Read our terms and conditions', path: '/terms' },
        { icon: Info, title: 'Version', subtitle: 'v1.0.0 (42)', path: null }
      ]
    }
  ];

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-[#0B0A1F] text-white">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold flex-1 text-center mr-10">Settings</h1>
      </div>

      {/* Settings List */}
      <div className="px-4 py-6">
        {settingsOptions.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3 px-2">
              {section.section}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => !item.toggle && handleNavigation(item.path)}
                  className="w-full bg-[#252938] hover:bg-[#2d3348] rounded-xl p-4 flex items-center justify-between transition-colors"
                  disabled={!item.path && !item.toggle}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.subtitle}</p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setDarkMode(!darkMode);
                      }}
                      className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                        darkMode ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform mt-0.5 ${
                          darkMode ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
                        }`}
                      ></div>
                    </div>
                  ) : item.path ? (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-4 pb-8">
        <button
          onClick={handleLogout}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;