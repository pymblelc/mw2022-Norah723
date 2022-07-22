var currency = 100_000;
var round = 1;
var itemClicked;
var rndNo = 0;
var apikey = '624509df67937c128d7c9335';
var url = 'https://majorproject-8602.restdb.io/rest/majorproject';

// Shop and Inventory variable to keep track of prices, whats in stock, and what we have
var arrItems = [
    { // 0
        id: "btnUmbrella",
        name: 'Umbrella',
        img: 'images/Umbrella 2.png',
        price: 5000,
        priceMin: 5000, priceMax: 8600,
        stock: 30,
        owned: 0
    },

    { // 1
        id: "btnRouge",
        name: 'Rouge',
        img: 'images/Rouge 1.png',
        price: 803,
        priceMin: 803, priceMax: 1473,
        stock: 60,
        owned: 0
    },

    { // 2
        id: "btnJewellery",
        name: 'Jewellery',
        img: 'images/Jewellery 4.png',
        price: 39319,
        priceMin: 39319, priceMax: 50638,
        stock: 10,
        owned: 0
    },

    { // 3
        id: "btnDessert",
        name: 'Dessert',
        img: 'images/Dessert 3.png',
        price: 2596,
        priceMin: 2596, priceMax: 3366,
        stock: 50,
        owned: 0
    },

    { // 4
        id: "btnRice",
        name: 'Rice',
        img: 'images/Rice 1.png',
        price: 350,
        priceMin: 350, priceMax: 991,
        stock: 100,
        owned: 0
    }
];

$("#btnEnter").click(function () {
    let purchaseAmount = $("#purchaseAmount").val();
    let sellAmount = $("#sellAmount").val();
});

//key press handlers

$('body').keydown(function (event) {
    console.log(event);
    //enter,return key
    if (event.which == 13) {
        var purchaseAmount = $("#purchaseAmount").val();
        console.log("Purchase Amount = " + purchaseAmount);

        var sellAmount = $("#sellAmount").val();
        console.log("Sell Amount = " + sellAmount);
    }
});

$(document).ready(function () {
    // Get value on button click and show alert
    $("#myBtn").click(function () {
        var str = $("#myInput").val();
        alert(str + ', at the age of 15, you fell off a cliff and survived, and found 100,000 silver currency in the cave. And decided to break into the world to build a family business.');
        startTimer();
    });

    // Get all html elements with "item" in its class and when clicked, set the itemClicked variable
    for (item of document.getElementsByClassName("item")) {
        item.onclick = function (e) {
            itemClicked = e.target.id;
            console.log('itemClicked = e.target.id : ' + e.target.id);
            console.log('! ' + itemClicked);
        };
    }

    document.getElementById("btnPurchase").onclick = function (e) {
        // TODO: If itemClicked is not set, show an error

        if (!itemClicked) {
            console.log('error - nothing selected');
        } else {
            // Loop through the items in our "database" array
            for (const item in arrItems) {
                console.log(arrItems[item].name);
                // If the item in the database matches what we clicked, use it
                if (arrItems[item].id == itemClicked /*&& pickedObjects.includes(item)*/) {
                    //console.log(item);
                    //console.log(arrItems[item]);
                    //console.log(arrItems[pickedObjects[0]]);
                    if (arrItems[item] == arrItems[pickedObjects[0]] || arrItems[item] == arrItems[pickedObjects[1]] || arrItems[item] == arrItems[pickedObjects[2]]) {
                        // Logic here
                        purchase(item, $("#purchaseAmount").val());
                        //arrItems[item].owned += 20;
                        //arrItems[item].stock -= 20;
                        console.log('item = ' + item);
                    } else {
                        appear();
                        disappear();
                    }

                    break; // We got the right item, so we dont need to keep looping
                }
            }
        }
    };

    document.getElementById("btnSell").onclick = function (e) {
        // TODO: If itemClicked is not set, show an error

        if (!itemClicked) {
            console.log('error - nothing selected');
        } else {
            // Loop through the items in our "database" array
            for (const item in arrItems) {
                // If the item in the database matches what we clicked, use it
                if (arrItems[item].id == itemClicked) {
                    if (arrItems[item] == arrItems[pickedObjects[0]] || arrItems[item] == arrItems[pickedObjects[1]] || arrItems[item] == arrItems[pickedObjects[2]]) {
                        // Logic here
                        sell(item, $("#sellAmount").val());
                    } else {
                        appear();
                        disappear();
                    }

                    break; // We got the right item, so we dont need to keep looping
                }
            }
        }
    };
});

