import AdminLayout from "../../../layouts/Adminlayout";
import React, { useState, useEffect } from "react";
import Api, { getImageURL } from "../../../services/api"; // Pastikan untuk mengimpor getImageURL
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SliderIndex = () => {
  const [sliders, setSliders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await Api.get("/slider");
      setSliders(response.data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  const handleDeleteClick = (slider) => {
    setSelectedSlider(slider);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Api.delete(`/slider/${selectedSlider.id}`);
      setSliders(sliders.filter((slider) => slider.id !== selectedSlider.id));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting slider:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddClick = () => {
    navigate("/admin/sliders/create");
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Sliders</h1>
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleAddClick}
          >
            Tambah Baru
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-center">No.</th>
                <th className="px-4 py-2 border-b text-center">Gambar</th>
                <th className="px-4 py-2 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map((slider, index) => (
                <tr key={slider.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <img
                      src={getImageURL(slider.gambar)} // Gunakan getImageURL untuk mendapatkan URL gambar lengkap
                      alt={`Slider ${index + 1}`}
                      className="w-auto h-48 object-cover mx-auto" // Gambar lebih besar
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleDeleteClick(slider)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4">Konfirmasi Penghapusan</h2>
              <p>Apakah Anda yakin ingin menghapus slider ini?</p>
              <div className="mt-4 flex justify-around">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  onClick={handleModalClose}
                >
                  Batal
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={handleDeleteConfirm}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SliderIndex;
