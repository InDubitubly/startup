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
let d = new Spell(3, 'Fireball', 120, "20ft radius, 8d6 fire damage, Dex save.");
let spells = [a, b, c, d];


function loadSpells(){
    let results = spells;

    const tableBodyEl = document.querySelector('#results');

    if (results.length) {
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

loadSpells();