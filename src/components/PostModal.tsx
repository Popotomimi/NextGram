"use client";

import Modal from "react-modal";
import Image from "next/image";

import { Post } from "../../types/Post";
interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  currentUserId?: string;
}

export default function PostModal({ isOpen, onClose, post }: PostModalProps) {
  if (!post) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Visualizar Post"
      className="w-full max-w-2xl mx-4 sm:mx-auto my-10 bg-white p-4 sm:p-6 rounded shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div>
        <div className="w-full aspect-[3/2] relative mb-4 rounded overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.caption || "Imagem do post"}
            fill
            className="object-cover"
          />
        </div>
        {post.caption && <p className="text-lg font-medium">{post.caption}</p>}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}
