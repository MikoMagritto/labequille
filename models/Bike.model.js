const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
    {
        proprietaire: _idUser,
        marque: String,
        type: String,
        location: String,
        etat: String,
        taille: String,
        description: String,
        image : String
    },
    { timestamps: true }
);

const bikeModel = mongoose.model("Bike", bikeSchema);

module.exports = bikeModel;
