function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Guestie';
    }

function setName() {
    const playerNameEl = document.getElementById("user");
    const logEl = document.getElementById('login');
    playerNameEl.textContent = getPlayerName();
    if (getPlayerName() ===  'Guestie') {
        logEl.onclick = login;
        logEl.textContent = 'Log In';
    } else {
        logEl.onclick = logout;
        logEl.textContent = 'Log Out';
    }
}

// function logout() {
//     alert("You've been logged out of account: "+ localStorage.getItem('userName'));
//     localStorage.setItem('userName', 'none');
//     setName();
// }

async function logout() {
    await fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
    alert("You've been logged out of account: "+ localStorage.getItem('userName'));
    localStorage.setItem('userName', 'Guestie');
    setName();
  }

function login(){
    window.location.href = "log.html";
}



setName();