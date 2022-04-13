import mongoose from "mongoose";

// This is a publically visible message sent from one user to another
export interface IFlatter {
    sender: string;
    receiver: string;
    imitations: number;
    sweets: number;
    bs: number;
};

const flatterSchema = new mongoose.Schema<IFlatter>({
    // FUTURE: change this to the ObjectID
    sender: { type: String, required: true },
    // FUTURE: change this to the ObjectID
    receiver: { type: String, required: true },
    imitations: { type: Number, required: true, default: 0 },
    sweets: { type: Number, required: true, default: 0 },
    bs: { type: Number, required: true, default: 0 }
}, {
    timestamps: true,
});

export const Flatter = mongoose.model<IFlatter>("Flatter", flatterSchema);