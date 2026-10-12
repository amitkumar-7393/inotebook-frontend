import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <NoteState>
      <Router>
        {isLoggedIn && <Navbar />}

        <Alert />

        <div className="container">
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
            />

            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />}
            />

            <Route
              path="/about"
              element={
                isLoggedIn ? <About /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
            />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
