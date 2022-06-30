import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  // deletePost,
  // likePost,
} from "../controller/posts.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getposts", getPosts);
router.post("/createPost", createPost);
router.put("/:id", updatePost);
// router.delete("/:id", auth, deletePost);
// router.patch("/:id/likePost", auth, likePost);

export default router;
