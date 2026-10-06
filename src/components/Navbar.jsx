import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { clearUser } from "../redux/authSlice";
import { logoutUser } from "../services/authServices";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Error logging out");
      dispatch(clearUser());
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* डावी बाजू: लोगो आणि लॉगिन असलेल्या युझरचे नाव */}
          <div className="flex items-center space-x-4">
            <Link to={"/"} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">JP</span>
              </div>
            </Link>

            {/* 💡 दुरुस्ती: जर युझर लॉगिन असेल, तर लोगोच्या लगेच बाजूला त्याचे नाव आणि कंपनीचे स्टेटस दिसेल */}
            {isAuthenticated && user && (
              <div className="hidden sm:flex flex-col border-l pl-4 border-gray-200">
                <span className="font-bold text-gray-800 text-sm">
                  👋 Welcome, {user.name}
                </span>
                {user.role === "recruiter" && user.assignedCompany && (
                  <span className="text-[11px] text-blue-600 font-medium">
                    🏢{" "}
                    {typeof user.assignedCompany === "object"
                      ? user.assignedCompany.name
                      : "Company Active"}
                  </span>
                )}
              </div>
            )}
          </div>

          
          <div className="flex items-center space-x-6">
            <Link
              to={"/"}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <div className="inline-block">
              {!isAuthenticated ? (
                <>
                  <Link
                    to={"/login"}
                    className="text-gray-600 hover:text-blue-600 font-medium mr-4"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="ml-6 text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded-lg"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="relative inline-block text-left">
                  <div className="relative inline-block text-left group">
                    
                    <button className="w-full px-3 py-2 bg-white hover:bg-gray-100 flex items-center space-x-2 rounded-lg border border-gray-100 transition-colors">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                        {user && user.name
                          ? user.name.charAt(0).toUpperCase()
                          : "U"}
                      </span>
                      <span className="font-medium text-gray-600 group-hover:text-blue-600 text-sm">
                        My Account
                      </span>
                      <span className="text-xs text-gray-400 capitalize bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        {user?.role}
                      </span>
                    </button>

                    {/* ड्रॉपडाउन मेनू */}
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="py-1">
                        <Link
                          to={
                            user?.role === "admin"
                              ? "/admin/dashboard"
                              : user?.role === "recruiter"
                                ? "/recruiter/dashboard"
                                : "/dashboard"
                          }
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm font-medium"
                        >
                          📊 Dashboard
                        </Link>

                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm font-medium"
                        >
                          👤 Profile
                        </Link>
                        <button
                          className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50 text-sm font-medium border-t border-gray-100"
                          onClick={handleLogout}
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
