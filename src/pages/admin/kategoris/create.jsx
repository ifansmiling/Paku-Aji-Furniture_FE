import AdminLayout from '../../../layouts/Adminlayout';
import React, { useState } from 'react';
import Api from '../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('namaKategori', name); // Sesuaikan dengan nama field di backend
    formData.append('gambar', image);

    try {
      await Api.post('/kategori', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Kategori berhasil ditambahkan');
      setTimeout(() => {
        window.location.href = '/admin/kategoris/index';
      }, 2000); // Delay 2 detik sebelum mengarahkan ulang
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Terjadi kesalahan saat menambahkan kategori');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tambah Kategori Baru</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full md:w-1/2 mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama Kategori
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nama Kategori"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Gambar Kategori
            </label>
            <input
              id="image"
              type="file"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Tambah Kategori
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              onClick={() => window.location.href = '/admin/kategoris/index'}
            >
              Batal
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </AdminLayout>
  );
};

export default CreateCategory;
