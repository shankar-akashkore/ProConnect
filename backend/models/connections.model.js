import mongoose, { connection } from "mongoose";

const connectionRequest = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    connectionId: {
        type: mongoose.Schema.type.ObjectId,
        ref: "User"
    },
    status_accepted: {
        type: Boolean,
        default: null
    }
});

const ConntectionRequest = mongoose.model("ConntectionRequest",connectionRequest);

export default ConntectionRequest;