import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";

// Components
import HomePage from "./booking/HomePage";
import Login from "./authentication/Login";
import Registration from "./authentication/Registration";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";



function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <ToastContainer position="top-center"/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/seller" element={<DashboardSeller />} />
          <Route path="hotels/new" element={<NewHotel />} />
          <Route path="stripe/callback" element={<StripeCallback />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
