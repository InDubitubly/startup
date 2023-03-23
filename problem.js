function getPlayerName() {
    return localStorage.getItem('userName');
    }

function setName() {
    const playerNameEl = document.getElementById("user");
    const logEl = document.getElementById('login');
    if (getPlayerName() ===  'none' || getPlayerName() == null) {
        playerNameEl.textContent = "Guestie";
        logEl.onclick = login;
        logEl.textContent = 'Log In';
    } else {
        playerNameEl.textContent = getPlayerName();
        logEl.onclick = logout;
        logEl.textContent = 'Log Out';
    }
}

function logout() {
    alert("You've been logged out of account: "+ localStorage.getItem('userName'));
    localStorage.setItem('userName', 'none');
    setName();
}

function login(){
    window.location.href = "log.html";
}



setName();