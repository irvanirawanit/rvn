const title = 'RVN';
const titlespace = 'R V N';
const description = 'RVN Pulsa';
const url = 'http://47.250.40.102:9090/';

// innerHTML every class
const titleClass = document.getElementsByClassName('title').innerHTML = title;
const titlespaceClass = document.getElementsByClassName('title-space').innerHTML = titlespace;
const descriptionClass = document.getElementsByClassName('description').innerHTML = description;

// javascript document ready without jquery
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('profile-username').innerHTML = localStorage.getItem('phone_number');
});

// dinamis title tag
document.title = description;

if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
    if (window.location.href.indexOf('login.html') === -1) {
        window.location.href = 'login.html';
    }
}

function logout(){
    // confirm logout
    if(confirm("Apakah anda yakin ingin logout?")){
        // clear local storage
        localStorage.clear();
        // redirect to login page
        window.location.href = "login.html";
    }
}

function requestUpdatePassword(){
    // get value from input
    const password = document.getElementById('password').value;
    const password_confirmation = document.getElementById('password_confirmation').value;
    if(password.length == 0){
        alert('Please enter your password');
        return;
    }
    if(password_confirmation.length == 0){
        alert('Please enter your password confirmation');
        return;
    }
    if(password != password_confirmation){
        alert('Password confirmation does not match');
        return;
    }
    // ajax
    $.ajax({
        url: url+'user/password',
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        data: JSON.stringify({
            password: password,
            password_confirmation: password_confirmation
        }),
        beforeSend: function(){
            $('#btn-update-password').attr('disabled', true);
            $('#btn-update-password').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Updating...');
        },
        success: function(response){
            $('#btn-update-password').attr('disabled', false);
            $('#btn-update-password').html('Update');
            // show success message
            alert(response.message);
        },
        error: function(response){
            $('#btn-update-password').attr('disabled', false);
            $('#btn-update-password').html('Update');
            // show error message
            alert(response.responseJSON.message);
        }
    });
}

function getProduct(){
    // ajax
    $.ajax({
        url: url+'product',
        type: 'GET',
        headers: { 'Authorization': 'Bearer '+localStorage.getItem('token') },
        success: function(response){
            // save response to local storage
            localStorage.setItem('product', JSON.stringify(response));
        },
        error: function(response){
            // show error message
            alert(response.responseJSON.message);
        }
    });
}

