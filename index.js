const express = require('express');
const app = express();
const DB = require('./database.js');

//Can take arguments for a port. 
const port = process.argv.length > 2 ? process.argv[2] : 3000;

//gives static content, which is what is in the public folder
app.use(express.static('public'));

/*
    These next functions take the paramaters of the request type,
    and a parameter function to do with the request. That arrow
    function parameter takes the request received and the response
    that will be sent, and does stuff to those.
*/

//Switches to this router when /api endpoints are used
var apiRouter = express.Router();
app.use('/api', apiRouter);


// class Spell {
//     constructor(lev, nam, rag, desc) {
//         this.level = lev;
//         this.name = nam;
//         this.range = rag;
//         this.desc = desc;
//     }
// }

// let a = new Spell(0, 'Firebolt', 120, "1d10 fire damage, ignites objects, attack roll.");
// let b = new Spell(0, 'Mage Hand', 30, "Hand can lift 5lbs and can't attack.");
// let c = new Spell(1, 'Magic Missile', 120, "Three 1d4 + 1 force rockets, auto hit.");
// let cc = new Spell (1, 'Mage Armor', 0, "Gives yourself or a friend 13+Dex armor for 8hrs.");
// let d = new Spell(3, 'Fireball', 120, "20ft radius, 8d6 fire damage, Dex save.");
// let spells = [a, b, c, cc, d];

apiRouter.get('/spells', async (_req, res) => {
    console.log('reached backend api call');
    const spells = await DB.getAllSpells();
    res.send(spells);
});



//if it is asked to be used, send index.html. Is default
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

// it can hear you
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});