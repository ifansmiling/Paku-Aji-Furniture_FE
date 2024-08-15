import AdminLayout from "../../../layouts/Adminlayout";
import React, { useState } from "react";
import Api from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(""); // Tambahkan state untuk error file

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      toast.error(error); // Tampilkan error jika ada
      return;
    }

    const formData = new FormData();
    formData.append("namaKategori", name); // Sesuaikan dengan nama field di backend
    formData.append("gambar", image);

    try {
      await Api.post("/kategori", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Kategori berhasil ditambahkan");
      setTimeout(() => {
        window.location.href = "/admin/kategoris/index";
      }, 2000); // Delay 2 detik sebelum mengarahkan ulang
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Terjadi kesalahan saat menambahkan kategori");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1 * 1024 * 1024) {
      // 1MB dalam bytes
      setError("Ukuran file tidak boleh melebihi 1MB.");
      setImage(null);
    } else {
      setImage(file);
      setError(""); // Reset error jika file valid
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
            Tambah Kategori Baru
          </h2>
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Nama Kategori
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama kategori"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Gambar Kategori
              </label>
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-gray-900 file:border-none file:bg-gray-50 file:py-3 file:px-5 file:rounded-md file:text-gray-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
              <small className="block mt-1 text-gray-500 italic">
                * Maks 1MB
              </small>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Tambah Kategori
              </button>
              <button
                type="button"
                className="w-full bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                onClick={() =>
                  (window.location.href = "/admin/kategoris/index")
                }
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default CreateCategory;
