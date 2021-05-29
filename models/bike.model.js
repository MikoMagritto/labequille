const mongoose = require("mongoose");

const bikeSchema = new.mongoose.Schema(
    {
        marque: String,
        type: String,
        location: Number,
        état: String,
        taille: Number,
        description: String,

    },
    { timestamps: true }
);

const bikeModel = mongoose.model ("Bike", bikeSchema);

module.export = bikeModel;
