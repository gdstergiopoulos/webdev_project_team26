// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'
import * as model from './model/model.js';
import session from 'express-session';
import Handlebars from './helpers.js'; 


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
    name: process.env.SESS_NAME,
    secret: process.env.SESSION_SECRET || "PynOjAuHetAuWawtinAytVunar", // κλειδί για κρυπτογράφηση του cookie
    resave: false, // δεν χρειάζεται να αποθηκεύεται αν δεν αλλάξει
    saveUninitialized: false, // όχι αποθήκευση αν δεν έχει αρχικοποιηθεί
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, //TWO_HOURS χρόνος ζωής του cookie σε ms
      sameSite: true
    }
  }));


// app.get('/assign_table', (req, res) => {
//     let area_id = req.query['area_id'];
//     console.log('area_id:', area_id); // This will log the area_id to the console
//     res.render('assign_table', { area_id: area_id });
// });



// let foods = [
//     { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
//     { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
//     { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
//     { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
//     { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
//     { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
//     { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
//     { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
//     { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
//     { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
//     { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
//     { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
//     { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
//     { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
//     { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
//     { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
//     { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
//     { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
//     { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
//     { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
//     { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
//     { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
//     { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
//     { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
//     { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
//     { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
//     { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    
//     // Add more items as needed
//   ];

// let getAllFoods = function (callback) {
//     callback(null, foods);
// };

//   let listMenu = function (req, res) {
//     getAllFoods(function (err, foods) {
//         if (err) {
//             res.send(err);
//         }
//         // console.log('res', tasks);
//         res.send(foods); // sends the object to the client
//     });
// };

let listAllFoodsRender = async function (req, res) {
    // getAllFoods(function (err, foods) {
    //     if (err) {
    //         res.send(err);
    //     }
        // console.log('foods', foods);
        // στέλνει το object "tasks" στο template "tasks"
        // sends the "tasks" object to the "tasks" template
        let foodsq= await model.getMenuActive()
        // console.log(foodsq);
        res.render('menu', { loggname: req.session.username ,foods: foodsq }); 
}

// let loadPage = function(req,res){
//     res.render('home_page',{layout: 'main'});
// }

function goAbout(req,res){
    res.render('about',{layout: 'main', loggname: req.session.username});

}

function goLogin(req,res){
    if(req.session.loggedin==true){
        res.redirect('/myprofile');
    }
    else{
        res.render('login');
    }
}

async function checkLogin(req,res){
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    //elegxos edw login klp
    // console.log(model.getuser(username));
    let user = await model.getuser(username);
    if(user.length==0){
        console.log('Create an account first');    
        res.redirect('/login');
    }
    else{
        let storedpass = user[0].password;
        let role=user[0].role;
        if (storedpass === password) {
            console.log('Logged in', username);
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
            // Handle the error or redirect to an error page
        }
    }
}

function registerUser(req,res){
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let phone = req.body.phone;
    let confpass= req.body.confpass;

    if(password!=confpass){
        console.log('Passwords do not match');
        res.redirect('/register');
    }
    else{
        model.adduser(username, password, firstname, lastname, email, phone);
        res.redirect('/login');
    }
}

async function makeResv(req,res){
    let time=req.body.time;
    let date = req.body.date;
    let people = req.body.people;
    let comments = req.body.comments;
    let username = req.session.username;
    let area_id = req.body.area;
    
    if(req.session.loggedin==true){
        if(area_id!=undefined && time!=undefined && date!=undefined && people){
            await model.addReservation(date,time,people,comments,username,area_id);
            res.redirect('/reservation');
        }
        else{
            console.log('Please fill in all the fields');
   
            res.redirect('/reservation');
        }}
    else{
        console.log('Login Required to make a reservation');
        res.redirect('/login');
    }

}

router.route('/login').post(checkLogin);
router.route('/register').post(registerUser);
router.route('/reservation').post(makeResv);

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

// function goMenu(req,res){
//     res.render('menu');

// }

function goRegister(req,res){
    res.render('register');

}

function goReservation(req,res){
    if(req.session.loggedin===false){
        res.redirect('/login');
    }
    else{
        console.log(req.session.loggedin)
        res.render('reservation',{layout: 'main', loggname: req.session.username});
    }
}


function goLocation(req,res){
    res.render('location', { layout: 'loc_layout', loggname: req.session.username});
}

function goAdminHome(req,res){
    if(req.session.role!='admin'){
        console.log('You are not an admin');
        res.redirect('/home');
    }
    else{
        res.render('admin_home', {loggname: req.session.username,layout: 'admin_layout' });
    }
    
}

