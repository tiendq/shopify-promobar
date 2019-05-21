// Usage: mongo --nodb setupdb.js

var mongo = new Mongo('localhost:27017');
var db = mongo.getDB('stickypromobar');

db.createUser({
  user: 'user1',
  pwd: 'password',
  roles: [{
    role: 'userAdminAnyDatabase',
    db: 'admin'
  }]
});
db.changeUserPassword('user1', '');

db.createUser({
  user: 'user2',
  pwd: 'password',
  roles: [{
    role: 'readWrite',
    db: 'stickypromobar'
  }]
});
db.changeUserPassword('user2', '');

db.createCollection('shops');
db.shops.createIndex({ name: 1 }, { unique: true });

db.createCollection('promos');
db.promos.createIndex({ shopId: 1 });

// Staging
db.createUser({
  user: 'user3',
  pwd: 'staging',
  roles: [{
    role: 'readWrite',
    db: 'stickypromobar_staging'
  }]
});
