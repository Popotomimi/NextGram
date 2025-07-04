"use client";

import { useActionState } from "react";

import FlashMessage from "./FlashMessage";
import { createPost } from "@/actions";
import ImagePreview from "./ImagePreview";
import Label from "./Label";
import Button from "./Button";

const CreatePostForm: React.FC = () => {
  const [formState, formAction] = useActionState(createPost, {
    message: "",
    type: "success",
  });

  return (
    <div>
      {formState.message && (
        <FlashMessage message={formState.message} type={formState.type} />
      )}
      <form
        action={formAction}
        className="flex flex-col gap-6 transition-all duration-300">
        <ImagePreview />

        <div className="flex flex-col gap-2">
          <Label htmlFor="caption" text="Conteúdo do post" />
          <textarea
            id="caption"
            name="caption"
            placeholder="Digite algo..."
            className="h-40 p-3 text-white border border-white rounded-md text-sm placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" text="Criar Post" />
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
