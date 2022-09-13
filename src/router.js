import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
export const routers = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about-us",
    element: <h2> About us </h2>,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/services",
    element: <h2> Services </h2>,
  },
  {
    path: "/search-result",
    element: <h2> Search Result </h2>,
  },
  {
    path: "*",
    element: <h2> 404 </h2>,
  },
];
