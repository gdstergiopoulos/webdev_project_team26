// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'

import Handlebars from './helpers.js'; // Import Handlebars from helpers.js


const app = express()
const router = express.Router();
const port = process.env.PORT || '3000';

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

// Όρισε δύο διαδρομές
// Define two routes

// app.get('/assign_table', (req, res) => {
//     let area_id = req.query['area_id'];
//     console.log('area_id:', area_id); // This will log the area_id to the console
//     res.render('assign_table', { area_id: area_id });
// });

let foods = [
    { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
    { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
    { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
    { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
    { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
    { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
    { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
    { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
    { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
    { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
    { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
    { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
    { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
    { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
    { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
    { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
    { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    { name: 'Pizza Margherita Fresca', price: '$10', img: "/media/menu/pizza.png", description:"Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice."},
    { name: 'Burger Supreme', price: '$8', img: "/media/menu/burger.png" , description: "Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more."},
    { name: 'Pita Gyros', price: '$12', img: "/media/menu/gyros.png" , description:"Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses."},
    
    // Add more items as needed
  ];

let getAllFoods = function (callback) {
    callback(null, foods);
};

  let listMenu = function (req, res) {
    getAllFoods(function (err, foods) {
        if (err) {
            res.send(err);
        }
        // console.log('res', tasks);
        res.send(foods); // sends the object to the client
    });
};

let listAllFoodsRender = function (req, res) {
    getAllFoods(function (err, foods) {
        if (err) {
            res.send(err);
        }
        console.log('foods', foods);
        // στέλνει το object "tasks" στο template "tasks"
        // sends the "tasks" object to the "tasks" template
        res.render('menu', { foods: foods }); 
    });
}

let loadPage = function(req,res){
    res.render('home_page',{layout: 'main'});
}

function goAbout(req,res){
    res.render('about');

}

function goLogin(req,res){
    res.render('login');

}

function goHome(req,res){
    res.render('home_page');

}

function goMenu(req,res){
    res.render('menu');

}

function goRegister(req,res){
    res.render('register');

}

function goReservation(req,res){
    res.render('reservation');

}

function goLocation(req,res){
    res.render('location', { layout: 'loc_layout' });
}

function goAdminHome(req,res){
    res.render('admin_home', { layout: 'admin_layout' });
}

function goAdminMenu(req,res){
    res.render('admin_menu', { layout: 'admin_layout' });
}

function goAdminReserv(req,res){
    res.render('adminreserv', { layout: 'admin_layout' });
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
    res.render('assign_table', { area_id: area_id, layout: 'admin_layout' });
}
function goPickArea(req,res){
    let area_id = req.query['id'];
    res.redirect('/assign_table?area_id=' + area_id);
}

function goAddEditFoodItem(req,res){
    res.render('addFoodItem', { layout: 'admin_layout' });
}

function goMyProfile(req,res){
    let profilepage;
    if(req.params.page=='info'){
        profilepage='userprofile';
    }
    else if(req.params.page=='reservations'){
        profilepage='userreserv';
    }
    else if(req.params.page=='history'){
        profilepage='reservhistory';
    }
    res.render('userprofile', {profilepage: profilepage, layout: 'profile_layout' });
}


router.route('/').get(loadPage);
router.route('/api/menu').get(listMenu);
router.route('/menu').get(listAllFoodsRender);
router.route('/about').get(goAbout);
router.route('/login').get(goLogin);
router.route('/home').get(goHome);
router.route('/menu').get(goMenu);
router.route('/register').get(goRegister);
router.route('/reservation').get(goReservation);
router.route('/location').get(goLocation);
router.route('/adminhome').get(goAdminHome);
router.route('/adminreserv').get(goAdminReserv);
router.route('/adminmenu').get(goAdminMenu);
router.route('/assign_table').get(goAssignTable);
router.route('/pickarea').get(goPickArea);
router.route('/addFoodItem').get(goAddEditFoodItem);
router.route('/myprofile/page/:page').get(goMyProfile);
router.route('/myprofile').get((req,res)=>{res.redirect('/myprofile/page/info')});
// Επίσης έτσι: 
// Could also be done like this:
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);


const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });
