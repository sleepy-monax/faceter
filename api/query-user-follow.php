<?php

$connection = include 'connection.php';

$isFollow = intval($_GET["follow"]);
$sessionId = intval($_GET["sessionId"]);
$userId = intval($_GET["user"]);

if ($isFollow === 1) {
    $sql = "insert into Follow
            (followerId, followedId) value
            (". $sessionId.", ". $userId .")";
    if (mysqli_query($connection, $sql))
        print json_encode("follow");
    else
        print json_encode("error follow");
}
else if ($isFollow === 0){
    $sql = "delete from Follow
            where followerId=" . $sessionId .
           " and followedId=" . $userId;

    if (mysqli_query($connection, $sql))
        print json_encode("unfollow");
}
