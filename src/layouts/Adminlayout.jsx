import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaHome } from "react-icons/fa"; // Import ikon
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // State untuk melacak status sidebar
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    // Redirect ke halaman login
    navigate("/admin/login");
  };

  const handleBackToWeb = () => {
    navigate("/"); // Redirect ke halaman utama web
  };

  const checkToken = () => {
    if (localStorage.getItem("token") === null) {
      handleBackToWeb();
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className={`${!isOpen ? "flex" : "ml-[250px]"}`}>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <section className={`w-full ${!isOpen ? "pl-[64px]" : ""}`}>
        <header className="w-full bg-[#916131] flex justify-between items-center sticky top-0 z-10">
          <h1 className="mr-[300px] font-bold text-xl text-white py-3.5 mx-auto">
            Dashboard Admin Paku Aji Furniture
          </h1>
          <div className="flex items-center mr-4">
            <button
              onClick={handleBackToWeb}
              className="text-white bg-blue-600 p-2 rounded mr-2 hover:bg-blue-800 focus:outline-none"
              aria-label="Kembali ke Web"
            >
              <FaHome className="h-6 w-6" />
            </button>
            <button
              onClick={handleLogout}
              className="text-white bg-black p-2 rounded hover:bg-gray-700 focus:outline-none"
              aria-label="Logout"
            >
              <FaSignOutAlt className="h-6 w-6" />
            </button>
          </div>
        </header>
        <div className="px-10 py-6">{children}</div>
      </section>
    </div>
  );
};

export default AdminLayout;
