import React, { useEffect, useState } from "react";
import Api, { getImageURL } from "../../../services/api"; // Import getImageURL
import AdminLayout from "../../../layouts/Adminlayout";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditJourney = () => {
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const response = await Api.get(`/journey/${id}`);
        const journey = response.data;
        setJudul(journey.judul);
        setTanggal(journey.tanggal);
        setDeskripsi(journey.deskripsi);

        // Periksa tipe data journey.gambar
        if (Array.isArray(journey.gambar)) {
          setExistingImages(journey.gambar);
        } else if (typeof journey.gambar === "string") {
          setExistingImages(journey.gambar.split(","));
        } else {
          setExistingImages([]);
        }
      } catch (error) {
        setError("Error fetching journey: " + error.message);
        toast.error("Error fetching journey: " + error.message);
      }
    };

    fetchJourney();
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      if (file.size > 500 * 1024) {
        invalidFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`Ukuran file ${invalidFiles.join(", ")} melebihi 500KB.`);
      toast.error(`Ukuran file ${invalidFiles.join(", ")} melebihi 500KB.`);
    } else {
      setError(""); // Reset error jika semua file valid
      setGambar(validFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("tanggal", tanggal);
    formData.append("deskripsi", deskripsi);
    gambar.forEach((file) => {
      formData.append("gambar", file);
    });

    // Menyertakan gambar yang ada
    existingImages.forEach((img) => {
      formData.append("existingImages", img);
    });

    try {
      await Api.put(`/journey/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Journey updated successfully!");
      setTimeout(() => {
        navigate("/admin/exjourney/index");
      }, 2000);
    } catch (error) {
      setError("Error updating journey: " + error.message);
      toast.error("Error updating journey: " + error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
            Edit Journey
          </h2>
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="judul"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Judul
              </label>
              <input
                type="text"
                id="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="tanggal"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Tanggal
              </label>
              <input
                type="date"
                id="tanggal"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="deskripsi"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
                rows="4"
                required
              />
            </div>
            <div>
              <label
                htmlFor="gambar"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Gambar
              </label>
              <input
                type="file"
                id="gambar"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-gray-900 file:border-none file:bg-gray-50 file:py-2 file:px-4 file:rounded-md file:text-gray-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CD9D6D]"
              />
              <small className="block mt-1 text-gray-500 italic">
                * Maks 500KB per file
              </small>
              <div className="mt-2">
                {existingImages.length > 0 && (
                  <div>
                    <strong>Gambar Lama:</strong>
                    <div className="flex mt-2 space-x-2">
                      {existingImages.map((imageURL, index) => (
                        <div key={index} className="relative">
                          <img
                            src={getImageURL(imageURL)} // Menggunakan getImageURL
                            alt={`Existing Image ${index + 1}`}
                            className="w-24 h-16 object-cover rounded-md shadow-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
              onClick={() => navigate("/admin/exjourney/index")}
            >
              Batal
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default EditJourney;
