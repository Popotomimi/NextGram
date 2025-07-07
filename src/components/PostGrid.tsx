"use client";

import { useState } from "react";
import Image from "next/image";
import PostModal from "@/components/PostModal";
import Button from "@/components/Button";
import { Post } from "../../types/Post";
import { deletePost } from "@/actions";

interface PostGridProps {
  posts: Post[];
  userId: string;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, userId }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => openModal(post)}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all duration-300">
            <div className="w-full aspect-[3/2] relative mb-4 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={post.imageUrl}
                alt={post.caption || "Imagem do post"}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {post.caption && (
              <p className="mb-2 text-sm font-medium text-white">
                {post.caption}
              </p>
            )}

            <form action={deletePost}>
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="postId" value={post.id} />
              <div className="flex justify-end mt-2">
                <Button
                  text="Excluir"
                  type="submit"
                  danger
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </form>
          </div>
        ))}
      </div>

      <PostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        post={selectedPost}
      />
    </>
  );
};

export default PostGrid;
