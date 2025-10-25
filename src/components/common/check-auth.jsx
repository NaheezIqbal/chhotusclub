import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // Redirect root to shopping home
  if (location.pathname === "/") {
    return <Navigate to="/shop/home" />;
  }

  // Protected routes that require authentication
  const protectedRoutes = ["/shop/checkout", "/shop/account", "/shop/paypal-return", "/shop/payment-success"];
  const isProtectedRoute = protectedRoutes.some(route => location.pathname.includes(route));

  // Only require auth for protected routes and admin routes
  if (
    !isAuthenticated &&
    (isProtectedRoute || location.pathname.includes("/admin")) &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users away from auth pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Admin route protection
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Redirect admin users away from shop routes
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
