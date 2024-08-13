import React, { useState } from "react";
import Api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/Adminlayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import ikon mata

const UsersCreate = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk visibilitas kata sandi
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk visibilitas konfirmasi kata sandi
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Kata sandi tidak cocok, silakan coba lagi.", {
        position: "top-right",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email tidak valid, silakan masukkan email yang benar.", {
        position: "top-right",
      });
      return;
    }

    try {
      await Api.post("/admin", {
        nama,
        email,
        kataSandi: password,
      });
      toast.success("Akun admin berhasil ditambahkan", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/admin/users/index");
      }, 2000);
    } catch (error) {
      console.error("Error creating admin:", error);
      toast.error("Terjadi kesalahan saat menambahkan akun admin", {
        position: "top-right",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tambah Akun Admin Baru</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full md:w-1/2 mx-auto"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nama"
            >
              Nama
            </label>
            <input
              id="nama"
              type="text"
              placeholder="Nama"
              className="w-full p-2 border border-gray-300 rounded"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Kata Sandi
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Tipe input berubah berdasarkan state
              placeholder="Kata Sandi"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-3"
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Konfirmasi Kata Sandi
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"} // Tipe input berubah berdasarkan state
              placeholder="Konfirmasi Kata Sandi"
              className="w-full p-2 border border-gray-300 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-3"
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Tambah Admin
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              onClick={() => navigate("/admin/users/index")}
            >
              Batal
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </AdminLayout>
  );
};

export default UsersCreate;
