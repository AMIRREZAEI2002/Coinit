
// ********************************************************************************

// ORDER BOOK JS CODES

// create fake data - delet it when you connet to backend
let bookorders = [];
function generateRandomOrders(count = 100) {
  if(wichpage == "orderpage"){
    const newOrders = [];

    for (let i = 0; i < count; i++) {
      const side = Math.random() > 0.5 ? "buy" : "sell";
      const price = (Math.random() * 20000 + 20000).toFixed(2);  // قیمت بین ۲۰۰۰۰ تا ۴۰۰۰۰
      const quantity = (Math.random() * 2 + 0.5).toFixed(4);     // مقدار بین ۰.۵ تا ۲.۵
      const total = (price * quantity).toFixed(2);
  
      newOrders.push({
        side,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        total: parseFloat(total)
      });
    }
  
    return newOrders;
  }else if(wichpage == "marketpage"){
    const trades = [];

    for (let i = 0; i < count; i++) {
      const price = (Math.random() * 20000 + 20000).toFixed(2);      // بین ۲۰۰۰۰ تا ۴۰۰۰۰
      const amount = (Math.random() * 0.5 + 0.01).toFixed(8);         // بین ۰.۰۱ تا ۰.۵ BTC
      const side = Math.random() > 0.5 ? "buy" : "sell";
      // ساخت زمان به فرمت HH:MM:SS
      const now = new Date();
      const time = now.toTimeString().split(' ')[0]; // فقط HH:MM:SS
  
      trades.push({
        side,
        price: parseFloat(price),     // USDT
        amount: parseFloat(amount),   // BTC
        time
      });
    }
  
    return trades;
  }

}

// update fake data 
setInterval(() => {
  bookorders = generateRandomOrders(100);
}, 1000);



// VARIABALES
let orderormarketdiv = document.getElementById('orderormarketdiv');
let whichinterval = "defultbook"
let orderbookmaindiv = document.getElementById('orderbookmaindiv');
let Markettrademaindiv = document.getElementById('Markettrademaindiv');
let wichpage = "orderpage"
let colx2orders =document.getElementById('colx2orders');
let sellarray = [];
let buyarray = [];
let showitemdiv = document.getElementById('showitemdiv');

// for defult Order Book page
function updateOrderTable() {
    if(whichinterval == "defultbook" && wichpage == "orderpage"){
        let tbodysell = document.getElementById('tbodysell');
        let tbodybuy = document.getElementById('tbodybuy');
        let midnumber = document.getElementById('midnumber');
    
        let averageofbooks = 0;
        let summofordersbook = 0;
        let countofbooks = bookorders.length;
        sellarray = [];
        buyarray = [];
      
        let last10Orders = bookorders.slice(-50);
      
        bookorders.forEach((bookorder) => {
          summofordersbook += bookorder['total'];
        });
      
        summofordersbook = Math.round(summofordersbook);
        averageofbooks = summofordersbook / countofbooks;
      
        last10Orders.forEach(bookorder => {
          if (bookorder.side === "sell") {
            if (sellarray.length < 10) {
              sellarray.push(bookorder);
            }
          } else {
            if (buyarray.length < 10) {
              buyarray.push(bookorder);
            }
          }
        });
      
        // پاک کردن قبلی‌ها
        tbodysell.innerHTML = '';
        tbodybuy.innerHTML = '';
      
        sellarray.forEach((bookorder) => {
          let Progress_Percentage = ((bookorder['total'] * 50) / averageofbooks);
          if (Progress_Percentage > 100) Progress_Percentage = 100;
          Progress_Percentage = Math.round(Progress_Percentage);
      
          let newtr = document.createElement("tr");
          newtr.innerHTML = `
            <td>${bookorder['price']}</td>
            <td>${bookorder['quantity']}</td>
            <td>${bookorder['total']}</td>
            <td style="position: absolute;background-color: red; width: ${Progress_Percentage}% ; top: 50% ; right: 0px;transform: translate(0%,-50%);opacity: 20%;height:100%"></td>
          `;
          newtr.classList.add("text-danger", "bg-danger", "bg-opacity-10");
          newtr.style.position = "relative";
      
          tbodysell.appendChild(newtr);
        });
      
        buyarray.forEach((bookorder) => {
          let Progress_Percentage = ((bookorder['total'] * 50) / averageofbooks);
          if (Progress_Percentage > 100) Progress_Percentage = 100;
          Progress_Percentage = Math.round(Progress_Percentage);
      
          let newtr = document.createElement("tr");
          newtr.innerHTML = `
            <td>${bookorder['price']}</td>
            <td>${bookorder['quantity']}</td>
            <td>${bookorder['total']}</td>
            <td style="position: absolute;background-color: green;width: ${Progress_Percentage}%;top: 50%;right: 0%;transform: translate(0%,-50%);opacity: 20%;height:100%"></td>
          `;
          newtr.classList.add("text-danger", "bg-danger", "bg-opacity-10");
          newtr.style.position = "relative";
      
          tbodybuy.appendChild(newtr);
        });
    }
}

