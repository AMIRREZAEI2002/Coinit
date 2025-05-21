function buypart(){
    let iso_btn_buy = document.getElementById('iso_btn_buy');
    let iso_btn_sell = document.getElementById('iso_btn_sell');
    iso_btn_buy.style.display = "block"
    iso_btn_sell.style.display = "none"





    let btntobuyheader = document.getElementById('btntobuyheader');
    btntobuyheader.innerHTML = `
    <div class="d-flex justify-content-center align-items-center rounded-pill py-1 bg-success text-white discen cursor-pointer" onclick="buypart()">
        <span class=" " >Buy</span>
    </div>
    `


    let btntosellheader = document.getElementById('btntosellheader');
    btntosellheader.innerHTML = `
    <div class="d-flex justify-content-center align-items-center rounded-pill py-1  text-white"  onclick="sellpart()">
        <i class="fa-solid fa-arrow-down-to-arc text-black"></i>
        <span class="text-white" >Sell</span>
    </div>
    `

    let div1 = document.getElementById('div1');
    let div2 = document.getElementById('div2');

    div1.classList.remove("order-2")
    div1.classList.add("order-1")

    div2.classList.remove("order-1")
    div2.classList.add("order-2")

    let cointitle = document.getElementById('cointitle');
    let monytitle = document.getElementById('monytitle');
    cointitle.innerHTML = `
    <div>Received</div>
    <div><i class="fas fa-info-circle ml-2"></i></div>
    `
    monytitle.innerHTML = "Spend"

    document.getElementById("wallet_selectedCoin").value = "BTC"
    document.getElementById('howmanyspend').value = ""
    document.getElementById('howmanyreceived').value = ""

}

function sellpart(){
    let iso_btn_buy = document.getElementById('iso_btn_buy');
    let iso_btn_sell = document.getElementById('iso_btn_sell');
    iso_btn_buy.style.display = "none"
    iso_btn_sell.style.display = "block"

    let btntobuyheader = document.getElementById('btntobuyheader');
    btntobuyheader.innerHTML = `
    <div class="d-flex justify-content-center align-items-center rounded-pill py-1 text-white discen cursor-pointer" onclick="buypart()">
        <span class=" " >Buy</span>
    </div>
    `

    let btntosellheader = document.getElementById('btntosellheader');
    btntosellheader.innerHTML = `
    <div class="d-flex justify-content-center align-items-center rounded-pill py-1 bg-danger  text-white"  onclick="sellpart()">
        <i class="fa-solid fa-arrow-down-to-arc text-black"></i>
        <span class="text-white" >Sell</span>
    </div>
    `

    const div1 = document.getElementById('div1');
    const div2 = document.getElementById('div2');

    div1.classList.remove("order-1")
    div1.classList.add("order-2")

    div2.classList.remove("order-2")
    div2.classList.add("order-1")

    let cointitle = document.getElementById('cointitle');
    let monytitle = document.getElementById('monytitle');
    cointitle.innerHTML = `
    Spend
    `
    monytitle.innerHTML = `
    <div>Received</div>
    <div><i class="fas fa-info-circle ml-2"></i></div>
    `

    document.getElementById("wallet_selectedCoin").value = "BTC"
    document.getElementById('howmanyspend').value = ""
    document.getElementById('howmanyreceived').value = ""

}

function openchoosepey (whichpart){
    document.getElementById(whichpart).style.display = "block"
}

function selectedpayment(whatispayment, whichpartclose, clickedElement) {
    document.querySelectorAll('#'+whichpartclose+' .border-primary').forEach(el => el.classList.remove('border-primary'));
    clickedElement.classList.add('border-primary');
    console.log('Selected payment:', whatispayment);
}







// price

// fake data

let priceonusdt = [
    { "name": "BTC", "price_usdt": 104000.15 },
    { "name": "ETH", "price_usdt": 3412.78 },
    { "name": "USDT", "price_usdt": 1.00 },
    { "name": "LTC", "price_usdt": 92.43 },
    { "name": "XRP", "price_usdt": 0.526 },
    { "name": "DOGE", "price_usdt": 0.164 }
  ]




window.addEventListener('DOMContentLoaded', function () {
    document.getElementById("wallet_selectedCoin").value = "BTC"
    document.getElementById('howmanyspend').value = ""
    document.getElementById('howmanyreceived').value = ""
});
function spendfun(spendorresive){
    if(spendorresive == "spend"){
        let wallet_selectedCurrency = document.getElementById('wallet_selectedCurrency').value;
        let wallet_selectedCoin = document.getElementById("wallet_selectedCoin").value
        let howmanyspend = document.getElementById('howmanyspend');
        let howmanyreceived = document.getElementById('howmanyreceived');
        let currentprice
        let currentcoin
    
        let currentnumberspend = howmanyspend.value
        priceonusdt.forEach(item => {
            if(item['name'] == wallet_selectedCoin){
                currentcoin  = item['name']
                currentprice = item['price_usdt']
            }
        })
    
        console.log(wallet_selectedCurrency , wallet_selectedCoin)
        let finallvalueresived = (currentnumberspend / currentprice)
        finallvalueresived =  Number(finallvalueresived.toFixed(5))
    
         howmanyreceived.value = finallvalueresived
    }else{
        let wallet_selectedCurrency = document.getElementById('wallet_selectedCurrency').value;
        let wallet_selectedCoin = document.getElementById("wallet_selectedCoin").value
        let howmanyspend = document.getElementById('howmanyspend');
        let howmanyreceived = document.getElementById('howmanyreceived');
        let currentprice
        let currentcoin
    
        let currentnumberspend = howmanyreceived.value
        priceonusdt.forEach(item => {
            if(item['name'] == wallet_selectedCoin){
                currentcoin  = item['name']
                currentprice = item['price_usdt']
            }
        })
        
        
        finallvalueresived = currentnumberspend * currentprice
        finallvalueresived =  Number(finallvalueresived.toFixed(5))
        // let finallvalueresived = finallvalueresived.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        
        console.log(finallvalueresived)
        howmanyspend.value = finallvalueresived

    }

}
