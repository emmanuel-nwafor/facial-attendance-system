<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importing pages
import WelcomePage from "./pages/Welcomepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// lecturer Pages
import LecturerDashboard from "./lecturer/LecturerDashboard";

// importing custom components
import PrivateRoute from "./PrivateRoute";
import { getAuth } from "firebase/auth";
import Error from "./pages/Error";

function App() {
  const auth = getAuth();
  const user = auth.currentUser; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
         <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
               </PrivateRoute> 
            }
          />

          <Route
            path="/lecturer-dashboard"
            element={
              <PrivateRoute>
                <LecturerDashboard/>
               </PrivateRoute> 
            }
          />

          <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
=======
import React from "react";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
>>>>>>> bc64162c9c4bb2b553e9d211c0e1a1b7ee7ab9a5
  );
}

export default App;
