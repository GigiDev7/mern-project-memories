import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  name: {
    type: String,
  },
  creator: {
    type: String,
  },
  tags: [String],
  selectedFile: {
    type: Object,
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
