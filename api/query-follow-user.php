<?php

$connection = include 'connection.php';

$sql = 'select count(followerId)                      as nbFollower,
               count(followedId)                      as nbFollowed
        from follow
            inner join user on follow.followedId = user.userId
        where userId = \'' . intval($_GET["userId"]).'\'';

$result = mysqli_query($connection, $sql);

if ($r = mysqli_fetch_assoc($result)) {
    print json_encode($r);
}
else {
    print json_encode(null);
}


