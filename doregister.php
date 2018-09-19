<?php
session_start();
header('Access-Control-Allow-Origin: *'); 
include("config.php");


if(!empty($_POST["userName"])) {
	$sql = "INSERT INTO users (userName, userPass, userEmail) VALUES ('" . $_POST["userName"] . "', '". hash('sha256', $_POST['userPass'])."', '". $_POST['email']."')";
	if ($conn->query($sql) === TRUE) {
		echo "true";

	}else{
		echo "false";
	}

}else{
	echo "false";
}
?>