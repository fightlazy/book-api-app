import { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [newBook, setNewBook] = useState({
    name: '',
    year: '',
    author: '',
    summary: '',
    publisher: '',
    pageCount: '',
    readPage: ''
  });

  const [editingBook, setEditingBook] = useState(null);

  // Ambil data buku dari API
  useEffect(() => {
    axios.get('http://localhost:9000/books') // Pastikan URL sesuai dengan API Anda
      .then(response => {
        setData(response.data.books); // Menyimpan data buku yang diterima dari API
      })
      .catch(error => {
        console.error('Ada kesalahan saat mengambil data:', error);
      });
  }, []); // Efek ini hanya dijalankan sekali saat komponen pertama kali dirender

  // Fungsi untuk menangani perubahan pada form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani perubahan saat mengedit buku
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk mengirimkan data buku baru ke API
  const handleAddBook = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9000/books', newBook)
      .then(response => {
        console.log('Buku berhasil ditambahkan', response.data);
        // Menambahkan buku baru ke state setelah berhasil ditambahkan
        setData(prevData => [...prevData, {
          id: response.data.bookId,
          ...newBook
        }]);
        // Reset form
        setNewBook({
          name: '',
          year: '',
          author: '',
          summary: '',
          publisher: '',
          pageCount: '',
          readPage: ''
        });
      })
      .catch(error => {
        console.error('Ada kesalahan saat menambahkan buku:', error);
      });
  };

  // Fungsi untuk mengedit buku
  const handleEditBook = (e) => {
    e.preventDefault();

    if (editingBook) {
      axios.put(`http://localhost:9000/books/${editingBook.id}`, editingBook)
        .then(response => {
          console.log('Buku berhasil diperbarui', response.data);
          setData(prevData => prevData.map(book => 
            book.id === editingBook.id ? editingBook : book
          ));
          setEditingBook(null); // Reset form edit
        })
        .catch(error => {
          console.error('Ada kesalahan saat memperbarui buku:', error);
        });
    }
  };

  // Fungsi untuk menghapus buku
  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:9000/books/${id}`)
      .then(response => {
        console.log('Buku berhasil dihapus', response.data);
        setData(prevData => prevData.filter(book => book.id !== id));
      })
      .catch(error => {
        console.error('Ada kesalahan saat menghapus buku:', error);
      });
  };

  return (
    <div>
      <h2>Data Buku:</h2>
      <ul>
        {data.map((book) => (
          <li key={book.id}>
            <strong>{book.name}</strong> by {book.author} - {book.publisher}
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Tambah Buku Baru</h3>
      <form onSubmit={handleAddBook}>
        <label>
          Nama Buku:
          <input
            type="text"
            name="name"
            value={newBook.name}
            onChange={handleInputChange}
            required
          />
        </label><br />
        
        <label>
          Tahun:
          <input
            type="number"
            name="year"
            value={newBook.year}
            onChange={handleInputChange}
            required
          />
        </label><br />

        <label>
          Penulis:
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={handleInputChange}
            required
          />
        </label><br />

        <label>
          Ringkasan:
          <input
            type="text"
            name="summary"
            value={newBook.summary}
            onChange={handleInputChange}
          />
        </label><br />

        <label>
          Penerbit:
          <input
            type="text"
            name="publisher"
            value={newBook.publisher}
            onChange={handleInputChange}
          />
        </label><br />

        <label>
          Total Halaman:
          <input
            type="number"
            name="pageCount"
            value={newBook.pageCount}
            onChange={handleInputChange}
            required
          />
        </label><br />

        <label>
          Halaman yang Dibaca:
          <input
            type="number"
            name="readPage"
            value={newBook.readPage}
            onChange={handleInputChange}
            required
          />
        </label><br />

        <button type="submit">Tambah Buku</button>
      </form>

      {editingBook && (
        <div>
          <h3>Edit Buku</h3>
          <form onSubmit={handleEditBook}>
            <label>
              Nama Buku:
              <input
                type="text"
                name="name"
                value={editingBook.name}
                onChange={handleEditChange}
                required
              />
            </label><br />
            
            <label>
              Tahun:
              <input
                type="number"
                name="year"
                value={editingBook.year}
                onChange={handleEditChange}
                required
              />
            </label><br />

            <label>
              Penulis:
              <input
                type="text"
                name="author"
                value={editingBook.author}
                onChange={handleEditChange}
                required
              />
            </label><br />

            <label>
              Ringkasan:
              <input
                type="text"
                name="summary"
                value={editingBook.summary}
                onChange={handleEditChange}
              />
            </label><br />

            <label>
              Penerbit:
              <input
                type="text"
                name="publisher"
                value={editingBook.publisher}
                onChange={handleEditChange}
              />
            </label><br />

            <label>
              Total Halaman:
              <input
                type="number"
                name="pageCount"
                value={editingBook.pageCount}
                onChange={handleEditChange}
                required
              />
            </label><br />

            <label>
              Halaman yang Dibaca:
              <input
                type="number"
                name="readPage"
                value={editingBook.readPage}
                onChange={handleEditChange}
                required
              />
            </label><br />

            <button type="submit">Perbarui Buku</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
