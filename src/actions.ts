"use server";

import { PrismaClient } from "@prisma/client";

import { User } from "@prisma/client";

const prisma = new PrismaClient();

type FormState = {
  message: string;
  type: string;
};

// Resgatar usuário por email
export async function getUserByEmail(
  email: string | null
): Promise<User | null> {
  if (!email) return null;

  const user = await prisma.user.findFirst({
    where: { email: email },
  });

  return user;
}

export async function updateUserProfile(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  return { message: "Perfil atualizado com sucesso!", type: "success" };
}
