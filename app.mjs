// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'
import * as model from './model/model.js';
import session from 'express-session';
import Handlebars from './helpers.js'; 
import * as logincontroller from './appsetup/loginController.mjs';

const app = express()
const router = express.Router();
const port = process.env.PORT || '3000';

//TODO remove the comments not needed
//TODO dont let a non admin user to access the admin pages
//TODO fix the rediriction when someone presses make reserv when not logged in, the logs in, move him to the reservation page not the home page
//TODO add the ability to delete/edit reservations
//TODO add the ability to review old reservations

//TODO add the ability for the admin to assign tables to reservations
//TODO inform the user for avaibality
//TODO make the non available table not clickable for the admin

// Δηλώνουμε πως ο φάκελος "public" θα περιέχει τα στατικά αρχεία, π.χ. το http://127.0.0.1:3000/style.css θα επιστρέψει, το αρχείο /public/style.css
// Specify that the "public" folder will contain the static files, e.g. http://127.0.0.1:3000/style.css will return, the file /public/style.css
app.use(express.static('public'))

// Χρήση της Handlebars σαν template engine. Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, για να αναγνωριστεί το extname (το κάνουμε αυτό για να έχουμε αρχεία με κατάληξη .hbs / το default είναι .handlebars)
// Use Handlebars as a template engine. Note: the engine must have the same name as the extname, in order for the extname to be recognized (we do this to have files ending in .hbs / the default is .handlebars)
app.engine('hbs', engine({ extname: 'hbs' }));

// Ορίζουμε πως η 'hbs' θα είναι η μηχανή template (δηλ. θα ενεργοποιείται με την res.render()) 
// Set 'hbs' to be the template engine (i.e. activated with res.render())
app.set('view engine', 'hbs');

// ---------------------------------------------
// Model - το μοντέλο δεδομένων μας είναι αποθηκευμένο στη RAM. 
// Model - our data model is stored in RAM.

app.use(router); 
router.use(express.urlencoded({ extended: true }));

router.use(session({
        
    secret: process.env.SESSION_SECRET || "PynOjAuHetAuWawtinAytVunar", // κλειδί για κρυπτογράφηση του cookie
    resave: false, // δεν χρειάζεται να αποθηκεύεται αν δεν αλλάξει
    saveUninitialized: false, // όχι αποθήκευση αν δεν έχει αρχικοποιηθεί
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, //TWO_HOURS χρόνος ζωής του cookie σε ms
      sameSite: true
    }
  }));

let checkAuthenticated = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedin === true) {
        console.log("user is authenticated", req.originalUrl);
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next();
    }
    else {
        console.log("not authenticated, redirecting to /login")
        res.render('login',{src: req.params.page,layout: 'main',loginmsg: req.query.error});
    }
}

let checkAccessRights = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedin === true && req.session.role=='admin') {
        console.log("Admin is authenticated", req.originalUrl);
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next();
    }
    else {
        //Ο χρήστης δεν έχει ταυτοποιηθεί, αν απλά ζητάει το /login ή το register δίνουμε τον
        //έλεγχο στο επόμενο middleware που έχει οριστεί στον router
        // if ((req.originalUrl === "/login") || (req.originalUrl === "/register")) {
        //     next()
        // }
        // else {
            //Στείλε το χρήστη στη "/login" 
            console.log("not authenticated, redirecting to /login")
            res.redirect('/home');
    }
}

let listAllFoodsRender = async function (req, res) {
    // getAllFoods(function (err, foods) {
    //     if (err) {
    //         res.send(err);
    //     }
        // console.log('foods', foods);
        // στέλνει το object "tasks" στο template "tasks"
        // sends the "tasks" object to the "tasks" template
        try{
            let foodsq= await model.getMenuActive()
            // console.log(foodsq);
            res.render('menu', { loggname: req.session.username ,foods: foodsq }); 
        }
        catch(err){
            console.log(err);
            res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
        }
        // let foodsq= await model.getMenuActive()
        // // console.log(foodsq);
        // res.render('menu', { loggname: req.session.username ,foods: foodsq }); 
}

// let loadPage = function(req,res){
//     res.render('home_page',{layout: 'main'});
// }

