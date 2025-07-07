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
      className="w-full max-w-2xl mx-4 sm:mx-auto my-10 bg-gray-900 text-white border border-gray-700 rounded-xl shadow-2xl p-6 outline-none transition-all duration-300 animate-[fadeIn_0.4s_ease-out_forwards]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-[fadeIn_0.3s_ease-out_forwards]">
      <div>
        <div className="w-full aspect-[3/2] relative mb-6 rounded-lg overflow-hidden shadow-sm">
          <Image
            src={post.imageUrl}
            alt={post.caption || "Imagem do post"}
            fill
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        {post.caption && (
          <p className="text-base sm:text-lg font-medium text-gray-200 mb-4 leading-relaxed">
            {post.caption}
          </p>
        )}
        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors duration-200">
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}
