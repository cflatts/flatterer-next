import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDb, findUserForLoginCheck } from "../../db";

type ReturnMessage = {
    message: string;
    error?: string;
    data?: any;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReturnMessage>
) {
    connectToDb(`${process.env.DB_HOST}/${process.env.DB_NAME}`).catch(err => res.status(500).json({ message: "Failed to connect to database", error: err }));

    return findUserForLoginCheck(req.body)
        .then(resp => {
            res.status(res.statusCode).json({
                message: "The login validation status.",
                data: {
                    valid: !!resp
                }
            });
        }).catch(err => {
            res.status(res.statusCode).json({
                message: "The server handler failed",
                error: err
            })
        })
}