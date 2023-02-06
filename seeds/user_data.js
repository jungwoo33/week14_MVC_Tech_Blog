const { User } = require('../models');

const userdata = [
   {
      username: "Xandromus",
      twitter: "",
      github: "xandromus@github.com",
      email: "xandromus@gmail.com",
      password: "pw1"
  },
  {
    username: "Lernantino",
    twitter: "",
    github: "lernantino@github.com",
    email: "lernantino@gmail.com",
    password: "pw2"
},
  {
    username: "Jungwoo",
    twitter: "",
    github: "jungwoo33@github.com",
    email: "jungwoo33@gmail.com",
    password: "pw3"
},
]
const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
