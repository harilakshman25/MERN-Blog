import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from '../components/BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
        console.log('Home Blogs Response:', response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error Fetching Blogs:', error.response?.data || error.message);
        setError('Failed to load blogs');
      }
    };
    fetchBlogs();
  }, []);

  const handleLikeBlog = (blogId, updatedBlog) => {
    setBlogs(
      blogs.map((blog) =>
        blog._id === blogId ? updatedBlog : blog
      )
    );
  };

  return (
    <div>
      <h1>All Blogs</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BlogList blogs={blogs} showActions={false} handleLikeBlog={handleLikeBlog} />
    </div>
  );
};

export default Home;