import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import Profile from "./Screens/Profile";
import Home from "./Screens/Home";

const routes = [
  {
    path: "/",
    element: <Home />,
    protected: true,
  },
  {
    path: "/login",
    element: <Login />,
    protected: false,
  },
  {
    path: "/register",
    element: <SignUp />,
    protected: false,
  },
  {
    path: "/profile",
    element: <Profile />,
    protected: true,
  },
];

export { routes };
