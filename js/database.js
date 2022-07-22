//Database
var apikey = '624509df67937c128d7c9335';
var url = 'https://majorproject-8602.restdb.io/rest/majorproject';

$(document).ready(function () {
    // Get value on button click and show alert
    $("#myBtn").click(function () {
        var str = $("#myInput").val();
        alert(str + ', at the age of 15, you fell off a cliff and survived, and found 100,000 silver currency in the cave. And decided to break into the world to build a family business.');

    });
});


function getResult(url, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        response.sort((a, b) => b.Currency - a.Currency);
        console.log(response.sort((a, b) => b.Currency - a.Currency));
        for (var i = 0; i < response.length; i++) {
            console.log('response[i].Currency = ' + response[i].Currency);
            console.log('response[i].UserName = ' + response[i].UserName);
            var score = '';
            score += "<div class = 'scoreboard>' > User Name = " + response[i].UserName + ", Currency = " + response[i].Currency;
            $("#displayScreen").append(score);
        }
    });
}

getResult(url, apikey);


