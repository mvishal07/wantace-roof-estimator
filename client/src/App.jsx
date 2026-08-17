import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Estimator from "./pages/Estimator";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

       

        <Route
          path="/"
          element={<Estimator />}
        />

        

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

      

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;