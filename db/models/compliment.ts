import mongoose from "mongoose";

// This is a private message sent from one user to another
export interface ICompliment {
    sender: string;
    receiver: string;
    text: string;
    readTime: string;
    sentTime: string;
}

const complimentSchema = new mongoose.Schema<ICompliment>({
    // FUTURE: change this to the ObjectID
    sender: { type: String, required: true },
    // FUTURE: change this to the ObjectID
    receiver: { type: String, required: true },
}, {
    timestamps: true,
})

export const Compliment = mongoose.model<ICompliment>("Compliment", complimentSchema);