function goAbout(req,res){
    res.render('about',{layout: 'main', loggname: req.session.username});

}

function goLogin(req,res){
        res.redirect('/myprofile');
}

async function checkLogin(req,res){
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    //elegxos edw login klp
    // console.log(model.getuser(username));
    let user;
    try{
        user = await model.getuser(username);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    
    if(user.length==0){
        console.log('Create an account first');  
        res.redirect('/login?error=noaccfound');
    }
    else{
        let storedpass = user[0].password;
        let role=user[0].role;
        if (storedpass === password) {
            console.log('Logged in', username);
            console.log(req.params.src)
            req.session.loggedin = true;
            req.session.username=username;
            req.session.role=role;
            if(role=='admin'){
                res.redirect('/adminhome');
            }
            else{
                res.redirect('/home');
            }
        } else {
            console.log('Invalid username or password');
            res.redirect('/login?error=wrongpass');
            // Handle the error or redirect to an error page
        }
    }
}

async function registerUser(req,res){
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let phone = req.body.phone;
    let confpass= req.body.confpass;
    let errormsg;
    if(username=='' || password=='' || firstname=='' || lastname=='' || email=='' || phone=='' || confpass==''){
        console.log('Please fill in all the fields');
        errormsg='Please fill in all the fields';
        res.redirect('/register?error='+errormsg);
        return 0;
    }
    else{
        let usertaken;
        let mailtaken;
        try{
            usertaken= await model.checkUsername(username);
            mailtaken= await model.checkMail(email);
        }
        catch(err){
            res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
        }
        if(usertaken===1){
            console.log('Username already exists');
            errormsg='There is already a user with this username';
            res.redirect('/register?error='+errormsg);
            return 0;
        }
        else if(mailtaken===1){
            console.log('Email already exists');
            errormsg='There is already a user with this email';
            res.redirect('/register?error='+errormsg);
            return 0;
        }
        else if(password!=confpass){
            console.log('Passwords do not match');
            errormsg='Passwords do not match';
            res.redirect('/register?error='+errormsg);
            return 0;
        }
        else if(phone.length!=10){
            console.log('Invalid phone number');
            errormsg='Invalid phone number';
            res.redirect('/register?error='+errormsg);
            return 0;
        }
        else if(email.indexOf('@')==-1){
            console.log('Invalid email');
            errormsg='Invalid email';
            res.redirect('/register?error='+errormsg);
            return 0;
        }
    }
    model.adduser(username, password, firstname, lastname, email, phone);
    res.redirect('/login');
}

async function makeResv(req,res){
    let time=req.body.time;
    let date = req.body.date;
    let people = req.body.people;
    let comments = req.body.comments;
    let username = req.session.username;
    let area_id = req.body.area;
    let reservID = req.body.reservID;
    let errormsg= '';

    if(area_id!='' && time!=undefined && date!=undefined && people!=''){
        if(checkDateTime(date,time)===1){
            console.log('Invalid date');
            errormsg='Invalid date';
            res.redirect('/reservation?error='+errormsg);
        }
        else if(checkDateTime(date,time)===2){
            console.log('Invalid time');
            errormsg='Invalid time';
            res.redirect('/reservation?error='+errormsg);
        }
        else{
            let availability;
            try{
                availability= await model.checkAvailability(date,time,people,area_id);
            }
            catch(err){
                res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
            }
            console.log(availability);
            if(availability==0){
                console.log('No tables available in the entrire restaurant at this time for the requested no. of people');
                errormsg='No tables available in the entrire restaurant at this time';
                res.redirect('/reservation?error='+errormsg);
                // var showAlert = true;
                // var alertMessage = "No tables available";
                // res.json({ showAlert: showAlert, message: alertMessage });
            }
            else if (availability===1){
                try{
                    await model.addReservation(date,time,people,comments,username,area_id);
                } 
                catch(err){
                    res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
                }
                console.log('All set, your reservation went through!');
                errormsg='All set, your reservation went through!';  
                res.redirect('/reservation?error='+errormsg);
            // var showAlert = false;  
            }
            else{
                console.log('No tables available in the desired area at this time, check other areas',area_id);
                errormsg='No tables available in the desired area at this time, check other areas';
                res.redirect('/reservation?error='+errormsg);
            // var showAlert = true;
            // var alertMessage = "There are tables available in the restaurant";
            // res.json({ showAlert: showAlert, message: alertMessage });
            }
        }
    }
    else{
        console.log('Please fill in all the fields');
        errormsg='Please fill in all the fields';
        res.redirect('/reservation?error='+errormsg);
        // var showAlert = true;
        // var alertMessage = "Please fill in all the fields";
        // res.json({ showAlert: showAlert, message: alertMessage });
    }
    }
    
async function goChangeStatus(req,res){
    let reservID = req.params.reservID;
    let status = req.params.status;
    try{
        await model.changeReservStatus(reservID,status);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    res.redirect('/adminreserv');   
}

async function goDeleteResv(req,res){
    let reservID = req.params.reservID;
    try{
        await model.deleteReserv(reservID);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    res.redirect('/adminreserv');
}


function checkDateTime(date,time){
    let today = new Date();
    let resdate = new Date(date);
    let resTime = new Date(`1970-01-01T${time}Z`); // Convert PostgreSQL time to Date object

    // Extract hours, minutes, and seconds from resTime
    let hours = resTime.getHours();
    let minutes = resTime.getMinutes();
    let seconds = resTime.getSeconds();

    // Ensure two-digit format for minutes and seconds
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    resTime.setHours(hours, minutes, seconds);

    if (resdate < today) {
        return 1;
    }
    if (resTime < new Date("1970-01-01T09:00:00Z") || resTime > new Date("1970-01-01T22:30:00Z"))
        {
            return 2;
        }
    return 0;
}

async function checkLoginRedirect(req,res){
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    //elegxos edw login klp
    // console.log(model.getuser(username));
    let user;
    try{
        user = await model.getuser(username);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }

    if(user.length==0){
        console.log('Create an account first');    
        res.redirect('/login?error=noaccfound');
    }
    else{
        let storedpass = user[0].password;
        let role=user[0].role;
        if (storedpass === password) {
            console.log('Logged in', username);
            console.log(req.params.src)
            req.session.loggedin = true;
            req.session.username=username;
            req.session.role=role;
            if(role=='admin'){
                res.redirect('/adminhome');
            }
            else{
                    res.redirect('/reservation');
                }
        } else {
            console.log('Invalid username or password');
            res.redirect('/login?error=wrongpass');
            //TODO wrong password message
            
            // Handle the error or redirect to an error page
        }
    }
}

router.route('/login').post(checkLogin);
router.route('/login/redirect/:page').post(checkLoginRedirect);
router.route('/register').post(registerUser);
// router.route('/reservation/:reservID').post(makeResv);

function goHome(req,res){
    // console.log(model.getuser('gster'));
    // if(!req.session.userID){
    //     res.redirect('/login');
    // }
    if(req.session.loggedin==undefined){
        req.session.loggedin = false;
    }
    res.render('home_page',{layout: 'main', loggname: req.session.username});

}


function goRegister(req,res){
    res.render('register',{layout: 'main', errormsg: req.query.error});

}

async function goReservation(req,res){
    if(req.session.loggedin===false){
        res.redirect('/login/redirect/reservation');
    }
    else{
        let errormsg= req.query.error;
        console.log(req.session.loggedin);
        let active_resv;
        let changed_resv;
        try{
            active_resv = await model.getAllReservUser(req.session.username, "active");
            changed_resv = await model.getAllReservUser(req.session.username, "changed");
        }
        catch(err){
            res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
        }
        if(active_resv.length>0 || changed_resv.length>0){
            var has_active_reserv = true;
        }
        else{
            var has_active_reserv = false;
        }
        res.render('reservation',{layout: 'main', loggname: req.session.username, has_active_reserv: has_active_reserv,errormsg: errormsg});
    }
}


function goLocation(req,res){
    res.render('location', { layout: 'loc_layout', loggname: req.session.username});
}

function goAdminHome(req,res){
        res.render('admin_home', {loggname: req.session.username,layout: 'admin_layout' });

    
}

async function goEditResv(req,res){
    let errormsg= req.query.error;
    let reservID = req.params.reservID;
    let reservInfo;
    try{
        reservInfo= await model.getReservInfo(reservID);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    res.render('reservation', { reservInfo: reservInfo,errormsg: errormsg,loggname: req.session.username,layout: 'admin_layout' });
}

async function goAdminMenu(req,res){
    let foodsactive;
    let foodsinactive;
    try{
        foodsactive= await model.getMenuActive();
        foodsinactive= await model.getMenuInactive();
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    res.render('admin_menu', { layout: 'admin_layout',loggname: req.session.username,foodsactive: foodsactive, foodsinactive: foodsinactive});
}

async function goAdminReserv(req,res){
    let active_reservations;
    let confirmed_reservations;
    let cancelled_reservations;
    let rejected_reservations;
    let changed_reservations;
    try{
        active_reservations= await model.getAllReserv("active");
        confirmed_reservations= await model.getAllReserv("confirmed");
        cancelled_reservations= await model.getAllReserv("cancelled");
        rejected_reservations= await model.getAllReserv("rejected");
        changed_reservations= await model.getAllReserv("changed");
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
        
    res.render('adminreserv', {loggname: req.session.username,active_reservations:active_reservations,confirmed_reservations:confirmed_reservations,rejected_reservations:rejected_reservations, cancelled_reservations:cancelled_reservations, changed_reservations:changed_reservations,layout: 'admin_layout' });
}

async function goAssignTable(req,res){
    let area_id;
    let reservID = req.params.reservID;
    console.log("this is the reserv id"+reservID);
    let reservInfo;
    try{
        reservInfo= await model.getReservInfo(reservID);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    
    console.log("this is the reserv info"+reservInfo);
    area_id=reservInfo[0].desired_area;
    let tablesUsed;
    try{
        tablesUsed= await model.getTablesUsed(reservID);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    //let tablesInReserv = await model.getTablesInReserv(reservID);
    res.render('assign_table', { area_id: area_id,reservInfo:reservInfo,tablesUsed: tablesUsed,loggname: req.session.username,layout: 'admin_layout' });
}

async function goPickArea(req,res){
    let area_id;
    let reservID = req.params.reservID;
    let reservInfo;
    let tablesUsed;
    try{
        reservInfo= await model.getReservInfo(reservID);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }

    area_id=req.params.area;
    try{    
        tablesUsed= await model.getTablesUsed(reservID);
    }
    catch{
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    //let tablesInReserv = await model.getTablesInReserv(reservID);
    res.render('assign_table', { area_id: area_id,reservInfo:reservInfo, tablesUsed: tablesUsed,loggname: req.session.username,layout: 'admin_layout' });
}

async function goToggleTable(req,res){
    let area_id;
    let reservID = req.params.reservID;
    let tableID = req.params.tableID;
    area_id=req.params.area;
    console.log("here!!");
    let reservInfo;
    let tablesUsed;
    try{
        reservInfo= await model.getReservInfo(reservID);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }

    try{
        await model.toggleTable(reservID,tableID);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    
    
    try{
        tablesUsed= await model.getTablesUsed(reservID);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    //let tablesInReserv = await model.getTablesInReserv(reservID);
    res.render('assign_table', { area_id: area_id,reservInfo:reservInfo, tablesUsed: tablesUsed,loggname: req.session.username,layout: 'admin_layout' });
}

// function goUserPickArea(req,res){
//     console.log("hello ");
//     req.session.user_area_id = req.query['id'];
//     let area_id = req.query['id'];
//     res.redirect('/reservation?area_id=' + area_id);
// }

function goAddFoodItem(req,res){
    res.render('addFoodItem', { method: 'add',loggname: req.session.username,layout: 'admin_layout' });
}

async function goEditFoodItem(req,res){
    let fooditeminfo;
    try{
        fooditeminfo= await model.getFoodItemInfo(req.params.id);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    console.log(fooditeminfo);
    res.render('addFoodItem', { method: 'edit' ,fooditeminfo: fooditeminfo,loggname: req.session.username,layout: 'admin_layout' });
}


async function goMyProfile(req,res){
    let role = req.session.role;
    let profilepage;
    //take username from session
    let info;
    try{
        info= await model.getProfileInfo(req.session.username);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    let allReserv;
    //update reserv statys
    try{
        await model.checkReservStatus();
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    // console.log(info);
    if(req.params.page=='info'){
        profilepage='userprofile';
    }
    else if(req.params.page=='reservations'){
        profilepage='userreserv';
        let userinfo;
        let userinfo2;
        let userinfo3;
        try{
            userinfo= await model.getAllReservUser(req.session.username, "active");
            userinfo2 = await model.getAllReservUser(req.session.username, "changed");
            userinfo3 = await model.getAllReservUser(req.session.username, "confirmed");
        }
        catch(err){
            res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
        }
        allReserv = userinfo.concat(userinfo2);
        info = allReserv.concat(userinfo3);
    }
    else if(req.params.page=='history'){
        profilepage='reservhistory';
        try{
            info = await model.getReservHistory(req.session.username);
        }
        catch(err){
            res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
        }
    }
    else if(req.params.page=='royalty'){
        profilepage='royalty';
        try{
            info = await model.calcRoyaltyPoints(req.session.username);
        }
        catch(err){
            res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
        }
    }
    res.render('userprofile', {profilepage: profilepage,info:info, loggname: req.session.username,role : role, layout: 'profile_layout'});
}

async function EditFoodItem(req,res){
    let itemID = req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let img=null;
    let newitem;
    // let onmenu = req.body.onmenu;
    // let img = req.body.img;
    // let category = req.body.category;
    try{
        newitem = await model.updateFoodItem(itemID, name, price, description,img);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    res.redirect('/adminmenu');
}

async function AddFoodItem(req,res){
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let img='default.png';
    console.log(img);
    let newitem;
    // let onmenu = req.body.onmenu;
    // let img = req.body.img;
    // let category = req.body.category;
    
    try{
        newitem = await model.addFoodItem(name, price, description,img);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    res.redirect('/adminmenu');
}

async function deleteItem(req,res){
    let itemID = req.params.id;
    console.log(itemID);
    let deleteditem;
    try{
        deleteditem = await model.deleteFoodItem(itemID);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    res.redirect('/adminmenu');
}

async function removeItem(req,res){
    let itemId=req.params.id;
    // we will toggle status from true to false (onmenu)
    try{
        await model.removeFoodItem(itemId);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    res.redirect('/adminmenu');
}

async function moveToMenu(req,res){
    let itemId=req.params.id;
    // we will toggle status from true to false (onmenu)
    try{
        await model.addOnMenu (itemId);
    }
    catch(err){
        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
    }
    res.redirect('/adminmenu');
}

async function editReserv(req,res){
    let reservID = req.params.reservID;
    let time= req.body.time;
    let date = req.body.date;
    // let formattedDate = new Date(date).toISOString().split('T')[0];
    let people = req.body.people;
    let comments = req.body.comments;
    let username = req.session.username;
    let area_id = req.body.area;
    console.log(reservID,date,time,people,comments,username,area_id);
    //await model.editReservation(reservID,date,time,people,comments,username,area_id);

    let errormsg= '';
        if(req.session.loggedin==true){
            if(area_id!=undefined && time!=undefined && date!=undefined && people){
                if(checkDateTime(date,time)===1){
                    console.log('Invalid date');
                    errormsg='Invalid date';
                    res.redirect(`/reservation/edit/${reservID}?error=${encodeURIComponent(errormsg)}`);
                }
                else if(checkDateTime(date,time)===2){
                    console.log('Invalid time');
                    errormsg='Invalid time';
                    res.redirect(`/reservation/edit/${reservID}?error=${encodeURIComponent(errormsg)}`);
                }
                else{
                    let availability;
                    try{
                        availability= await model.checkAvailability(date,time,people,area_id);
                    }
                    catch(err){
                        res.render('servererror', { layout: 'main',error: err.message,stacktrace: err.stack });
                    }
                    console.log(availability);
                    if(availability==0){
                        console.log('No tables available in the entrire restaurant at this time');
                        errormsg='No tables available in the entrire restaurant at this time for the requested no. of people';
                        res.redirect(`/reservation/edit/${reservID}?error=${encodeURIComponent(errormsg)}`);
                        // var showAlert = true;
                        // var alertMessage = "No tables available";
                        // res.json({ showAlert: showAlert, message: alertMessage });
                    }
                    else if (availability===1){ 
                        await model.editReservation(date,time,people,comments,username,area_id);
                        console.log('All set, your reservation went through!');
                        errormsg='All set, your reservation went through!';  
                        res.redirect(`/reservation/edit/${reservID}?error=${encodeURIComponent(errormsg)}`);
                    // var showAlert = false;  
                    }
                    else{
                        console.log('No tables available in the desired area at this time, check other areas',area_id);
                        errormsg='No tables available in the desired area at this time, check other areas';
                        res.redirect(`/reservation/edit/${reservID}?error=${encodeURIComponent(errormsg)}`);
                    // var showAlert = true;
                    // var alertMessage = "There are tables available in the restaurant";
                    // res.json({ showAlert: showAlert, message: alertMessage });
                    }
                }
            }
            else{
                console.log('hello Please fill in all the fields');
                errormsg='Please fill in all the fields';
                res.redirect(`/reservation/edit/${reservID}?error=${encodeURIComponent(errormsg)}`);
                // var showAlert = true;
                // var alertMessage = "Please fill in all the fields";
                // res.json({ showAlert: showAlert, message: alertMessage });
            }}
            else{
                // var showAlert = false;
                console.log('Login Required to make a reservation');
                res.redirect('/login/redirect/reservation');
            }   
    
}

router.route('/').get((req,res)=>res.redirect('/home'));

// router.route('/api/menu').get(listMenu);
router.route('/menu').get(listAllFoodsRender);
router.route('/about').get(goAbout);
router.route('/login').get(checkAuthenticated,goLogin);
router.route('/login/redirect/:page').get(checkAuthenticated,goLogin);
router.route('/home').get(goHome);
// router.route('/menu').get(goMenu);
router.route('/register').get(goRegister);
router.route('/reservation').get(checkAuthenticated,goReservation);
router.route('/reservation').post(checkAuthenticated,makeResv);
router.route('/location').get(goLocation);
router.route('/adminhome').get(checkAccessRights,goAdminHome);
router.route('/adminreserv').get(checkAccessRights,goAdminReserv);
router.route('/adminmenu').get(checkAccessRights,goAdminMenu);
router.route('/assign_table/:reservID').get(checkAccessRights,goAssignTable);
router.route('/assign_table/:reservID/pickarea/:area').get(checkAccessRights,goPickArea);
router.route('/assign_table/:reservID/toggletable/:tableID/:area').get(checkAccessRights,goToggleTable);
router.route('/change_status/:reservID/:status').get(checkAuthenticated,goChangeStatus);
// router.route('/approve_resv/:reservID').get(goApproveResv);
router.route('/delete_resv/:reservID').get(checkAccessRights,goDeleteResv);
router.route('/reservation/edit/:reservID').get(checkAuthenticated,goEditResv);
router.route('/reservation/edit/:reservID').post(checkAuthenticated,editReserv);



// router.route('/userpickarea').get(goUserPickArea);
router.route('/addFoodItem').get(checkAccessRights,goAddFoodItem);
router.route('/addFoodItem').post(checkAccessRights,AddFoodItem);
router.route('/addFoodItem/:id').get(checkAccessRights,goEditFoodItem);
router.route('/addFoodItem/:id').post(checkAccessRights,EditFoodItem);
router.route('/deleteItem/:id').get(checkAccessRights,deleteItem);
router.route('/removeItem/:id').get(checkAccessRights,removeItem);
router.route('/addOnMenu/:id').get(checkAccessRights,moveToMenu);
router.route('/myprofile/page/:page').get(checkAuthenticated,goMyProfile);
router.route('/myprofile').get((req,res)=>{res.redirect('/myprofile/page/info')});
router.route('/logout').get((req,res)=>{req.session.loggedin=false; req.session.username=undefined; res.redirect('/home')});
// Επίσης έτσι: 
// Could also be done like this:
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);

router.use((req, res) => {
    res.status(404).send('<h1 style="font-family: Arial, sans-serif; color:#c17379; background-color:#181515; height: 100vh; display: flex; justify-content: center; align-items: center;">404: Page not Found</h1>');
});


const PORT=process.env.PORT || 3000;
const server = app.listen(PORT, () => { console.log(`http://127.0.0.1:${PORT}`) });
