//ajax - user sign in
var loginAttempts = 0;
function userSignin(username, password) {
    var outputNotification = document.getElementById('output-notif');
    loginAttempts += 1;
    //var username = document.getElementById('login-username').value;
    //var password = document.getElementById('login-password').value;
    var postParamStr = "usrnm=" + username + "&pwd=" + password;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var authFeedback = this.responseText;

            alert(authFeedback);
            console.log(authFeedback);

            //alert(authFeedback);

            //[AweaFede]:. Clent is authentic
            //[Vulela]|:. Seem's you haven't activated your account yet. Please check your email for an activation email and click the link. Proceed ->
            //[CheckCheck]|:. Oh oh... Seems that we cannot find you. Please check your credentials and try again.

            /*if (authFeedback == "AweaFede") {
                loginAttempts = 0;
                window.location.href = "routing/router.php?crt=app";
            } else if (authFeedback == "Vulela") {
                //User has not activated their account
                //alert("Doozy: |[Vulela]|:. Seem's you haven't activated your account yet. Please check your email for an activation email and click the link. Proceed ->");
                outputNotification.innerHTML = "Doozy:<br> |[Vulela]|:. Seem's you haven't activated your account yet. Please check your email for an activation email and click the link.";
            } else if (authFeedback == "CheckCheck") {
                loginAttempts += 1;
                //User credentials not found
                //alert("Doozy: |[CheckCheck]|:. Oh oh... Seems that we cannot find you. Please check your credentials and try again.");
                outputNotification.innerHTML = "Doozy:<br> |[CheckCheck]|:. Oh oh... Seems that we cannot find you. Please check your credentials and try again.";
            } else if (authFeedback.startsWith("Backside")) {
                //Back-end error
                //alert("BigDoozy: |["+authFeedback);
                outputNotification.innerHTML = "BigDoozy:<br> |[" + authFeedback;
            } else {
                alert("No authentication feedback. | " + authFeedback);
                outputNotification.innerHTML = "Nav Error:<br> No authentication feedback.";
            }*/
        }
    };
    /*xhttp.open("POST", "scripts/routing/user-signin.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(postParamStr);*/
    xhttp.open("GET", "scripts/routing/user-signin.php?"+postParamStr, true);
    xhttp.send();
}

function registerUser() {
    var loginModalBtn = document.getElementById('signin-modal-button');
    var loginModalUsrnm = document.getElementById('login-username');
    var loginModalPswd = document.getElementById('login-password');

    var username = document.getElementById('signup-form-username').value;
    var name = document.getElementById('signup-form-name').value;
    var surname = document.getElementById('signup-form-surname').value;
    var email = document.getElementById('signup-form-email').value;
    var contact = document.getElementById('signup-form-phone').value;
    var idnumber = document.getElementById('signup-form-idnumber').value;
    var dob = document.getElementById('signup-form-dob').value;
    var gender = document.getElementById('signup-form-gender').value;
    var citizenship = document.getElementById('signup-form-citizenship').value;
    var address = document.getElementById('signup-form-address').value;
    var password = document.getElementById('signup-form-conf-password').value;

    var sendParamStr = 
    "usrnm=" + username + 
    "&pwd=" + password + 
    "&name"+ name + 
    "&snme" + surname + 
    "&email" + email + 
    "&cont" + contact + 
    "&idn"+ idnumber + 
    "&dob" + dob + 
    "&gndr" + gender + 
    "&ctzn"+ citizenship + 
    "&adrs" + address;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var regFeedback = this.responseText;

            if( regFeedback == 'registered' ){
                //alert the user and open the login modal and populate the input controls
                alert('Your user account has been created successfully. Please proceed to signing in to finish setting up your profile.');

                loginModalBtn.click();
                loginModalUsrnm.value = username;
                loginModalPswd = loginModalPswd;
            }else{
                alert(regFeedback);
            }
        }
    };
    /*xhttp.open("POST", "scripts/routing/user-registration.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(sendParamStr);*/
    xhttp.open("GET", "scripts/routing/user-registration.php?"+sendParamStr, true);
    xhttp.send();
}