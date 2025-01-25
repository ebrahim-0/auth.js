import { auth } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export const middleware = async (req: NextApiRequest, res: NextApiResponse) => {
  await auth(req, res);
};
