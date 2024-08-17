import React, { useState, useEffect } from "react";
import Api, { getImageURL } from "../../../services/api"; // Pastikan getImageURL diimpor
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
  const [gambar, setGambar] = useState(null);
  const [existingGambar, setExistingGambar] = useState(""); // URL gambar yang sudah ada
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState(""); // Error file
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
      setExistingGambar(response.data.gambar); // Set existing image URL
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
    setGambar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productData).forEach((key) =>
      formData.append(key, productData[key])
    );
    if (gambar) formData.append("gambar", gambar);

    try {
      await Api.put(`/produk/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      setError("Error updating product: " + error.message);
      toast.error("Error updating product: " + error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="container">
        <h2>Edit Product</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              name="nama"
              value={productData.nama}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Kategori</label>
            <select
              name="kategoriId"
              value={productData.kategoriId}
              onChange={handleChange}
              className="form-control"
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

          <div className="form-group">
            <label>Harga</label>
            <input
              type="text"
              name="harga"
              value={productData.harga}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Deskripsi Produk</label>
            <textarea
              name="deskripsiProduk"
              value={productData.deskripsiProduk}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Warna</label>
            <input
              type="text"
              name="warna"
              value={productData.warna}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Bahan</label>
            <input
              type="text"
              name="bahan"
              value={productData.bahan}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Dimensi</label>
            <input
              type="text"
              name="dimensi"
              value={productData.dimensi}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Finishing</label>
            <input
              type="text"
              name="finishing"
              value={productData.finishing}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Link Shopee</label>
            <input
              type="text"
              name="linkShopee"
              value={productData.linkShopee}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Link WhatsApp</label>
            <input
              type="text"
              name="linkWhatsApp"
              value={productData.linkWhatsApp}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Link Tokopedia</label>
            <input
              type="text"
              name="linkTokopedia"
              value={productData.linkTokopedia}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Gambar</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control"
            />
            {existingGambar && (
              <div className="mt-2">
                <img
                  src={getImageURL(existingGambar)}
                  alt="Existing"
                  style={{ width: "150px", height: "auto" }}
                />
              </div>
            )}
          </div>

          {fileError && <div className="alert alert-danger">{fileError}</div>}

          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
        </form>
        <ToastContainer />
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
