import { useState, useEffect } from "react";
import { Redirect, Route, RouteComponentProps } from "wouter";

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

// A wrapper component that renders the protected component inside a Route
export function ProtectedRoute({ path, component: Component }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const user = await res.json();
          setIsAuthenticated(true);
          setIsAdmin(user.isAdmin || false);
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Create a component that will handle the routing logic
  const ProtectedComponent = (props: RouteComponentProps) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Redirect to="/auth" />;
    }

    if (path.startsWith("/admin") && !isAdmin) {
      return <Redirect to="/" />;
    }

    // Render the wrapped component and pass through any props
    return <Component {...props} />;
  };

  // Use the Route component with our ProtectedComponent
  return <Route path={path} component={ProtectedComponent} />;
}