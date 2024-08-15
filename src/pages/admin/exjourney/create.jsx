import React, { useState } from "react";
import Api from "../../../services/api";
import AdminLayout from "../../../layouts/Adminlayout";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = "http://localhost:5000";

const CreateJourney = () => {
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState([]);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState(""); // Tambahkan state untuk error file

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileError) {
      toast.error(fileError); // Tampilkan error file jika ada
      return;
    }

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("tanggal", tanggal);
    formData.append("deskripsi", deskripsi);
    gambar.forEach((file) => {
      formData.append("gambar", file);
    });

    try {
      const response = await Api.post("/journey", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Journey created successfully!");
      setTimeout(() => {
        navigate("/admin/exjourney/index");
      }, 2000);
    } catch (error) {
      setError("Error creating journey: " + error.message);
      toast.error("Error creating journey: " + error.message);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    let isValid = true;
    let errorMsg = "";

    files.forEach((file) => {
      if (file.size > 500 * 1024) {
        // 500KB in bytes
        isValid = false;
        errorMsg = "Ukuran file tidak boleh melebihi 500KB.";
      }
    });

    if (isValid) {
      setGambar(files);
      setFileError(""); // Reset error jika file valid
    } else {
      setGambar([]);
      setFileError(errorMsg); // Set error jika ada file yang melebihi batas
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
            Create New Journey
          </h2>
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
              {error}
            </div>
          )}
          {fileError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
              {fileError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="judul"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Judul
              </label>
              <input
                type="text"
                id="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Masukkan judul perjalanan"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="tanggal"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Tanggal
              </label>
              <input
                type="date"
                id="tanggal"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                placeholder="Pilih tanggal"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="deskripsi"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Masukkan deskripsi perjalanan"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                rows="4"
                required
              />
            </div>
            <div>
              <label
                htmlFor="gambar"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Gambar
              </label>
              <input
                type="file"
                id="gambar"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-gray-900 file:border-none file:bg-gray-50 file:py-2 file:px-4 file:rounded-md file:text-gray-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
              <small className="block mt-1 text-gray-500 italic">
                * Maks 500KB
              </small>{" "}
              {/* Tulisannya kecil dengan garis miring */}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Buat Journey
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
              onClick={() => (window.location.href = "/admin/exjourney/index")}
            >
              Batal
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default CreateJourney;
