import React, { useEffect, useState } from "react";
import Api, { getImageURL } from "../../../services/api";
import AdminLayout from "../../../layouts/Adminlayout";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [journeys, setJourneys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journeyToDelete, setJourneyToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchJourneys = async () => {
    try {
      const response = await Api.get("/journey");
      setJourneys(response.data);
    } catch (error) {
      console.error("Error fetching journeys:", error);
      toast.error("Error fetching journeys: " + error.message);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/admin/journey/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    setJourneyToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (journeyToDelete) {
      try {
        await Api.delete(`/journey/${journeyToDelete}`);
        toast.success("Journey deleted successfully!");
        fetchJourneys(); // Refresh the list immediately
      } catch (error) {
        console.error("Error deleting journey:", error);
        toast.error("Error deleting journey: " + error.message);
      }
      setIsModalOpen(false);
      setJourneyToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setJourneyToDelete(null);
  };

  const handleAddClick = () => {
    navigate("/admin/exjourney/create");
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Journey List</h2>
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
          >
            <span>Tambah Baru</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="border-b border-gray-300 text-center">
                <th className="py-3 px-4 text-gray-600">No</th>
                <th className="py-3 px-4 text-gray-600">Judul</th>
                <th className="py-3 px-4 text-gray-600">Tanggal</th>
                <th className="py-3 px-4 text-gray-600">Gambar</th>
                <th className="py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {journeys.length > 0 ? (
                journeys.map((journey, index) => (
                  <tr
                    key={journey.id}
                    className="border-b border-gray-200 text-center"
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-700">{journey.judul}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(journey.tanggal).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center space-x-3 overflow-x-auto">
                        {journey.gambar.length > 0
                          ? journey.gambar.map((imageURL, i) => (
                              <img
                                key={i}
                                src={getImageURL(imageURL)}
                                alt={`Journey ${journey.judul} Image ${i + 1}`}
                                className="w-24 h-16 object-cover rounded-md shadow-sm"
                                onError={(e) =>
                                  (e.target.src = "/path/to/default-image.jpg")
                                }
                              />
                            ))
                          : "No image"}
                      </div>
                    </td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditClick(journey.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(journey.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-3 px-4 text-center text-gray-500"
                  >
                    No journeys available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-lg font-bold">Konfirmasi Penghapusan</h3>
              <p className="mt-2">
                Apakah Anda yakin ingin menghapus Journey ini?
              </p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={cancelDelete}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Index;
