import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBars,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons"; 
import { RiDashboardFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { PiArmchairFill } from "react-icons/pi";
import { FaImages, FaUserShield } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      link: "/admin/dashboard/index",
      icons: <RiDashboardFill className="mr-2 h-6 w-6" />,
    },
    {
      name: "Kategori",
      link: "/admin/kategoris/index",
      icons: <MdCategory className="mr-2 h-6 w-6" />,
    },
    {
      name: "Produk",
      link: "/admin/produks/index",
      icons: <PiArmchairFill className="mr-2 h-6 w-6" />,
    },
    {
      name: "Slider",
      link: "/admin/sliders/index",
      icons: <FaImages className="mr-2 h-6 w-6" />,
    },
    {
      name: "Export journey",
      link: "/admin/exjourney/index",
      icons: <FontAwesomeIcon icon={faChartSimple} className="mr-2 h-6 w-6" />, 
    },
    {
      name: "Users",
      link: "/admin/users/index",
      icons: <FaUserShield className="mr-2 h-6 w-6" />,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-[100vh] bg-[#916131] text-white transition-transform duration-300 ease-in-out shadow-md z-50 ${
        isOpen ? "w-[250px] translate-x-0" : "w-[64px] -translate-x-0"
      }`}
    >
      <Button
        variant="dark"
        className="absolute top-5 right-[-30px] bg-[#916131] text-white p-2 rounded-full shadow-md hover:bg-red-500 hover:rotate-90 transition-all duration-300 z-60"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </Button>
      <div className="text-center bg-white flex gap-1 items-center font-bold border-b border-[#916131]">
        <img
          src="/Logo.png"
          alt="Admin Pakuaji Logo"
          className={`w-[70px] ${!isOpen && "hidden"}`}
        />
        {isOpen && <p className="text-[#916131] text-lg">ADMIN PAKUAJI</p>}
      </div>
      <Nav className="flex flex-col p-0 m-0">
        {menus.map((menu, index) => (
          <Nav.Link
            key={index}
            as={Link}
            to={menu.link}
            className={`flex items-center px-2 py-3 text-white text-lg transition-all duration-300 ${
              location.pathname === menu.link
                ? "bg-[#613d1a]"
                : "hover:bg-[#a47444]"
            }`}
          >
            {menu.icons} {isOpen && menu.name}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
