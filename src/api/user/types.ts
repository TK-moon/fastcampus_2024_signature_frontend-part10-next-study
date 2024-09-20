/**
 * @DIR /src/api/user/types.ts
 */

import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResult } from "../types";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UserInput {}

interface SuccessResult {
  list: User[];
}

type UserResult = SuccessResult | ErrorResult;

interface UserRequest extends NextApiRequest {
  body: Partial<UserInput>;
}

type UserResponse = NextApiResponse<UserResult>;

export type { UserRequest, UserResponse };
export type { UserInput, UserResult, SuccessResult as UserSuccessResult };
