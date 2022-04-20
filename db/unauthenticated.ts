import mongoose from "mongoose";
import User, { IUser } from "./models/user";


class UnauthenticatedSessionDB {
    constructor(){}

    createUser(u: IUser): Promise<IUser> {
        return User.create(u);
    };

    findUserForLoginCheck(u: any): mongoose.Query<any, typeof User> {
        return User.find().or([{email: u.login_identifier_input}, {userHandle: u.login_identifier_input}]);
    };

    findUserForUniquenessCheck(u: any) {
        const key = Object.keys(u)[0];
        const findKey = key === "create_user_email_input" ? "email" : "userHandle";
    
        return User.findOne({ [findKey]: u[key] });
    };

    connectToDb(db: string) {
        console.log(`SUCCESSFUL DB CONNECTION via: ${db}`);
        return mongoose.connect(db);
    };
}

const unauthenticatedSessionDB = new UnauthenticatedSessionDB();
export default unauthenticatedSessionDB;