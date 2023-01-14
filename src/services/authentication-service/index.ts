import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "./errors";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function signInWithGitHub(params: SignInParamsGitHub): Promise<SignInResult> {
  const { email, tokens } = params;
  const user = await getUserOrFailGitHub(email);
  let data;
  let token;
  console.log(user);
  if (user.id === null) {
    data = await createUserOrFailGithub(email, tokens);
  }
  console.log("NAO TA APARECENDO NADA AQUI.");
  const userId1 = user.id;
  const userId2 = data.id;

  if (!userId1 && userId2) {
    token = jwt.sign({ userId2 }, process.env.JWT_SECRET);
  }
  if (userId1) {
    token = jwt.sign({ userId1 }, process.env.JWT_SECRET);
  }

  const session = await sessionRepository.create({
    token: token,
    userId: user.id,
  });

  return {
    user,
    token,
  };
}

async function createUserOrFailGithub(email: string, tokens: string): Promise<GetUserOrFailResult> {
  const data = await userRepository.create({
    email: email,
    password: tokens,
  });
  return data;
}

async function getUserOrFailGitHub(email: string): Promise<GetUserOrFailResult> {
  const data = await userRepository.findByEmailGitHub(email);

  return data;
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });

  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, "email" | "password">;

export type SignInParamsGitHub = {
  email: string;
  tokens: string;
};

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
  signInWithGitHub,
};

export default authenticationService;
export * from "./errors";
