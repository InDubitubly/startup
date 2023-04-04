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

    levelLi.textContent = `Level: ${spell.level}`;
    nameLi.textContent = `Name: ${spell.name}`;
    descLi.textContent = `${spell.description}`;

    listEl.append(levelLi);
    listEl.append(nameLi);
    listEl.append(descLi);
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
            // const msg = JSON.parse(await event.data.text);
            console.log(`received: ${event}`)
            console.log('displaying random spell');
            // displayRandomSpell(msg);
        }
    }

}

const connect = new Socket;


