// src/components/common/Footer.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  EnvelopeIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

function Footer() {
  const { user } = useContext(AuthContext);

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="nav-heading text-5xl text-gray-800 hover:text-yellow-600">
              rift.
            </Link>
            <p className="mt-2 text-gray-600 text-center md:text-left">
              Discover unique thrifted fashion.
            </p>
            <Link
              to="/admin/login"
              className="mt-2 text-gray-600 text-center md:text-left hover:text-yellow-600"
            >
              Admin Panel
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center">
            <h3 className="font-heading text-lg text-gray-800 mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/" className="hover:text-yellow-600 flex items-center gap-2">
                  <HomeIcon className="h-5 w-5" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-yellow-600 flex items-center gap-2">
                  <PlusIcon className="h-5 w-5" />
                  Sell
                </Link>
              </li>
              <li>
                { user ? (
                  <Link
                    to={`/profile/${user?.id || "me"}`}
                    className="hover:text-yellow-600 flex items-center gap-2"
                  >
                    <UserIcon className="h-5 w-5" />
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="hover:text-yellow-600 flex items-center gap-2"
                  >
                    <UserIcon className="h-5 w-5" />
                    Profile
                  </Link>
                )
                }
              </li>
              {/*
              <li>
                <Link to="/contact" className="hover:text-yellow-600 flex items-center gap-2">
                  <EnvelopeIcon className="h-5 w-5" />
                  Contact
                </Link>
              </li>
              */}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-heading text-lg text-gray-800 mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-yellow-600"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-yellow-600"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-yellow-600"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>© 2025 RIFT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

/* Alternative: Old Twitter Icon (uncomment to use instead of X logo)
<a
  href="https://x.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-600 hover:text-yellow-600"
>
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4 필요한가요?658 4.658 0 .36.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.878-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
  </svg>
</a>
*/