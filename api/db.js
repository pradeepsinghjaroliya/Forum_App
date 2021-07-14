/*import knex from "knex";

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'forum_db',
  },
});

export default db;
*/

import knex from "knex";

const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'forum_db',
  },
});

export default db;
