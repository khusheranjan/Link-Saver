import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SummaryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const found = stored.find(b => b.id === id);
    setBookmark(found);
  }, [id]);

  if (!bookmark) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-gray-500 dark:text-gray-300">
        <p>Bookmark not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-4 py-10 transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 p-6 rounded-lg shadow border border-neutral-300 dark:border-neutral-700">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <div className="flex items-center gap-2 mb-2">
          <img src={bookmark.icon} alt="favicon" className="w-5 h-5" />
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline break-all text-black dark:text-white"
          >
            {bookmark.title}
          </a>
        </div>

        <span className="text-xs text-neutral-500 dark:text-neutral-400">#{bookmark.tag}</span>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200 whitespace-pre-line">
          {bookmark.summary}
        </p>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
          Saved on {new Date(bookmark.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
