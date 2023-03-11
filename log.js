// const playerNameEl = document.querySelector('.player-name');
// playerNameEl.textContent = getPlayerName();

// function getPlayerName() {
//     return localStorage.getItem('userName') ?? 'Guest';
//     }

function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "index.html";
  }