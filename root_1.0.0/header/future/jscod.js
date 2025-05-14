let bookorders = [];

function generateRandomOrders(count = 100) {
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
}

// بروزرسانی bookorders هر یک ثانیه
setInterval(() => {
  bookorders = generateRandomOrders(100);
}, 1000);



// VARIABALES
let orderormarketdiv = document.getElementById('orderormarketdiv');
let whichinterval = "defultbook"




// for defult Order Book page

function updateOrderTable() {
    if(whichinterval == "defultbook"){
        let tbodysell = document.getElementById('tbodysell');
        let tbodybuy = document.getElementById('tbodybuy');
        let midnumber = document.getElementById('midnumber');
    
        let averageofbooks = 0;
        let summofordersbook = 0;
        let countofbooks = bookorders.length;
        let sellarray = [];
        let buyarray = [];
      
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
            <td style="position: absolute;background-color: red;width: ${Progress_Percentage}%;top: 50%;right: 0%;transform: translate(0%,-50%);opacity: 20%;height:100%"></td>
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

  
//   setInterval(updateOrderTable, 1000);

function updateOrderTableGREEN() {
    if(whichinterval == "GREENbook"){
        let tbodybuy = document.getElementById('tbodybuy');
        let midnumber = document.getElementById('midnumber');
    
        let averageofbooks = 0;
        let summofordersbook = 0;
        let countofbooks = bookorders.length;
        let buyarray = [];
      
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
            <td style="position: absolute;background-color: green;width: ${Progress_Percentage}%;top: 50%;right: 0%;transform: translate(0%,-50%);opacity: 20%;height:100%"></td>
          `;
          newtr.classList.add("text-danger", "bg-danger", "bg-opacity-10");
          newtr.style.position = "relative";
      
          tbodybuy.appendChild(newtr);
        });
    }
}

//   setInterval(updateOrderTableGREEN, 1000);


function updateOrderTableRED() {
    if(whichinterval == "REDbook"){
        let tbodysell = document.getElementById('tbodysell');
        let midnumber = document.getElementById('midnumber');
    
        let averageofbooks = 0;
        let summofordersbook = 0;
        let countofbooks = bookorders.length;
        let sellarray = [];
      
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

//   setInterval(updateOrderTableGREEN, 1000);





















// ***************************************************************************************************


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
document.querySelectorAll('.spin-up').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const wrapper = this.closest('.number-spinner');
    const input = wrapper.querySelector('input[type=number]');
    input.stepUp();
    input.dispatchEvent(new Event('input'));
  });
});
document.querySelectorAll('.spin-down').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const wrapper = this.closest('.number-spinner');
    const input = wrapper.querySelector('input[type=number]');
    input.stepDown();
    input.dispatchEvent(new Event('input'));
  });
});
$(document).ready(function () {
  $("#limit").click(function(){
      $("#limit-box").show();
      $("#maker-box").hide();
      $("#trigger-box").hide();
      $("#limit").addClass("border-bottom");
      $("#limit").removeClass("border-bottom-0");
      $("#maker").addClass("border-bottom-0");
      $("#maker").removeClass("border-bottom");
      $("#trigger").addClass("border-bottom-0");
      $("#trigger").removeClass("border-bottom");
  });
  $("#maker").click(function(){
      $("#maker-box").show();
      $("#limit-box").hide();
      $("#trigger-box").hide();
      $("#maker").addClass("border-bottom");
      $("#maker").removeClass("border-bottom-0");
      $("#limit").addClass("border-bottom-0");
      $("#limit").removeClass("border-bottom");
      $("#trigger").addClass("border-bottom-0");
      $("#trigger").removeClass("border-bottom");
  });
  $("#trigger").click(function(){
      $("#trigger-box").show();
      $("#maker-box").hide();
      $("#limit-box").hide();
      $("#trigger").addClass("border-bottom");
      $("#trigger").removeClass("border-bottom-0");
      $("#maker").addClass("border-bottom-0");
      $("#maker").removeClass("border-bottom");
      $("#limit").addClass("border-bottom-0");
      $("#limit").removeClass("border-bottom");
  });
});