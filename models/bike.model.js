const mongoose = require("mongoose");

const bikeSchema = new.mongoose.Schema(
    {
        proprietaire: _idUser,
        marque: String,
        type: String,
        adresse: String,
        état: String,
        catégorie: String,
        taille: String,
        couleur: String,
        description: String,
        imageUrl: String,
        disponibilité: date,

    },
    { timestamps: true }
);

const bikeModel = mongoose.model("Bike", bikeSchema);

module.export = bikeModel;



// Propriétaire: _idUsers
// catégorie:[“VTC,VTT,BMX, TANDEM”]
// couleur:String 
// prix: Number
// taille:[S,M,L]
// État: [Etat correct,Très Bon État,Comme neuf]
// Disponibilité: [dates,]
// localisation commune : number (codecommune)
// 
// 
