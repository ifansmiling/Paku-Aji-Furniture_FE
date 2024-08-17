import React, { useState, useEffect } from "react";
import Weblayout from "../../../layouts/Weblayout";
import Api, { getImageURL } from "../../../services/api"; // Pastikan untuk mengimpor getImageURL
import { Link } from "react-router-dom";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(true); // Default true untuk menampilkan produk
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Api.get("/kategori");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const response = await Api.get("/produk");
        setProducts(response.data);
        setShowProducts(true); // Tampilkan produk saat data berhasil diambil
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchCategories();
    fetchAllProducts(); // Ambil produk saat komponen dimuat
  }, []);

  const fetchProductsByCategory = async (kategoriId) => {
    try {
      const response = await Api.get(`/produk/kategori/${kategoriId}`);
      setProducts(response.data);
      setShowProducts(true); // Tampilkan produk saat data berhasil diambil
    } catch (error) {
      console.error("Error fetching products by category", error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await Api.get("/produk");
      setProducts(response.data);
      setShowProducts(true); // Tampilkan produk saat data berhasil diambil
    } catch (error) {
      console.error("Error fetching all products", error);
    }
  };

  const handleCategoryClick = (kategoriId) => {
    setSelectedCategory(kategoriId);
    fetchProductsByCategory(kategoriId);
  };

  const handleShowAllProducts = () => {
    fetchAllProducts(); // Ambil semua produk
    setSelectedCategory(null); // Reset kategori yang dipilih
  };

  const formatPrice = (price) => {
    let formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

    formattedPrice = formattedPrice.replace(/(\,00)$/, "");
    formattedPrice = formattedPrice.replace(/^Rp\s*/, "Rp");

    return formattedPrice;
  };

  return (
    <Weblayout>
      <div className="mt-8 container px-4">
        <div className="font-medium text-center mb-3 text-2xl text-[#433527] font-serif mt-5">
          Katalog Produk
        </div>
        <div className="text-center mb-4 font-sans">
          <button
            onClick={handleShowAllProducts}
            className="bg-[#CD9D6D] text-white px-3 py-1 rounded-md hover:bg-[#745347] transition-colors duration-300 ease-in-out transform hover:scale-100"
          >
            Semua Produk
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`bg-[#CD9D6D] text-white px-3 py-1 rounded-sm hover:bg-[#745347] transition-colors duration-300 ease-in-out transform hover:scale-100 ${
                selectedCategory === category.id ? "bg-[#745347]" : ""
              }`}
            >
              {category.namaKategori}
            </button>
          ))}
        </div>
        {showProducts && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md w-full sm:w-44 p-0 hover:shadow-lg transition-shadow duration-300"
                style={{ maxWidth: "200px", margin: "0 8px" }} // Menyesuaikan maxWidth
              >
                <Link
                  to={`/detailproduk/index/${product.id}`}
                  className="relative w-full overflow-hidden"
                  style={{
                    position: "relative",
                    paddingTop: "100%",
                    borderRadius: "12px 12px 0 0",
                  }}
                >
                  <img
                    src={getImageURL(product.gambar)} // Gunakan getImageURL untuk URL gambar lengkap
                    alt={product.nama}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col items-center p-2">
                  <h3 className="text-xs font-sans mb-2 text-center">
                    {product.nama}
                  </h3>
                  <p className="text-xs text-black mb-2 text-center font-sans font-semibold">
                    {formatPrice(product.harga)}
                  </p>
                  <div className="flex flex-wrap items-center space-y-2 w-full">
                    {product.linkTokopedia && (
                      <a
                        href={product.linkTokopedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-1 px-4 rounded-md text-white text-xs bg-[#916131] hover:bg-[#7d4c28] transition-all duration-300"
                      >
                        Tokopedia
                      </a>
                    )}
                    {product.linkShopee && (
                      <a
                        href={product.linkShopee}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-1 px-4 rounded-md text-white text-xs bg-[#916131] hover:bg-[#7d4c28] transition-all duration-300"
                      >
                        Shopee
                      </a>
                    )}
                    {product.linkWhatsApp && (
                      <a
                        href={`https://wa.me/${product.linkWhatsApp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-1 px-4 rounded-md text-white text-xs bg-[#916131] hover:bg-[#7d4c28] transition-all duration-300"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Weblayout>
  );
};

export default Index;
