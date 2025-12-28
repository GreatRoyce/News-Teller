import React, { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import Newspaper from "../assets/Newsteller.png";

const categories = [
  { name: "general", icon: "general" },
  { name: "business", icon: "business" },
  { name: "entertainment", icon: "entertainment" },
  { name: "health", icon: "health" },
  { name: "science", icon: "science" },
  { name: "sports", icon: "sport" },
  { name: "technology", icon: "technology" },
];

const Navbar = () => {
  const { search, setSearch, setCategory, category } = useContext(NewsContext);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle dark class on root element for Tailwind dark mode
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`${
        isDarkMode ? "dark:bg-gray-900" : "bg-white"
      } shadow-lg border-b ${
        isDarkMode ? "dark:border-gray-700" : "border-gray-200"
      } sticky top-0 z-50`}
    >
      <div className="w-full mx-auto px-4 sm:px-8">
        {/* Main Navigation - Compact layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 gap-1">
          {/* Logo/Brand - More compact */}
          <div className="flex items-center justify-center sm:justify-start sm:w-auto">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div
                className="bg-contain border-red-700 w-24 h-24 bg-no-repeat bg-center transition-transform duration-200"
                style={{ backgroundImage: `url(${Newspaper})` }}
              ></div>
            </div>
          </div>

          {/* Categories Navigation - Optimized for space */}
          <nav className="flex-1 sm:px-4 min-w-0">
            <div className="relative">
              <div className="flex space-x-1 overflow-x-auto py-1 justify-center items-center scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setCategory(cat.name)}
                    className={`flex capitalize items-center space-x-2 px-3 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                      category === cat.name
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span className="capitalize hidden xs:inline">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
              {/* Scroll indicator */}
              <div
                className={`absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l ${
                  isDarkMode ? "from-gray-900" : "from-white"
                } to-transparent pointer-events-none`}
              />
            </div>
          </nav>

          {/* Search Bar and Toggle - Responsive width */}
          <div className="flex-shrink-0 w-full sm:w-48 lg:w-56 flex items-center gap-2">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                // Sun icon for light mode
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div
                className={`relative transition-all duration-200 ${
                  isSearchFocused ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                } rounded-lg`}
              >
                <input
                  className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-gray-700 transition-colors duration-200"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search articles..."
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center"
                  >
                    <svg
                      className="h-4 w-4 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Category Indicator - More compact */}
        <div className="sm:hidden pb-1">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium capitalize">
              {category} {categories.find((c) => c.name === category)?.icon}
            </span>
            <span>•</span>
            <span>Active</span>
          </div>
        </div>
      </div>

      {/* Active Category Bar - Desktop - More compact */}
      <div
        className={`hidden sm:block border-t ${
          isDarkMode ? "dark:border-gray-800" : "border-gray-100"
        }`}
      >
        <div className="w-full mx-auto px-3 sm:px-4">
          <div className="py-1 flex items-center space-x-2 text-xs">
            <span className="text-gray-500 dark:text-gray-400">Viewing:</span>
            <span className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
              <span className="text-sm capitalize">
                {categories.find((c) => c.name === category)?.icon}
              </span>
            </span>
            {search && (
              <>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <span className="flex items-center space-x-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                  <span className="text-sm">🔍</span>
                  <span className="font-medium truncate max-w-[120px]">
                    "{search}"
                  </span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
