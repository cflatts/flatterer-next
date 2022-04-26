import { NextApiRequest, NextApiResponse } from "next";
import authenticatedSessionDB from "../../db/authenticated";

type ReturnMessage = {
    message: string;
    error?: Error;
    data?: any;
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReturnMessage>
) {
    authenticatedSessionDB.connectToDb(`${process.env.DB_HOST}/${process.env.DB_NAME}`).catch(err => res.status(500).json({ message: "Failed to connect to database", error: err }));
    console.log("PROFILE API");
}