<?php
session_start();
header('Access-Control-Allow-Origin: *'); 
include("config.php");

        		$message="";
        		if(!empty($_POST["userName"])) {
        			$result = $conn->query("SELECT * FROM users WHERE userName='" . $_POST["userName"] . "' and userPass = '". hash( "sha256", $_POST["userPass"])."'");
        			$row = mysqli_fetch_array($result);
        			if(is_array($row)){
        				$_SESSION["user_id"] = $row['userId'];
        				$_SESSION["display_name"] = $row["userName"];
        				echo "true";
        			} else {
        				echo "false";
        			}

        		}else{
        			echo "false";
        		}
?>