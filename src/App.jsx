import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

// Auth Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Student Layout
import StudentPortalLayout from "./components/StudentPortalLayout";

// Student Pages
import StudentHome from "./pages/Student-Portal";
import StudentComplaints from "./pages/Complaints";
import StudentLostFound from "./pages/LostFound";
import StudentVolunteering from "./pages/Volunteering";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  // Wait for Supabase
  if (user === undefined) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Student Portal */}
        <Route
          path="/student-portal/*"
          element={
            user ? (
              <StudentPortalLayout user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<StudentHome />} />
          <Route path="lost-found" element={<StudentLostFound />} />
          <Route path="complaints" element={<StudentComplaints />} />
          <Route path="volunteering" element={<StudentVolunteering />} />
        </Route>

        {/* Default Redirect */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/student-portal" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
