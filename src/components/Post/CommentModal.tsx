"use client";

import { useState } from "react";

import Modal from "react-modal";

import { Post as PostType } from "types/Post";

import FlashMessage from "../FlashMessage";
import Button from "../Button";
import { addComment } from "@/actions";
import { GrClose } from "react-icons/gr";
import Image from "next/image";

interface CommentModalProps {
  post: PostType;
  currentUserId?: string;
  isOpen: boolean;
  onRequestClose: () => void;
  comment?: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  post,
  currentUserId,
  isOpen,
  onRequestClose,
}) => {
  const [content, setContent] = useState("");

  const [flashMessage, setFlashMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleAddComment = async () => {
    if (!currentUserId) {
      window.location.href = "/";
      return;
    }

    if (!content.trim()) {
      setFlashMessage({
        message: "O comentário não pode estar vazio.",
        type: "error",
      });

      return;
    }

    await addComment(post.id, currentUserId, content);

    setFlashMessage({
      message: "Comentário adicionado com sucesso.",
      type: "success",
    });

    setContent("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comentários"
      ariaHideApp={false}
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 transition-opacity duration-300"
      className="w-[90%] sm:w-[500px] md:w-[640px] lg:w-[704px] mt-20 mx-auto bg-gray-900 text-white border border-gray-700 rounded-xl shadow-xl p-6 transition-all duration-300 ease-out opacity-0 animate-[fadeIn_0.4s_ease-out_forwards]">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Comentários</h2>
          <button
            onClick={onRequestClose}
            className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition-colors">
            <GrClose />
          </button>
        </div>
        {flashMessage && (
          <FlashMessage
            message={flashMessage?.message}
            type={flashMessage.type}
          />
        )}
        <div className="mb-6 flex flex-col gap-4">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-start gap-3">
                {comment.user?.image && (
                  <Image
                    src={comment.user.image}
                    alt={`Imagem do usuário ${comment.user.name}`}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-full mr-3"
                  />
                )}
                <p className="text-sm leading-relaxed">
                  <strong>{comment.user?.name}</strong>: {comment.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 italic">
              Nenhum comentário ainda
            </p>
          )}
        </div>
        {currentUserId && (
          <div className="flex flex-col gap-4 mt-4">
            <textarea
              className="w-full h-28 p-3 rounded-md bg-gray-800 text-white border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Adicione um comentário"></textarea>
            <div className="flex justify-end">
              <Button
                type="button"
                text="Comentar"
                onClick={handleAddComment}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CommentModal;
