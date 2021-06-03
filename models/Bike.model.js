const mongoose = require("mongoose");
const Schema = mongoose.Schema
const bikeSchema = Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        brand: String,
        location: String,
        type: String,
        status: String,
        size: String,
        description: String,
        picture: String
    },
    { timestamps: true }
);

const bikeModel = mongoose.model("Bike", bikeSchema);

module.exports = bikeModel;
