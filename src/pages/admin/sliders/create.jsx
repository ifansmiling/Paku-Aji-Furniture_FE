import AdminLayout from "../../../layouts/Adminlayout";
import React, { useState } from "react";
import Api from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSlider = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("gambar", image); // Hanya mengirimkan gambar

    try {
      await Api.post("/slider", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Slider berhasil ditambahkan");
      setTimeout(() => {
        window.location.href = "/admin/sliders/index";
      }, 2000); // Delay 2 detik sebelum mengarahkan ulang
    } catch (error) {
      console.error("Error adding slider:", error);
      toast.error("Terjadi kesalahan saat menambahkan slider");
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tambah Slider Baru</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full md:w-1/2 mx-auto"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Gambar Slider
            </label>
            <input
              id="image"
              type="file"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Tambah Slider
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              onClick={() => (window.location.href = "/admin/sliders/index")}
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

export default CreateSlider;
