import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

//TODO remove the comments that do not need to be there
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
    const sql = `UPDATE "FOODITEM" SET "foodname" = '${name}', "price" = '${price}', "description" = '${description}' WHERE "itemID" = '${itemID}';`;
    try {
        const client = await connect();
        // const res = await client.query(sql)
        await client.release()
        return await client.query(sql)
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
    const sql = `INSERT INTO "RESERVATION" ("desired_area","numofpeople","date","time","username","comments","datetimemade","status") VALUES ('${area_id}','${people}','${date}','${time}','${username}','${comments}','${currentDate.toISOString()}','active');`;
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

async function rejectReserv(reservID){
    const sql1 = `DELETE FROM "HASTABLES" WHERE "reservID" = $1;`;
    const sql2 = 'DELETE FROM "RESERVATION" WHERE "reservID" = $1;';

    try {
        const client = await connect();
        const res = await client.query(sql1, [reservID]);
        await client.release();
        console.log("Tables deleted successfully",res.rows);
        // callback(null, res.rows) // επιστρέφει array
        try {
            const client = await connect();
            const res = await client.query(sql2, [reservID]);
            await client.release();
            console.log("Reservation rejected successfully",res.rows);
            // callback(null, res.rows) // επιστρέφει array
        }catch (err) {
            // callback(err, null);
            console.log(err);
    }}
     catch (err) {
        // callback(err, null);
        console.log(err);

}}

async function toggleTable(reservID,tableID){
    const sql = `SELECT * FROM "HASTABLES" WHERE "reservID" = '${reservID}' AND "tableID" = '${tableID}';`;
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();

        if (res.rows.length > 0) {

            const sql2 = `DELETE FROM "HASTABLES" WHERE "reservID" = '${reservID}' AND "tableID" = '${tableID}';`;
            try {
                const client = await connect();
                const res = await client.query(sql2);
                await client.release();
                console.log("Deleted table from reservation succesfully") // επιστρέφει array
                // callback(null, res.rows) // επιστρέφει array
            }
            catch (err) {
                // callback(err, null);
                console.log(err)
            }
        } else {

        const sql = `INSERT INTO "HASTABLES" ("reservID","tableID") VALUES ('${reservID}','${tableID}');`;
        try {
            const client = await connect();
            const res = await client.query(sql)
            await client.release()
            console.log("Inserted table to reservation succesfully") // επιστρέφει array
            // callback(null, res.rows) // επιστρέφει array
        }
        catch (err) {
            // callback(err, null);
            console.log(err)
        }
    }}
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

async function changeReservStatus(reservID,status){
    //TODO fix this function to update the status of the reservation to active or old depending on the current date and the date of the reservation
    const sql = `UPDATE "RESERVATION" SET "status" = '${status}' WHERE "reservID" = '${reservID}';`;
    
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        console.log("Reservation status updated successfully",res.rows);
        // callback(null, res.rows) // επιστρέφει array
    } catch (err) {
        // callback(err, null);
        console.log(err);
    }
}

