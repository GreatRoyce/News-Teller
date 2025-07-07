import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

function Dashboard() {
  const { filteredArticles, error } = useContext(NewsContext); // ✅ Pull data from context

  return (
    <>
      <div className=" md:grid md:grid-cols-[1fr_3fr] mt-4 sm:grid sm:grid-flow-row">

        <div className="mt-4 p-1">
          <div className="font-bold px-3 pb-3 z-0">Blazing News</div>
          <div className="overflow-y-auto max-h-[60vh]">
            {filteredArticles.map((item, index) => (
              <ul className="p-2 border" key={index}>
                <li className="p-1 font-semibold hover:cursor-pointer hover:border-[#419]">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 underline text-sm hover:text-blue-500"
                  >
                    {item.title}
                  </a>
                </li>
              </ul>
            ))}
          </div>

          <div className="sm:hidden md:block bg-teal-800 mt-[5vh] text-center text-white content-center h-[30vh] ">
            Chook Your Adverts Here
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Top Headlines</h2>

          {error && <p className="text-red-600">{error}</p>}

          <div className="sm:grid sm:grid-flow-row space-y-4 grid self-center gap-4 md:grid-cols-3">
            {filteredArticles.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded shadow-md bg-white"
              >
                <img
                  src={item.urlToImage || "https://placehold.co/600x400"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-5"
                />
                <h3 className="text-lg mb-4 font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {item.description || "No description available."}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 underline text-sm hover:text-blue-500"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
<footer className="mt-10 w-full bg-gray-900 text-white text-center py-6">
  <p className="text-sm sm:text-base">
    &copy; {new Date().getFullYear()} News Teller. Powered by UnArmedALien &nbsp;
    <a
      href="https://newsapi.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-400 hover:text-red-600 underline"
    >
      NewsAPI.org
    </a>
  </p>
</footer>

    </>
  );
}

export default Dashboard;
