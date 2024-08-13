import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneVolume } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Carousel from "../components/web/carousel"; // Sesuaikan path dengan struktur project Anda

const Weblayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    if (isOpen) {
      toggleMenu(); // Menutup menu mobile saat link diklik
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-4">
      {/* Navbar */}
      <nav className="bg-gray-300 text-black fixed w-full top-0 left-0 z-50 shadow-md">
        <div className="container mx-auto py-3 flex items-center justify-between">
          {/* Logo Container */}
          <div className="flex items-center space-x-1">
            <a href="/beranda">
              <img src="/logo1.png" alt="Logo 1" className="h-12 w-auto" />
            </a>
            <a href="/beranda">
              <img src="/logo2.png" alt="Logo 2" className="h-12 w-auto" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="block md:hidden px-3 py-2 text-black hover:text-[#916131] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex md:space-x-6">
            <Link
              to="/beranda"
              className={`text-xl ${
                activeLink === "/beranda"
                  ? "text-[#916131]"
                  : "hover:text-[#916131]"
              }`}
              onClick={() => handleLinkClick("/beranda")}
            >
              Beranda
            </Link>
            <Link
              to="/katalog"
              className={`text-xl ${
                activeLink === "/katalog"
                  ? "text-[#916131]"
                  : "hover:text-[#916131]"
              }`}
              onClick={() => handleLinkClick("/katalog")}
            >
              Katalog
            </Link>
            <Link
              to="/journey"
              className={`text-xl ${
                activeLink === "/journey"
                  ? "text-[#916131]"
                  : "hover:text-[#916131]"
              }`}
              onClick={() => handleLinkClick("/journey")}
            >
              Export Journey
            </Link>
            <Link
              to="/about"
              className={`text-xl ${
                activeLink === "/about"
                  ? "text-[#916131]"
                  : "hover:text-[#916131]"
              }`}
              onClick={() => handleLinkClick("/about")}
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-gray-300 text-black p-4 md:hidden transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <button
            onClick={toggleMenu}
            className="text-black hover:text-[#916131] absolute top-4 right-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col space-y-4 mt-12">
            <Link
              to="/beranda"
              className={`text-xl ${
                activeLink === "/beranda"
                  ? "text-[#916131]"
                  : "hover:text-[#916131]"
              }`}
              onClick={() => handleLinkClick("/beranda")}
            >
              Beranda
            </Link>
            <Link
              to="/katalog"
              className={`text-xl ${
                activeLink === "/katalog"
                  ? "text-[#916131]"
                  : "hover:text-[#916131]"
              }`}
              onClick={() => handleLinkClick("/katalog")}
            >
              Katalog
            </Link>
            <Link
              to="/journey"
              className={`text-xl ${
                activeLink === "/journey"
                  ? "text-[#916131]"
                  : "hover:text-[#916131]"
              }`}
              onClick={() => handleLinkClick("/journey")}
            >
              Export Journey
            </Link>
            <Link
              to="/about"
              className={`text-xl ${
                activeLink === "/about"
                  ? "text-[#916131]"
                  : "hover:text-[#916131]"
              }`}
              onClick={() => handleLinkClick("/about")}
            >
              About Us
            </Link>
          </div>
        </div>
      </nav>
      {/* Carousel */}
      <Carousel /> {/* Tambahkan komponen Carousel di sini */}
      {/* Main Content */}
      <main className="flex-grow pt-16">{children}</main>
      {/* Footer */}
      <footer className="bg-gray-300 text-black py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
          {/* Logo di Kiri Atas */}
          <div className="flex flex-col items-start mb-4 md:mb-0 w-full md:w-1/4">
            <img src="/Logo.png" alt="Logo" className="h-20 w-auto mb-4 ml-9" />
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-4xl mr-5" />
              {/* Ukuran ikon diperbesar */}
              <p className="text-base lg:text-l mr-6">
                Lik Takaru, Kec. Kramat, Kabupaten Tegal, Jawa Tengah. Paku Aji
                Furniture by CV Paku Aji Indonesia.
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaPhoneVolume className="text-2xl mr-3" />
              {/* Ukuran ikon disesuaikan */}
              <p className="text-base lg:text-l">085726061650</p>
            </div>
            <div className="flex items-center">
              <MdEmail className="text-2xl mr-3" />
              {/* Ukuran ikon disesuaikan */}
              <p className="text-base lg:text-l">Admin@Pakuajifurniture.id</p>
            </div>
          </div>

          {/* Google Maps di Tengah */}
          <div className="w-full md:w-1/2 max-w-md mx-auto mb-4 md:mb-0 text-center">
            <h2 className="text-lg font-semibold text-center mb-2">
              Find Us On Google Maps
            </h2>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2423197361227!2d109.16602257454005!3d-6.8615359671302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb797001ec04f%3A0x2885886a5b4d17e1!2sPaku%20Aji%20Indonesia!5e0!3m2!1sid!2sid!4v1723215735164!5m2!1sid!2sid"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Ikuti Kami dengan Media Sosial */}
          <div className="flex flex-col items-start md:items-end w-full md:w-1/4">
            <h2 className="text-lg font-semibold mb-4 mr-11">Ikuti Kami</h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="h-8 w-8 transition-transform transform hover:scale-110"
                />
              </a>
              <a
                href="https://www.tokopedia.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/tokopedia.png"
                  alt="Tokopedia"
                  className="h-8 w-8 transition-transform transform hover:scale-110"
                />
              </a>
              <a
                href="https://www.shopee.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/shopee.png"
                  alt="Shopee"
                  className="h-8 w-8 transition-transform transform hover:scale-110"
                />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/tiktok.png"
                  alt="Tiktok"
                  className="h-8 w-8 transition-transform transform hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="container mx-auto mt-4 text-center">
          <p className="text-sm">
            © 2024 Paku Aji Furniture. All rights reserved.
          </p>
          <p className="text-sm mt-1">Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </div>
  );
};

export default Weblayout;
