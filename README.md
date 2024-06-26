<h1>Εφαρμογή Υποστήριξης Εφαρμογών</h1>
<h4><a href="https://drive.google.com/file/d/1uPT134T_9rEOLmMgticgMFhgCQdvDBlO/view?usp=sharing">Demo Video</a></h4>
Υλοποιήθηκε στα πλάισια του μαθήματος: <b>Προγραμματισμός Διαδυκτίου.</b><br><br>


<b>Στεργιόπουλος Γεώργιος</b><br>
<b>Πανουργιάς Αντώνιος</b><br>

Υλοποιήθηκε με node.js/express/html/css και χρήση Handlebars.<br>
<img src="./public/media/rep/used.png">

<h2>Η εφαρμογή μας online.</h2>
<h3>Η εφαρμογή μας έγινε host στο fly.io, μέσω του δωρεάν trial που παρέχεται (δείτε "ΠΡΟΣΟΧΗ" πιο κάτω)</h3>
<h4><a href="https://fagadiko.fly.dev">Δοκιμάστε την</a></h4>
<img src="./public/media/rep/online.png">

Μπορείτε να περιηγείθειτε στην εφαρμογή με όποιον τρόπο θέλετε.<br>
Σε περίπτωση που δεν θέλετε να δημιουργήσετε λογαριασμό μπορείτε να αξιοποιήσετε τον demo user:<br>

<b>User</b><br>
<b>username: </b>anton<br>
<b>password: </b>123456 <br>

ή για να δείτε τις δυνατότητες του διαχειριστή:<br><br>
<b>Admin User</b><br>
<b>username: </b>gster<br>
<b>password: </b>123456<br>

<h3><b>ΠΡΟΣΟΧΗ:</b></h3>
Λόγο του δωρεάν πλάνου της fly.io, η ΒΔ, μετά από κάποιο χρονικό διάστημα κλείνει με αποτέλεσμα να μην είναι δυνατή η online, χρήση της εφαρμογής χωρίς
να κάνουμε εμείς, ως διαχειριστές, του server στο fly.io start machine  manualy .

Αν θέλετε να δείτε την online version και δεν λειτουργεί η ΒΔ επικοινωνήστε:<br>
    gstergiopoulos@ac.upatras.gr<br>
    up1083996@ac.upatras.gr<br>

Για αυτό τον λόγο παρέχουμε την παρακάτω εναλλακτική: <br>

<h2>Οδηγίες για εκτέλεση της εφαρμογής <b>ΤΟΠΙΚΑ</b> σε υπολογιστή με εγκατεστημένη NodeJS:</h2>
Αρχικά, κατεβάστε τον κώδικα απο αυτό το repository στον υπολογιστή σας και αποθηκεύσετε τον τοπικά.
<h3>Για να τρέξει η εφαρμογή πρέπει να εκτελέστουν οι παρακάτω εντολές βρισκόμενοι στο path που έχετε τοποθετήσει τον πηγαιό κώδικα:</h3>
<ul>
    <li>npm install</li>
    <li>npm audit fix --force</li>
    <li>nodemon ή εναλλακτικά node app.mjs ή npm run watch</li>
</ul>
Για να είναι όμως πλήρως λειτουργική χρειάζεται να στηθεί μια τοπική ΒΔ:
<ul>
    <li>Κατεβάστε το pgAdmin 4, συμπεριλαμβάνοντας την εγκατάστη της PostgreSQL</li>
    <li>Στο pgAdmin δημιουργείστε μια ΒΔ, και ονομάστε την <b>fagadiko</b> με κωδικό 123456.</li>
    <li>Κάντε δεξί κλίκ στην βάση αυτή και επιλέξτε Restore.. (Για να λειτουργήσει το Restore πρέπει η ΒΔ να ονομαστεί οπωσδήποτε fagadiko</li>
    <img src="./public//media/rep/restore.png">
    <li>Στο restore window, επιλέξτε να γίνει μέσω του αρχείου localpostgre.sql</li>
    <img src="./public//media/rep/selectlocalpostgre.png">
    <li>Ελέγξτε μέσω του pgAdmin, οτι η ΒΔ, στο schema της έχει το παρακάτω schema αλλά και εγγραφές.</li>
    <img src="./public//media/rep/schema.png">
    <li>Δείτε για έναν πίνακα πχ τον TABLE, ότι έχουν εισαχθεί και τα δεδομένα</li>
    <img src="./public//media/rep/randomtabledata.png">
</ul>
Αν επιλέξατε άλλα χαρακτηριστικά για την ΒΔ, από αυτά που φαίνονται παρακάτω, δημιουργήστε ένα <b>.env</b> αρχείο βάζοντας στο αντίστοιχο πεδίο τις τιμές που επιλέξατε.
Το .env αρχείο θα έχει την παρακάτω μορφή, κάνοντας αλλαγές όπου κρίνετε απαραίτητο:
<span>
<br><br>
DB_HOST=localhost<br>
DB_PORT=5432<br>
DB_NAME=fagadiko<br>
DB_USER=postgres<br>
DB_PASSWORD=123456<br>
PORT=3000</span><br>
<br>
Σε περίπτωση που επιλέξατε άλλα στοιχεία, συμπληρώστε τα δικά σας.
Αφότου έχει η ΒΔ δημιουργηθεί οπώς είπαμε παραπάνω, ξανα τρέξτε την εφαρμογή και περιηγηθείτε με τον τρόπο που επιθυμείτε (δημιουργεία λογαριασμού κλπ).
Για την καλύτερη σας περιήγηση συνιστούμε την χρήση του demo user:<br><br>
<b>User:</b><br>
                                                    <b>username: </b>test<br>
                                                    <b>password: </b>test<br><br>
Για την περιήγηση ως διαχειριστής συνιστούμε την χρήση του Admin user<br><br>
<b>Admin User:</b><br>
                                                    <b>username: </b>gster<br>
                                                    <b>password: </b>123456<br>
                                        
 



