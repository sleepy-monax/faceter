<?php
$connection = include 'connection.php';

$sql = 'select * from User where userId = ' . intval($_GET["userId"]);
$result = mysqli_query($connection, $sql);

if($r = mysqli_fetch_assoc($result)) {
    print json_encode($r);
}
else
{
    print json_encode(null);
}
?>