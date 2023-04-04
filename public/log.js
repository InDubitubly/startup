// function login() {
//     const nameEl = document.querySelector("#name");
//     localStorage.setItem("userName", nameEl.value);
//     window.location.href = "index.html";
//   }

async function login(){
  loginOrCreate(`/api/auth/login`);
}

async function create(){
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#name')?.value;
  const password = document.querySelector('#code')?.value;
  //send a JSON object
  const response = await fetch(endpoint,{
    method: 'post',
    body: JSON.stringify({ name: userName, password: password}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
  });
  const body = await response.json();

  if (response?.status === 200) {
    //set local name like usual
    localStorage.setItem('userName', userName);
    window.location.href = "search.html";
  } else {
    //wrong wrong
    alert(`Error: ${body.msg}`);
  }
}

async function getUser(name) {
  const response = await fetch(`/api/user/${name}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}
