const User = require('./Entity/User');

let user = new User();
user.email = 'm.j@fl.com';

console.log(user.checkEmail());