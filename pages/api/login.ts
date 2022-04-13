import type { NextApiRequest, NextApiResponse } from "next";

type LoginData = {
    name: string;
    password: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<LoginData>
) {
    res.status(200);
}