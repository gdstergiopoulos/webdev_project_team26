import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

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
        // console.log(res.rows)
        return res.rows;
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }
}

async function adduser(username,password,Fname,Lname,email,phone){
    const sql = `INSERT INTO "USER" (username,password,"Fname","Lname",mail,phone,role) VALUES ('${username}','${password}','${Fname}','${Lname}','${email}','${phone}','user');`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        console.log("Inserted succesfully") // επιστρέφει array
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }

}



export{getuser,adduser}