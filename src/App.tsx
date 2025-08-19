import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import BlankPageBeforeHomePage from "./pages/BlankPageBeforeHomePage";
import Profile from "./pages/Profile";
import CreateContent from "./pages/CreateContent";

const CHECK_AUTH_URL = "http://localhost:3000/api/v1/checkauth";

function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [checkingAuth, setIsCheckingAuth] = useState(false);
  const [user, setUser] = useState({ email: "" });

  // Check if we have the token in the cookie
  useEffect(() => {
    async function checkAuth() {
      try {
        setIsCheckingAuth(true);
        const response = await fetch(CHECK_AUTH_URL, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setIsAuthenticated(true);
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        // navigate("/login");
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-screen text-xl items-center justify-center font-light">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Home user={user} /> : <BlankPageBeforeHomePage />
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/create-content" element={<CreateContent />} />
      </Routes>
    </div>
  );
}

export default App;
