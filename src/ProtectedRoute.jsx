import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLogged, isProtected }) => {
  if (isProtected && !isLogged) {
    return <Navigate to="/login" />;
  }

  if (!isProtected && isLogged) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
