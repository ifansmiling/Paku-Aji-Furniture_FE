import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/dashboard/index";
import Kategoris from "./pages/admin/kategoris/index";
import Produks from "./pages/admin/produks/index";
import Sliders from "./pages/admin/sliders/index";
import Users from "./pages/admin/users/index";
import Kategoriscreate from "./pages/admin/kategoris/create";
import Home from "./pages/web/home/index";
import CreateProduct from "./pages/admin/produks/create";
import EditProduct from "./pages/admin/produks/edit";
import CreateSlider from "./pages/admin/sliders/create";
import UsersCreate from "./pages/admin/users/create";
import UsersEdit from "./pages/admin/users/edit";
import ProdukIndex from "./pages/admin/produks/index"; 
import AboutUs from "./pages/web/about/index"
import ExJourney from "./pages/web/exjourney/index"
import OrderUser from "./pages/web/order/index"
import Katalog from "./pages/web/katalog/index"

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute untuk halaman login admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Rute untuk admin */}
        <Route path="/admin/dashboard/index" element={<Dashboard />} />
        <Route path="/admin/kategoris/index" element={<Kategoris />} />
        <Route path="/admin/kategoris/create" element={<Kategoriscreate />} />
        <Route path="/admin/produks/index" element={<Produks />} />
        <Route path="/admin/produks/create" element={<CreateProduct />} />
        <Route path="/admin/produks/edit/:id" element={<EditProduct />} />
        <Route path="/admin/produks/:kategoriId" element={<ProdukIndex />} />
        <Route path="/admin/sliders/index" element={<Sliders />} />
        <Route path="/admin/sliders/create" element={<CreateSlider />} />
        <Route path="/admin/users/index" element={<Users />} />
        <Route path="/admin/users/create" element={<UsersCreate />} />
        <Route path="/admin/users/edit/:id" element={<UsersEdit />} />

        {/* Rute halaman beranda */}
        <Route path="/" element={<Home />} />

        {/* Rute halaman user */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/journey" element={<ExJourney />} />
        <Route path="/order" element={<OrderUser />} />
        <Route path="/katalog" element={<Katalog />} />

        {/* Rute fallback untuk halaman 404 */}
        <Route
          path="*"
          element={
            <div>
              <h1>404 Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