async function checkReservStatus(reservID){
    current_date = new Date();
    const sql = `UPDATE "RESERVATION" SET "status" = "old" WHERE date > '${current_date}'`;
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        console.log("Reservation status updated successfully",res.rows);
        return res.rows;
    } catch (err) {
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

async function getAllReserv(status){
    {
        const sql = `SELECT * FROM "RESERVATION" WHERE "status" = '${status}';`;
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

async function getAllActiveReserv(username){
    {
        const sql = `SELECT * FROM "RESERVATION" WHERE "status" = 'active';`;
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

async function getReservInfo(reservID){
    const sql = `SELECT * FROM "RESERVATION" WHERE "reservID" = '${reservID}';`;
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

async function checkAvailability(date, time, numofpeople, desired_area) {
    const spaces = ['insidemain', 'outsidemain', 'bararea', 'opensky', 'bythesea'];
    const spaces_capacity = Array(5).fill(0);
    let lessTime, moreTime;
    const sql1 = `SELECT SUM("capacity") 
                    FROM "TABLE"
                    WHERE "area" = $1
                    AND "tableID" NOT IN (
                        SELECT "tableID"
                        FROM "HASTABLES" "H" 
                        JOIN "RESERVATION" "R" ON "H"."reservID" = "R"."reservID"
                        WHERE "R"."time" BETWEEN $2 AND $3
                        AND "R"."date" = $4)`;
    try {
        for (let i = 0; i < spaces.length; i++) {
            let datefake = new Date(`1970-01-01T${time}Z`);
            datefake.setHours(datefake.getHours() - 2);
            lessTime = datefake.toISOString().substr(11, 8);

            let datefake2 = new Date(`1970-01-01T${time}Z`);
            datefake2.setHours(datefake2.getHours() + 2);
            moreTime = datefake2.toISOString().substr(11, 8);

            console.log(spaces[i]);
            const client = await connect();
            const res = await client.query(sql1, [spaces[i], lessTime, moreTime, date]);
            await client.release();
            console.log("Capacity for", spaces[i], ":", res.rows[0].sum);
            spaces_capacity[i] = res.rows[0].sum;
        }

        let check = 0;
        for (let i = 0; i < spaces.length; i++) {
            if (spaces_capacity[i] >= numofpeople) {
            check =1000; // Insufficient capacity
            }
        }
        if(!check){
            return 0;
        }

        const client = await connect();
        const res = await client.query(sql1, [desired_area, lessTime, moreTime, date]);
        await client.release();
        console.log("Capacity for desired area:", res.rows[0].sum);
        if (res.rows[0].sum >= numofpeople) {
            return 1; // Available
        } else {
            return 2; // Insufficient capacity for desired area
        }
    } catch (err) {
        console.error("Error checking availability:", err);
        throw err; // Throw error to be caught by caller
    }
}

// TABLES USED BY OTHER RESERVATIONS IN A 2 HOUR WINDOW
async function getTablesUsed(reservID){

    const sql1 = `SELECT date,time FROM "RESERVATION" WHERE "reservID" = $1;`;
    let time,date,lessTime,moreTime;
    const tablesUsed = Array(60).fill(0); // Initialize the array with 0s

    try {
        const client = await connect();
        const res = await client.query(sql1, [reservID])
        await client.release()

        time = res.rows[0].time;
        date = res.rows[0].date;

        let datefake = new Date(`1970-01-01T${time}Z`); // Create a date object
        datefake.setHours(datefake.getHours() - 2); // Subtract 2 hours
        lessTime = datefake.toISOString().substr(11, 8); // Format the date object back to a time string

        let datefake2 = new Date(`1970-01-01T${time}Z`); // Create a date object    
        datefake2.setHours(datefake2.getHours() + 2); // Add 2 hours
        moreTime = datefake2.toISOString().substr(11, 8); // Format the date object back to a time string

        console.log("in here " + lessTime);
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }
    const sql2 = `SELECT "H"."tableID"
    FROM "HASTABLES" "H"
    JOIN "RESERVATION" "R" ON "H"."reservID" = "R"."reservID"
    WHERE "R"."time" BETWEEN $1 AND $2
      AND "R"."date" = $3
      AND "R"."reservID" != $4;`;
    try {
        const client = await connect();
        const res = await client.query(sql2, [lessTime, moreTime, date, reservID]);
        await client.release()
        //const tablesUsed = Array(60).fill(0); // Initialize the array with 0s


        // Set the indexes corresponding to the used tables to 1
        res.rows.forEach(row => {
            const tableID = parseInt(row.tableID.replace('table', '')); // Extract numeric part
            tablesUsed[tableID] = 1; // Subtract 1 because arrays are 0-indexed
        });
        console.log("Tables used: ", tablesUsed);
        

    } catch (err) {
        console.error("Error fetching tables used:", err);
        return []; // Return an empty array in case of error
    }


    const sql3 = `SELECT "tableID" FROM "HASTABLES" WHERE "reservID" = $1;`;
    try {
        console.log("in tables in reeserv here");
        const client = await connect();
        const res = await client.query(sql3, [reservID]);
        await client.release()


        // Set the indexes corresponding to the used tables to 1
        res.rows.forEach(row => {
            const tableID = parseInt(row.tableID.replace('table', '')); // Extract numeric part
            tablesUsed[tableID] = 2; // Subtract 1 because arrays are 0-indexed
        });
        console.log("Tables in resv: ", tablesUsed);
        return tablesUsed;
        // console.log(res.rows)
        // callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        // callback(err, null);
        console.log(err)
    }

}

// async function getTablesInReserv(reservID){
//     const sql = `SELECT "tableID" FROM "HASTABLES" WHERE "reservID" = '${reservID}';`;
//     try {
//         console.log("in tables in reeserv here");
//         const client = await connect();
//         const res = await client.query(sql)
//         await client.release()
//         const tablesInReserv = Array(60).fill(0); // Initialize the array with 0s

//         // Initialize the array with 0s
//         for (let i = 0; i < 60; i++) {
//             tablesInReserv.push(0);
//         }

//         // Set the indexes corresponding to the used tables to 1
//         res.rows.forEach(row => {
//             const tableID = parseInt(row.tableID.replace('table', '')); // Extract numeric part
//             tablesInReserv[tableID] = 1; // Subtract 1 because arrays are 0-indexed
//         });
//         console.log("Tables in resv: ", tablesInReserv);
//         return tablesInReserv;
//         // console.log(res.rows)
//         // callback(null, res.rows) // επιστρέφει array
//     }
//     catch (err) {
//         // callback(err, null);
//         console.log(err)
//     }
// }


export{getuser,adduser,getMenuActive,getMenuInactive,getProfileInfo,getFoodItemInfo,updateFoodItem,addFoodItem,deleteFoodItem,removeFoodItem,addOnMenu,getReservHistory,getAllReserv, addReservation, changeReservStatus, getAllActiveReserv,getReservInfo, toggleTable, getTablesUsed, checkAvailability, rejectReserv, checkReservStatus}