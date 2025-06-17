import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Book = {
  id: number;
  title: string;
  price: string;
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
      return;
    }

    fetch("http://127.0.0.1:8000/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setBooks(data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-white text-3xl font-bold text-center my-8">Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map(book => (
            <div
              key={book.id}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center"
            >
              <div className="w-32 h-48 bg-gray-700 rounded mb-4 animate-pulse" />
              <h2 className="text-xl font-semibold text-white mb-2">{book.title}</h2>
              <p className="text-gray-400">{book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
