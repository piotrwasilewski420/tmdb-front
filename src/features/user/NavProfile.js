import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./userSlice";

const NavProfile = ({name}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {role} = useSelector(state => state.user);
  const {isLoggedIn} = useSelector(state => state.user);
    return (
        <nav className="bg-gray-800 text-white flex items-center justify-around py-2 fixed top-0 w-full z-10">
      <div className="absolute left-6 text-whitte font-semibold hover:cursor-pointer hover:text-gray-200 duration-200" onClick={() => navigate(-1)}>{`<<< Go back`}</div>
      <div className="text-lg font-medium">
        Welcome, {role === 'ADMIN' ? 'Mighty Admin' : name}!
      </div>
      <div className="flex space-x-4">
        {role === 'ADMIN' ? <Link
          to="/admin/users"
          className="block px-2 py-1 text-sm font-medium hover:text-indigo-300 rounded-md hover:bg-indigo-50"
        >
          Users
        </Link> : null}
        {role === 'ADMIN' ? <Link
          to="/admin/report"
          className="block px-2 py-1 text-sm font-medium hover:text-indigo-300 rounded-md hover:bg-indigo-50"
        >
          Report
          </Link> : null}
        <Link
          to="/profile/actives"
          className="block px-2 py-1 text-sm font-medium hover:text-indigo-300 rounded-md hover:bg-indigo-50"
        >
          Most Actives
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
          to="/profile/blocked"
          className="block px-2 py-1 text-sm font-medium hover:text-indigo-300 rounded-md hover:bg-indigo-50"
          >
          Blocked
          </Link>
          <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
                 className="block px-2 py-1 text-sm font-medium hover:text-red-300 rounded-md hover:bg-red-50"
               >
          Logout
          </button>
          </div>
          </nav>
    );
};

export default NavProfile;