import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // State untuk melacak status sidebar
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token');
    // Redirect ke halaman login
    navigate('/admin/login');
  };

  const handleBackToWeb = () => {
    navigate('/'); // Redirect ke halaman utama web
  };

  const checkToken = () => {
    if (localStorage.getItem('token') === null) {
      handleBackToWeb();
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className={`${!isOpen ? 'flex' : 'ml-[250px]'}`}>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <section className={`w-full ${!isOpen ? 'pl-[64px]' : ''} `}>
        <header className="w-full bg-[#916131] flex justify-between items-center">
          <h1 className="mr-[300px] font-bold text-xl text-white py-3.5 mx-auto">Dashboard Admin Paku Aji Furniture</h1>
          <div className="flex items-center mr-4">
            <button
              onClick={handleBackToWeb}
              className="text-white bg-blue-600 px-4 px-2 rounded mr-2 hover:bg-blue-800 focus:outline-none"
            >
              Kembali ke Web
            </button>
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-800 focus:outline-none"
            >
              Logout
            </button>
          </div>
        </header>
        <div className="px-10 py-6">
          {children}
        </div>
      </section>
    </div>
  );
};

export default AdminLayout;
