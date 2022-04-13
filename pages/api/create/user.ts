import type { NextApiRequest, NextApiResponse } from "next";
import { closeDbConnection, connectToDb, createUser } from "../../../db/index";

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
    
    return createUser(req.body)
        .then((resp) => {
            const parsedData = {
                userHandle: resp.userHandle,
                nickname: resp.nickname,
                email: resp.email,  
            }
            res.status(200).json({ message: "User creation successful", data: parsedData });
        })
        .catch(err => res.status(400).json({ message: "The request to the database failed", error: err }))
}