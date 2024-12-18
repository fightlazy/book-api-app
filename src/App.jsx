import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data buku dari API backend
  useEffect(() => {
    fetch('http://localhost:9000/books')  // API endpoint untuk mengambil buku
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data.books);  // Menyimpan data buku ke state
        setLoading(false);  // Mengatur loading menjadi false setelah data diterima
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);  // Set loading ke false jika ada error
      });
  }, []);

  return (
    <div className="App p-8">
      <h1 className="text-3xl font-bold text-center mb-8">List of Books</h1>
      
      {loading ? (
        <p>Loading...</p>  // Menampilkan loading saat data masih diambil
      ) : (
        <div>
          {books.length === 0 ? (
            <p className="text-center text-lg">No books found.</p>  // Menampilkan pesan jika tidak ada buku
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-6 py-4 border-b">Name</th>
                    <th className="px-6 py-4 border-b">Year</th>
                    <th className="px-6 py-4 border-b">Author</th>
                    <th className="px-6 py-4 border-b">Publisher</th>
                    <th className="px-6 py-4 border-b">Page Count</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{book.name}</td>
                      <td className="px-6 py-4">{book.year}</td>
                      <td className="px-6 py-4">{book.author}</td>
                      <td className="px-6 py-4">{book.publisher}</td>
                      <td className="px-6 py-4">{book.pageCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
