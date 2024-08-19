import React, { useState, useEffect } from "react";
import Api, { getImageURL } from "../../../services/api";
import AdminLayout from "../../../layouts/Adminlayout";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const [productData, setProductData] = useState({
    nama: "",
    kategoriId: "",
    harga: "",
    deskripsiProduk: "",
    warna: "",
    bahan: "",
    dimensi: "",
    finishing: "",
    linkShopee: "",
    linkWhatsApp: "",
    linkTokopedia: "",
  });
  const [gambars, setGambars] = useState([]);
  const [existingGambars, setExistingGambars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState(""); // Untuk menyimpan pesan error terkait file
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await Api.get("/kategori");
      setCategories(response.data);
    } catch (error) {
      setError("Error fetching categories: " + error.message);
      toast.error("Error fetching categories: " + error.message);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await Api.get(`/produk/${id}`);
      setProductData(response.data);

      const gambarData = Array.isArray(response.data.gambar)
        ? response.data.gambar
        : response.data.gambar
        ? response.data.gambar.split(",")
        : [];

      setExistingGambars(gambarData);
    } catch (error) {
      setError("Error fetching product: " + error.message);
      toast.error("Error fetching product: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = [...e.target.files];
    const validFiles = [];

    files.forEach((file) => {
      if (file.size <= 500 * 1024) {
        // Maksimal 500KB
        validFiles.push(file);
      } else {
        setFileError("Ukuran file tidak boleh lebih dari 500KB");
        toast.error("Ukuran file tidak boleh lebih dari 500KB: " + file.name);
      }
    });

    setGambars(validFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileError) {
      toast.error("Terdapat file yang tidak valid. Periksa kembali.");
      return;
    }

    const formData = new FormData();
    Object.keys(productData).forEach((key) =>
      formData.append(key, productData[key])
    );

    // Kirim gambar baru yang diunggah
    gambars.forEach((file) => formData.append("gambar", file));

    // Kirim gambar lama yang masih ingin dipertahankan
    existingGambars.forEach((img) => formData.append("existingGambars", img));

    try {
      await Api.put(`/produk/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Produk Berhasil Diperbarui!");
      setTimeout(() => {
        navigate("/admin/produks/index");
      }, 2000);
    } catch (error) {
      setError("Error updating product: " + error.message);
      toast.error("Error updating product: " + error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
            Edit Product
          </h2>
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
            <div>
              <label
                htmlFor="nama"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Nama
              </label>
              <input
                type="text"
                name="nama"
                value={productData.nama}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>

            {/* Kategori */}
            <div>
              <label
                htmlFor="kategoriId"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Kategori
              </label>
              <select
                name="kategoriId"
                value={productData.kategoriId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.namaKategori}
                  </option>
                ))}
              </select>
            </div>

            {/* Harga */}
            <div>
              <label
                htmlFor="harga"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Harga
              </label>
              <input
                type="text"
                name="harga"
                value={productData.harga}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>

            {/* Deskripsi Produk */}
            <div>
              <label
                htmlFor="deskripsiProduk"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Deskripsi Produk
              </label>
              <textarea
                name="deskripsiProduk"
                value={productData.deskripsiProduk}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                rows="4"
                required
              />
            </div>

            {/* Warna */}
            <div>
              <label
                htmlFor="warna"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Warna
              </label>
              <input
                type="text"
                name="warna"
                value={productData.warna}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>

            {/* Bahan */}
            <div>
              <label
                htmlFor="bahan"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Bahan
              </label>
              <input
                type="text"
                name="bahan"
                value={productData.bahan}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>

            {/* Dimensi */}
            <div>
              <label
                htmlFor="dimensi"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Dimensi
              </label>
              <input
                type="text"
                name="dimensi"
                value={productData.dimensi}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>

            {/* Finishing */}
            <div>
              <label
                htmlFor="finishing"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Finishing
              </label>
              <input
                type="text"
                name="finishing"
                value={productData.finishing}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>

            {/* Link Shopee */}
            <div>
              <label
                htmlFor="linkShopee"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Link Shopee
              </label>
              <input
                type="text"
                name="linkShopee"
                value={productData.linkShopee}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
            </div>

            {/* Link WhatsApp */}
            <div>
              <label
                htmlFor="linkWhatsApp"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Link WhatsApp
              </label>
              <input
                type="text"
                name="linkWhatsApp"
                value={productData.linkWhatsApp}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
            </div>

            {/* Link Tokopedia */}
            <div>
              <label
                htmlFor="linkTokopedia"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Link Tokopedia
              </label>
              <input
                type="text"
                name="linkTokopedia"
                value={productData.linkTokopedia}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
            </div>

            {/* Gambar */}
            <div>
              <label
                htmlFor="gambar"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Gambar
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-gray-900 file:border-none file:bg-gray-50 file:py-2 file:px-4 file:rounded-md file:text-gray-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
              <small className="block mt-1 text-gray-500 italic">
                * Maks 500KB per file
              </small>
              {existingGambars.length > 0 && (
                <div className="mt-2">
                  <strong>Gambar Lama:</strong>
                  <div className="flex mt-2 space-x-2">
                    {existingGambars.map((img, index) => {
                      const imageUrl = getImageURL(img);
                      console.log(`Image ${index + 1}: ${imageUrl}`); // Log URL gambar
                      return (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Existing Image ${index + 1}`}
                            className="w-24 h-16 object-cover rounded-md shadow-sm"
                            onError={(e) =>
                              (e.target.src = "path/to/placeholder-image.jpg")
                            } // Handle broken image
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
              onClick={() => navigate("/admin/produks/index")}
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

export default EditProduct;
