const express = require('express');

const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.get('/',(req, res) =>{
    res.send('hello word !');
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
})

app.listen(port, () => {
    console.log(`serveur lancer sur le port ${port}`);
});