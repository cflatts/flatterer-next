import mongoose from "mongoose";

export interface IUser {
    userHandle: string;
    nickname: string;
    email: string;
    password: string;
    following: string[],
    followers: string[],
    blocked: string[],
    allowsFollowers: boolean,
};

const userSchema = new mongoose.Schema<IUser>({
    userHandle: { type: String, lowercase: true, required: true, unique: true, immutable: true, trim: true },
    nickname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, immutable: true, trim: true },
    password: { type: String, required: true, trim: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    allowsFollowers: { type: Boolean }
}, {
    timestamps: true
})

const model = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default model;