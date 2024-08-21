import React, { useState, useEffect } from "react";
import Api from "../../../services/api";
import AdminLayout from "../../../layouts/Adminlayout";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProdukIndex = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { kategoriId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [kategoriId]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.nama?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1); 
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await Api.get(`/produk/allproduk/kategori`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEditClick = (productId) => {
    navigate(`/admin/produks/edit/${productId}`);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Api.delete(`/produk/${selectedProduct.id}`);
      toast.success("Product deleted successfully!");
      setProducts(
        products.filter((product) => product.id !== selectedProduct.id)
      );
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== selectedProduct.id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product: " + error.message);
    }
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddClick = () => {
    navigate("/admin/produks/create");
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Produk List</h2>
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
          >
            <span>Tambah Produk</span>
          </button>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Cari produk..."
            className="p-2 border border-gray-300 rounded-lg w-full md:w-1/3 mr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="border-b border-gray-300 text-center">
                <th className="py-3 px-4 text-gray-600">No</th>
                <th className="py-3 px-4 text-gray-600">Nama Produk</th>
                <th className="py-3 px-4 text-gray-600">Kategori</th>
                <th className="py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 text-center"
                  >
                    <td className="py-3 px-4 text-gray-700">
                      {indexOfFirstProduct + index + 1}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{product.nama}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {product.kategori?.namaKategori || "Tidak ada kategori"}
                    </td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditClick(product.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
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
                    Tidak ada produk yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex list-none">
              {[...Array(totalPages).keys()].map((number) => (
                <li key={number + 1} className="mx-1">
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-2 rounded-md ${
                      currentPage === number + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-lg font-bold">Konfirmasi Penghapusan</h3>
              <p className="mt-2">
                Apakah Anda yakin ingin menghapus produk{" "}
                <strong>{selectedProduct?.nama}</strong>?
              </p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
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
