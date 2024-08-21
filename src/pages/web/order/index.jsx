import React, { useState } from "react";
import Weblayout from "../../../layouts/Weblayout";

const OrderPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=6287777158323&text=${encodeURIComponent(
      `Nama: ${name}\nPesan: ${message}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Weblayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#916131] mb-8 text-center">
          Pesan Custom
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
          Di Paku Aji Furniture, kami tidak hanya menyediakan berbagai macam
          furnitur yang siap pakai, tetapi juga menawarkan layanan pembuatan
          furnitur custom untuk memenuhi kebutuhan dan selera unik Anda. Kami
          memahami bahwa setiap individu memiliki preferensi yang berbeda
          terkait desain, ukuran, dan fungsi furnitur dalam rumah mereka. Oleh
          karena itu, layanan kami dirancang untuk memberikan fleksibilitas
          penuh bagi Anda dalam menciptakan furnitur yang benar-benar sesuai
          dengan keinginan dan kebutuhan Anda. Dengan mengedepankan kualitas dan
          detail, kami berkolaborasi dengan desainer berpengalaman dan pengrajin
          ahli untuk memastikan setiap pesanan custom memiliki nilai estetika
          yang tinggi serta fungsional. Dari memilih jenis kayu, warna
          finishing, hingga detail ornamen, kami memberikan kebebasan penuh
          kepada Anda untuk menentukan elemen-elemen yang paling sesuai dengan
          gaya dan kebutuhan Anda. Apakah Anda menginginkan meja makan yang
          besar untuk keluarga besar Anda, atau lemari dengan desain minimalis
          yang cocok untuk ruang tamu modern, kami siap membantu mewujudkan visi
          Anda menjadi kenyataan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-[#916131] mb-4">
              Keunggulan Pesanan Custom
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li className="mb-2">
                <strong>Desain Pribadi:</strong> Kerjasama dengan desainer untuk
                menciptakan furnitur sesuai keinginan.
              </li>
              <li className="mb-2">
                <strong>Kualitas Terbaik:</strong> Dibuat oleh pengrajin ahli
                dengan bahan berkualitas tinggi.
              </li>
              <li className="mb-2">
                <strong>Unik:</strong> Furnitur yang mencerminkan gaya pribadi
                Anda.
              </li>
              <li>
                <strong>Sesuai Ruang:</strong> Furnitur yang pas untuk setiap
                sudut rumah Anda.
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-[#916131] mb-4">
              Proses Pesanan
            </h2>
            <ol className="list-decimal list-inside text-gray-700">
              <li className="mb-2">
                <strong>Konsultasi:</strong> Diskusikan ide dan kebutuhan Anda
                dengan tim desain kami.
              </li>
              <li className="mb-2">
                <strong>Desain:</strong> Kami akan membuat sketsa untuk
                persetujuan Anda.
              </li>
              <li className="mb-2">
                <strong>Produksi:</strong> Pengrajin kami mulai membuat furnitur
                custom Anda.
              </li>
              <li>
                <strong>Pengiriman:</strong> Kami antar dan pasang furnitur di
                rumah Anda.
              </li>
            </ol>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-[#916131] mb-6">
            Mulai Sekarang!
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Hubungi kami dengan mengisi form pada custom order atau kunjungi
            toko kami di Tegal - Jawa Tengah untuk memulai pesanan furnitur
            custom Anda. Kami siap membantu mewujudkan ide furnitur impian Anda
            menjadi kenyataan, dengan layanan yang ramah, cepat, dan berkualitas
            tinggi.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mx-auto max-w-lg">
          <h2 className="text-2xl font-semibold text-[#916131] mb-4 text-center">
            Formulir Pesanan Custom
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nama
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#916131] focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
              placeholder="Masukkan nama Anda"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Pesan
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#916131] focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
              placeholder="Deskripsikan kebutuhan furnitur Anda"
              rows="4"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              onClick={handleSendMessage}
              className="bg-[#916131] hover:bg-[#7b4d29] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#916131] focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Kirim Pesan
            </button>
          </div>
        </div>
      </div>
    </Weblayout>
  );
};

export default OrderPage;
