<?php
session_start();
header('Access-Control-Allow-Origin: *');
include("config.php");

if ($conn->connect_error) {
    die('Connect Error (' . $conn->connect_errno . ') '
            . $conn->connect_error);
}

$sth = "Select userName,score from LeaderBoard  inner join users where users.userId = LeaderBoard.userId group by LeaderBoard.userId limit 10";
//doesnt update i think the fix for order is this
//ORDER BY LeaderBoard.userScore DESC
$rows = array();
if ($result = $conn->query($sth)) {

    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

    /* free result set */
    $result->close();
}

print json_encode($rows);


?>
