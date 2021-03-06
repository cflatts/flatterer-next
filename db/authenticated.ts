import mongoose from "mongoose";
import User from "./models/user";


class AuthenticatedSessionDB {
    constructor(){}

    followUser(follower: string, followee: any) {
        return User.updateOne({ userHandle: followee.userHandle }, followee.followers.unshift(follower));
    }

    connectToDb(db: string) {
        console.log(`SECURE DB CONNECTION via: ${db}`);
        return mongoose.connect(db);
    };
}

const authenticatedSessionDB = new AuthenticatedSessionDB();
export default authenticatedSessionDB;