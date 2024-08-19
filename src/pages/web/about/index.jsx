import React from "react";
import WebLayout from "../../../layouts/Weblayout";

const AboutUs = () => {
  return (
    <WebLayout>
      <div className="bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg p-10">
          <h1
            className="text-4xl font-bold mb-8 text-center"
            style={{ color: "#916131" }}
          >
            Tentang Kami
          </h1>
          <p
            className="text-lg mb-6 leading-relaxed text-justify"
            style={{ color: "#4a4a4a" }}
          >
            CV. Paku Aji Indonesia, adalah perusahaan manufaktur furnitur telah
            berdiri sejak sejak 2011, secara resmi terdaftar pada tahun 2021.
            Dengan fokus pada kualitas tinggi dan harga bersaing, kami telah
            berhasil menembus pasar internasional selama lebih dari satu dekade.
            Produk-produk furnitur kami, yang dirancang dengan estetika modern
            dan fungsionalitas tinggi, telah menjadi pilihan bagi konsumen di
            berbagai negara. Visi kami adalah terus tumbuh dan berkembang,
            menjadi pemimpin di industri furnitur dengan menawarkan
            produk-produk berkualitas terbaik dan harga yang kompetitif, serta
            memperluas jangkauan pasar kami baik di dalam maupun di luar negeri.
          </p>
        </div>
      </div>
    </WebLayout>
  );
};

export default AboutUs;
