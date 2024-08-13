import React, { useState, useEffect } from "react";
import Weblayout from "../../../layouts/Weblayout";
import Api from "../../../services/api";

const Index = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    <Weblayout>
      <div className="text-center mb-3 text-2xl text-[#433527] font-serif">
        Katalog Produk
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-4 font-sans">
        {categories.map((category) => (
          <button
            key={category.id}
            className="bg-[#916131] text-white px-4 py-1 rounded-lg w-37 hover:bg-[#745347] transition-colors duration-300 ease-in-out transform hover:scale-100"
          >
            {category.namaKategori}
          </button>
        ))}
      </div>
    </Weblayout>
  );
};

export default Index;
