import Login from "./Screens/Login/Login";
import Profile from "./Screens/Profile/Profile";
import Home from "./Screens/Home/Home";
import SignUp from "./Screens/SignUp/SignUp";

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
