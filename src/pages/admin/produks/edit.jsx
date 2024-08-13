import React, { useState, useEffect } from "react";
import Api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/Adminlayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Base URL untuk server backend
const baseURL = "/uploads/produks/";

const EditProduct = () => {
  const [productData, setProductData] = useState({
    nama: "",
    kategoriId: "",
    harga: "", // Pastikan ini adalah string
    deskripsiProduk: "",
    warna: "",
    bahan: "",
    dimensi: "",
    finishing: "",
    linkShopee: "",
    linkWhatsApp: "",
    linkTokopedia: "",
  });

  const [gambar, setGambar] = useState([]); // Untuk gambar baru
  const [gambarLama, setGambarLama] = useState([]); // Untuk gambar lama sebagai array
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await Api.get(`/produk/${id}`);
      const product = response.data;

      let gambarLamaArray = [];

      if (typeof product.gambar === "string") {
        try {
          gambarLamaArray = JSON.parse(product.gambar);
          if (!Array.isArray(gambarLamaArray)) {
            gambarLamaArray = [];
          }
        } catch (error) {
          console.error("Error parsing gambar:", error);
          gambarLamaArray = [];
        }
      } else if (Array.isArray(product.gambar)) {
        gambarLamaArray = product.gambar;
      } else {
        gambarLamaArray = []; // Default value jika format tidak sesuai
      }

      setGambarLama(gambarLamaArray);
      setProductData(product);
    } catch (error) {
      console.error("Error memuat produk:", error);
      setError("Gagal memuat produk.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await Api.get("/kategori");
      setCategories(response.data);
    } catch (error) {
      console.error("Error memuat kategori:", error);
      setError("Gagal memuat kategori.");
      toast.error("Gagal memuat kategori.", {
        position: "top-right",
        autoClose: 3000,
      });
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
      const formattedValue = formatCurrency(String(value)); // Pastikan value adalah string
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
    setGambar(Array.from(e.target.files)); // Menyimpan gambar baru yang diunggah
  };

  const handleRemoveOldImage = (index) => {
    setGambarLama(gambarLama.filter((_, i) => i !== index)); // Menghapus gambar lama
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      let value = productData[key];
      if (key === "harga") {
        value = String(value).replace(/[^0-9]/g, ""); // Menghapus karakter non-numerik
      }
      formData.append(key, value);
    });

    // Tambahkan gambar lama jika tidak dihapus
    formData.append("gambarLama", JSON.stringify(gambarLama));

    // Tambahkan gambar baru yang diunggah
    if (gambar.length > 0) {
      gambar.forEach((file) => {
        formData.append("gambar", file);
      });
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
      }, 2000);
    } catch (error) {
      console.error("Error memperbarui produk:", error);
      setError("Gagal memperbarui produk. Silakan periksa input Anda.");
      toast.error("Gagal memperbarui produk. Silakan periksa input Anda.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Produk</h1>
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
              placeholder="Masukkan nama produk"
              required
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Kategori
            </label>
            <select
              name="kategoriId"
              value={productData.kategoriId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
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
          {Array.isArray(gambarLama) && gambarLama.length > 0 && (
            <div className="input-group">
              <label className="block text-gray-700 font-bold mb-2">
                Gambar Lama
              </label>
              <div className="grid grid-cols-2 gap-4">
                {gambarLama.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`${baseURL}${img}`} // Menggunakan URL lengkap
                      alt="gambar produk"
                      className="w-full"
                      style={{ maxWidth: "100px", height: "auto" }} // Set ukuran gambar
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOldImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Gambar Baru
            </label>
            <input
              type="file"
              name="gambar"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded"
              multiple
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
              placeholder="Masukkan harga produk"
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
              placeholder="Masukkan deskripsi produk"
              required
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">Warna</label>
            <input
              type="text"
              name="warna"
              value={productData.warna}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Masukkan warna produk"
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
              placeholder="Masukkan bahan produk"
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
              placeholder="Masukkan dimensi produk"
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
              placeholder="Masukkan finishing produk"
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Link Shopee
            </label>
            <input
              type="url"
              name="linkShopee"
              value={productData.linkShopee}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Masukkan link Shopee"
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Link WhatsApp
            </label>
            <input
              type="url"
              name="linkWhatsApp"
              value={productData.linkWhatsApp}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Masukkan link WhatsApp"
            />
          </div>
          <div className="input-group">
            <label className="block text-gray-700 font-bold mb-2">
              Link Tokopedia
            </label>
            <input
              type="url"
              name="linkTokopedia"
              value={productData.linkTokopedia}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Masukkan link Tokopedia"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
