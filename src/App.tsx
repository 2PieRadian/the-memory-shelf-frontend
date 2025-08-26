import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import BlankPageBeforeHomePage from "./pages/BlankPageBeforeHomePage";
import Profile from "./pages/Profile";
import CreateContent from "./pages/CreateContent";
import Loading from "./components/Loading";
import Contents from "./components/Contents";
import PageNotFound from "./pages/PageNotFound";
import { useUserStore } from "./store/UserStore";
import VibeRoom from "./pages/VibeRoom";
import Rooms from "./pages/wiberoom/Rooms";

const CHECK_AUTH_URL = "http://localhost:3000/api/v1/checkauth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [checkingAuth, setIsCheckingAuth] = useState(false);

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
          useUserStore.setState({ user: data.user });
          setIsAuthenticated(true);

          // If we are already in a route, then refreshing won't take us back to Home Page
          if (
            location.pathname === "/login" ||
            location.pathname === "/signup"
          ) {
            navigate("/");
          }
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        navigate("/login");
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

  if (checkingAuth) {
    return <Loading text="Loading" />;
  }

  return (
    <div className="overflow-hidden">
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Home />}>
            <Route index element={<Contents />} />
            <Route path="*" element={<Contents />} />
          </Route>
        ) : (
          <Route path="" element={<BlankPageBeforeHomePage />} />
        )}

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-content/*" element={<CreateContent />} />
        <Route path="/viberoom" element={<VibeRoom />}>
          <Route path="rooms" element={<Rooms />} />
        </Route>
        <Route path="/404PageNotFound" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
