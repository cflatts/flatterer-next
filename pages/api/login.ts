import type { NextApiRequest, NextApiResponse } from "next";
import unauthenticatedSessionDB from "../../db/unauthenticated";

type ReturnMessage = {
    message: string;
    error?: Error;
    data?: any;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReturnMessage>
) {
    unauthenticatedSessionDB.connectToDb(`${process.env.DB_HOST}/${process.env.DB_NAME}`).catch(err => res.status(500).json({ message: "Failed to connect to database", error: err }));

    return unauthenticatedSessionDB.findUserForLoginCheck(req.body)
        .then(resp => {
            if(resp.length) {
                const user = resp[0];

                user.comparePasswords(req.body.login_password_input, function(err: Error | undefined, isMatch: boolean) {
                    if(err) {
                        res.status(res.statusCode).json({
                            message: "The compare password function failed.",
                            error: err
                        });
                    };
    
                    res.status(res.statusCode).json({
                        message: "The login validation status.",
                        data: {
                            valid: isMatch
                        }
                    });
                });
            } else {
                res.status(res.statusCode).json({
                    message: "The login validation status.",
                    data: {
                        valid: false,
                    }
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                message: "The server handler failed.",
                error: err
            });
        });
};