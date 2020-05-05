<?php
$connection = include 'connection.php';

$sql = 'select * from Post where postId = ' . intval($_GET["postId"]);
$result = mysqli_query($connection, $sql);

if($r = mysqli_fetch_assoc($result)) {
    print json_encode($r);
}
else
{
    print json_encode(null);
}
?>