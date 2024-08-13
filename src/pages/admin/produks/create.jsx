import React, { useState, useEffect } from "react";
import Api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/Adminlayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [gambar, setGambar] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
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
    setGambar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    console.log("Data Produk:", productData);
    console.log("File Gambar:", gambar);

    try {
      await Api.post("/produk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Menampilkan toast notifikasi keberhasilan
      toast.success("Produk berhasil ditambahkan");
      setTimeout(() => {
        window.location.href = "/admin/produks/index";
      }, 2000); 
       // Mengarahkan pengguna ke halaman produk
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Gagal membuat produk. Silakan periksa input Anda.");

      // Menampilkan toast notifikasi error
      toast.error("Gagal membuat produk. Silakan periksa input Anda.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Tambah Produk Baru
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              name="nama"
              value={productData.nama}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="input-group">
            <div className="input-group">
              <label className="block text-gray-700 font-bold mb-2">
                Kategori
              </label>
              <select
                name="kategoriId"
                value={productData.kategoriId}
                onChange={handleChange}
                className="w-full p-3 border border-black-300 rounded"
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
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">Gambar</label>
            <input
              type="file"
              name="gambar"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">Harga</label>
            <input
              type="text"
              name="harga"
              value={productData.harga}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Deskripsi
            </label>
            <textarea
              name="deskripsiProduk"
              value={productData.deskripsiProduk}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">Warna</label>
            <input
              type="text"
              name="warna"
              value={productData.warna}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">Bahan</label>
            <input
              type="text"
              name="bahan"
              value={productData.bahan}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Dimensi
            </label>
            <input
              type="text"
              name="dimensi"
              value={productData.dimensi}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Finishing
            </label>
            <input
              type="text"
              name="finishing"
              value={productData.finishing}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Link Shopee
            </label>
            <input
              type="text"
              name="linkShopee"
              value={productData.linkShopee}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Link WhatsApp
            </label>
            <input
              type="text"
              name="linkWhatsApp"
              value={productData.linkWhatsApp}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Link Tokopedia
            </label>
            <input
              type="text"
              name="linkTokopedia"
              value={productData.linkTokopedia}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Tambah Produk
            </button>
          </div>
        </form>

        {/* React Toastify container */}
        <ToastContainer />
      </div>
    </AdminLayout>
  );
};

export default CreateProduct;
