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
      <form className="flex flex-col gap-4" action={formAction}>
        <ImagePreview />
        <div>
          <Label htmlFor="caption" text="Conteúdo do post" />
          <textarea
            id="caption"
            name="caption"
            placeholder="Digite algo..."
            className="h-32 p-2 border border-zinc-300 rounded w-full text-sm placeholder:text-zinc-500 focus:ring-0 focus:outline-none"></textarea>
        </div>
        <div className="flex justify-end">
          <Button type="submit" text="Criar Post" />
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
