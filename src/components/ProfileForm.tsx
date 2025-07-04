"use client";

import { User } from "types/User";
import { useActionState } from "react";

import { updateUserProfile } from "@/actions";
import Label from "./Label";
import Button from "./Button";
import ImagePreview from "./ImagePreview";
import FlashMessage from "./FlashMessage";

type ProfileFormProps = {
  user: User;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [formState, formAction] = useActionState(updateUserProfile, {
    message: "",
    type: "success",
  });

  return (
    <div className="text-white">
      {formState.message && (
        <FlashMessage message={formState.message} type={formState.type} />
      )}
      <form
        className="flex flex-col gap-6 bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300"
        action={formAction}>
        <input type="hidden" name="id" value={user.id} />
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" text="Nome" />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            defaultValue={user.name || ""}
            className="p-3 rounded-md w-full text-sm text-white border border-white placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
        <ImagePreview />
        <div className="flex justify-end">
          <Button type="submit" text="Salvar" />
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
