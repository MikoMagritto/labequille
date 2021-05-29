const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        nom: String,
        pseudo: String,
        mail: String,
        telephone: String,
        location: String,
        password: String
    },
    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
