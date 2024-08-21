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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 14;

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
    setCurrentPage(1); 
  }, [searchTerm, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }, [currentPage]);

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            className="bg-slate-500 text-white px-3 py-1 rounded-md hover:bg-[#745347] transition-colors duration-300 ease-in-out transform hover:scale-100"
          >
            Tampilkan Semua Produk
          </button>
        </div>

        <form
          className="flex items-center max-w-lg mx-auto mb-4"
          onSubmit={handleSearchSubmit}
        >
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="voice-search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-white border border-black text-gray-900 text-sm rounded-full shadow focus:ring-[#CD9D6D] focus:border-[#CD9D6D] block w-full ps-10 p-2.5 transition duration-200 ease-in-out transform hover:scale-95"
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
                } hover:text-gray-900 transition duration-200 ease-in-out transform hover:scale-110`}
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
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#8a6d50] rounded-full shadow-lg hover:shadow-xl border hover:bg-[#73594f] focus:ring-4 focus:outline-none focus:ring-[#eaeaea] transition duration-200 ease-in-out transform hover:scale-105"
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
              className={`text-white px-3 py-1 rounded-2xl transition-colors duration-300 ease-in-out transform hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-[#916131] hover:bg-[#745347]"
                  : "bg-slate-500 hover:bg-[#745347]"
              }`}
            >
              {category.namaKategori}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center lg:gap-2 xl:gap-1 mb-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
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
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <p className="place-content-center text-gray-500">
              Tidak ada produk yang ditemukan
            </p>
          )}
        </div>
        
        <div className="flex justify-center items-center gap-x-2 mt-6 mb-6 max-w-screen-lg mx-auto">
          <button
            onClick={() => {
              if (currentPage > 1) {
                paginate(currentPage - 1);
              }
            }}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "text-gray-400" : "text-black"
            } px-2 py-1`}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`${
                currentPage === number + 1
                  ? "bg-blue-100 text-yellow-700 font-bold rounded-full w-8 h-8 flex items-center justify-center"
                  : "text-black"
              }`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => {
              if (currentPage < totalPages) {
                paginate(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages ? "text-gray-400" : "text-black"
            } px-2 py-1`}
          >
            Next
          </button>
        </div>
      </div>
    </Weblayout>
  );
};

export default Index;
