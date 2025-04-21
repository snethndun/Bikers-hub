import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import HomePage from "./pages/Homepage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ServiceCenterPage from "./pages/ServiseCenters";
import Shop from "./pages/Shop";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProfilePage from "./pages/ProfilePage";
import GarageDashboard from "./pages/garage-dashboard";
import AddGarageForm from "./components/AddGarageForm"; // ✅ Import AddGarageForm
import EditGarageForm from "./components/EditGarageForm"; // ✅ Import EditGarageForm
import SingleGaragePage from "./pages/SingleGaragePage"; // ✅ Import SingleGaragePage
import FullMapPage from "./pages/FulMapPage"; // ✅ Import FullMapPage
import AdminDashboard from "./pages/AdminDashboard"; // ✅ Import AdminDashboard

const App = () => {
  return (
    <Router>
      <MainLayout>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/serviceCenters" element={<ServiceCenterPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/edit-garage/:garageId" element={<EditGarageForm />} />
            <Route path="/garage/:id" element={<SingleGaragePage />} />
            <Route path="/map" element={<FullMapPage />} />
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/GarageDashboard" element={<GarageDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            {/* ✅ Add Garage Routes */}
            <Route path="/garage-dashboard" element={<GarageDashboard />} />
            <Route path="/add-garage" element={<AddGarageForm />} />{" "}
            {/* ✅ New Route */}
          </Routes>
        </div>
      </MainLayout>
    </Router>
  );
};

export default App;
