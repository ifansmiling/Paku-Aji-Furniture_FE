import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Api, { getImageURL } from "../../../services/api";
import Weblayout from "../../../layouts/Weblayout";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetailItem, setProductDetailItem] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Api.get(`/produk/${id}`);
        setProductDetailItem(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!productDetailItem) {
    return (
      <Weblayout>
        <div className="container mx-auto text-center py-20">
          <p>Loading...</p>
        </div>
      </Weblayout>
    );
  }

  return (
    <Weblayout>
      <section className="container mx-auto max-w-7xl py-10 px-5 lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="mt-20">
          {" "}
          <ReactImageGallery
            showBullets={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={productDetailItem.gambar.map((image) => ({
              original: getImageURL(image),
              thumbnail: getImageURL(image),
            }))}
            thumbnailPosition="left"
          />
        </div>

        <div className="lg:pt-10">
          <h2 className="text-3xl font-semibold text-green-900">
            {productDetailItem.nama}
          </h2>
          <p className="mt-2 text-2xl text-yellow-700">
            {formatPrice(productDetailItem.harga)}
          </p>
          <p className="mt-6 text-gray-700 text-justify">
            {productDetailItem.deskripsiProduk}
          </p>

          <table className="mt-6 w-full text-sm text-left text-gray-700">
            <tbody>
              <tr className="border-t border-yellow-700/30">
                {" "}
                <td className="py-2 px-4 font-semibold">Dimensi</td>
                <td className="py-2 px-4 italic text-gray-600">
                  {productDetailItem.dimensi}
                </td>
              </tr>
              <tr className="border-t border-yellow-700/30">
                {" "}
                <td className="py-2 px-4 font-semibold">Material</td>
                <td className="py-2 px-4 italic text-gray-600">
                  {productDetailItem.bahan}
                </td>
              </tr>
              <tr className="border-t border-yellow-700/30">
                {" "}
                <td className="py-2 px-4 font-semibold">Konstruksi</td>
                <td className="py-2 px-4 italic text-gray-600">
                  {productDetailItem.finishing}
                </td>
              </tr>
              <tr className="border-t border-yellow-700/30">
                {" "}
                <td className="py-2 px-4 font-semibold">Warna</td>
                <td className="py-2 px-4 italic text-gray-600">
                  {productDetailItem.warna}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href={productDetailItem.linkShopee}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-yellow-700 text-white text-lg rounded-lg hover:bg-yellow-900"
              >
                <BiShoppingBag className="mr-2" />
                Beli di Shopee
              </a>
              <a
                href={productDetailItem.linkTokopedia}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-yellow-700 text-white text-lg rounded-lg hover:bg-yellow-900"
              >
                <BiShoppingBag className="mr-2" />
                Beli di Tokopedia
              </a>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-base text-yellow-700">
              Produk ini berada dalam Kategori: {productDetailItem.kategori?.namaKategori}
            </p>
          </div>
        </div>
      </section>
    </Weblayout>
  );
};

export default ProductDetail;
