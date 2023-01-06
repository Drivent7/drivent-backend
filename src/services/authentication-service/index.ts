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
  const { email, token } = params;

  let user = await getUserOrFailGitHub(email);

  if (!user) {
    user = await userRepository.create({ email });
  }

  const BOLINHA = await sessionRepository.create({
    token,
    userId: user.id,
  });

  return {
    user,
    token,
  };
}

async function getUserOrFailGitHub(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmailGitHub(email);

  return user;
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
  email: "email";
  token: "token";
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
