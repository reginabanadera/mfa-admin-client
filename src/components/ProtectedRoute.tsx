
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { userId } = useAuth();

  return userId ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute