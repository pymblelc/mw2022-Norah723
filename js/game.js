var currency = 100_000;
var itemClicked;
var rndNo = 0;
var numbersUsed = '';

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
    var purchaseAmount = $("#purchaseAmount").val();
    console.log("Purchase Amount = " + purchaseAmount);

    var sellAmount = $("#sellAmount").val();
    console.log("Sell Amount = " + sellAmount);
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
    });

    // Get all html elements with "item" in its class and when clicked, set the itemClicked variable
    for (item of document.getElementsByClassName("item")) {
        item.onclick = function (e) {
            itemClicked = e.target.id;
            console.log('itemClicked = e.target.id : ' + e.target.id);
        };
    }

    document.getElementById("btnPurchase").onclick = function (e) {
        // TODO: If itemClicked is not set, show an error
        if (!itemClicked) {
            console.log('error - nothing selected');
        } else {
            // Loop through the items in our "database" array
            for (const item in arrItems) {
                // If the item in the database matches what we clicked, use it
                if (arrItems[item].id == itemClicked) {
                    // Logic here
                    purchase(item, $("#purchaseAmount").val());
                    //arrItems[item].owned += 20;
                    //arrItems[item].stock -= 20;

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
                    // Logic here
                    sell(item, $("#sellAmount").val());

                    break; // We got the right item, so we dont need to keep looping
                }
            }
        }
    };
});


function displayObject() {
    //loop over array
    var successfulCount = 0;
    while (successfulCount <= 2) {
        rndNo = Math.floor(Math.random() * 5);
        /*console.log('RndNo - ' + rndNo);
        console.log('numbersUsed - ' + numbersUsed);
        console.log(numbersUsed.indexOf(rndNo.toString()));*/
        if (numbersUsed.indexOf(rndNo.toString()) == -1) {
            price = Math.floor(Math.random() * (arrItems[rndNo].priceMax - arrItems[rndNo].priceMin + 1) + arrItems[rndNo].priceMin);
            arrItems[rndNo].price = price;
            numbersUsed = numbersUsed + rndNo.toString();
            successfulCount++
            var numberOf = arrItems[rndNo].stock;
            var numberOf2 = arrItems[rndNo].owned;
            //display 3 random object images
            var displayHTML = '';
            //display the amount of object
            var displayHTML1 = '';
            //display the amount of object in stock (ie. how much the user have)
            var displayHTML2 = '';
            displayHTML += "<div id='image" + rndNo + "' class='objects'>";
            displayHTML += "<img src='" + arrItems[rndNo].img + "'>"
            displayHTML += "<div class='price' > Silver Currency: ";
            displayHTML += price;
            displayHTML += "</div> "
            displayHTML1 += "<div class='numberOf>' > Numbers of " + arrItems[rndNo].name + " available = ";
            displayHTML1 += numberOf;
            displayHTML1 += "</div>"
            displayHTML2 += "<div class='numberOf2>' > Numbers of " + arrItems[rndNo].name + " in stock = ";
            displayHTML2 += numberOf2;
            displayHTML2 += "</div>"
            $('#information').append(displayHTML1, displayHTML2);
            $('#displayScreen').append(displayHTML);
        }

    }
    numbersUsed = numbersUsed + rndNo.toString();
    console.log('Numbers Used ' + '- ' + numbersUsed);
}

displayObject();

function purchase(item, amount) {
    console.log("Purchasing an item");
    // Update the item (arrItems[item]) to the new values
    // Subtract the amount from the stock
    arrItems[item].stock = arrItems[item].stock - amount;
    console.log('Item: ' + arrItems[item].name + ' - ');
    console.log('Stock After Purchase = ' + arrItems[item].stock);
    // Add the amount to the owned
    arrItems[item].owned = arrItems[item].owned + amount;
    console.log('Owned Amount After Purchase = ' + arrItems[item].owned);
    // Subtract the price * amount from our bank
    currency = currency - arrItems[item].price * amount;
    console.log('Price For Each Item = ' + arrItems[item].price);
    console.log('Total Price = ' + arrItems[item].price * amount);
    console.log('Current Currency = ' + currency);

    if (currency < 0) {
        appear();
        disappear();
        console.log('Cannot Purchase');
    } else {
        console.log('Purchased');
        $('.currency').text('Currency: ' + currency);
    }
}

function sell(item, amount) {
    // Subtract the amount from owned
    arrItems[item].owned = arrItems[item].owned - amount;
    // Add the amount to the stock
    arrItems[item].stock = arrItems[item].stock + amount;
    // Add price * amount to the currency
    currency = currency + arrItems[item].price * amount;
    console.log('Total Price = ' + arrItems[item].price * amount);
    console.log('Current Currency = ' + currency);

    if (arrItems[item].owned < 0) {
        appear();
        disappear();
        console.log('Cannot Sell');
    } else {
        console.log('Sold');
        $('.currency').text('Currency: ' + currency);
    }

}

//<= arrItems[item].price * amount
function appear() {
    $('#book').fadeIn(50);
    $('#error').fadeIn(50);
    $('#btnOK').fadeIn(50);
};

function disappear() {
    $('#btnOK').click(function () {
        $('#book').fadeOut(100);
        $('#error').fadeOut(100);
        $('#btnOK').fadeOut(100);
    })
};

//purchase(0, 10); // Prints Umbrella info
//purchase(2, 5); // Prints Jewellery info