const title = 'RVN';
const titlespace = 'R V N';
const description = 'RVN Pulsa';
const url = 'http://47.250.40.102:9090/';

// innerHTML every class
const titleClass = document.getElementsByClassName('title').innerHTML = title;
const titlespaceClass = document.getElementsByClassName('title-space').innerHTML = titlespace;
const descriptionClass = document.getElementsByClassName('description').innerHTML = description;

// dinamis title tag
document.title = description;

// if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
//     window.location.href = 'login.html';
// }

function logout(){
    // confirm logout
    if(confirm("Apakah anda yakin ingin logout?")){
        // clear local storage
        localStorage.clear();
        // redirect to login page
        window.location.href = "login.html";
    }
  }