const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;

db.on('error', e => console.error(e));
db.on('open', () => console.log("success"));

let Classes = mongoose.Schema({

});

let Groups = mongoose.Schema({

});

let Group = mongoose.Schema({

});

let Member = mongoose.Schema({

});

let Log = mongoose.Schema({

});

let Accounts = mongoose.Schema({

});

let Expression = mongoose.Schema({

});

let ScoreTypes = mongoose.Schema({

});

let UserGroups = mongoose.Schema({

});

let ManagermentExpression = mongoose.Schema({

});

let TradeRule = mongoose.Schema({

});
