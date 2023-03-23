class Spell {
    constructor(lev, nam, rag, desc) {
        this.level = lev;
        this.name = nam;
        this.range = rag;
        this.desc = desc;
    }
}

let a = new Spell(0, 'Firebolt', 120, "1d10 fire damage, ignites objects, attack roll.");
let b = new Spell(0, 'Mage Hand', 30, "Hand can lift 5lbs and can't attack.");
let c = new Spell(1, 'Magic Missile', 120, "Three 1d4 + 1 force rockets, auto hit.");
let cc = new Spell (1, 'Mage Armor', 0, "Gives yourself or a friend 13+Dex armor for 8hrs.");
let d = new Spell(3, 'Fireball', 120, "20ft radius, 8d6 fire damage, Dex save.");
let spells = [a, b, c, cc, d];

function getSearch() {
    return localStorage.getItem('lookup');
}

function searchSpells(){
    const searchEl = document.querySelector('#look');
    console.log("the search box: ")
    console.log(searchEl.value);
    if (searchEl.value) {
        console.log("exists");
        localStorage.setItem('lookup', searchEl.value);
    } else {
        console.log("no val");
        localStorage.setItem('lookup', "");
    }
    const look = new RegExp(getSearch(), 'i');
    let results = spells.filter((spell) => look.test(spell.name));
    console.log(results);
    loadSpells(results);
}


function loadSpells(results = spells){
    const tableBodyEl = document.querySelector('#results');

    if (results.length) {
        removeAllChildNodes(tableBodyEl);
        for (const [i, spell] of results.entries()) {
            const levelTdEl = document.createElement('td');
            const nameTdEl = document.createElement('td');
            const rangeTdEl = document.createElement('td');
            const descTdEl = document.createElement('td');

            levelTdEl.textContent = spell.level;
            nameTdEl.textContent = spell.name;
            rangeTdEl.textContent = spell.range;
            descTdEl.textContent = spell.desc;

            const rowEl = document.createElement('tr');
            rowEl.appendChild(levelTdEl);
            rowEl.appendChild(nameTdEl);
            rowEl.appendChild(rangeTdEl);
            rowEl.appendChild(descTdEl);

            tableBodyEl.appendChild(rowEl);
        }
    } else {
        tableBodyEl.innerHTML = '<tr><td colSpan=4>No results</td></tr>'
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

searchSpells();