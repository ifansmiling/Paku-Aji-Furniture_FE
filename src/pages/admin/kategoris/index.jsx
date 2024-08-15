import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/Adminlayout";
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
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Kategori List</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
            onClick={() => (window.location.href = "/admin/kategoris/create")}
          >
            Tambah Baru
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Cari kategori..."
            className="p-2 border border-gray-300 rounded-md mb-4 md:mb-0 md:mr-4 w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="border-b border-gray-300 text-center">
                <th className="py-3 px-4 text-gray-600">No.</th>
                <th className="py-3 px-4 text-gray-600">Gambar</th>
                <th className="py-3 px-4 text-gray-600">Nama Kategori</th>
                <th className="py-3 px-4 text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="border-b border-gray-200 text-center hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-center">
                      <img
                        src={getFullImagePath(category.gambar)}
                        alt={category.namaKategori}
                        className="w-24 h-16 object-cover rounded-md shadow-sm mx-auto"
                        onError={(e) =>
                          (e.target.src = "/path/to/default-image.jpg")
                        }
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {category.namaKategori}
                    </td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <button
                        onClick={() => handleDeleteClick(category)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-3 px-4 text-center text-gray-500"
                  >
                    Tidak ada kategori yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-lg font-bold text-gray-800">
                Konfirmasi Penghapusan
              </h3>
              <p className="mt-2">
                Apakah Anda yakin ingin menghapus kategori{" "}
                <strong>{selectedCategory?.namaKategori}</strong>?
              </p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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