// ** this interval must be active when page loaded. ** //
setInterval(updateOrderTable, 1000);

// for green btn
function updateOrderTableGREEN() {
    if(whichinterval == "GREENbook" && wichpage == "orderpage"){
        let tbodybuy = document.getElementById('tbodybuy');
        let midnumber = document.getElementById('midnumber');
    
        let averageofbooks = 0;
        let summofordersbook = 0;
        let countofbooks = bookorders.length;
        buyarray = [];
      
        let last10Orders = bookorders.slice(-50);
      
        bookorders.forEach((bookorder) => {
          summofordersbook += bookorder['total'];
        });
      
        summofordersbook = Math.round(summofordersbook);
        averageofbooks = summofordersbook / countofbooks;
      
        last10Orders.forEach(bookorder => {
          if (bookorder.side === "sell") {
          } else {
            buyarray.push(bookorder);
          }
        });
      
        // پاک کردن قبلی‌ها
        tbodybuy.innerHTML = '';
        
        buyarray = buyarray.sort((a, b) => b.total - a.total);

        buyarray.forEach((bookorder) => {
          let Progress_Percentage = ((bookorder['total'] * 50) / averageofbooks);
          if (Progress_Percentage > 100) Progress_Percentage = 100;
          Progress_Percentage = Math.round(Progress_Percentage);
      
          let newtr = document.createElement("tr");
          newtr.innerHTML = `
            <td>${bookorder['price']}</td>
            <td>${bookorder['quantity']}</td>
            <td>${bookorder['total']}</td>
            <td style="position: absolute;background-color: green;width: ${Progress_Percentage}%; top: 50%; right: 0%;transform: translate(0%,-50%);opacity: 20%;height:100%"></td>
          `;
          newtr.classList.add("text-danger", "bg-danger", "bg-opacity-10");
          newtr.style.position = "relative";
      
          tbodybuy.appendChild(newtr);
        });
    }
}


// for red btn
function updateOrderTableRED() {
    if(whichinterval == "REDbook" && wichpage == "orderpage"){
        let tbodysell = document.getElementById('tbodysell');
        let midnumber = document.getElementById('midnumber');
    
        let averageofbooks = 0;
        let summofordersbook = 0;
        let countofbooks = bookorders.length;
        sellarray = [];
      
        let last10Orders = bookorders.slice(-50);
      
        bookorders.forEach((bookorder) => {
          summofordersbook += bookorder['total'];
        });
      
        summofordersbook = Math.round(summofordersbook);
        averageofbooks = summofordersbook / countofbooks;
      
        last10Orders.forEach(bookorder => {
          if (bookorder.side === "sell") {
            sellarray.push(bookorder);
          }
        });
      
        // پاک کردن قبلی‌ها
        tbodysell.innerHTML = '';
        
        sellarray = sellarray.sort((a, b) => b.total - a.total);

        sellarray.forEach((bookorder) => {
            let Progress_Percentage = ((bookorder['total'] * 50) / averageofbooks);
            if (Progress_Percentage > 100) Progress_Percentage = 100;
            Progress_Percentage = Math.round(Progress_Percentage);
        
            let newtr = document.createElement("tr");
            newtr.innerHTML = `
              <td>${bookorder['price']}</td>
              <td>${bookorder['quantity']}</td>
              <td>${bookorder['total']}</td>
              <td style="position: absolute;background-color: red;width: ${Progress_Percentage}%;top: 50%;right: 0%;transform: translate(0%,-50%);opacity: 20%;height:100%"></td>
            `;
            newtr.classList.add("text-danger", "bg-danger", "bg-opacity-10");
            newtr.style.position = "relative";
        
            tbodysell.appendChild(newtr);
        });
    }
}

// ***************************************************************************************************

// for defult Order Book page
function defultsortbook(wichpage){
    whichinterval = "defultbook"
    if(wichpage == "orderpage"){
        orderormarketdiv.innerHTML = ""
        orderormarketdiv.innerHTML = `
        <thead class="text-secondary">
            <tr class="fs-9 ">
                <th class="text-secondary">Price (USDT)</th>
                <th class="text-secondary">Quantity (USDT)</th>
                <th class="text-secondary">Total (USDT)</th>
            </tr>
        </thead>
    
        <tbody class="fs-9 text-center" id="tbodysell">
            <!-- Sell Orders -->
        </tbody>

        <tbody>
            <!-- Mid Price separator -->
            <tr class="text-center text-dark fw-bold">
                <td colspan="3" id="midnumber">
                <div class="text-danger fs-6 distart">
                    <div>104,144.8</div>
                    <div><i class="fa-solid fa-down-long ml-2 fs-6s"></i></div>
                    <div class="text-secondary fs-9 ml-2">104,146.9</div>
                </div>
                </td>
            </tr>
        </tbody>

        <tbody class="fs-9 text-center" id="tbodybuy">                        
            <!-- Buy Orders -->
        </tbody>
        `
        setInterval(updateOrderTable, 1000);
    }
}

