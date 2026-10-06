import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import { Provider } from "react-redux";
import store from "./redux/store";
import authLoader from "./loaders/authLoader";
import { adminLoader, recruiterLoader, userLoader } from "./loaders/roleLoaders";
import UpdateProfile from "./pages/UpdateProfile";
import UserProfile from "./pages/UserProfile";
import Resume from "./pages/Resume";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: authLoader,
    hydrateFallbackElement: <div
    className="flex items-center justify-center min-hscreen"
    >
      <div className="animate-spin rounded-full h-32 w-32 boder-b-2 border-gray-900"
      ></div>
    </div>
  },
  {
    path: '/job/:jobId',
    element: <JobDetails />,
     loader: authLoader,
    hydrateFallbackElement: <div
    className="flex items-center justify-center min-hscreen"
    >
      <div className="animate-spin rounded-full h-32 w-32 boder-b-2 border-gray-900"
      ></div>
    </div>
  },
   {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: <UserDashboard />,
     loader: userLoader,
    hydrateFallbackElement: <div
    className="flex items-center justify-center min-hscreen"
    >
      <div className="animate-spin rounded-full h-32 w-32 boder-b-2 border-gray-900"
      ></div>
    </div>
  },

  {
  path: "/profile",
  element: < UserProfile/>
},
  {
  path: "/profile/update",
  element: <UpdateProfile />
},

{
  path: "/resume",
  element: <Resume />
},
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
     loader: adminLoader,
    hydrateFallbackElement: <div
    className="flex items-center justify-center min-hscreen"
    >
      <div className="animate-spin rounded-full h-32 w-32 boder-b-2 border-gray-900"
      ></div>
    </div>
  },
  {
    path: '/recruiter/dashboard',
    element: <RecruiterDashboard />,
     loader: recruiterLoader,
    hydrateFallbackElement: <div
    className="flex items-center justify-center min-hscreen"
    >
      <div className="animate-spin rounded-full h-32 w-32 boder-b-2 border-gray-900"
      ></div>
    </div>
  },  


])

const App = () => {
  return (
   <>
   <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
   </>
  )
}

export default App;
