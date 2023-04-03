let spells = [];
async function grabSpells() {
    const response = await fetch('/api/spells');
    spells = await response.json();
    searchSpells();
}

function getSearch() {
    return localStorage.getItem('lookup');
}

function searchSpells(){
    const searchEl = document.querySelector('#look');
    console.log("the search box: ")
    console.log(searchEl.value);
    if (searchEl.value) {
        //debug func
        console.log("exists");
        localStorage.setItem('lookup', searchEl.value);
    } else {
        //debug func
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
            descTdEl.textContent = spell.description;

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

grabSpells();