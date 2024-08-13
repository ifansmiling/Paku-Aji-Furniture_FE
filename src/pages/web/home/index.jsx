// /src/pages/web/home/index.jsx
import React from "react";
import Weblayout from "../../../layouts/Weblayout";

function Home() {
  return (
    <Weblayout>
      <div className="relative flex flex-col justify-end items-center h-screen">
        {/* Background Image */}
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

        {/* Content */}
        <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 mb-6">
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-4 md:mb-6 leading-tight text-white">
            Furniture Elegan, Hidup Lebih Nyaman
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-4 md:mb-6 leading-relaxed text-white">
            Ayo Buat Produk Customu di Paku Aji Furniture
          </p>
          <a
            href="/order"
            className="inline-block bg-white text-black font-semibold py-2 px-4 sm:px-6 md:px-8 rounded-full hover:bg-gray-200 hover:text-gray-800 transition duration-300"
          >
            Custom Product
          </a>
        </div>
      </div>
    </Weblayout>
  );
}

export default Home;
