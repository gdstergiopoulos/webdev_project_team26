import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Path to the .env file
const envPath = path.resolve(path.resolve(), '../.env');

// Load environment variables from the .env file
dotenv.config({ path: envPath });

// Now you can access the environment variables
console.log(process.env.DB_USER);

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}
); 

async function connect() {
    try {
        const client = await pool.connect();
        return client
    }
    catch (e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function getuser(userID) {
    const sql = `SELECT * FROM "USER" WHERE "username" = '${userID}';`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        console.log(res.rows) // επιστρέφει array
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }
}


getuser('gster');