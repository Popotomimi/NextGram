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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => openModal(post)}
            className="border rounded p-4 shadow-sm cursor-pointer hover:shadow-md transition">
            <div className="w-full aspect-[3/2] relative mb-4 rounded overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.caption || "Imagem do post"}
                fill
                className="object-cover"
              />
            </div>

            {post.caption && (
              <p className="mb-2 text-sm font-medium">{post.caption}</p>
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
