<?php
    session_start();
    include("../config.php"); //../../../config.php
    
//Connection Test==============================================>

    // Check connection
    /*if ($db->connect_error) {
        die("<div class='p-4 alert alert-danger'>Connection failed: " . $db->connect_error) . "</div>";
    }*/
    //echo "Connected successfully";

//end of Connection Test============================================>

    $myusername = mysqli_real_escape_string($db,$_POST['usrnm']);
    $mypassword = mysqli_real_escape_string($db,$_POST['pwd']);  
    $myname = mysqli_real_escape_string($db,$_POST['name']); 
    $mysurname = mysqli_real_escape_string($db,$_POST['snme']); 
    $myemail = mysqli_real_escape_string($db,$_POST['email']);
    $mycontact = mysqli_real_escape_string($db,$_POST['cont']); 
    $myidnumber = mysqli_real_escape_string($db,$_POST['idn']);  
    $mydob = mysqli_real_escape_string($db,$_POST['dob']);
    $mygender = mysqli_real_escape_string($db,$_POST['gndr']);
    $mycitizenship = mysqli_real_escape_string($db,$_POST['ctzn']); 
    $myaddress = mysqli_real_escape_string($db,$_POST['adrs']); 

    //$sql = "SELECT * FROM `normal_user_accounts` WHERE (user_id = '".$myusername."' OR user_email = '".$myusername."') AND user_password = '".$mypassword."'";
    
    $sql = "INSERT INTO `users`(`username`, `password_hash`, `name`, `surname`, `email_address`, `contact_number`, `id_number`, `date_of_birth`, `gender`, `citizenship`, `physical_address`, `creation_date`, `modification_date`, `active`) 
    VALUES ('$myusername','$mypassword','$myname','$mysurname','$myemail','$mycontact','$myidnumber','$mydob','$mygender','$mycitizenship','$myaddress','$dateNow','NULL',1)";
    $userDetailsArray = array();

    if(mysqli_query($db,$sql)){
        echo "registered";
    }else{
        echo "|[An Error has occured]|:. [".mysqli_error($db)."]";
    }
?>