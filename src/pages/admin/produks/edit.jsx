import React, { useState, useEffect } from "react";
import Api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/Adminlayout";
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

  const [gambar, setGambar] = useState(null);
  const [existingGambar, setExistingGambar] = useState(""); // State for existing image URL
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState(""); // Error file
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await Api.get("/kategori");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await Api.get(`/produk/${id}`);
      setProductData(response.data);
      setExistingGambar(response.data.gambar); // Set existing image URL
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const formatCurrency = (value) => {
    const numberString = value.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return "Rp" + rupiah;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "harga") {
      const formattedValue = formatCurrency(value);
      setProductData({
        ...productData,
        [name]: formattedValue,
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 500 * 1024) {
      // 500KB in bytes
      setFileError("Ukuran file tidak boleh melebihi 500KB.");
      setGambar(null);
    } else {
      setFileError("");
      setGambar(file);
    }
  };

  const handleRemoveImage = () => {
    setExistingGambar(""); // Remove the existing image URL
    setGambar(null); // Reset file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileError) {
      toast.error(fileError); // Show file error
      return;
    }

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(
        key,
        key === "harga"
          ? productData[key].replace(/[^,\d]/g, "")
          : productData[key]
      );
    });
    if (gambar) {
      formData.append("gambar", gambar);
    }
    // Send the request to remove the existing image if no new image is uploaded
    if (!gambar && !existingGambar) {
      formData.append("removeImage", "true");
    }

    try {
      await Api.put(`/produk/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Produk berhasil diperbarui");
      setTimeout(() => {
        navigate("/admin/produks/index");
      }, 2000); // Delay 2 detik sebelum mengarahkan ulang
    } catch (error) {
      setError("Gagal memperbarui produk. Silakan periksa input Anda.");
      toast.error("Gagal memperbarui produk. Silakan periksa input Anda.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white p-12 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
            Edit Produk
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
                htmlFor="nama"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Nama Produk
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={productData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama produk"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="kategoriId"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Kategori
              </label>
              <select
                id="kategoriId"
                name="kategoriId"
                value={productData.kategoriId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.namaKategori}
                  </option>
                ))}
              </select>
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
                name="gambar"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-gray-900 file:border-none file:bg-gray-50 file:py-3 file:px-5 file:rounded-md file:text-gray-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
              {existingGambar && (
                <div className="mt-2">
                  <img
                    src={existingGambar}
                    alt="Gambar produk"
                    className="w-32 h-32 object-cover border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                  >
                    Hapus Gambar
                  </button>
                </div>
              )}
              <small className="block mt-1 text-gray-500 italic">
                * Maks 500KB
              </small>
            </div>
            <div>
              <label
                htmlFor="harga"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Harga
              </label>
              <input
                type="text"
                id="harga"
                name="harga"
                value={productData.harga}
                onChange={handleChange}
                placeholder="Masukkan harga produk"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="deskripsiProduk"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Deskripsi
              </label>
              <textarea
                id="deskripsiProduk"
                name="deskripsiProduk"
                value={productData.deskripsiProduk}
                onChange={handleChange}
                placeholder="Masukkan deskripsi produk"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                rows="4"
                required
              />
            </div>
            <div>
              <label
                htmlFor="warna"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Warna
              </label>
              <input
                type="text"
                id="warna"
                name="warna"
                value={productData.warna}
                onChange={handleChange}
                placeholder="Masukkan warna produk"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="bahan"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Bahan
              </label>
              <input
                type="text"
                id="bahan"
                name="bahan"
                value={productData.bahan}
                onChange={handleChange}
                placeholder="Masukkan bahan produk"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dimensi"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Dimensi
              </label>
              <input
                type="text"
                id="dimensi"
                name="dimensi"
                value={productData.dimensi}
                onChange={handleChange}
                placeholder="Masukkan dimensi produk"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="finishing"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Finishing
              </label>
              <input
                type="text"
                id="finishing"
                name="finishing"
                value={productData.finishing}
                onChange={handleChange}
                placeholder="Masukkan finishing produk"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="linkShopee"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Link Shopee
              </label>
              <input
                type="text"
                id="linkShopee"
                name="linkShopee"
                value={productData.linkShopee}
                onChange={handleChange}
                placeholder="Masukkan link Shopee"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
            </div>
            <div>
              <label
                htmlFor="linkWhatsApp"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Link WhatsApp
              </label>
              <input
                type="text"
                id="linkWhatsApp"
                name="linkWhatsApp"
                value={productData.linkWhatsApp}
                onChange={handleChange}
                placeholder="Masukkan link WhatsApp"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
            </div>
            <div>
              <label
                htmlFor="linkTokopedia"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Link Tokopedia
              </label>
              <input
                type="text"
                id="linkTokopedia"
                name="linkTokopedia"
                value={productData.linkTokopedia}
                onChange={handleChange}
                placeholder="Masukkan link Tokopedia"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Simpan Perubahan
              </button>
              <button
                type="button"
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                onClick={() => (window.location.href = "/admin/produks/index")}
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

export default EditProduct;
