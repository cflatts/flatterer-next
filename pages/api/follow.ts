import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    db.connectToDb(`${process.env.DB_HOST}/${process.env.DB_NAME}`).catch(err => res.status(500).json({ message: "Failed to connect to database", error: err }));

    return db.followUser(req.body.follower, req.body.followee)
        .then(resp => {
            res.status(res.statusCode).json({
                message: "The follow user status.",
                data: {
                    success: resp
                }
            });
        })
        .catch(err => {
            res.status(res.statusCode).json({
                message: "The server handler failed",
                error: err
            })
        })
}