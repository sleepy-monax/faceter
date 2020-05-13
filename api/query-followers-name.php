<?php

$connection = include 'connection.php';

$idFollowers = strval($_GET["followersId"]);


$sql = "select userName
        from user
        where userId in (". $idFollowers .")";

$result = mysqli_query($connection, $sql);

if ($r = mysqli_fetch_assoc($result))
    print json_encode($r);
else
    print json_encode("NoFollower");
