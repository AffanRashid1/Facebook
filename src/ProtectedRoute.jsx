import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children, isProtected }) => {
  const isLogged = useSelector((state) => state.appReducer.isLogged);

  if (isProtected && !isLogged) {
    return <Navigate to="/login" />;
  }

  if (!isProtected && isLogged) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
