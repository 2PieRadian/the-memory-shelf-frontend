import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreateContent from "./pages/CreateContent";
import Loading from "./components/Loading";
import Contents from "./components/Contents";
import PageNotFound from "./pages/PageNotFound";
import { useUserStore } from "./store/UserStore";
import VibeRoom from "./pages/VibeRoom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, checkAuth, isCheckingAuth } = useUserStore();
  const isAuthenticated = !!user;

  // Check if we have the token in the cookie
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <Loading text="Loading" />;
  }

  return (
    <div className="overflow-hidden">
      <Routes>
        {!isAuthenticated ? (
          <Route path="" element={<Navigate to="/login" />} />
        ) : (
          <Route path="/" element={<Home />}>
            <Route index element={<Contents />} />
            <Route path="*" element={<Contents />} />
          </Route>
        )}

        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={!isAuthenticated ? <Navigate to="/login" /> : <Profile />}
        />
        <Route path="/create-content/*" element={<CreateContent />} />
        <Route
          path="/viberoom"
          element={!isAuthenticated ? <Navigate to="/login" /> : <VibeRoom />}
        />
        <Route path="/404PageNotFound" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
