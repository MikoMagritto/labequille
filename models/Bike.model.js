const mongoose = require("mongoose");
const Schema = mongoose.Schema
const bikeSchema = Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        brand: String,
        longitude: Number,
        latitude: Number,
        //location: { type: { type: String }, coordinates: [Number] },
        type: String,
        status: String,
        size: String,
        description: String,
        picture: String
    },

    { timestamps: true },

);

bikeSchema.index({ location: '2dsphere' });
const bikeModel = mongoose.model("Bike", bikeSchema);

module.exports = bikeModel;
