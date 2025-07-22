import { useEffect, useState } from "react";
import Logout from "../components/Logout";
import { useNavigate } from "react-router-dom";


export default function Bookmarks() {
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedTag, setSelectedTag] = useState("General");
  const [filterTag, setFilterTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(stored);
  }, []);

  const addBookmark = async () => {
    if (!url) return alert("Please enter a valid URL.");
    try {
      const title = new URL(url).hostname;
      const summary = await getSummary(url);
      const icon = `https://${new URL(url).hostname}/favicon.ico`;

      const newBookmark = {
        id: crypto.randomUUID(),
        url,
        title,
        summary,
        icon,
        tag: selectedTag,
        createdAt: new Date().toISOString(),
      };

      const updated = [newBookmark, ...bookmarks];
      setBookmarks(updated);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      setUrl("");
    } catch (err) {
      console.error("Invalid URL:", err);
      alert("Invalid URL format");
    }
  };

  const deleteBookmark = (idToDelete) => {
    const updated = bookmarks.filter((b) => b.id !== idToDelete);
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const getSummary = async (url) => {
    try {
      const encoded = encodeURIComponent(url);
      const response = await fetch(`https://r.jina.ai/${encoded}`);
      if (!response.ok) throw new Error("API error");
      return await response.text();
    } catch (err) {
      console.error("Error fetching summary:", err);
      return "Summary not available for this URL.";
    }
  };

  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesTag = filterTag === "All" || b.tag === filterTag;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-4 py-10 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">My Bookmarks</h1>

        {/* Input and Save Section */}
        <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
          >
            <option>General</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Learning</option>
          </select>

          <button
            onClick={addBookmark}
            className="px-6 py-2 bg-black text-white rounded-md hover:opacity-90 transition"
          >
            Save
          </button>
          <Logout />
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-md"
          />

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
          >
            <option>All</option>
            <option>General</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Learning</option>
          </select>
        </div>

        {/* Bookmark Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {filteredBookmarks.length === 0 && (
            <p className="text-center text-neutral-500 col-span-full">No bookmarks found.</p>
          )}
          {filteredBookmarks.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <img src={b.icon} alt="favicon" className="w-5 h-5" />
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline break-all text-black dark:text-white"
                  >
                    {b.title}
                  </a>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">#{b.tag}</span>
              </div>

              {/* Summary trimmed to 5 lines */}
              <p className="text-sm text-neutral-700 dark:text-neutral-200 mt-1 whitespace-pre-line line-clamp-5" 
              onClick={() => navigate(`/summary/${b.id}`)}
              >
                {b.summary}
              </p>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Saved on {new Date(b.createdAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => deleteBookmark(b.id)}
                className="mt-4 bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
