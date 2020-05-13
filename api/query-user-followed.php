<?php

$connection = include 'connection.php';

$sessionId = intval($_GET["sessionId"]);
$followedId = intval($_GET["followedId"]);

$sql = "select *
        from Follow
        where followerId=" . $sessionId.
       " and followedId=" . $followedId;

$result = mysqli_query($connection, $sql);

if ($r = mysqli_fetch_assoc($result))
    print json_encode(true);
else
    print json_encode(false);
