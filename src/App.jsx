// src/App.jsx
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header / Nav */}
      <nav className="nb-border bg-white">
        <div className="container h-16 grid grid-cols-[1fr,auto,1fr] items-center">
          {/* Left: Brand */}
          <Link to="/" className="justify-self-start no-underline text-inherit">
            <span className="px-2 py-1 nb-border bg-white font-extrabold text-lg">
              Movie Finder
            </span>
          </Link>

          {/* Center: GitHub + LinkedIn */}
          <div className="flex items-center gap-4 justify-self-center">
            {/* GitHub */}
            <a
              href="https://github.com/YOUR_USERNAME/YOUR_REPO"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full nb-border bg-black hover:bg-gray-800 transition"
              aria-label="GitHub"
            >
              {/* GitHub logo (white) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56 
                0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 
                1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.72 1.27 3.38.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 
                0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.5.11-3.12 0 0 .97-.31 3.18 1.19a11.1 11.1 0 012.9-.39c.98 0 
                1.97.13 2.9.39 2.21-1.5 3.18-1.19 3.18-1.19.63 1.62.23 2.82.11 3.12.75.81 1.2 1.85 
                1.2 3.11 0 4.43-2.68 5.41-5.24 5.69.42.37.79 1.1.79 2.22 0 1.6-.01 2.89-.01 3.28 
                0 .31.21.67.8.55A10.52 10.52 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/YOUR_LINKEDIN/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full nb-border bg-[#0A66C2] hover:bg-[#004182] transition"
              aria-label="LinkedIn"
            >
              {/* LinkedIn logo (white) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6A2.5 2.5 0 0 1 2.5 1a2.5 2.5 0 0 1 2.48 2.5zM.5 
                23.5h4V7.5h-4v16zm7.5 0h4v-8.2c0-2.1.8-3.3 2.6-3.3 1.6 0 2.4 1.1 2.4 3.3v8.2h4v-8.8c0-4.3-2.3-6.4-5.5-6.4-2.5 
                0-3.6 1.4-4.2 2.4h-.1v-2h-4c.1 1.3 0 16 0 16z"
                />
              </svg>
            </a>
          </div>

          {/* Right: OMDb */}
          <a
            href="https://www.omdbapi.com/"
            target="_blank"
            rel="noreferrer"
            className="nb-btn no-underline text-inherit justify-self-end"
            aria-label="OMDb API website"
          >
            OMDb API
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="container flex-1 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="nb-border bg-white">
        <div className="container py-4 text-center">
          <p className="text-sm font-semibold animate-pulse tracking-wide">
            created by Manoj
          </p>
        </div>
      </footer>
    </div>
  );
}
