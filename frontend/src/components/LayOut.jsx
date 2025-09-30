// components/Layout.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Heart, BarChart3, User } from "lucide-react";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#0B0A1F] text-white flex flex-col">
      {/* Page content */}
      <div className="flex-1">{children}</div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B0A1F] border-t border-gray-800">
        <div className="flex items-center justify-around py-3">
          {/* Browse */}
          <button
            onClick={() => navigate("/homePage")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("/homePage") ? "bg-[#A259FF]" : ""
              }`}
            >
              <Home
                className={`w-4 h-4 ${
                  isActive("/homePage") ? "text-white" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isActive("/homePage") ? "text-[#A259FF]" : "text-gray-400"
              }`}
            >
              Browse
            </span>
          </button>

          {/* My Votes */}
          <button
            onClick={() => navigate("/myvotes-page")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("/myvotes-page") ? "bg-[#A259FF]" : ""
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isActive("/myvotes-page") ? "text-white" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isActive("/myvotes-page") ? "text-[#A259FF]" : "text-gray-400"
              }`}
            >
              My Votes
            </span>
          </button>

          {/* Leaderboard */}
          <button
            onClick={() => navigate("/leaderboard-page")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("/leaderboard-page") ? "bg-[#A259FF]" : ""
              }`}
            >
              <BarChart3
                className={`w-4 h-4 ${
                  isActive("/leaderboard-page")
                    ? "text-white"
                    : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isActive("/leaderboard-page")
                  ? "text-[#A259FF]"
                  : "text-gray-400"
              }`}
            >
              Leaderboard
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile-page")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("/profile-page") ? "bg-[#A259FF]" : ""
              }`}
            >
              <User
                className={`w-4 h-4 ${
                  isActive("/profile-page") ? "text-white" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isActive("/profile-page")
                  ? "text-[#A259FF]"
                  : "text-gray-400"
              }`}
            >
              Profile
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
