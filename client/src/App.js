import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyBlogs from './pages/MyBlogs';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/myblogs"
          element={user ? <MyBlogs /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/myblogs" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/myblogs" /> : <RegisterPage />}
        />
      </Routes>
    </div>
  );
};

export default App;