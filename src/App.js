import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Images from "./pages/Images";
import RootLayout from "./pages/Root";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/", // Matches all paths
    children: [
      {
        path: "/", // Matches the root path specifically
        element: <Login />, // Display login page at root without RootLayout
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
      {
        path: "/images",
        element: (
          <PrivateRoute>
            <RootLayout>
              <Images />
            </RootLayout>
          </PrivateRoute>
        ),
      }, // Define the Images page at the same level as Home
    ],
  },
]);

// Private Route component (optional, checks for login state)
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login state

  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirect to login if not logged in
  }

  return children; // Render child component if logged in
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
