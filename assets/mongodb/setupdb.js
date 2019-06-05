// Usage: mongo --nodb setupdb.js

var mongo = new Mongo('localhost:57017');
var db = mongo.getDB('promobar');

db.createUser({
  user: 'user1',
  pwd: 'user1',
  roles: [{
    role: 'userAdminAnyDatabase',
    db: 'admin'
  }]
});
// db.changeUserPassword('user1', '');

db.createUser({
  user: 'user2',
  pwd: 'user2',
  roles: [{
    role: 'readWrite',
    db: 'promobar'
  }]
});
// db.changeUserPassword('user2', '');

db.createCollection('shops');
db.shops.createIndex({ name: 1 }, { unique: true });

db.createCollection('promos');
db.promos.createIndex({ shopId: 1 });

// Staging
db.createUser({
  user: 'user3',
  pwd: 'user3',
  roles: [{
    role: 'readWrite',
    db: 'promobar_staging'
  }]
});
