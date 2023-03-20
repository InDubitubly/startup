function loadSpells(){
    let results = [];

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