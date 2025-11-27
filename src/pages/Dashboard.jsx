import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

function Dashboard() {
  const { filteredArticles, error, categories } = useContext(NewsContext);

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - News Headlines */}
          <div className="lg:w-1/4 flex flex-col space-y-6">
            {/* Brand Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-4 text-white shadow-lg">
              <h1 className="text-2xl font-bold">Blazing News</h1>
              <p className="text-blue-100 text-sm mt-1">
                Stay informed, stay ahead
              </p>
            </div>

            {/* News Headlines List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                  Latest Headlines
                </h2>
              </div>
              <div className="overflow-y-auto max-h-[60vh]">
                {filteredArticles.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 group"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-tight text-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.source?.name || "Unknown Source"}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Space */}
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg p-6 text-white text-center shadow-lg">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <p className="font-semibold text-lg mb-2">Advertisement</p>
                <p className="text-teal-100 text-sm">Your Ad Could Be Here</p>
                <button className="mt-3 bg-white text-teal-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Main News Grid */}
          <div className="lg:w-3/4">
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      Error loading news
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredArticles.map((item, index) => (
                <article
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={
                        item.urlToImage ||
                        "https://placehold.co/600x400/3B82F6/FFFFFF?text=No+Image"
                      }
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400/3B82F6/FFFFFF?text=No+Image";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                        {item.source?.name || "News"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span>{formatDate(item.publishedAt)}</span>
                      {item.author && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="truncate">By {item.author}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {item.description ||
                        "No description available for this article."}
                    </p>

                    <div className="flex items-center justify-between">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group"
                      >
                        Read full story
                        <svg
                          className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {filteredArticles.length === 0 && !error && (
              <div className="text-center py-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-auto">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v3m0-3a2 2 0 012-2h2a2 2 0 012 2m0 0V6a2 2 0 012-2h2a2 2 0 012 2v1"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    No articles found
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-800 border-t border-gray-800 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-300 dark:text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} News Teller. Powered by
                greatRoyce
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 dark:text-gray-500 text-sm">Data provided by</span>
              <a
                href="https://newsapi.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white dark:text-gray-300 hover:text-blue-300 dark:hover:text-blue-400 transition-colors font-medium"
              >
                NewsAPI.org
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;