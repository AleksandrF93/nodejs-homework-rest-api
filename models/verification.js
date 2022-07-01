const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Verify token is required'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
 
});

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = {
    Verification
};