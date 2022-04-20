import { IronSessionOptions } from "iron-session";

export const sessionConfig: IronSessionOptions = {
    cookieName: "flatterer_login_cookie",
    password: process.env.TEST_PASSWORD as string,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

declare module "iron-session" {
    interface IronSessionData {
        user?: any;
    }
}