import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.warn("🔒 No token found. Redirecting to login...");
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decoded.exp < currentTime) {
      console.warn("⏳ Token expired. Redirecting to login...");
      sessionStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    return <Outlet />; // ✅ Render the protected components if token is valid
  } catch (error) {
    console.error("❌ Error decoding token:", error);
    sessionStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