//Countdown
document.getElementById('timer').innerHTML =
    10 + ":" + 10;

// Start the timer that appears in the top right
function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        return
    }

    document.getElementById('timer').innerHTML =
        m + ":" + s;
    console.log(m)
    setTimeout(startTimer, 1000);

    // If the count down is over, write some text 
    if (m == 0 && s == 0) {
        setTimeout(function () { window.location.href = 'database.html'; }, 3000);
        clearInterval('timer');
        document.getElementById("timer").innerHTML = "EXPIRED";
    }

    /*if(timeArray.constructor === Array){
        console.log('True');
    }*/
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;

}


var pickedObjects = [];
// Pick 3 random objects the user can purchase
function pickRandomObjects() {
    // TODO: pick random objects
    var numbersUsed = '';
    var successfulCount = 0;
    while (successfulCount <= 2) {
        rndNo = Math.floor(Math.random() * 5);
        //console.log('RndNo - ' + rndNo);
        if (numbersUsed.indexOf(rndNo.toString()) == -1) {
            numbersUsed = numbersUsed + rndNo.toString();
            //console.log('Numbers Used ' + '- ' + numbersUsed);
            successfulCount++
            pickedObjects.push(rndNo);
            //console.log('pickedObjects = ' + pickedObjects);
        }
        arrItems[rndNo].price = Math.floor(Math.random() * (arrItems[rndNo].priceMax - arrItems[rndNo].priceMin + 1) + arrItems[rndNo].priceMin);
        console.log('pickedObjects = ' + pickedObjects);
        //console.log('numbersUsed = ' + numbersUsed);
        console.log('price: ' + arrItems[rndNo].price);

    }
}

pickRandomObjects();

function displayObject() {
    // Display the objects available for purchase
    let displayHTML = "";
    let displayHTML1 = "";

    // Loop through all our items
    arrItems.forEach(function (item, index) {
        // Check if current item is a picked item
        //item.price = Math.floor(Math.random() * (item.priceMax - item.priceMin + 1) + item.priceMin);
        if (pickedObjects.includes(index)) {
            displayHTML += "<div id='image" + index + "' class='objects'>";
            displayHTML += "<img src='" + item.img + "'>"
            displayHTML += "<div class='price' > " + item.name + " Price : ";
            displayHTML += item.price;
            displayHTML += "</div> "
            
        }
        displayHTML1 += "<div class='numberOf' > Numbers of " + item.name + " available = ";
        displayHTML1 += item.stock;
        displayHTML1 += "</div>"
        //display the amount of object owned (ie. how much the user have)
        displayHTML1 += "<div class='numberOf2' > Numbers of " + item.name + " owned = ";
        displayHTML1 += item.owned;
        displayHTML1 += "</div>"
    })
    
    // Display the number of objects in stock and owned
    $('#displayScreen').empty();
    $('#displayScreen').append(displayHTML);
    $('#information').empty();
    $('#information').append(displayHTML1);
}

displayObject();

