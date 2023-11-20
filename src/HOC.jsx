import { Navigate } from "react-router-dom";

const HOC = ({ childern, isLogged, isProtected }) => {
  if (isProtected) {
    if (isLogged) {
      return childern;
    }
    return <Navigate to="/login" />;
  }
  if (!isProtected) {
    if (isLogged) {
      return <Navigate to="/" replace />;
    }
    return childern;
  }
};

export default HOC;
