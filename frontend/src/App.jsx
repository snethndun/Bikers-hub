import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import HomePage from "./pages/Homepage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ServiseCenters from "./pages/ServiseCenters";
import Shop from "./pages/Shop";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProfilePage from "./pages/ProfilePage";
import GarageDashboard from "./pages/garage-dashboard";
import AddGarageForm from "./components/AddGarageForm"; // ✅ Import AddGarageForm

const App = () => {
  return (
    <Router>
      <MainLayout>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/servisecenters" element={<ServiseCenters />} />
            <Route path="/shop" element={<Shop />} />
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<ProfilePage />} />
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
