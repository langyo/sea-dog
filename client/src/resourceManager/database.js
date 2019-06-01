import lowdb from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db');
const db = lowdb(adapter);

db.defaults({

}).write();

export default db;