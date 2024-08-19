import React, { useState, useEffect } from "react";
import Weblayout from "../../../layouts/Weblayout";
import Api, { getImageURL } from "../../../services/api";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    const fetchProductsByCategory = async (kategoriId) => {
      try {
        const response = await Api.get(`/produk/kategori/${kategoriId}`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products by category", error);
      }
    };

    fetchCategories();

    const queryParams = new URLSearchParams(location.search);
    const kategoriId = queryParams.get("kategori");

    if (kategoriId) {
      setSelectedCategory(kategoriId);
      fetchProductsByCategory(kategoriId);
    } else {
      fetchAllProducts();
    }
  }, [location]);

  useEffect(() => {
    const results = products.filter((product) =>
      product.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleCategoryClick = (kategoriId) => {
    setSelectedCategory(kategoriId);
    navigate(`?kategori=${kategoriId}`);
  };

  const handleShowAllProducts = () => {
    setSelectedCategory(null);
    navigate("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = products.filter((product) =>
      product.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "id-ID";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      recognition.stop();
    };

    recognition.start();
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
      <div className="mt-10 container px-4">
        <div className="font-medium text-center mb-3 text-2xl text-[#433527] font-serif mt-20">
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

        {/* Form Search with Custom Design */}
        <form
          className="flex items-center max-w-lg mx-auto mb-4"
          onSubmit={handleSearchSubmit}
        >
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-[#745347]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#CD9D6D] focus:border-[#CD9D6D] block w-full ps-10 p-2.5"
              placeholder="Cari produk..."
              required
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              <svg
                className={`w-4 h-4 ${
                  isListening ? "text-red-500" : "text-[#745347]"
                } hover:text-gray-900`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#8a6d50] rounded-lg border hover:bg-[#73594f] focus:ring-4 focus:outline-none focus:ring-[#eaeaea]"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            Cari
          </button>
        </form>

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

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md w-full sm:w-44 p-0 hover:shadow-lg transition-shadow duration-300"
                style={{ maxWidth: "200px", margin: "0 8px" }}
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
                    src={getImageURL(product.gambar[0])}
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
                        href={`https://wa.me/${product.linkWhatsApp.replace(
                          /^https?:\/\/(wa\.me|whatsapp\.com)\//,
                          ""
                        )}?text=Halo%20Paku%20Aji,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(
                          product.nama
                        )}.%20Apakah%20masih%20tersedia?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-1 px-6 rounded-md text-white text-sm bg-[#916131] hover:bg-[#7d4c28] transition-all duration-300"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada produk yang ditemukan
            </p>
          )}
        </div>
      </div>
    </Weblayout>
  );
};

export default Index;
