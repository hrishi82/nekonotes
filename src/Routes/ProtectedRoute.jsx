
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = ({children}) => {
	const { token } = useAuth();
	return token ? children : <Navigate to="/loginpage" replace/>;
};
