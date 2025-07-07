import React, { createContext, useState, useEffect } from "react";

// 1️⃣ Create the context
export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  // 2️⃣ States for news, search, error, dropdown toggle, and category
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);         // Dropdown visibility
  const [category, setCategory] = useState("");           // News category

  const apiKey = "90631fc46ca54956aaca5a3a05e9f8c9"; // Replace with env key in production

  // 3️⃣ Fetch news based on selected category
  useEffect(() => {
    const getNews = async () => {
      try {
        // Include category if selected
        const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10${
          category ? `&category=${category}` : ""
        }&apiKey=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news");
      }
    };

    getNews();
  }, [category]); // 🔁 Re-fetch only when category changes

  // 4️⃣ Filter articles based on search input
  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(search.toLowerCase())
  );

  // 5️⃣ Share all states and functions with the rest of the app
  return (
    <NewsContext.Provider
      value={{
        articles,
        filteredArticles,
        search,
        setSearch,
        error,
        visible,
        setVisible,
        category,
        setCategory, // ✅ Now available for dropdown items
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
