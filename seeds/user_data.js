const { User } = require('../models');

/*
mysql> select * from user;
+----+------------+----------------------+----------+
| id | username   | email                | password |
+----+------------+----------------------+----------+
|  1 | Xandromus  | xandromus@gmail.com  | pw1231   |
|  2 | Lernantino | lernantino@gmail.com | pw1232   |
|  3 | Jungwoo    | jungwoo33@gmail.com  | pw1233   |
+----+------------+----------------------+----------+
*/
const userdata = [
   {
      username: "Xandromus",
      email: "xandromus@gmail.com",
      password: "pw1231"
  },
  {
    username: "Lernantino",
    email: "lernantino@gmail.com",
    password: "pw1232"
},
  {
    username: "Jungwoo",
    email: "jungwoo33@gmail.com",
    password: "pw1233"
},
]
const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
