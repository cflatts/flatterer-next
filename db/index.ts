import mongoose from "mongoose";
import User, { IUser } from "./models/user";


/**
 * CREATE FUNCTIONS
 */
// async function createCompliment(comp: ICompliment): Promise<ICompliment> {
//     const compliment = new Compliment(comp);
//     return await compliment.save();
// }

// async function createFlatter(flat: IFlatter): Promise<IFlatter> {
//     const flatter = new Flatter(flat);
//     return await flatter.save();
// }

export async function createUser(u: IUser): Promise<IUser> {
    return await User.create(u);
}

/**
 * READ FUNCTIONS
 */

// async function findCompliment(comp: { _id: any; }) {
//     await Compliment.findById(comp._id, (err: any, resp: any) => {
//         console.log("ERROR", err);
//         return resp;
//     });
// };

// async function findFlatter(flat: { _id: any; }) {
//     await Flatter.findById(flat._id, (err: any, resp: any) => {
//         console.log("ERROR", err);
//         return resp;
//     });
// };

export async function findUserForUniquenessCheck(u: any) {
    const key = Object.keys(u)[0];
    const findKey = key === "create_user_email_input" ? "email" : "userHandle";

    return await User.findOne({ [findKey]: u[key] });
};

export async function findUserForLoginCheck(u: any) {
    return await User.findOne({email: u.login_identifier_input, password: u.login_password_input})
}

/**
 * UPDATE FUNCTIONS
 */

// async function updateCompliment(comp: { _id: any; }) {
//     await Compliment.findByIdAndUpdate(comp._id, (err: any, resp: any) => {
//         console.log("ERROR", err);
//         return resp;
//     });
// };

// async function updateFlatter(flat: { _id: any; }) {
//     await Flatter.findByIdAndUpdate(flat._id, (err: any, resp: any) => {
//         console.log("ERROR", err);
//         return resp;
//     });
// };

export async function updateUser(u: { _id: any; }) {
    await User.findByIdAndUpdate(u._id, (err: any, resp: any) => {
        console.log("ERR", err);
        return resp;
    });
};

/**
 * DELETE FUNCTIONS
 */

// async function deleteCompliment(comp: { _id: any; }) {
//     await Compliment.findByIdAndDelete(comp._id, (err: any, resp: any) => {
//         console.log("ERR", err);
//         return resp;
//     });
// };

// async function deleteFlatter(flat: { _id: any; }) {
//     await Flatter.findByIdAndDelete(flat._id, (err: any, resp: any) => {
//         return resp;
//     });
// };

export async function deleteUser(u: { _id: any; }) {
    await User.findByIdAndDelete(u._id, (err: any, resp: any) => {
        return resp;
    });
};

export async function connectToDb(db: string) {
    console.log(`SUCCESSFUL DB CONNECTION via: ${db}`);
    return await mongoose.connect(db);
};

export async function closeDbConnection(force: boolean) {
    await mongoose.connection.close(force);
    console.log(`CLOSE DB CONNECTION`);
}