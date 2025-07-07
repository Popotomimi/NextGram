"use client";

import Image from "next/image";
import { Post as PostType } from "types/Post";
import LikeButton from "./Post/LikeButton";
import { FiMessageSquare } from "react-icons/fi";
import CommentModal from "./Post/CommentModal";
import { useState } from "react";

interface PostProps {
  post: PostType;
  currentUserId?: string;
}

const Post: React.FC<PostProps> = ({ post, currentUserId }) => {
  let isLiked = false;

  if (post.likes) {
    isLiked = post.likes.some((like) => like.userId === currentUserId);
  }

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  return (
    <div className="w-fit mx-auto mb-6 p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-lg text-white transition-all duration-300">
      <Image
        src={post.imageUrl}
        alt={post.caption || "Imagem sem legenda"}
        className="w-[670px] h-[400px] object-cover mb-4 rounded"
        width={670}
        height={400}
      />
      {post.caption && (
        <p className="mb-4 text-sm font-medium text-gray-300">{post.caption}</p>
      )}
      <div className="flex items-center mb-2">
        {post.user.image && (
          <Image
            src={post.user.image}
            alt={post.user.name || "Usuário sem imagem"}
            className="w-10 h-10 object-cover rounded-full mr-3"
            width={40}
            height={40}
          />
        )}
        <p className="text-sm font-medium">{post.user.name}</p>
      </div>
      <div className="flex items-center mt-4">
        <LikeButton
          postId={post.id}
          initialLikesCount={post.likes?.length ? post.likes.length : 0}
          isLiked={isLiked}
          currentUserId={currentUserId}
        />
        <button
          className="ml-4 flex items-center"
          onClick={() => setIsCommentModalOpen(true)}>
          <FiMessageSquare className="w-6 h-6 text-gray-500" />
          <span className="ml-2">
            {post.comments ? post.comments.length : 0}
          </span>
        </button>
      </div>
      <CommentModal
        post={post}
        currentUserId={currentUserId}
        isOpen={isCommentModalOpen}
        onRequestClose={() => setIsCommentModalOpen(false)}
      />
    </div>
  );
};

export default Post;
