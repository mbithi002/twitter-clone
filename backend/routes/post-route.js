import express from "express";
import {
    commentOnPost,
    createPost,
    deletePost,
    getFollowingPosts,
    getLikedPosts,
    getPosts,
    getUserPosts,
    likeUnlikePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/getPosts", protectRoute, getPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);

export default router;
