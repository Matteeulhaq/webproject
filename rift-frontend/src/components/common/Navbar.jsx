// src/components/common/Navbar.jsx
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  ShoppingCartIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
    HeartIcon,
    ArrowLeftOnRectangleIcon,
    MagnifyingGlassIcon,
    UserPlusIcon,
    ArrowRightOnRectangleIcon,
  } from "@heroicons/react/24/outline";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar flex z-100 justify-between items-center">
      { user ? (
        <div>
        { user.role === "user" && 
          (<Link to="/" className="nav-heading text-4xl">
          rift.
        </Link>)
        }
        { user && user.role === "admin" &&
          (<Link to="/admin/dashboard" className="nav-heading text-4xl">
            rift.
          </Link>)
        }
        </div>
      ) : (
        <Link to="/" className="nav-heading text-4xl">
          rift.
        </Link>
      )}

      <div className="flex items-center gap-4">
        { user ? (
          <div className="flex items-center gap-4">
          { user.role === "user" &&
            (<Link to="/cart" className="p-2 hover:bg-gray-800 rounded-full">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>)
          }
          { user.role === "user" &&
            (<Link to="/sell" className="p-2 hover:bg-gray-800 rounded-full">
              <PlusIcon className="h-6 w-6" />
            </Link>)
          }
          </div>
          ) : (<div className="flex items-center gap-4">
            <Link to="/cart" className="p-2 hover:bg-gray-800 rounded-full">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            <Link to="/sell" className="p-2 hover:bg-gray-800 rounded-full">
              <PlusIcon className="h-6 w-6" />
            </Link>
          </div>)
        }
        {user ? (
        <div className="relative z-100">
          <button
            onClick={toggleDropdown}
            className="p-2 hover:bg-gray-800 rounded-full focus:outline-none"
          >
            <UserIcon className="h-6 w-6" />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-100 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              { user && user.role === "user" &&
                (<Link
                  to={`/profile/${user.id}`}
                  className="block z-100 rounded-md px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  View Profile
                </Link>)
              }
              { user && user.role === "user" &&
                (<Link
                  to="/liked"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Liked
                </Link>)
              }
              { user && user.role === "user" &&
                (<Link
                  to="/orders"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Order History
                </Link>)
              }
              { user && user.role === "user" &&
                (<Link
                  to="/account"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Settings
                </Link>)
              }
              { user && user.role === "admin" &&
                (<Link
                  to="/account"
                  className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Settings
                </Link>)
              }
              <button
                onClick={handleLogout}
                className="block w-full rounded-md text-left px-4 py-2 text-gray-800 hover:bg-gray-100 text-red-500"
              >
                Log Out
              </button>
            </div>
          )}
        </div> ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-yellow-600 hover:text-white transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                <UserPlusIcon className="h-5 w-5" />
                Sign Up
              </Link>
            </div>
          )}
      </div>
    </nav>
  );
}

export default Navbar;