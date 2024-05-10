import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
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

async function getMenuActive(){
    const sql = `SELECT * FROM "FOODITEM" WHERE "onmenu" = 'true';`;
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

async function getMenuInactive(){
    const sql = `SELECT * FROM "FOODITEM" WHERE "onmenu" = 'false';`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        //console.log(res.rows)
        return res.rows;
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }
}

async function getProfileInfo(username){
    const sql = `SELECT * FROM "USER" WHERE "username" = '${username}';`;
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

async function getFoodItemInfo(id){
    const sql = `SELECT * FROM "FOODITEM" WHERE "itemID" = '${id}';`;
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

async function updateFoodItem(itemID,name,price,description,img){
    const sql = `UPDATE "FOODITEM" SET "foodname" = '${name}', "price" = '${price}', "description" = '${description}', "img" = '${img}' WHERE "itemID" = '${itemID}';`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        console.log("Updated succesfully") // επιστρέφει array
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }
}

async function addFoodItem(name,price,description,img){
    const sql = `INSERT INTO "FOODITEM" ("foodname","price","description","img","onmenu") VALUES ('${name}','${price}','${description}','/media/menu/${img}','false');`;
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

async function addReservation(date,time,people,comments,username,area_id){
    const currentDate = new Date();
    const sql = `INSERT INTO "RESERVATION" ("reservID","desired_area","numofpeople","date","time","username","comments","datetimemade") VALUES ('${getRandomInt(10000)}','${area_id}','${people}','${date}','${time}','${username}','${comments}','${currentDate.toISOString()}');`;
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

async function deleteFoodItem(itemID){
    const sql = `DELETE FROM "FOODITEM" WHERE "itemID" = '${itemID}';`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        console.log("Deleted succesfully") // επιστρέφει array
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }
}

async function removeFoodItem(itemID){
    // we will toggle status from true to false (onmenu)
    const sql = `UPDATE "FOODITEM" SET "onmenu" = 'false' WHERE "itemID" = '${itemID}';`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        console.log("Removed from menu succesfully") // επιστρέφει array
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }
}

async function addOnMenu(itemID){
    // we will toggle status from false to true (onmenu)
    const sql = `UPDATE "FOODITEM" SET "onmenu" = 'true' WHERE "itemID" = '${itemID}';`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        console.log("Added to menu succesfully") // επιστρέφει array
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }
}

async function updateReservStatus(username){
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toISOString().split('T')[1].split('.')[0];
    const sql = `UPDATE "RESERVATION" SET "status" = 'active' WHERE "username" = '${username}' AND "date" > '${formattedDate}' AND ("date" = '${formattedDate}' AND "time" > '${formattedTime}');`;
    //const sql = `UPDATE "RESERVATION" SET "status" = 'active' WHERE "username" = '${username}' AND "date" > '${currentDate.toISOString()}' AND ("date" = '${currentDate.toISOString()}' AND "time" > '${currentDate.getHours()}:${currentDate.getMinutes()}');`;
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        console.log("Reservation status updated successfully");
        // callback(null, res.rows) // επιστρέφει array
    } catch (err) {
        // callback(err, null);
        console.log(err);
    }
}


async function getReservHistory(username){
    const sql = `SELECT * FROM "RESERVATION" WHERE "username" = '${username}' AND "status" = 'old';`;
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

async function getActiveReserv(username){
    {
        const sql = `SELECT * FROM "RESERVATION" WHERE "username" = '${username}' AND "status" = 'active';`;
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
}

export{getuser,adduser,getMenuActive,getMenuInactive,getProfileInfo,getFoodItemInfo,updateFoodItem,addFoodItem,deleteFoodItem,removeFoodItem,addOnMenu,getReservHistory,getActiveReserv, addReservation, updateReservStatus}