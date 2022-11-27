var harga = [];
var provider = [];
var provider_sub = [];
var providerSelected = '';
var provider_subSelected = '';
var tujuan = '';
var cart = {code:'',phone:'',id_cust:'',no:'1',note:'',pin:''};
var listProviderPulsa = [
    {'nomor': '811', 'operator': 'HALO'},
    {'nomor': '812', 'operator': 'TELKOMSEL'},
    {'nomor': '813', 'operator': 'TELKOMSEL'},
    {'nomor': '821', 'operator': 'TELKOMSEL'},
    {'nomor': '822', 'operator': 'TELKOMSEL'},
    {'nomor': '852', 'operator': 'TELKOMSEL'},
    {'nomor': '853', 'operator': 'TELKOMSEL'},
    {'nomor': '823', 'operator': 'TELKOMSEL'},
    {'nomor': '851', 'operator': 'TELKOMSEL'},
    {'nomor': '814', 'operator': 'INDOSAT'},
    {'nomor': '815', 'operator': 'INDOSAT'},
    {'nomor': '816', 'operator': 'INDOSAT'},
    {'nomor': '855', 'operator': 'INDOSAT'},
    {'nomor': '856', 'operator': 'INDOSAT'},
    {'nomor': '857', 'operator': 'INDOSAT'},
    {'nomor': '858', 'operator': 'INDOSAT'},
    {'nomor': '817', 'operator': 'XL'},
    {'nomor': '818', 'operator': 'XL'},
    {'nomor': '819', 'operator': 'XL'},
    {'nomor': '859', 'operator': 'XL'},
    {'nomor': '877', 'operator': 'XL'},
    {'nomor': '878', 'operator': 'XL'},
    {'nomor': '838', 'operator': 'AXIS'},
    {'nomor': '831', 'operator': 'AXIS'},
    {'nomor': '832', 'operator': 'AXIS'},
    {'nomor': '833', 'operator': 'AXIS'},
    {'nomor': '895', 'operator': 'TRI'},
    {'nomor': '896', 'operator': 'TRI'},
    {'nomor': '897', 'operator': 'TRI'},
    {'nomor': '898', 'operator': 'TRI'},
    {'nomor': '899', 'operator': 'TRI'},
    {'nomor': '881', 'operator': 'SMART'},
    {'nomor': '882', 'operator': 'SMART'},
    {'nomor': '883', 'operator': 'SMART'},
    {'nomor': '884', 'operator': 'SMART'},
    {'nomor': '885', 'operator': 'SMART'},
    {'nomor': '886', 'operator': 'SMART'},
    {'nomor': '887', 'operator': 'SMART'},
    {'nomor': '888', 'operator': 'SMART'},
    {'nomor': '889', 'operator': 'SMART'}
  ];

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


// mapping product
function dataToVariable(response){
    harga = response;
    for(var i=0; i<response.length; i++){
        if(provider.indexOf(response[i].provider) == -1){
            provider.push(response[i].provider);
        }
    }
    for(var i=0; i<provider.length; i++){
        for(var j=0; j<response.length; j++){
            if(response[j].provider == provider[i]){
                obj = {
                    provider: response[j].provider,
                    provider_sub: response[j].provider_sub
                }
                if(provider_sub.map(function(e) { return e.provider+' '+e.provider_sub; }).indexOf(response[j].provider+' '+response[j].provider_sub) == -1){
                    provider_sub.push(obj);
                }
            }
        }
    }
}

// mapping provider
function mappingProvider(filter = 'all'){
    var html = '';
    for(var i=0; i<provider.length; i++){
        if(filter == 'all'){
            html += '<li class="nav-item"><a class="nav-link" data-toggle="tab" onclick="mappingProviderSub('+"'"+provider[i]+"'"+')">'+provider[i]+'</a></li>';
        }else{
            if(provider[i].toLowerCase().indexOf(filter.toLowerCase()) != -1){
                html += '<li class="nav-item"><a class="nav-link" data-toggle="tab" onclick="mappingProviderSub('+"'"+provider[i]+"'"+')">'+provider[i]+'</a></li>';
            }
        }
    }
    $('#listprovider').html(html);
}

// mapping provider sub
function mappingProviderSub(param){
    var html = '';
    for(var i=0; i<provider_sub.length; i++){
        if(provider_sub[i].provider == param){
            html += '<li class="nav-item"><a class="nav-link" data-toggle="tab" onclick="triggerMappingListProduct('+"'"+param+'-'+provider_sub[i].provider_sub+"'"+')">'+provider_sub[i].provider_sub+'</a></li>';
        }
    }
    $('#listprovidersub').html(html);
    providerSelected = param;
    provider_subSelected = 'All';
    mappingListProduct();
}

