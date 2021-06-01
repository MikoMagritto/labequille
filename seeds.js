const mongoose = require("mongoose");

const User = require("../models/User.model.js");
const Bike = require("../models/Bike.model.js");

mongoose.connect(`mongodb+srv://ChloeT:AxC36oVEkWZF775W@cluster0.jwh3k.mongodb.net/labequille`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log("victoire") })
  .catch((err) => console.log(err));

const users = [{
  nom: "Paul Personne",
  pseudo: "Sonper",
  mail: "paul.personne@gmail.com",
  telephone: "0612186796",
  location: "75018",
  password: "fetiche"
}];

User.insertMany(users)
  .then(function (usersFromDB) {
    console.log(`${usersFromDB.length} créés en base`);
  })
  .catch((err) => console.log(err));

const bikes = [{

  proprietaire: "_idUser",
  marque: "Motobecane",
  type: "Route",
  location: "75018",
  etat: "bon etat",
  taille: "M",
  description: "Vélo Motobecane Equipe Pro",
  image : "https://saikle-prod.fra1.digitaloceanspaces.com/large_20210527_151421_9ac54b671c.jpg"
},
{proprietaire:"_idUser",
  marque: "Sunn",
  type: "VTC",
  location: "75012",
  etat: "bon etat",
  taille: "M",
  description: "Vélo Sunn cintre ville",
  image : "https://saikle-prod.fra1.digitaloceanspaces.com/large_20210527_151637_edfb21cf41.jpg"

},
{proprietaire:"_idUser",
  marque: "Peugeot",
  type: "Route",
  location: "75015",
  etat: "bon etat",
  taille: "S",
  description: "Vélo Peugeot Cannes",
  image : "https://saikle-prod.fra1.digitaloceanspaces.com/large_902_F6658_6716_46_EF_B312_C4_D6_A0_D3_F51_B_ca562b4592.jpeg"
},
{proprietaire:"_idUser",
  marque: "Gitane",
  type: "Course",
  location: "75009",
  etat: "bon etat",
  taille: "L",
  description: "Vélo course Gitane « champion »",
  image : "https://saikle-prod.fra1.digitaloceanspaces.com/large_BE_712913_2860_4137_9347_C2_F6_BFD_6256_C_f94c601888.jpeg"

},
{proprietaire:"_idUser",
  marque: "MBK",
  type: "Course",
  location: "75007",
  etat: "bon etat",
  taille: "M",
  description: "MBK Trainer - Édition Limitée J.O 1992»",
  image : "https://saikle-prod.fra1.digitaloceanspaces.com/large_E99_AE_8_AE_6_A3_E_4801_A6_A9_18123_A42_F904_64fbe51de4.jpeg"

}
];

Bike.insertMany(bikes)
  .then(function (bikesFromDB) {
    console.log(`${bikesFromDB.length} créés en base`);
  })
  .catch((err) => console.log(err));