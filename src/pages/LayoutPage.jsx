import React, { useState } from "react";
import { X, Menu } from "lucide-react"; // Icons for menu toggle
import Sidebar from "./Sidebar";
import LiveLtp from "./LiveLtp";

const LayoutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Mobile Menu Button */}
      <button
        className="absolute top-4 left-4 lg:hidden p-2 bg-gray-800 rounded-md shadow-md"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar (Visible on large screens, full-screen on mobile) */}
      <div
        className={`fixed inset-0 bg-gray-900 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-64`}
      >
        {/* Close Button (Mobile View) */}
        <button
          className="absolute top-4 right-4 lg:hidden p-2 bg-gray-700 rounded-md"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={24} />
        </button>

        <Sidebar />
      </div>

      {/* Main content - Live LTP table */}
      <div className="flex-1 p-6">
        <LiveLtp />
      </div>
    </div>
  );
};

export default LayoutPage;
