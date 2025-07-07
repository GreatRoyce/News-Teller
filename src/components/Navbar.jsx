import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import Newspaper from "../assets/IconicImages/Newspaper";

const Navbar = () => {
  const {
    search,
    setSearch,
    setCategory,
    category, // Optional: for showing active
  } = useContext(NewsContext);

  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <header className="grid grid-cols-1 gap-3 bg-white dark:bg-gray-800 shadow-md mb-[3vh] sm:text-center">
      <div className="max-w-7xl px-4 py-3 sm:flex sm:gap-10 sm:center items-center justify-between">

        {/* 📰 Logo */}
        <div className="text-2xl font-bold text-gray-900 gap-2 sm:self-center items-center flex dark:text-white">
          <div><Newspaper /></div>
          News Teller
        </div>

        {/* 📂 Horizontal Category List */}
        <div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-white ">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`cursor-pointer capitalize hover:text-red-600 transition ${
                category === cat ? "font-bold text-red-700" : ""
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </div>
        <div>
          <hr className="border-1 border-red-700" />
        </div>
        </div>
        

        {/* 🔍 Search Bar */}
        <div className="w-[30vh] flex border-2 pl-2 rounded-2xl mt-4 border-red-800 items-center">
          <input
            className="w-[20vh] pl-1 text-[12px] outline-none text-md"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
          />
          <button className="w-[12vh] bg-red-400 text-white text-[12px] rounded-r-2xl hover:bg-red-700 sm:w-[22vh] ">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
