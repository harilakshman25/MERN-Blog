const Blog=require('../models/Blog');

//Get all Blogs (public)
exports.getBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find().populate('author','username');
        console.log('Blogs Sent:', blogs);
        res.json(blogs);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//Get User's Blogs
exports.getUserBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find({author:req.user._id}).populate(
            'author',
            'username'
        );
        console.log('Blogs Sent:', blogs);
        res.json(blogs);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

// Create a blog
exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({ title, content, author: req.user._id });
    await blog.save();
    const populatedBlog = await Blog.findById(blog._id).populate('author', 'username');
    res.status(201).json(populatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await Blog.findOne({ _id: id, author: req.user._id });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or not authorized' });
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    const populatedBlog = await Blog.findById(blog._id).populate('author', 'username');
    res.json(populatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete a Blog
exports.deleteBlog=async(req,res)=>{
    const {id}=req.params;
    try{
       const blog=await Blog.findOneAndDelete({
         _id:id,
         author:req.user._id,
       });
       if (!blog) {
        return res.status(404).json({ message: 'Blog not found or not authorized' });
      }
      res.json({ message: 'Blog deleted' });
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

