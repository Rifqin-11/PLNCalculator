import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Zap, Lightbulb, Ruler, Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">PLN Calculator</h1>
              <p className="text-sm text-gray-500">Hitung biaya listrik Anda dengan mudah</p>
            </div>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 mt-4 sm:mt-0`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 inline-flex items-center px-1 pt-1 text-sm font-medium"
                  : "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-500"
              }
            >
              <Zap className="w-5 h-5 mr-2" />
              PLN Calculator
            </NavLink>
            <NavLink
              to="/light-quantity"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 inline-flex items-center px-1 pt-1 text-sm font-medium"
                  : "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-500"
              }
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Light Quantity
            </NavLink>
            <NavLink
              to="/lumens-lux"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 inline-flex items-center px-1 pt-1 text-sm font-medium"
                  : "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-500"
              }
            >
              <Ruler className="w-5 h-5 mr-2" />
              Lumens-Lux
            </NavLink>
          </div>

          {/* Desktop Info Section */}
          <div className="hidden sm:block text-sm text-gray-500">
            <p>Created by</p>
            <p className=" font-semibold text-blue-400">Bani Gondang</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
