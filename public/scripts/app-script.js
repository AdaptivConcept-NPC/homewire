/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js');
}

//Check if Auto-Pass record exists in LocaStorage, If not, create it and default it to false
if (localStorage.getItem("auto-pass") === null) {
    localStorage.setItem("auto-pass", "False");
}

var autoPass = document.getElementById("auto-pass-checkbox");
autoPass.addEventListener("change", function() {
    if (this.checked) {
        // Checkbox is checked..
        localStorage.setItem("auto-pass", "True");
        document.getElementById("curtain-ready-button").click();
    } else {
        // Checkbox is not checked..
        localStorage.setItem("auto-pass", "False");
    }
});

document.getElementById("curtain-ready-button").addEventListener("click", function() {
    //slide the .curtain div out of view to the left
    document.getElementById("curtain").style.display = "none";
});

function start() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var startInfoOutput = document.getElementById("start-info");
    var spinner = document.getElementById("curtain-page-load-spinner");
    var readybtn = document.getElementById("curtain-ready-button");
    //get the session ref key from the GET parameters
    //?client_auth=1&email=Thabang.Mposulanobela@gmail.com&names=Thabang%20Mposula&verif=1&session_ref=0p8nKueQQqfR1hoARwfXZrr2XtmgCLoTqN6FOPTP48WVkHXb0rXWqaas99gb&usrid=iarxii_god
    //var cookifySessionKey = "";
    //alert(cookifySessionKey);

    //check if browser is online
    var onlineState = navigator.onLine;
    if (onlineState == true) {
        //alert("Online");
    } else {
        alert("You are Offline");
    }

    /*document.cookie = "session_refkey="+cookifySessionKey;
    alert("Session Refkey: "+document.cookie);*/
    spinner.style.display = "none";
    startInfoOutput.innerHTML = '- Great. You are good to go.';
    readybtn.style.marginBottom = "0";

    //Check if Auto-Pass record exists in LocaStorage, If not, create it and default it to false
    if (localStorage.getItem("auto-pass") === "True") {
        readybtn.click();
    }

    //focus on the required page based on the url parameter ?page
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    function getUrlParam(parameter, defaultvalue){
        var urlparameter = defaultvalue;
        if(window.location.href.indexOf(parameter) > -1){
            urlparameter = getUrlVars()[parameter];
            }
        return urlparameter;
    }

    var requestedPage = getUrlParam('page','app');
    //alert("Requested Page: "+requestedPage);

    if(requestedPage == "app") {
        document.getElementById('pills-app-tab').click();
    }else if(requestedPage == "store") {
        document.getElementById('pills-store-tab').click();
    }else if(requestedPage == "blog") {
        document.getElementById('pills-blog-tab').click();
    }else if(requestedPage == "admarket") {
        document.getElementById('pills-admarket-tab').click();
    }else{
        document.getElementById('pills-app-tab').click();
    }

    window.location.href = "#start";
}

//.AdMarket Stream cycler
var steamCycleCount = 1;
var cycleTimer;
var cardSwitchTimer = window.setInterval(cycleStream, 10000);

function cycleStream() {
    var cardIds = "admarket-stream-card" + steamCycleCount;
    var d = document.getElementById(cardIds);
    d.parentNode.appendChild(d);

    if (steamCycleCount == 5) {
        //reset the ycle
        steamCycleCount = 1;
    } else {
        steamCycleCount += 1;
    }
}

function stopCycle() {
    clearInterval(cycleTimer);
}

function startCycle() {
    cycleTimer = window.setInterval(cycleStream, 5000);
}

startCycle();

//Color switch and tab color setting
var colorSwitchTimer;// = window.setInterval(switchColor, 8000);

var cycleCount = 0;
let elems = document.getElementsByClassName('color-switch');
var curtainCTS = document.getElementById("curtain-title-switching");

