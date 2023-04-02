import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cookies from "js-cookie";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function PrivateRoutes({ children }: any) {
  const Token = Cookies.get("TOKEN");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Token);

  useEffect(() => {
    setIsAuthenticated(!!Token);
  }, [Token]);

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/signIn" replace={true} />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
