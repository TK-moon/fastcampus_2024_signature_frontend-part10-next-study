import { ErrorResult } from "@/api/types";
import { NextApiRequest, NextApiResponse } from "next";

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface SuccessResult {
  is_success: boolean;
}

type SignupResult = SuccessResult | ErrorResult;

interface SignupRequest extends NextApiRequest {
  body: Partial<SignupInput>;
}

// interface SignupResponse extends NextApiResponse<SignupResult> {}
type SignupResponse = NextApiResponse<SignupResult>;

export type { SignupRequest, SignupResponse };
export type { SignupInput, SignupResult };
