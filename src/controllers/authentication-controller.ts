import authenticationService, { SignInParams, SignInParamsGitHub } from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { unauthorizedError } from "@/errors";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function singInWithGitHub(req: Request, res: Response) {
  try {
    const { authorization } = req.headers;
    const { email } = req.headers as Pick<SignInParamsGitHub, "email">;
    const tokens = authorization?.replace("Bearer ", "") as string;
    const result = await authenticationService.signInWithGitHub({ email, tokens });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
