import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: 'dietitian' | 'patient';
}

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { isAuthenticated, getUserType, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (userType && getUserType() !== userType) {
    // Redirect to appropriate dashboard based on user type
    const currentUserType = getUserType();
    if (currentUserType === 'dietitian') {
      return <Navigate to="/dietitian/dashboard" replace />;
    } else {
      return <Navigate to="/patient/assessment" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;