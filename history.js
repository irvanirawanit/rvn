var data = [];
// ajax get product
$.ajax({
    url: url+'orders',
    type: 'GET',
    headers : {
        'Authorization': 'Bearer '+localStorage.getItem('token'),
        'Content-Type': 'application/json'
    },
    success: function(response){
        data = response.data;
        mappingListOrder();
    },
    error: function(response){
        console.log(response);
    },
    complete: function(response){
        console.log(response);
    },
    fail: function(response){
        console.log(response);
    }
});


// mapping list order
function mappingListOrder(){
    var html = '';
    for(var i=0; i<data.length; i++){
        if(data[i].status == 1){
            label = '<span class="badge bg-info">request</span>';
        }
        if(data[i].status == 2){
            label = '<span class="badge bg-danger">gagal</span>';
        }
        if(data[i].status == 3){
            label = '<span class="badge bg-warning">refund</span>';
        }
        if(data[i].status == 4){
            label = '<span class="badge bg-success">sukses</span>';
        }
        formatdate = new Date(data[i].CreatedAt);
        formatdate = formatdate.getDate()+'-'+(formatdate.getMonth()+1)+'-'+formatdate.getFullYear()+' '+formatdate.getHours()+':'+formatdate.getMinutes()+':'+formatdate.getSeconds();
        html += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'+
                    '<div class="card card-primary card-outline">'+
                        '<div class="card-body">'+
                            '<h5 class="card-title">'+data[i].harga.description+'</h5>'+
                            '<p class="card-text" style="margin-top:5px;margin-bottom:5px;color:green;">'+
                            'Rp. '+data[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+
                            '</p>'+
                            '<code>'+formatdate+'</code>'+
                            '<br>'+
                            label+
                        '</div>'+
                    '</div>'+
                '</div>';
    }
    $('#listorder').html(html);
}