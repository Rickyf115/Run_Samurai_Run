<?php
    const DB_HOST = 'mysql.cs.iastate.edu';
    const DB_USER = 'dbu309sbb3';
    const DB_PASS = 'FVsAEffV';
    const DB_NAME = 'db309sbb3';

    $conn = new MySQLi(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	$conn->set_charset('utf8mb4');  
    if (mysqli_connect_errno())
    {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

?>
