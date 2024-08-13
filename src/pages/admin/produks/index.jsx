import AdminLayout from "../../../layouts/Adminlayout";
import React, { useState, useEffect } from "react";
import Api from "../../../services/api";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const ProdukIndex = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { kategoriId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Kategori ID:", kategoriId);
    fetchProducts(); // Panggil fetchProducts tanpa parameter untuk mengambil semua produk
  }, [kategoriId]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.nama?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await Api.get(`/produk/allproduk/kategori`);
      console.log("Response from API:", response.data);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Api.delete(`/produk/${selectedProduct.id}`);
      setProducts(
        products.filter((product) => product.id !== selectedProduct.id)
      );
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== selectedProduct.id)
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEditClick = (productId) => {
    navigate(`/admin/produks/edit/${productId}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Produk</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Cari produk..."
            className="p-2 border border-gray-300 rounded mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => navigate("/admin/produks/create")}
          >
            Tambah Baru
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-center">No.</th>
                <th className="px-4 py-2 border-b text-center">Nama Produk</th>
                <th className="px-4 py-2 border-b text-center">Kategori</th>
                <th className="px-4 py-2 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-2 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {product.nama}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {product.kategori?.nama || "Tidak ada kategori"}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        onClick={() => handleEditClick(product.id)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 border-b text-center">
                    Tidak ada produk yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4">Konfirmasi Penghapusan</h2>
              <p>
                Apakah Anda yakin ingin menghapus produk{" "}
                <strong>{selectedProduct?.nama}</strong>?
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

export default ProdukIndex;
