import mongoose from "mongoose";

export interface IUser {
    userHandle: string;
    nickname: string;
    email: string;
    password: string;
};

const userSchema = new mongoose.Schema<IUser>({
    userHandle: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

const model = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default model;