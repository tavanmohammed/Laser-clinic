import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import Booking from "./pages/Booking";
import SkinConcerns from "./pages/SkinConcerns";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Gallery from "./pages/Gallery";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/skin-concerns" element={<SkinConcerns />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </MainLayout>
  );
}