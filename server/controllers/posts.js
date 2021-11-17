import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  const updatedPost = await PostMessage.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(201).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  await PostMessage.findByIdAndRemove(id);
  res.status(200).json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(400).json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  try {
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
