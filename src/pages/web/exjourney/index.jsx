import React from "react";
import WebLayout from "../../../layouts/Weblayout";

const Journey = () => {
  return (
    <WebLayout>
      <div className="bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg p-10">
          <h1 className="text-4xl font-bold text-[#916131] mb-8 text-center">
            Our Journey
          </h1>
          <div className="flex flex-col space-y-12">
            {/* Journey Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mt-6">
              <img
                src="/foto1.png"
                alt="Export to South Korea"
                className="w-full md:w-1/5 rounded-lg shadow-md border border-[#916131] object-cover"
              />
              <img
                src="/foto2.png"
                alt="Image 2"
                className="w-full md:w-1/5 rounded-lg shadow-md border border-[#916131] object-cover"
              />
              <div className="w-full md:w-3/5">
                <p className="text-lg font-semibold text-[#916131] leading-relaxed">
                  Export to South Korea
                </p>
                <p className="text-sm text-[#916131] mb-4">16 Juli 2024</p>
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Setelah vakum melakukan ekspor ke luar negeri. Pada tanggal 20
                  Juni 2024, perusahaan kami telah berhasil melakukan ekspor
                  perdana produk furnitur ke Korea Selatan. Produk meja dan
                  kursi taman berbahan kayu Meranti yang kami kirimkan telah
                  melalui proses produksi yang ketat dengan menggunakan bahan
                  baku berkualitas tinggi dan desain yang ergonomis. Kami
                  percaya bahwa kualitas produk yang unggul serta harga yang
                  kompetitif akan membuat produk furnitur Indonesia semakin
                  diminati di pasar global. Ekspor perdana ini ini merupakan
                  buah dari kerja keras seluruh tim dan komitmen kami untuk
                  terus mengembangkan bisnis ke kancah global. Kami optimistis
                  bahwa ekspor perdana ini akan membuka peluang lebih luas bagi
                  produk-produk furnitur Indonesia di masa depan.
                </p>
              </div>
            </div>
            {/* Additional Sections */}
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mt-6">
              <img
                src="/foto3.png"
                alt="Export to South Korea"
                className="w-full md:w-1/5 mt-5 rounded-lg shadow-md border border-[#916131] object-cover"
              />
              <img
                src="/foto4.png"
                alt="Image 2"
                className="w-full md:w-1/5 mt-5 rounded-lg shadow-md border border-[#916131] object-cover"
              />
              <div className="w-full md:w-3/5">
                <p className="text-lg font-semibold text-[#916131] leading-relaxed">
                  Export to South Korea
                </p>
                <p className="text-sm text-[#916131] mb-4">20 Juni 2024</p>
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Komitmen kami untuk menyediakan produk furnitur berkualitas
                  tinggi kembali dibuktikan dengan keberhasilan melakukan ekspor
                  kembali ke Korea Selatan pada tanggal 16 Juli 2024. Satu unit
                  container 40 feet berisi berbagai produk, termasuk S4S
                  meranti, telah berhasil dikirimkan. Keberhasilan ini merupakan
                  kelanjutan dari kerjasama yang baik dengan pelanggan kami di
                  Korea Selatan dan menjadi langkah awal bagi kami untuk
                  memperluas pangsa pasar di wilayah Asia Timur.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mt-9">
              <img
                src="/foto5.png"
                alt="Export to South Korea"
                className="w-full md:w-1/5 rounded-lg shadow-md border border-[#916131] object-cover"
              />
              <img
                src="/foto6.png"
                alt="Image 2"
                className="w-full md:w-1/5 rounded-lg shadow-md border border-[#916131] object-cover"
              />
              <div className="w-full md:w-3/5">
                <p className="text-lg font-semibold text-[#916131] leading-relaxed">
                  Export to South Korea
                </p>
                <p className="text-sm text-[#916131] mb-4">11 September 2015</p>
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Dengan mengandalkan kualitas kayu pinus yang unggul dan desain
                  yang minimalis namun elegan, produk perabotan dekorasi rumah
                  kami berhasil menembus pasar Korea Selatan yang sangat
                  kompetitif sejak tahun 2015. Adapun jenis produk yang
                  dikirimkan ada Dust Box, Coffee and Tea Box, Robo Tissue Box,
                  dan Folding hook. Ekspor perdana pada tanggal 11 September
                  2015 menjadi bukti nyata bahwa produk-produk buatan Indonesia
                  mampu bersaing di tingkat internasional. Korea Selatan, dengan
                  selera estetika yang tinggi, menjadi pasar yang sangat
                  potensial bagi produk-produk furnitur berbahan alami seperti
                  kayu pinus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

export default Journey;
