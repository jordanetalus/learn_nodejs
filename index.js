const express = require('express');
const path = require('path');
const session = require('express-session')

const app = express();
const port = 3000;

let views = 0;

app.use(session({
    secret: 'rk$GAXr{s!_%fh?l8k+s',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//les middlewres 
const logRequest = (req,res,next) => {
    console.log(`> ${new Date().toLocaleTimeString()}`);
    next()
};


app.get('/',logRequest,(req, res) =>{
    if(!req.session.views)
    {
        req.session.views = 0;
    }
    req.session.views++;
    res.send(`hello word ! vous avez consulter cette paage ${views}`);
});

app.get('/bonjour', (req, res) => {

    console.log(req.query);
    const text = `bonjour ${req.query.prenom} ${req.query.nom}!`
    res.send(text);
});

app.get('/fichier/html', (req, res) => {
    res.sendFile(path.join(__dirname,'views/page.html'));
});

app.get('/articles/:id', (req,res) => {
    console.log(req.query);
    res.send(`Article #${req.params.id} du blog`);
});

// les requêttes POST 
app.post('/form', (req,res) => {
    console.log(req.body);
    if(req.body.password=='123456'){
        res.send('connexion reuissir!');
    }
    else
    {
        res.redirect('/fichier/html?mdpIncorrect=1');
    }
    
});

app.use((req,res) => {
    res.status(404).res.send("Erreur 404,page non trouver");
});

app.listen(port, () => {
    console.log(`serveur lancer sur le port ${port}`);
});


