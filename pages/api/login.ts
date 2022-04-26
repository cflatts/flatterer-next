import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import unauthenticatedSessionDB from "../../db/unauthenticated";
import { sessionConfig } from "../../lib/sessionConfig";

type ReturnMessage = {
    message: string;
    error?: Error;
    data?: any;
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReturnMessage>
) {
    unauthenticatedSessionDB.connectToDb(`${process.env.DB_HOST}/${process.env.DB_NAME}`).catch(err => res.status(500).json({ message: "Failed to connect to database", error: err }));

    unauthenticatedSessionDB.findUserForLoginCheck(req.body)
        .then(resp => {
            if(resp.length) {
                const user = resp[0];
                
                user.comparePasswords(req.body.login_password_input, async function(err: Error | undefined, isMatch: boolean) {
                    if(err) {
                        res.status(res.statusCode).json({
                            message: "The compare password function failed.",
                            error: err
                        });
                    };
                    
                    if(isMatch) {
                        req.session.user = {
                            id: user,
                            admin: true,
                        }
                        await req.session.save();
                    }
                    res.status(res.statusCode).json({
                        message: "The login validation status.",
                        data: {
                            valid: isMatch
                        }
                    });
                    // res.redirect(res.statusCode, "/profile");
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

export default withIronSessionApiRoute(handler, sessionConfig);