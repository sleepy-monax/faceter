<?php
$connection = include 'connection.php';

$sql = 'select * from Post where postRespond = ' . intval($_GET["postId"]) . ' order by postDate desc';
$result = mysqli_query($connection, $sql);

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);
