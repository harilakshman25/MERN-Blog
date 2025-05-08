import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const BlogList = ({ blogs = [], deleteBlog, startEditing, showActions = true, handleLikeBlog }) => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleLike = async (blogId) => {
    if (!user) {
      setError('Please log in to like a blog');
      return;
    }
    try {
      setError(null);
      console.log('Sending POST to:', `${process.env.REACT_APP_API_URL}/blogs/${blogId}/like`);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/blogs/${blogId}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      handleLikeBlog(blogId, response.data);
    } catch (error) {
      console.error('Error liking blog:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to like blog');
    }
  };

  console.log('BlogList Blogs:', blogs);
  console.log('Current User:', user);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {Array.isArray(blogs) && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="blog">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>By: {blog.author?.username || 'Unknown'}</p>
            <p>
              {blog.likes?.length || 0} Like{blog.likes?.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => handleLike(blog._id)}
              disabled={!user}
              title={!user ? 'Login to like' : ''}
            >
              {user && blog.likes?.some((like) => like._id.toString() === user.id)
                ? 'Unlike'
                : 'Like'}
            </button>
            {showActions && user && blog.author?._id.toString() === user.id && (
              <>
                <button onClick={() => startEditing(blog)}>Edit</button>
                <button onClick={() => deleteBlog(blog._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default BlogList;