<?php
    session_start();
    include("../config.php");
    
//Connection Test==============================================>

    // Check connection
    /*if ($db->connect_error) {
        die("<div class='p-4 alert alert-danger'>Connection failed: " . $db->connect_error) . "</div>";
    }*/
    //echo "Connected successfully";

//end of Connection Test============================================>

    /*$myusername = mysqli_real_escape_string($db,$_POST['usrnm']);
    $mypassword = mysqli_real_escape_string($db,$_POST['pwd']);*/
    $myusername = mysqli_real_escape_string($db,$_GET['usrnm']);
    $mypassword = mysqli_real_escape_string($db,$_GET['pwd']);
    
    //$sql = "SELECT * FROM `normal_user_accounts` WHERE (user_id = '".$myusername."' OR user_email = '".$myusername."') AND user_password = '".$mypassword."'";
    
    $sql = "SELECT * FROM `user_accounts` WHERE (`username` = '$myusername' OR `email` = '$myusername') AND `password` = '$mypassword'";
    $_SESSION['client_auth'] = 0;
    $_SESSION['client_verification'] = 0;
    $userDetailsArray = array();

    if($result = mysqli_query($db,$sql)){
        
        $_SESSION['global_userid'] = $myusername;
        
        while($row = mysqli_fetch_assoc($result)){
            $userDetailsArray = $row;
            $_SESSION['client_auth'] = 1;
            $_SESSION['client_userid'] = $row["username"];
            $_SESSION['client_email'] = $row["email"];
            $_SESSION['client_names'] = $row["users_name"]." ".$row["users_surname"];
            $_SESSION['client_verification'] = $row["verification"];
        }

        echo json_encode($userDetailsArray);
        
        /*if($_SESSION['client_auth']==1){
            if($_SESSION['client_verification']>=1){
                //account verified
                //generate a session reference key with random string generator
                function session_key_generator($keylength,$keyspace='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'){
                    $pieces = [];
                    $max = mb_strlen($keyspace, '8bit') - 1;
                    for ($i = 0; $i < $keylength; ++$i){
                        $pieces []= $keyspace[random_int(0, $max)];
                    }
                    return implode('', $pieces);
                }

                $randomkey_str = session_key_generator(60, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                $_SESSION['client_session_refkey'] = $randomkey_str;
                
                //echo $result
                //echo "AweaFede";
            }else{
                //client not authorized
                $output = "Vulela";
                echo $output;
            }
        }else{
            //client not authorized
            $output = "CheckCheck";
            echo $output;
        }*/
    }else{
        $output = "Backside]|:. [".mysqli_error($db)."]";
        echo $output;
    }
?>
