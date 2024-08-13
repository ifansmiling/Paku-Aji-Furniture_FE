import React, { useState, useEffect } from "react";
import Api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/Adminlayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import ikon mata

const UsersEdit = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await Api.get(`/admin/${id}`);
      if (response.status === 404) {
        toast.error("Data pengguna tidak ditemukan.", {
          position: "top-right",
        });
        navigate("/admin/users/index");
      } else {
        const user = response.data;
        setNama(user.nama);
        setEmail(user.email);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Terjadi kesalahan saat mengambil data pengguna.", {
        position: "top-right",
      });
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
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
      const updateData = {
        nama,
        email,
      };

      if (password) {
        updateData.kataSandi = password;
      }

      await Api.put(`/admin/${id}`, updateData);
      toast.success("Akun admin berhasil diperbarui", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/admin/users/index");
      }, 2000);
    } catch (error) {
      console.error("Error updating admin:", error);
      toast.error("Terjadi kesalahan saat memperbarui akun admin.", {
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
        <h1 className="text-2xl font-bold mb-4">Edit Akun Admin</h1>
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
              Kata Sandi (Opsional)
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi (Kosongkan jika tidak ingin mengubah)"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Konfirmasi Kata Sandi (Opsional)
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmasi Kata Sandi (Kosongkan jika tidak ingin mengubah)"
              className="w-full p-2 border border-gray-300 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Perbarui Admin
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

export default UsersEdit;
