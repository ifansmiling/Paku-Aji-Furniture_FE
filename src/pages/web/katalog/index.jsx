import React, { useState, useEffect } from "react";
import Weblayout from "../../../layouts/Weblayout";
import Api from "../../../services/api";

const baseURL = "http://localhost:5000"; // Base URL untuk gambar

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Api.get("/kategori");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await Api.get("/produk");
      setProducts(response.data);
      setShowProducts(true);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <Weblayout>
      <div className="font-medium text-center mb-3 text-2xl text-[#433527] font-serif mt-5">
        Katalog Produk
      </div>
      <div className="text-center mb-4 font-sans">
        <button
          onClick={fetchAllProducts}
          className="bg-[#CD9D6D] text-white px-3 py-1 rounded-md hover:bg-[#745347] transition-colors duration-300 ease-in-out transform hover:scale-100"
        >
          All Produk
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-4 font-sans">
        {categories.map((category) => (
          <button
            key={category.id}
            className="bg-[#CD9D6D] text-white px-3 py-1 rounded-sm w-37 hover:bg-[#745347] transition-colors duration-300 ease-in-out transform hover:scale-100"
          >
            {category.namaKategori}
          </button>
        ))}
      </div>
      {showProducts && (
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md max-w-xs"
            >
              <img
                src={
                  product.gambar
                    ? baseURL + product.gambar
                    : "/default-image.png"
                }
                alt={product.nama}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{product.nama}</h3>
              <p className="text-sm text-gray-600">Harga: {product.harga}</p>
              <div className="flex gap-2 mt-2">
                {product.linkTokopedia && (
                  <a
                    href={product.linkTokopedia}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tokopedia
                  </a>
                )}
                {product.linkShopee && (
                  <a
                    href={product.linkShopee}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shopee
                  </a>
                )}
                {product.linkWhatsApp && (
                  <a
                    href={product.linkWhatsApp}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Weblayout>
  );
};

export default Index;