function switchColor() {
    cycleCount += 1;

    if (cycleCount == 1) {
        [].slice.call(elems).forEach(function(elems) {
            elems.style.background = "#E43D40";
        });

        curtainCTS.innerText = ".Store";

        //document.getElementById('login-nav-to-app').style.fontSize = "40px";
        /*document.getElementById('login-nav-to-store').style.fontSize = "60px";
        document.getElementById('login-nav-to-social').style.fontSize = "30px";
        document.getElementById('login-nav-to-blog').style.fontSize = "30px";
        document.getElementById('login-nav-to-admarket').style.fontSize = "30px";*/
    } else if (cycleCount == 2) {
        [].slice.call(elems).forEach(function(elems) {
            elems.style.background = "#D3C02F";
        });

        curtainCTS.innerText = ".Social";

        //document.getElementById('login-nav-to-app').style.fontSize = "40px";
        /*document.getElementById('login-nav-to-store').style.fontSize = "30px";
        document.getElementById('login-nav-to-social').style.fontSize = "60px";
        document.getElementById('login-nav-to-blog').style.fontSize = "30px";
        document.getElementById('login-nav-to-admarket').style.fontSize = "30px";*/
    } else if (cycleCount == 3) {
        [].slice.call(elems).forEach(function(elems) {
            elems.style.background = "orange";
        });

        curtainCTS.innerText = ".Blog";

        //document.getElementById('login-nav-to-app').style.fontSize = "40px";
        /*document.getElementById('login-nav-to-store').style.fontSize = "30px";
        document.getElementById('login-nav-to-social').style.fontSize = "30px";
        document.getElementById('login-nav-to-blog').style.fontSize = "60px";
        document.getElementById('login-nav-to-admarket').style.fontSize = "30px";*/
    } else if (cycleCount == 4) {
        [].slice.call(elems).forEach(function(elems) {
            elems.style.background = "rebeccapurple"; //#202020
        });

        curtainCTS.innerText = ".AdMarket";
        
        //document.getElementById('login-nav-to-app').style.fontSize = "40px";
        /*document.getElementById('login-nav-to-store').style.fontSize = "30px";
        document.getElementById('login-nav-to-social').style.fontSize = "30px";
        document.getElementById('login-nav-to-blog').style.fontSize = "30px";
        document.getElementById('login-nav-to-admarket').style.fontSize = "45px";*/
        cycleCount = 0;
    }
}

document.getElementById("pills-app-tab").addEventListener("click", function () {
    cycleCount = 0;
    colorSwitchTimer = window.setInterval(switchColor, 8000);
    curtainCTS.innerText = ".app";
    [].slice.call(elems).forEach(function (elems) {
        elems.style.background = "#1C6963";
    });
});
document.getElementById("pills-store-tab").addEventListener("click", function () {
    clearInterval(colorSwitchTimer);
    colorSwitchTimer = null;
    curtainCTS.innerText = ".Store";
    [].slice.call(elems).forEach(function (elems) {
        elems.style.background = "#E43D40";
    });
});
/*document.getElementById("pills-social-tab").addEventListener("click", function() {
    clearInterval(colorSwitchTimer);
    colorSwitchTimer = 0;
    [].slice.call(elems).forEach(function(elems) {
        elems.style.background = "#D3C02F";
    });
});*/
document.getElementById("pills-blog-tab").addEventListener("click", function () {
    clearInterval(colorSwitchTimer);
    colorSwitchTimer = null;
    curtainCTS.innerText = ".Blog";
    [].slice.call(elems).forEach(function (elems) {
        elems.style.background = "#FFA500";
    });
});
document.getElementById("pills-admarket-tab").addEventListener("click", function () {
    clearInterval(colorSwitchTimer);
    colorSwitchTimer = null;
    curtainCTS.innerText = ".AdMarket";
    [].slice.call(elems).forEach(function (elems) {
        elems.style.background = "rebeccapurple"; //#202020
    });
});

//payment process modal selectors
function proceedPaymentProcess(){
    const checkoutMdlBtn = document.getElementById('closecheckoutmodal');
    const paymentProcessMdlBtb = document.getElementById('pcmbutton');
    const executePaymentBtn = document.getElementById('execute-payment-btn');
    var cartTotalStr = document.getElementById('cart-total').innerHTML;
    //var cartTotalAmt = parseFloat(cartTotalStr) * 100;

    //close the checkout modal
    checkoutMdlBtn.click();

    //open the payment process modal and update the inline submit button text to
    //display the checkout amount
    paymentProcessMdlBtb.click();
    executePaymentBtn.innerHTML = "Pay R"+cartTotalStr;
}

//Messenger panel controller
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("messangerSidenav").style.width = "100%";
    document.getElementById("chat-bar").style.display = "block";
    document.getElementById("applications-pills-tab").style.display = "none";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("messangerSidenav").style.width = "0";
    document.getElementById("chat-bar").style.display = "none";
    document.getElementById("applications-pills-tab").style.display = "flex";
}

//PWA installation
const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

/* Put code here */
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    divInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    divInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
    const requireHTTPS = document.getElementById('requireHTTPS');
    const link = requireHTTPS.querySelector('a');
    link.href = window.location.href.replace('http://', 'https://');
    requireHTTPS.classList.remove('hidden');
}