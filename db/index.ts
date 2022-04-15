import mongoose from "mongoose";
import User, { IUser } from "./models/user";


class DB {
    constructor(){}

    async createUser(u: IUser): Promise<IUser> {
        return await User.create(u);
    };

    async findUserForLoginCheck(key: string, u: any) {
        return await User.findOne({[key]: u.login_identifier_input, password: u.login_password_input})
    }

    async findUserForUniquenessCheck(u: any) {
        const key = Object.keys(u)[0];
        const findKey = key === "create_user_email_input" ? "email" : "userHandle";
    
        return await User.findOne({ [findKey]: u[key] });
    };

    async connectToDb(db: string) {
        console.log(`SUCCESSFUL DB CONNECTION via: ${db}`);
        return await mongoose.connect(db);
    };
}

const db = new DB();
export default db;