// for green btn
function greensortbook(wichpage){
    whichinterval = "GREENbook"
    if(wichpage == "orderpage"){
        orderormarketdiv.innerHTML = ""
        orderormarketdiv.innerHTML = `
            <thead class="text-secondary">
            <tr class="fs-9 ">
                <th class="text-secondary">Price (USDT)</th>
                <th class="text-secondary">Quantity (USDT)</th>
                <th class="text-secondary">Total (USDT)</th>
            </tr>
            </thead>
    
            <tbody>
            <!-- Mid Price separator -->
            <tr class="text-center text-dark fw-bold">
                <td colspan="3" id="midnumber">
                <div class="text-danger fs-6 distart">
                    <div>104,144.8</div>
                    <div><i class="fa-solid fa-down-long ml-2 fs-6s"></i></div>
                    <div class="text-secondary fs-9 ml-2">104,146.9</div>
                </div>
                </td>
            </tr>
            </tbody>
    
            <tbody class="fs-9 text-center" id="tbodybuy">                        
            <!-- Buy Orders -->
            </tbody>
        `
    
        setInterval(updateOrderTableGREEN, 1000);
    }

}

// for red btn
function redsortbook(wichpage){
    whichinterval = "REDbook"
    if(wichpage == "orderpage"){
        orderormarketdiv.innerHTML = ""
        orderormarketdiv.innerHTML = `
            <thead class="text-secondary">
            <tr class="fs-9 ">
                <th class="text-secondary">Price (USDT)</th>
                <th class="text-secondary">Quantity (USDT)</th>
                <th class="text-secondary">Total (USDT)</th>
            </tr>
            </thead>
    
            <tbody>
            <!-- Mid Price separator -->
            <tr class="text-center text-dark fw-bold">
                <td colspan="3" id="midnumber">
                <div class="text-danger fs-6 distart">
                    <div>104,144.8</div>
                    <div><i class="fa-solid fa-down-long ml-2 fs-6s"></i></div>
                    <div class="text-secondary fs-9 ml-2">104,146.9</div>
                </div>
                </td>
            </tr>
            </tbody>
    
            <tbody class="fs-9 text-center" id="tbodysell">
                <!-- Sell Orders -->
            </tbody>
        `
    
        setInterval(updateOrderTableRED, 1000);
    }
}

// ***************************************************************************************************



// MARKET TRADE JS CODES

























// select which page - market or book order

function orderbookpage(){
  orderbookmaindiv.style.display = "block"
  Markettrademaindiv.style.display = "none"
  whichinterval = "defultbook"
  wichpage = "orderpage"
  defultsortbook("orderpage")
}

function markettradepage(){
  Markettrademaindiv.style.display = "block"
  orderbookmaindiv.style.display = "none"
  wichpage = "marketpage"
  whichinterval = "no"
  setInterval(markettradefn, 1000);
  
}






// MARKET TRADE JS CODS
function markettradefn(){
  let markettbody = document.getElementById('markettbody');
  bookorders = bookorders.slice(-50);
  let colortext
  // پاک کردن قبلی‌ها
  markettbody.innerHTML = '';
  bookorders.forEach((bookorder) => {
    if(bookorder['side'] == "buy"){
      colortext = "text-success"
    }else{
      colortext = "text-danger"
    }
    let newtr2 = document.createElement("tr");
    newtr2.innerHTML = `
      <td class="${colortext}">${bookorder['price']}</td>
      <td>${bookorder['amount']}</td>
      <td>${bookorder['time']}</td>
    `;
    newtr2.classList.add("text-danger", "bg-danger", "bg-opacity-10");
    newtr2.style.position = "relative";

    markettbody.appendChild(newtr2);
  });

}




// Show item of %

function countitemsarray(){
  let countsells = 0
  let countbuy = 0
  bookorders.forEach(bookorder => {
    if (bookorder.side === "sell") {
      countsells++
    } else {
      countbuy++
    }
  });


  showitemdiv.innerHTML = `
    <div class="m-0" style="padding-right: 0px;width: ${countbuy}%;">
      <div class="bg-success bg-opacity-50 d-flex justify-content-center align-items-center fs-7">
        <div>${countbuy}%</div>
        <div class="bg-white discen fs-8" style="position: absolute;right: 15px; height: 14px;width: 14px;">S</div>
      </div>
    </div>
    <div class="m-0" style="padding-left: 0px;border-left: 3px solid white;width: ${countsells}%;">
      <div class="bg-danger  bg-opacity-50 d-flex justify-content-center align-items-center fs-7">
        <div>${countsells}%</div>
        <div class="bg-white discen fs-8" style="position: absolute;left: 15px; height: 14px;width: 14px;">B</div>
      </div>
    </div>
  
  `
}

setInterval(countitemsarray, 1000);