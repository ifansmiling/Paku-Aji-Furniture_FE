import AdminLayout from "../../../layouts/Adminlayout";
import React, { useState, useEffect } from "react";
import Api from "../../../services/api";
import { FaTrash } from "react-icons/fa";

const KategoriIndex = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.namaKategori.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    try {
      const response = await Api.get("/kategori");
      console.log(response.data);
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getFullImagePath = (path) => {
    const baseURL = "http://localhost:5000";
    return `${baseURL}${path}`;
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Api.delete(`/kategori/${selectedCategory.id}`);
      setCategories(
        categories.filter((category) => category.id !== selectedCategory.id)
      );
      setFilteredCategories(
        filteredCategories.filter(
          (category) => category.id !== selectedCategory.id
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Kategori</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Cari kategori..."
            className="p-2 border border-gray-300 rounded mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => (window.location.href = "/admin/kategoris/create")}
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
                <th className="px-4 py-2 border-b text-center">
                  Nama Kategori
                </th>
                <th className="px-4 py-2 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <img
                      src={getFullImagePath(category.gambar)}
                      alt={category.namaKategori}
                      className="w-12 h-12 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {category.namaKategori}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleDeleteClick(category)}
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
              <p>
                Apakah Anda yakin ingin menghapus kategori{" "}
                <strong>{selectedCategory?.namaKategori}</strong>?
              </p>
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

export default KategoriIndex;
