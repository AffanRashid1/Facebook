import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import Home from "./screens/Home";

const routes = [
  {
    path: "/",
    element: <Home/>,
    protected: true
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
