import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return null; // or a spinner/loading indicator
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
