const { User } = require('../models');

/*
mysql> select * from user;
+----+------------+----------------------+----------+
| id | username   | email                | password |
+----+------------+----------------------+----------+
|  1 | Sam1       | sam1@gmail.com       | pw0001   |
|  2 | Sam2       | sam2@gmail.com       | pw0002   |
|  3 | Sam3       | sam3@gmail.com       | pw0003   |
+----+------------+----------------------+----------+
*/
const userdata = [
   {
      username: "Sam1",
      email: "sam1@gmail.com",
      password: "pw0001"
  },
  {
    username: "Sam2",
    email: "sam2@gmail.com",
    password: "pw0002"
},
  {
    username: "Sam3",
    email: "sam3@gmail.com",
    password: "pw0003"
},
]
const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
