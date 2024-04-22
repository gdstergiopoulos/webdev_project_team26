// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'
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

function goAdminReserv(req,res){
    res.render('adminreserv', { layout: 'admin_layout' });
}

router.route('/').get(loadPage);
router.route('/about').get(goAbout);
router.route('/login').get(goLogin);
router.route('/home').get(goHome);
router.route('/menu').get(goMenu);
router.route('/register').get(goRegister);
router.route('/reservation').get(goReservation);
router.route('/location').get(goLocation);
router.route('/adminhome').get(goAdminHome);
router.route('/adminreserv').get(goAdminReserv);


// Επίσης έτσι: 
// Could also be done like this:
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);


const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });

