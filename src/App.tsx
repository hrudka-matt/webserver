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
    <div className="container">
      <h1>Books</h1>
      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p>{book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
