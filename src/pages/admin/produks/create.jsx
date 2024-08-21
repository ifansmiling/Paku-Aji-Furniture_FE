import React, { useState, useEffect } from "react";
import Api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../../layouts/Adminlayout";
const CreateProduct = () => {
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

  const [gambar, setGambar] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await Api.get("/kategori");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
    const files = Array.from(e.target.files);
    if (files.some((file) => file.size > 500 * 1024)) {
      setFileError("Ukuran file tidak boleh melebihi 500KB.");
      setGambar([]);
    } else {
      setFileError("");
      setGambar(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileError) {
      toast.error(fileError);
      return;
    }

    const sanitizedWhatsAppNumber = productData.linkWhatsApp.replace(
      /[^0-9]/g,
      ""
    );

    if (
      sanitizedWhatsAppNumber.length < 10 ||
      sanitizedWhatsAppNumber.length > 15
    ) {
      setError(
        "Format nomor WhatsApp tidak valid. Pastikan nomor berisi 10-15 digit angka."
      );
      toast.error(
        "Format nomor WhatsApp tidak valid. Pastikan nomor berisi 10-15 digit angka."
      );
      return;
    }

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key === "linkWhatsApp") {
        formData.append(key, sanitizedWhatsAppNumber);
      } else if (key === "harga") {
        formData.append(key, productData[key].replace(/[^0-9]/g, ""));
      } else {
        formData.append(key, productData[key]);
      }
    });
    gambar.forEach((file) => formData.append("gambar", file));

    try {
      const response = await Api.post("/produk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Produk berhasil ditambahkan");
      setTimeout(() => {
        navigate("/admin/produks/index");
      }, 2000);
    } catch (error) {
      console.error("Error creating product:", error.response || error.message);
      setError("Gagal membuat produk. Silakan periksa input Anda.");
      toast.error("Gagal membuat produk. Silakan periksa input Anda.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white p-12 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
            Tambah Produk Baru
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
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-gray-900 file:border-none file:bg-gray-50 file:py-3 file:px-5 file:rounded-md file:text-gray-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
              <small className="block mt-1 text-gray-500 italic">
                * Maks 500KB per file
              </small>
              {gambar.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-gray-700 text-lg font-medium">
                    Preview Gambar:
                  </h4>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {Array.from(gambar).map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-28 h-28 object-cover rounded-md border border-gray-300"
                      />
                    ))}
                  </div>
                </div>
              )}
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
                type="url"
                id="linkShopee"
                name="linkShopee"
                value={productData.linkShopee}
                onChange={handleChange}
                placeholder="Masukkan link Shopee produk"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
            </div>
            <div>
              <label
                htmlFor="linkWhatsApp"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Nomor WhatsApp
              </label>
              <input
                type="text"
                id="linkWhatsApp"
                name="linkWhatsApp"
                value={productData.linkWhatsApp}
                onChange={handleChange}
                placeholder="Masukkan nomor WhatsApp (misal: 628********)"
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
                type="url"
                id="linkTokopedia"
                name="linkTokopedia"
                value={productData.linkTokopedia}
                onChange={handleChange}
                placeholder="Masukkan link Tokopedia produk"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#CD9D6D] text-white py-2 px-6 rounded-md shadow-lg hover:bg-[#b57c6f] focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
            >
              Simpan Produk
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

export default CreateProduct;
