import mongoose from "mongoose";
import PostMessage from "../models/postMessage.model.js";

export const getPosts = async (req, res) => {
  try {
    let postMessages = await PostMessage.find();

    // console.log(postMessages);
    // if (!postMessages) {
    //   return res.status(404).json({ message: "No Posts found" });
    // } else {
    res.status(200).json(postMessages);
    // }
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

//----------------Create Post LOgic------------------

export const createPost = async (req, res) => {
  const post = req.body;

  console.log(post);
  const newPost = await PostMessage(post);
  try {
    await newPost.save();

    res.status(200).json({ message: "Post Added Successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//------------------Update Post Logic------------------
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;
  console.log(_id);
  console.log(post);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No Post is found with that id" });

  const updatePost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatePost);
};
