const mongoose = require("mongoose");

const User = require("../models/User.model.js");
const Bike = require("../models/Bike.model.js");

mongoose.connect(`mongodb+srv://ChloeT:AxC36oVEkWZF775W@cluster0.jwh3k.mongodb.net/labequille`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log("connected ta mere") })
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
  marque: "La Becane",
  type: "Route",
  location: "75018",
  etat: "bon etat",
  taille: "M",
  description: "Vélo Motobecane Equipe Pro",
  image : "https://saikle-prod.fra1.digitaloceanspaces.com/large_20210527_151421_9ac54b671c.jpg"
}];

Bike.insertMany(bikes)
  .then(function (bikesFromDB) {
    console.log(`${bikesFromDB.length} créés en base`);
  })
  .catch((err) => console.log(err));