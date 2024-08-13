import React, { useState, useEffect } from "react";
import Api from "../../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Weblayout from "../../../layouts/Weblayout";

const baseURL = "http://localhost:5000";

const HomeCards = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]); // State for latest products
  const [error, setError] = useState(null);
  const [loadingLatestProducts, setLoadingLatestProducts] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Api.get("/kategori");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Gagal mengambil kategori. Silakan coba lagi nanti.");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await Api.get("/produk"); // Ensure this endpoint is correct
        let products = response.data;

        // Shuffle the products array to randomize the order
        products = products.sort(() => Math.random() - 0.5);

        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Gagal mengambil produk. Silakan coba lagi nanti.");
      }
    };

    const fetchLatestProducts = async () => {
      try {
        const response = await Api.get("/produk");
        const sortedProducts = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestProducts(sortedProducts.slice(0, 5)); // Get the 5 most recent products
      } catch (error) {
        console.error("Error fetching latest products:", error);
        setError("Gagal mengambil produk terbaru. Silakan coba lagi nanti.");
      } finally {
        setLoadingLatestProducts(false);
      }
    };

    fetchCategories();
    fetchProducts();
    fetchLatestProducts(); // Fetch latest products
  }, []);

  const getFullImagePath = (path) => {
    return `${baseURL}${path}`;
  };

  // Function to format price as currency
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
      <div className="mt-8 container">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loadingLatestProducts ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <h2 className="text-center mb-4 font-serif text-2xl font-normal text-[#433527]">
              Produk Terbaru Kami
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md w-full sm:w-52 p-0" // Make card width smaller
                >
                  <div
                    className="w-full"
                    style={{
                      position: "relative",
                      paddingTop: "100%", // 1:1 Aspect Ratio
                      overflow: "hidden",
                      borderRadius: "12px 12px 0 0", // Rounded corners only at the top
                    }}
                  >
                    <img
                      src={getFullImagePath(product.gambar)}
                      alt={product.nama}
                      className="absolute top-0 left-0 w-full h-full object-cover" // Ensure full coverage of the container
                    />
                  </div>
                  <div className="flex flex-col items-center p-2">
                    <h3 className="text-sm font-normal mb-1 text-center">
                      {product.nama}
                    </h3>
                    <p className="text-xs text-black mb-2 text-center font-medium">
                      Harga: {formatPrice(product.harga)}
                    </p>
                    <div className="flex flex-col items-center space-y-2 w-full">
                      {product.linkTokopedia && (
                        <a
                          href={product.linkTokopedia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-1 px-4 rounded-md text-white text-xs"
                          style={{ backgroundColor: "#916131" }} // Background color for Tokopedia
                        >
                          Tokopedia
                        </a>
                      )}
                      {product.linkShopee && (
                        <a
                          href={product.linkShopee}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-1 px-4 rounded-md text-white text-xs"
                          style={{ backgroundColor: "#916131" }} // Background color for Shopee
                        >
                          Shopee
                        </a>
                      )}
                      {product.linkWhatsApp && (
                        <a
                          href={`https://wa.me/${product.linkWhatsApp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-1 px-4 rounded-md text-white text-xs"
                          style={{ backgroundColor: "#916131" }} // Background color for WhatsApp
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="text-center mb-4 font-serif text-2xl font-normal text-[#433527]">
          Kategori Produk
        </h2>
        <div className="d-flex flex-wrap justify-content-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="d-flex flex-column align-items-center mx-2 mb-3 font-sans text-custom-brown"
              style={{
                border: "2px solid #CD9D6D",
                borderRadius: "10px",
                padding: "6px",
              }}
            >
              <div
                className="card"
                style={{
                  width: "3.5rem", // Smaller size for category images
                  height: "3.5rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={getFullImagePath(category.gambar)}
                  className="card-img-top"
                  alt={category.namaKategori}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="mt-1 text-center">
                <p className="card-title text-xs mb-0">
                  {category.namaKategori}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center mb-4 font-serif text-2xl font-normal text-[#433527]">
          Produk Kami
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md w-full sm:w-44 p-0" // Make card width smaller
            >
              <div
                className="w-full"
                style={{
                  position: "relative",
                  paddingTop: "100%", // 1:1 Aspect Ratio
                  overflow: "hidden",
                  borderRadius: "12px 12px 0 0", // Rounded corners only at the top
                }}
              >
                <img
                  src={getFullImagePath(product.gambar)}
                  alt={product.nama}
                  className="absolute top-0 left-0 w-full h-full object-cover" // Ensure full coverage of the container
                />
              </div>
              <div className="flex flex-col items-center p-2">
                <h3 className="text-sm font-normal mb-1 text-center">
                  {product.nama}
                </h3>
                <p className="text-xs text-black mb-2 text-center font-medium">
                  Harga: {formatPrice(product.harga)}
                </p>
                <div className="flex flex-col items-center space-y-2 w-full">
                  {product.linkTokopedia && (
                    <a
                      href={product.linkTokopedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-1 px-4 rounded-md text-white text-xs"
                      style={{ backgroundColor: "#916131" }} // Background color for Tokopedia
                    >
                      Tokopedia
                    </a>
                  )}
                  {product.linkShopee && (
                    <a
                      href={product.linkShopee}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-1 px-4 rounded-md text-white text-xs"
                      style={{ backgroundColor: "#916131" }} // Background color for Shopee
                    >
                      Shopee
                    </a>
                  )}
                  {product.linkWhatsApp && (
                    <a
                      href={`https://wa.me/${product.linkWhatsApp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-1 px-4 rounded-md text-white text-xs"
                      style={{ backgroundColor: "#916131" }} // Background color for WhatsApp
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 container text-center">
        <a
          href="/katalog"
          className="inline-block bg-[#5a4d41] text-white font-serif text-sm font-normal py-2 px-6 rounded hover:bg-[#34291d] transition-all duration-300"
        >
          Lihat Selengkapnya
        </a>
      </div>

      <div
        className="relative flex flex-col justify-end items-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/castem.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        ></div>

        <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 mb-6">
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-4 md:mb-6 leading-tight text-white">
            Furniture Elegan, Hidup Lebih Nyaman
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-4 md:mb-6 leading-relaxed text-white">
            Ayo Buat Produk Customu di Paku Aji Furniture
          </p>
          <a
            href="/order"
            className="inline-block bg-white text-custom-brown font-semibold py-2 px-4 sm:px-6 md:px-8 rounded-full 
       hover:bg-custom-hover hover:text-gray-800 transition-all duration-300
       shadow-md hover:shadow-xl ring-2 ring-transparent hover:ring-custom-hover"
          >
            Custom Product
          </a>
        </div>
      </div>
    </Weblayout>
  );
};

export default HomeCards;