async function goAdminMenu(req,res){
    if(req.session.role!='admin'){
        console.log('You are not an admin');
        res.redirect('/home');
    }
    else{
        let foodsactive= await model.getMenuActive();
        let foodsinactive= await model.getMenuInactive();
        res.render('admin_menu', { layout: 'admin_layout',loggname: req.session.username,foodsactive: foodsactive, foodsinactive: foodsinactive});
    }
}

function goAdminReserv(req,res){
    if(req.session.role!='admin'){
        console.log('You are not an admin');
        res.redirect('/home');
    }
    else{
        res.render('adminreserv', {loggname: req.session.username,layout: 'admin_layout' });
    }
}

function goAssignTable(req,res){
    let area_id;
    if (!req.query['area_id']) {
        area_id = 'insidemain';
    }
    else {
        area_id = req.query['area_id'];
    }
    // console.log('area_id:', area_id); // This will log the area_id to the console
    res.render('assign_table', { area_id: area_id,loggname: req.session.username,layout: 'admin_layout' });
}
function goPickArea(req,res){
    let area_id = req.query['id'];
    res.redirect('/assign_table?area_id=' + area_id);
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
    let fooditeminfo= await model.getFoodItemInfo(req.params.id);
    console.log(fooditeminfo);
    res.render('addFoodItem', { method: 'edit' ,fooditeminfo: fooditeminfo,loggname: req.session.username,layout: 'admin_layout' });
}


async function goMyProfile(req,res){
    let profilepage;
    //take username from session
    let userinfo= await model.getProfileInfo(req.session.username);
    //update reserv statys
    // await model.updateReservStatus();
    // console.log(info);
    if(req.params.page=='info'){
        profilepage='userprofile';
    }
    else if(req.params.page=='reservations'){
        profilepage='userreserv';
        userinfo= await model.getActiveReserv(req.session.username);
    }
    else if(req.params.page=='history'){
        profilepage='reservhistory';
        userinfo= await model.getReservHistory(req.session.username);
    }
    res.render('userprofile', {profilepage: profilepage,info: userinfo, loggname: req.session.username,layout: 'profile_layout'});
}

async function EditFoodItem(req,res){
    let itemID = req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let img=null;
    // let onmenu = req.body.onmenu;
    // let img = req.body.img;
    // let category = req.body.category;
    let newitem = await model.updateFoodItem(itemID, name, price, description,img);
    res.redirect('/adminmenu');
}

async function AddFoodItem(req,res){
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let img='default.png';
    console.log(img);
    // let onmenu = req.body.onmenu;
    // let img = req.body.img;
    // let category = req.body.category;
    let newitem = await model.addFoodItem(name, price, description,img);
    res.redirect('/adminmenu');
}

async function deleteItem(req,res){
    let itemID = req.params.id;
    console.log(itemID);
    let deleteditem = await model.deleteFoodItem(itemID);
    res.redirect('/adminmenu');
}

async function removeItem(req,res){
    let itemId=req.params.id;
    // we will toggle status from true to false (onmenu)
    let removeditem = await model.removeFoodItem(itemId);
    res.redirect('/adminmenu');
}

async function moveToMenu(req,res){
    let itemId=req.params.id;
    // we will toggle status from true to false (onmenu)
    let removeditem = await model.addOnMenu (itemId);
    res.redirect('/adminmenu');
}


router.route('/').get((req,res)=>res.redirect('/home'));
// router.route('/api/menu').get(listMenu);
router.route('/menu').get(listAllFoodsRender);
router.route('/about').get(goAbout);
router.route('/login').get(goLogin);
router.route('/home').get(goHome);
// router.route('/menu').get(goMenu);
router.route('/register').get(goRegister);
router.route('/reservation').get(goReservation);
router.route('/location').get(goLocation);
router.route('/adminhome').get(goAdminHome);
router.route('/adminreserv').get(goAdminReserv);
router.route('/adminmenu').get(goAdminMenu);
router.route('/assign_table').get(goAssignTable);
router.route('/pickarea').get(goPickArea);
// router.route('/userpickarea').get(goUserPickArea);
router.route('/addFoodItem').get(goAddFoodItem);
router.route('/addFoodItem').post(AddFoodItem);
router.route('/addFoodItem/:id').get(goEditFoodItem);
router.route('/addFoodItem/:id').post(EditFoodItem);
router.route('/deleteItem/:id').get(deleteItem);
router.route('/removeItem/:id').get(removeItem);
router.route('/addOnMenu/:id').get(moveToMenu);
router.route('/myprofile/page/:page').get(goMyProfile);
router.route('/myprofile').get((req,res)=>{res.redirect('/myprofile/page/info')});
router.route('/logout').get((req,res)=>{req.session.loggedin=false; req.session.username=undefined; res.redirect('/home')});
// Επίσης έτσι: 
// Could also be done like this:
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);

const PORT=process.env.PORT || 3000;
const server = app.listen(PORT, () => { console.log(`http://127.0.0.1:${PORT}`) });
