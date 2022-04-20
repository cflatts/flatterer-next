import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR: number = 10;

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
    timestamps: true,
});

// MIDDLEWARE
userSchema.pre("save", function(next: Function) {
    if(!this.isModified("password")) {
        return next();
    };

    bcrypt.genSalt(SALT_WORK_FACTOR, (err: Error | undefined, salt: string) => {
        if(err) {
            return next(err);
        };

        bcrypt.hash(this.password, salt, (err: Error | undefined, hash: string) => {
            if(err) {
                return next(err);
            };
            this.password = hash;
            next();
        });
    });
});

// CUSTOM METHODS

userSchema.methods.comparePasswords = async function(enteredPW: string, callback: Function) {
    await bcrypt.compare(enteredPW, this.password, function(err: Error | undefined, isMatch: boolean) {
        if(err) {
            return callback(err);
        };
        return callback(null, isMatch);
    });
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;