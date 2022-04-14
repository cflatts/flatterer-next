import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDb, findUserForUniquenessCheck } from "../../../db/index";

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
    let uniqueness: boolean = true;
    return findUserForUniquenessCheck(req.body)
        .then((resp) => {
            if(resp) {
                uniqueness = false;
            }
            res.status(200).json({ message: "User uniqueness validation.", data: { unique: uniqueness } });
        })
        .catch(err => res.status(400).json({ message: "The request to the database failed.", error: err }))
}