function purchase(item, amount) {
    // Conditions where the purchase function won't work
    if (currency - arrItems[item].price * amount < 0 || arrItems[item].stock - amount < 0 || amount < 0) {
        appear();
        disappear();
        console.log('Cannot Purchase');
    } else {
        console.log("Purchasing an item");
        // Update the item (arrItems[item]) to the new values
        // Subtract the amount from the stock
        console.log('Item 12222: ' + item);
        arrItems[item].stock = arrItems[item].stock - amount;
        console.log('Item: ' + arrItems[item].name + ' - ');
        console.log('Stock After Purchase = ' + arrItems[item].stock);
        // Add the amount to the owned
        //arrItems[item].owned = parseInt(arrItems[item].owned + amount);
        arrItems[item].owned = arrItems[item].owned + parseInt(amount);
        console.log('Owned Amount After Purchase = ' + arrItems[item].owned);
        // Subtract the price * amount from our bank
        currency = currency - arrItems[item].price * amount;
        console.log('Price For Each Item = ' + arrItems[item].price);
        console.log('Total Price = ' + arrItems[item].price * amount);
        console.log('Current Currency = ' + currency);
        console.log(arrItems);
        console.log('Purchased');
        $('.currency').text('Currency: ' + currency);

        displayObject();
    }
}

//purchase(0, 10); // Prints Umbrella info
//purchase(2, 5); // Prints Jewellery info

function sell(item, amount) {
    // Conditions where the sell function won't work
    if (arrItems[item].owned - amount < 0 || amount < 0) {
        console.log(arrItems);
        appear();
        disappear();
        console.log('Cannot Sell');
    } else {
        // Subtract the amount from owned
        arrItems[item].owned = arrItems[item].owned - amount;
        // Add the amount to the stock
        arrItems[item].stock = arrItems[item].stock + parseInt(amount);
        // Add price * amount to the currency
        currency = currency + arrItems[item].price * amount;
        console.log('Total Price = ' + arrItems[item].price * amount);
        console.log('Current Currency = ' + currency);
        console.log(arrItems);
        console.log('Sold');
        $('.currency').text('Currency: ' + currency);

        displayObject();
    }
}

$("#btnNext").click(function () {
    if (round < 45) {
        round = round + 1;
        pickedObjects.length = 0;
        pickRandomObjects();
        displayObject();
        console.log(round);
        $('.round').text('Round: ' + round);
    } else {
        setTimeout(function () { window.location.href = 'database.html'; }, 3000);
        submit();
    }

});

$("#btnPurchase").click(function () {
    let purchaseAmount = $("#purchaseAmount").val();

    console.log("HERE:", purchaseAmount);
    if (purchaseAmount == "") {
        appear2();
        disappear2();
    }
});

$("#btnSell").click(function () {
    let sellAmount = $("#sellAmount").val();

    console.log("HERE:", sellAmount);
    if (sellAmount == "") {
        appear2();
        disappear2();
    }
});

function appear() {
    $('#book').fadeIn(50);
    $('#error').fadeIn(50);
    $('#btnOK').fadeIn(50);
};

function appear2() {
    $('#book').fadeIn(50);
    $('#enterAmount').fadeIn(50);
    $('#btnOK').fadeIn(50);
};

function disappear() {
    $('#btnOK').click(function () {
        $('#book').fadeOut(100);
        $('#error').fadeOut(100);
        $('#btnOK').fadeOut(100);
    })
};

function disappear2() {
    $('#btnOK').click(function () {
        $('#book').fadeOut(100);
        $('#enterAmount').fadeOut(100);
        $('#btnOK').fadeOut(100);
    })
};

// Access to new html

$('#btnFinish').click(function () {
    setTimeout(function () { window.location.href = 'database.html'; }, 3000);
    submit();
});

// DataBase Function
function addResult(item, url, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    /*if(settings.constructor === String) 
    {
       alert("I'm a string!");
     }*/

    $.ajax(settings).done(function (response) {
        console.log('Item successfully added');
        console.log(response);
    });

}

// --- Event Handlers --- s

function submit() {
    console.log('submitted');
    var tempItem = {
        "UserName": $("#myInput").val(),
        "Currency": currency
    };
    console.log('c = ' + currency);
    console.log('name = ' + $("#myInput").val());
    addResult(tempItem, url, apikey);
}