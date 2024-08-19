import React, { useState, useEffect } from "react";
import Api, { getImageURL } from "../../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Weblayout from "../../../layouts/Weblayout";
import { Link } from "react-router-dom";

const HomeCards = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
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
        const response = await Api.get("/produk");
        let products = response.data;

        // Randomize product order
        products = products.sort(() => Math.random() - 0.5);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Gagal mengambil produk. Silakan coba lagi nanti.");
      }
    };

    const fetchLatestProducts = async () => {
      try {
        const response = await Api.get("/produk/latest/new");
        setLatestProducts(response.data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
        setError("Gagal mengambil produk terbaru. Silakan coba lagi nanti.");
      } finally {
        setLoadingLatestProducts(false);
      }
    };

    fetchCategories();
    fetchProducts();
    fetchLatestProducts();
  }, []);

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

  const getFirstImageURL = (gambar) => {
    if (Array.isArray(gambar)) {
      return getImageURL(gambar[0]);
    }
    return getImageURL(gambar);
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
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center lg:gap-2 xl:gap-1 mb-8">
              {latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md p-0 hover:shadow-lg transition-shadow duration-300 max-w-[12rem] m-1"
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
                      src={getFirstImageURL(product.gambar)}
                      alt={product.nama}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-col items-center p-2">
                    <h3 className="text-xs sm:text-l font-sans mb-2 text-center">
                      {product.nama}
                    </h3>
                    <p className="text-xs sm:text-sm text-black mb-2 text-center font-sans font-semibold">
                      {formatPrice(product.harga)}
                    </p>
                    <div className="flex flex-wrap items-center space-y-1 w-full">
                      {product.linkTokopedia && (
                        <a
                          href={product.linkTokopedia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-1 px-2 sm:px-6 rounded-md text-white text-xs sm:text-sm bg-[#916131] hover:bg-[#7d4c28] transition-all duration-300"
                        >
                          Tokopedia
                        </a>
                      )}
                      {product.linkShopee && (
                        <a
                          href={product.linkShopee}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-1 px-2 sm:px-6 rounded-md text-white text-xs sm:text-sm bg-[#916131] hover:bg-[#7d4c28] transition-all duration-300"
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
                          className="w-full text-center py-1 px-2 sm:px-6 rounded-md text-white text-xs sm:text-sm bg-[#916131] hover:bg-[#7d4c28] transition-all duration-300"
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
            <Link
              key={category.id}
              to={`/katalog?kategori=${category.id}`}
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
                  width: "3.5rem",
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
                  src={getFirstImageURL(category.gambar)}
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
            </Link>
          ))}
        </div>

        <h2 className="text-center mb-4 font-serif text-2xl font-normal text-[#433527]">
          Produk Kami
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4 xl:gap-6 mb-8">
          {products.slice(0, 12).map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md w-full p-0 hover:shadow-lg transition-shadow duration-300"
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
                  src={getFirstImageURL(product.gambar)}
                  alt={product.nama}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                />
              </Link>
              <div className="flex flex-col items-center p-2">
                <h3 className="text-sm font-sans mb-2 text-center">
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
                      className="w-full text-center py-1 px-5 rounded-md text-white text-xs bg-[#916131] hover:bg-[#7d4c28] transition-all duration-300"
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
          ))}
        </div>
      </div>

      <div className="mt-3 container text-center">
        <a
          href="/katalog"
          className="inline-block bg-[#5a4d41] text-white font-serif text-sm font-normal py-2 px-6 rounded hover:bg-[#34291d] transition-all duration-300 mb-4"
        >
          Lihat Selengkapnya
        </a>
      </div>

      <div className="relative flex flex-col justify-end items-center h-auto md:min-h-[80vh]">
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
            className="inline-block bg-white text-custom-brown font-semibold py-2 px-4 sm:px-6 md:px-8 rounded-full hover:bg-custom-hover hover:text-gray-800 transition-all duration-300 shadow-md hover:shadow-xl ring-2 ring-transparent hover:ring-custom-hover"
          >
            Custom Product
          </a>
        </div>
      </div>
    </Weblayout>
  );
};

export default HomeCards;
