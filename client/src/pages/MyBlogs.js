import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';
import { AuthContext } from '../context/AuthContext';

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/blogs/myblogs`
        );
        console.log('MyBlogs Response:', response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error Fetching Blogs:', error.response?.data || error.message);
        setError('Failed to load your blogs');
      }
    };
    if (user) fetchBlogs();
  }, [user]);

  const addBlog = async (blog) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/blogs`, blog);
      console.log('Add Blog Response:', response.data);
      setBlogs([...blogs, response.data]);
    } catch (error) {
      console.error('Error adding blog:', error.response?.data || error.message);
    }
  };

  const updateBlog = async (blog) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/blogs/${blog._id}`,
        blog
      );
      console.log('Update Blog Response:', response.data);
      setBlogs(blogs.map((b) => (b._id === blog._id ? response.data : b)));
      setEditingBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error.response?.data || error.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error.response?.data || error.message);
    }
  };

  const startEditing = (blog) => {
    setEditingBlog(blog);
  };

  return (
    <div>
      <h1>My Blogs</h1>
      {error && <p>{error}</p>}
      <BlogForm addBlog={addBlog} updateBlog={updateBlog} editingBlog={editingBlog} />
      <BlogList
        blogs={blogs}
        deleteBlog={deleteBlog}
        startEditing={startEditing}
        showActions={true}
      />
    </div>
  );
};

export default MyBlogs;