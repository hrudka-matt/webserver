import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      navigate("/books");
    } else {
      alert("Login failed");
    }
  };

   return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px] h-[400px] flex flex-col justify-center">
        <div className="text-center mb-6">
          <img
            src="https://cdn.prod.website-files.com/67dfbed9526c7e965f07671f/67dfc9812bd4fd1598a7268c_Propela%20logo%20white.svg"
            alt="Company Logo"
            className="mx-auto h-12 mb-2"
          />
          <h2 className="text-2xl font-semibold">Login</h2>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={login}
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;