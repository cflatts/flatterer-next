import type { NextApiRequest, NextApiResponse } from "next";
import { combineLatest, map } from "rxjs";
import db from "../../db";

type ReturnMessage = {
    message: string;
    error?: string;
    data?: any;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReturnMessage>
) {
    db.connectToDb(`${process.env.DB_HOST}/${process.env.DB_NAME}`).catch(err => res.status(500).json({ message: "Failed to connect to database", error: err }));

    return combineLatest([
        db.findUserForLoginCheck("email", req.body),
        db.findUserForLoginCheck("userHandle", req.body)
    ])
    .pipe(map(resp => {
        const user = resp.filter(check => check);
        return !!user.length;
    }))
    .subscribe({
        next: (resp) => {
            res.status(res.statusCode).json({
                message: "The login validation status.",
                data: {
                    valid: resp
                }
            });
        },
        error: (err) => {
            res.status(res.statusCode).json({
                message: "The server handler failed",
                error: err
            })
        }
    });
}