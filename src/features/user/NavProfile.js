import { Link } from "react-router-dom";

const NavProfile = ({name}) => {
    return (
        <nav className="bg-gray-800 text-white flex items-center justify-around py-2 fixed top-0 w-full">
      <div className="text-lg font-medium">
        Welcome, {name}!
      </div>
      <div className="flex space-x-4">
        <Link
          to="/settings"
          className="block px-2 py-1 text-sm font-medium hover:text-indigo-300 rounded-md hover:bg-indigo-50"
        >
          Settings
        </Link>
        <Link
          to="/favorites"
          className="block px-2 py-1 text-sm font-medium hover:text-indigo-300 rounded-md hover:bg-indigo-50"
        >
          Favorites
        </Link>
        <Link
          to="/wishlist"
          className="block px-2 py-1 text-sm font-medium hover:text-indigo-300 rounded-md hover:bg-indigo-50"
        >
          Wishlist
        </Link>
        <Link
          to="/blocked"
          className="block px-2 py-1 text-sm font-medium hover:text-indigo-300 rounded-md hover:bg-indigo-50"
          >
          Blocked
          </Link>
          <button
                 className="block px-2 py-1 text-sm font-medium hover:text-red-300 rounded-md hover:bg-red-50"
               >
          Logout
          </button>
          </div>
          </nav>
    );
};

export default NavProfile;