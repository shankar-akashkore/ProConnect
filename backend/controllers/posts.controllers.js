import User from '../models/user.model.js';
import Post from '../models/posts.models.js';
import Profile from '../models/profile.model.js';
import { commentPost } from './user.controller.js';
import Comment from '../models/comments.model.js';





export const activecheck = async (req,res) => {
    return res.status(200).json({message: "HARHARI"})
}

export const createPost = async (req, res) => {

    const { token } = req.body;

    try { 

        const user = await User.findOne({ token: token });

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = new Post ({
            userId: user._id,
            body: req.body.body,
            media: req.file != undefined ? req.file.filename : "",
            fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : ""
        })

        await post.save();

        return res.status(200).json({ message: "Post created"})

    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getAllPosts = async(req, res) => {
    try {
        const { token } = req.query;
        const user = token ? await User.findOne({ token }).select("_id") : null;
        const posts = await Post.find().populate('userId' ,'name username email profilePicture');
        const postsWithCommentCounts = await Promise.all(
            posts.map(async (post) => {
                const commentCount = await Comment.countDocuments({ postId: post._id });
                const likedBy = Array.isArray(post.likedBy) ? post.likedBy : [];
                const isLiked = user
                    ? likedBy.some((likedUserId) => likedUserId.toString() === user._id.toString())
                    : false;

                return {
                    ...post.toObject(),
                    commentCount,
                    isLiked,
                };
            })
        );

        return res.json({ posts: postsWithCommentCounts })

    } catch(error) {
        return res.status(500).json({message: error.message })
    }
}



export const deletePost = async (req,res) => {

    const { token, post_id } = req.body;
    
    try{

        const user = await User.findOne({ token: token}).select("_id");

        if(!user) {
            return res.status(404).json({ message: "User not find" })
        }

        const post = await Post.findOne({ _id: post_id });

        if(!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        if(post.userId.toString() !== user._id.toString()) {
            return res.status(401).json({ message: "unauthorized" })
        }

        await Post.deleteOne({ _id: post_id });

        return res.json({ message: "Post Deleted" });

    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}


export const get_comments_by_post = async (req, res) => {

    const { post_id } = req.query;

    try {

        const post = await Post.findOne({ _id: post_id });

        if(!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        const comments = await Comment
        .find({ postId: post_id })
        .populate("userId", "username name profilePicture");

        return res.json(comments.reverse());

    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}


export const delete_comment_of_user = async (req, res) => {

    const { token , comment_id } = req.body;

    try {

        const user = await User.findOne({ token: token }).select("_id");

        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const comment = await Comment.findOne({ "_id": comment_id })

        if(!comment) {
            return res.status(404).json({ message: "Comment not found" })
        }

        if(comment.userId.toString() !== user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        await Comment.deleteOne({ "_id": comment_id })

        return res.json({ message: "Comment Deleted" })


    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}


export const increment_likes = async (req, res) => {

    const { token, post_id } = req.body;

    try{
        const user = await User.findOne({ token }).select("_id");

        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const post = await Post.findOne({ _id: post_id });

        if(!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        if(!Array.isArray(post.likedBy)) {
            post.likedBy = [];
        }

        const alreadyLiked = post.likedBy.some(
            (likedUserId) => likedUserId.toString() === user._id.toString()
        );

        if(alreadyLiked) {
            post.likedBy = post.likedBy.filter(
                (likedUserId) => likedUserId.toString() !== user._id.toString()
            );
            post.likes = Math.max(0, post.likes - 1);
        } else {
            post.likedBy.push(user._id);
            post.likes = post.likes + 1;
        }

        await post.save();

        return res.json({
            message: alreadyLiked ? "Like removed" : "Post liked",
            likes: post.likes,
            isLiked: !alreadyLiked,
        })

    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}
