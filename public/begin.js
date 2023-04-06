function search() {
    // const searchEl = document.querySelector('#search_val');
    // console.log("Val entered: " + searchEl.value);
    // localStorage.setItem('lookup', searchEl.value);
    window.location.href = "search.html";
}

function displayRandomSpell(spell){
    const listEl = document.querySelector('#random');

    const levelLi = document.createElement('li');
    const nameLi = document.createElement('li');
    const descLi = document.createElement('li');
    const bonus = document.createElement('li');

    levelLi.textContent = `Level: ${spell.level}`;
    nameLi.textContent = `Name: ${spell.name}`;
    descLi.textContent = `${spell.description}`;
    bonus.textContent = "Brought to you by WebSockets!";

    listEl.append(levelLi);
    listEl.append(nameLi);
    listEl.append(descLi);
    listEl.append(bonus);
}

class Socket {
    socket;
    constructor() {
        this.setWebSocket();
    }

    setWebSocket() {
        const protocol = (window.location.protocol === 'http:' ? 'ws' : 'wss');
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
            console.log('ws connected');
            this.socket.send('awaiting a random spell');
        };
        this.socket.onclose = (event) => {
            console.log('ws disconnected');
        };
        this.socket.onmessage = async (event) => {
            console.log(`received: ${event}`);
            const msg = JSON.parse(event.data);
            console.log(`which is: ${msg}`);
            console.log('displaying random spell');
            displayRandomSpell(msg[0]);
        }
    }

}

const connect = new Socket;


