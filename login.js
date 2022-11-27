
function loginPassword(){
    // get value from input
    const phone_number = document.getElementById('phone_number').value;
    const password = document.getElementById('password').value;
    if(phone_number.length == 0){
        alert('Please enter your phone number');
        return;
    }
    if(password.length == 0){
        alert('Please enter your password');
        return;
    }
    if(isNaN(phone_number)){
        alert('Please enter a valid phone number');
        return;
    }
    // ajax
    $.ajax({
        url: url+'login',
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
            phone_number: phone_number,
            password: password
        }),
        beforeSend: function(){
            $('#btn-login').attr('disabled', true);
            $('#btn-login').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Login...');
        },
        success: function(response){
            $('#btn-login').attr('disabled', false);
            $('#btn-login').html('Login');
            if(response.succes == "true"){
                // set token to local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('phone_number', phone_number);
                // redirect to index page
                window.location.href = "index.html";
            }else{
                // show error message
                alert(response.message);
            }
        },
        error: function(response){
            $('#btn-login').attr('disabled', false);
            $('#btn-login').html('Login');
            // show error message
            alert(response.responseJSON.message);
        },
        fail: function(response){
            $('#btn-login').attr('disabled', false);
            $('#btn-login').html('Login');
            // show error message
            alert(response.responseJSON.message);
        }
    });
}


function loginRequestOtp(){
    // get value from input
    const phone_number = document.getElementById('phone_number').value;
    if(phone_number.length == 0){
        alert('Please enter your phone number');
        return;
    }
    // if phone number is alfabetic
    if(isNaN(phone_number)){
        alert('Please enter a valid phone number');
        return;
    }
    // ajax
    $.ajax({
        url: url+'start',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            phone_number: phone_number,
            tipe: 'start'
        }),
        beforeSend: function(){
            $('#btn-request-otp').attr('disabled', true);
            $('#btn-request-otp').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Requesting...');
        },
        success: function(response){
            $('#btn-request-otp').attr('disabled', false);
            $('#btn-request-otp').html('Request');
            // show success message innerHTML
            document.getElementById('pesan-request-otp').innerHTML = '<code>'+response.message+'</code>';
        },
        fail: function(response){
            $('#btn-request-otp').attr('disabled', false);
            $('#btn-request-otp').html('Request');
            // show error message
            alert(response.responseJSON.message);
        },
        error: function(response){
            // show error message
            alert(response.responseJSON.message);
            $('#btn-request-otp').attr('disabled', false);
            $('#btn-request-otp').html('Request');
        }
    });
}

function loginOtpConfirm(){
    // get value from input
    const phone_number = document.getElementById('phone_number').value;
    const otp = document.getElementById('otp').value;
    if(phone_number.length == 0){
        alert('Please enter your phone number');
        return;
    }
    // if phone number is alfabetic
    if(isNaN(phone_number)){
        alert('Please enter a valid phone number');
        return;
    }
    if(otp.length != 6){
        alert('Please enter a valid OTP code');
        return;
    }
    // ajax
    $.ajax({
        url: url+'start/verify',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            phone_number: phone_number,
            code: otp,
            tipe: 'start'
        }),
        beforeSend: function(){
            $('#btn-otp-confirm').attr('disabled', true);
            $('#btn-otp-confirm').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Verifying...');
        },
        success: function(response){
            $('#btn-otp-confirm').attr('disabled', false);
            $('#btn-otp-confirm').html('Verify');
            console.log(response);
            if(response.success == "true"){
                // set token to local storage
                localStorage.setItem('token', response.token);
                // redirect to index page
                window.location.href = "index.html";
            }else{
                // show error message
                alert(response.message);
            }
            // set token to local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('phone_number', phone_number);
            // redirect to index page
            window.location.href = "index.html";
        },
        fail: function(response){
            $('#btn-otp-confirm').attr('disabled', false);
            $('#btn-otp-confirm').html('Verify');
            // show error message
            alert(response.responseJSON.message);
        },
        error: function(response){
            $('#btn-otp-confirm').attr('disabled', false);
            $('#btn-otp-confirm').html('Verify');
            // show error message
            alert(response.responseJSON.message);
        }
    });

}