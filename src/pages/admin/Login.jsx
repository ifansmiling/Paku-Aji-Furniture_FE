import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import ikon mata

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State untuk visibilitas kata sandi
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, kataSandi }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login berhasil");
        setTimeout(() => {
          navigate("/admin/dashboard/index");
        }, 700);
        localStorage.setItem("token", data.token);
      } else {
        setMessage("Login gagal: " + data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("Terjadi kesalahan, silakan coba lagi.");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#F7F3F0]">
      {" "}
      {/* Latar belakang halaman */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="mb-6 text-2xl font-semibold text-[#CD9D6D]">
          {" "}
          {/* Warna judul */}
          Admin Login
        </h2>
        {message && (
          <div
            className={`${
              message === "Login berhasil"
                ? "bg-[#a76b4d]/70"
                : "bg-red-600/70 text-sm"
            } mb-4 w-full text-white py-3`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="mb-4 text-left">
            <label className="block mb-2 text-[#0d0d0d]">
              {" "}
              {/* Warna label */}
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full p-2 border border-[#CD9D6D] rounded focus:border-[#CD9D6D] outline-none"
            />
          </div>
          <div className="mb-4 text-left relative">
            <label className="block mb-2 text-[#131312]">
              {" "}
              {/* Warna label */}
              Kata Sandi
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={kataSandi}
              onChange={(e) => setKataSandi(e.target.value)}
              required
              placeholder="Kata Sandi"
              className="w-full p-2 border border-[#CD9D6D] rounded focus:border-[#CD9D6D] outline-none"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-3"
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              {showPassword ? (
                <FaEyeSlash color="#CD9D6D" />
              ) : (
                <FaEye color="#CD9D6D" />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#CD9D6D] text-white rounded hover:bg-[#b87a5a]/80 focus:outline-none grid place-items-center"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
