import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";

import CreateCommision from "./pages/CreateCommission";
import RootLayout from "./pages/Root";
import Login from "./pages/Login";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Registration from "./pages/Registration";
import { useSelector } from "react-redux";
import CommissionGetPage from "./pages/GetCommission";
import AdminPage from "./pages/Admin";
import CommGalleries from "./pages/CommGalleries";
import ImageDetail from "./pages/ImageDetails";

const router = createBrowserRouter([
  {
    path: "/", // Matches all paths
    children: [
      {
        path: "/", // Matches the root path specifically
        element: <Login />, // Display login page at root without RootLayout
      },
      {
        path: "/forgot-password", // Matches the root path specifically
        element: <ForgotPassword />, // Display login page at root without RootLayout
      },
      {
        path: "/reset-password", // Matches the root path specifically
        element: <ResetPassword />, // Display login page at root without RootLayout
      },
      {
        path: "/registration", // Matches the root path specifically
        element: <Registration />, // Display login page at root without RootLayout
      },
      {
        path: "/home",
        // Protected route using a custom component
        element: (
          <PrivateRoute>
            <RootLayout>
              <Home />
            </RootLayout>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "/commissions",
      //   element: (
      //     <PrivateRoute>
      //       <RootLayout>
      //         <CommissionListing />
      //       </RootLayout>
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/galleries",
        element: (
          <PrivateRoute>
            <RootLayout>
              <Home />
            </RootLayout>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <RootLayout>
              <AdminPage />
            </RootLayout>
          </PrivateRoute>
        ),
      },
      {
        path: "/commissions",
        element: (
          <PrivateRoute>
            <RootLayout>
              <CommissionGetPage />
            </RootLayout>
          </PrivateRoute>
        ),
      },
      {
        path: "/image-details",
        element: (
          <PrivateRoute>
            <RootLayout>
              <ImageDetail />
            </RootLayout>
          </PrivateRoute>
        ),
      },
      {
        path: "/comm-galleries",
        element: (
          <PrivateRoute>
            <RootLayout>
              <CommGalleries />
            </RootLayout>
          </PrivateRoute>
        ),
      },
      {
        path: "/commissions/create",
        element: (
          <PrivateRoute>
            <RootLayout>
              <CreateCommision />
            </RootLayout>
          </PrivateRoute>
        ),
      }, // Define the Images page at the same level as Home
    ],
  },
]);

// Private Route component (optional, checks for login state)
function PrivateRoute({ children }) {
  //const username = useSelector((state) => state.username);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirect to login if not logged in
  }

  return children; // Render child component if logged in
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