// mapping list product
function mappingListProduct(){
    // data sort by price
    var data = harga.sort(function(a, b) {
        return a.price - b.price;
    });
    

    var html = '';
    if(provider_subSelected == 'All'){
        for(var i=0; i<data.length; i++){
            if(data[i].provider == providerSelected){
                html += generateElementBoxProduct(data[i].description, data[i].price, data[i].provider, data[i].provider_sub, data[i].code);
            }
        }
    }else{
        for(var i=0; i<data.length; i++){
            if(data[i].provider == providerSelected && data[i].provider_sub == provider_subSelected){
                html += generateElementBoxProduct(data[i].description, data[i].price, data[i].provider, data[i].provider_sub, data[i].code);
            }
        }
    }
    $('#listproduct').html(html);
}

// trigger mapping list product
function triggerMappingListProduct(param){
    // string to array
    arr = param.split('-');
    providerSelected = arr[0];
    provider_subSelected = arr[1];

    // mapping list product
    mappingListProduct();
}

function generateElementBoxProduct(description, price, provider, provider_sub, product_id){
    var html = '';
    html += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'+
                '<div class="card card-primary card-outline">'+
                    '<div class="card-body">'+
                        '<h5 class="card-title" style="margin-bottom: 5px;">'+description+' <code><small> ('+provider+' '+provider_sub+')</small></code></h5>'+
                        '<p class="card-text">'+
                           'Rp. '+ price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        '</p>'+
                        '<button type="button" class="btn btn-sm btn-success float-left" data-toggle="modal" data-target="#cart" onclick="addCart('+"'"+product_id+"'"+')">Beli</button>'+
                    '</div>'+
                '</div>'+
            '</div>';
    return html;
}

// add cart
function addCart(product_id){
    if (cart.phone == '') {
        // cart.phone = localStorage.getItem('phone_number');
        alert('Nomor telepon belum diisi');
        setTimeout(function(){
            $('#cart').modal('hide');
        }, 500);
    }
    data = harga.filter(function (el) {
        return el.code == product_id;
    });

    document.getElementById('cart-tujuan').innerHTML = cart.phone+' '+cart.id_cust;
    document.getElementById('cart-desc').innerHTML = data[0].description;
    document.getElementById('cart-price').innerHTML = 'Rp. '+ data[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    cart.code = product_id;
}

function filterListProviderPulsa(){
    var input = document.getElementById("tujuan");
    cart.phone = input.value;

    if(input.value.length == 4){
        // serach listProviderPulsa by nomor
        var data = listProviderPulsa.filter(function (el) {
            return el.nomor == input.value.substring(1);
        });
        if(data.length > 0){
            console.log(data);
            mappingProvider(data[0].operator);
            mappingProviderSub(data[0].operator);
            triggerMappingListProduct(data[0].operator+'-All');
        }else{
            console.log('not found operator');
            mappingProvider();
        }
    }
    if(input.value.length < 4){
        mappingProvider();
    }
}

function inputPin(){
    cart.pin = document.getElementById("pin").value;
}

function inputIDCust(){
    cart.id_cust = document.getElementById("id_cust").value;
}

function submitBuy(){
    if(cart.phone == '' ){
        alert('Nomor tujuan tidak boleh kosong');
        return;
    }else if(cart.code == ''){
        alert('Pilih produk terlebih dahulu');
        return;
    }else if(cart.pin == ''){
        alert('PIN tidak boleh kosong');
        return;
    }else{
        console.log(cart);
    }
    // request ajax
    $.ajax({
        url: url+'topup',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        data: JSON.stringify(cart),
        beforeSend: function() {
            $('#btn-submit-beli').attr('disabled', true);
            $('#btn-submit-beli').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Proses...');
        },
        success: function (data) {
            $('#btn-submit-beli').attr('disabled', false);
            $('#btn-submit-beli').html('Submit');
            console.log(data);
            if(data.result == "success"){
                alert('Pembelian berhasil');
                window.location.href = "history.html";
            }else{
                alert('Pembelian gagal, '+data.responseJSON.message);
            }
        },
        error: function (data) {
            $('#btn-submit-beli').attr('disabled', false);
            $('#btn-submit-beli').html('Submit');
            console.log(data);
            if(data.responseJSON.message == undefined){
                alert('Pembelian gagal, '+data.responseJSON+' !');
            }else{
                alert('Pembelian gagal, '+data.responseJSON.message+' !');
            }
        }
    });
}