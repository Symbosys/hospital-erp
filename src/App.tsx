import { useState, useEffect } from "react";
import Home from "./screen/home.tsx";
import Login from "./screen/login.tsx";
import Dashboard from "./screen/dashboard.tsx";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [currentPage, setCurrentPage] = useState<"home" | "login">("home");

  // Sync internal page state if authenticated
  useEffect(() => {
    if (isAuthenticated) {
       // When authenticated, we are effectively on dashboard
    }
  }, [isAuthenticated]);

  const goToHome = () => setCurrentPage("home");
  const goToLogin = () => setCurrentPage("login");
  
  const handleLogout = () => {
    logout();
    goToHome();
  };

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="app-container">
      {currentPage === "home" ? (
        <Home onLoginClick={goToLogin} />
      ) : (
        <Login onHomeClick={goToHome} onLoginSuccess={() => {}} />
      )}
    </div>
  );
};

export default App;
