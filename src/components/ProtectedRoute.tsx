import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuth } from '../lib/useUserAuth';

const ProtectedRoute = () => {
	const { isLoading, isSuccess } = useUserAuth();

	return isLoading || isSuccess ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
