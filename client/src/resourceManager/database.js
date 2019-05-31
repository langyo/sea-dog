import lowdb from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

import dashboard from "./socketMessageManager/webSocketClient";

const adapter = new LocalStorage('db');
const db = lowdb(adapter);

db.defaults({

}).write();

export default dashboard;