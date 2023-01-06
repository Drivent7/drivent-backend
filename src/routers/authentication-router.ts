import { singInPost, singInWithGitHub } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), singInPost);
authenticationRouter.post("/sign-in/github", /* validateBody(signInSchema), */ singInWithGitHub);

export { authenticationRouter };
