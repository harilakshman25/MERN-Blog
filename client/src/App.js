import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import MyBlogs from './pages/MyBlogs';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MERN Blog</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/myblogs">My Blogs</Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;