import React, { useState, useEffect } from 'react';

const BlogForm=({addBlog,updateBlog,editingBlog})=>{
     const [title,setTitle]=useState("");
     const [content,setContent]=useState("");

     useEffect(()=>{
        if(editingBlog){
            setTitle(editingBlog.title);
            setContent(editingBlog.content);
        }
        else {
            setTitle("");
            setContent("");
        }
     },[editingBlog]);

     const handleSubmit=(e)=>{
        e.preventDefault();
        if(! title || ! content) return;
        if(editingBlog) {
            updateBlog({...editingBlog, title,content});
        }else{
            addBlog({title,content});
        }
     };

     return(
        <form onSubmit={handleSubmit}>
            <h2>BlogForm</h2>
            <div>
                <label>Title:</label>
                <input 
                  type='text'
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <button type='submit'>{editingBlog?'Update':'Add'}</button>
        </form>
     );
};

export default BlogForm;