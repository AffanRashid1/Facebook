import Login from "./screens/Login/Login";
import Profile from "./screens/Profile/Profile";
import Home from "./screens/Home/Home";
import SignUp from "./screens/SignUp/SignUp";

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
