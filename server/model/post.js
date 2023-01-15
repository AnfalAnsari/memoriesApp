import mongoose from "mongoose";

const postSchema = mongoose.Schema({
   title: String,
   message: String,
   creator: String,
   name: String,
   tags: [String],
   selectedFile: String,
   likes: {
      type: [String],
      default: []
   },
   createdAt: {
      type: Date,
      default: Date.Now
   }

}, { timestamps: { createdAt: true, updatedAt: false } });

const Post = new mongoose.model("Post", postSchema);

export default Post;

