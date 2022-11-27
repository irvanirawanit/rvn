
// ajax get product
$.ajax({
    url: url+'price',
    type: 'GET',
    headers : {
        'Authorization': 'Bearer '+localStorage.getItem('token'),
        'Content-Type': 'application/json'
    },
    success: function(response){
        dataToVariable(response);
        mappingProvider();
    }
});