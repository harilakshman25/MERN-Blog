import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const BlogList = ({ blogs = [], deleteBlog, startEditing, showActions = true }) => {
  const { user } = useContext(AuthContext);

  console.log('BlogList Blogs:', blogs);

  return (
    <div>
      {Array.isArray(blogs) && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="blog">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>By: {blog.author?.username || 'Unknown'}</p>
            {showActions && user && blog.author?._id === user.id && (
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