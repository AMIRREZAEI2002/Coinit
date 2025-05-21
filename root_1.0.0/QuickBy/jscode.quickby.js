function buypart(){
    let iso_btn_buy = document.getElementById('iso_btn_buy');
    let iso_btn_sell = document.getElementById('iso_btn_sell');
    iso_btn_buy.style.display = "block"
    iso_btn_sell.style.display = "none"
}

function sellpart(){
    let iso_btn_buy = document.getElementById('iso_btn_buy');
    let iso_btn_sell = document.getElementById('iso_btn_sell');
    iso_btn_buy.style.display = "none"
    iso_btn_sell.style.display = "block"
}