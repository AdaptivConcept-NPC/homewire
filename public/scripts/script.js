/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js');
}

var colorSwitchTimer = window.setInterval(switchColor, 4000);

var cycleCount = 0;
let elems = document.getElementsByClassName('color-switch');
var curtainCTS = document.getElementById("curtain-title-switching");

function switchColor() {
    cycleCount += 1;

    if (cycleCount == 1) {
        [].slice.call(elems).forEach(function(elems) {
            elems.style.background = "#E43D40";
        });

        //document.getElementById('login-nav-to-app').style.fontSize = "40px";
        /*document.getElementById('login-nav-to-store').style.fontSize = "60px";
        document.getElementById('login-nav-to-social').style.fontSize = "30px";
        document.getElementById('login-nav-to-blog').style.fontSize = "30px";
        document.getElementById('login-nav-to-admarket').style.fontSize = "30px";*/
    } else if (cycleCount == 2) {
        [].slice.call(elems).forEach(function(elems) {
            elems.style.background = "#D3C02F";
        });

        //document.getElementById('login-nav-to-app').style.fontSize = "40px";
        /*document.getElementById('login-nav-to-store').style.fontSize = "30px";
        document.getElementById('login-nav-to-social').style.fontSize = "60px";
        document.getElementById('login-nav-to-blog').style.fontSize = "30px";
        document.getElementById('login-nav-to-admarket').style.fontSize = "30px";*/
    } else if (cycleCount == 3) {
        [].slice.call(elems).forEach(function(elems) {
            elems.style.background = "orange";
        });

        //document.getElementById('login-nav-to-app').style.fontSize = "40px";
        /*document.getElementById('login-nav-to-store').style.fontSize = "30px";
        document.getElementById('login-nav-to-social').style.fontSize = "30px";
        document.getElementById('login-nav-to-blog').style.fontSize = "60px";
        document.getElementById('login-nav-to-admarket').style.fontSize = "30px";*/
    } else if (cycleCount == 4) {
        [].slice.call(elems).forEach(function(elems) {
            elems.style.background = "rebeccapurple"; //#202020
        });
        
        //document.getElementById('login-nav-to-app').style.fontSize = "40px";
        /*document.getElementById('login-nav-to-store').style.fontSize = "30px";
        document.getElementById('login-nav-to-social').style.fontSize = "30px";
        document.getElementById('login-nav-to-blog').style.fontSize = "30px";
        document.getElementById('login-nav-to-admarket').style.fontSize = "45px";*/
        cycleCount = 0;
    }
}



