<?php
$connection = include 'connection.php';

$sql = 'select count(followerId)                      as Count_Follower,
            group_concat(us2.userName separator  \',\')  as follower
        from follow
            inner join user as us1 on follow.followedId = us1.userId
            inner join user as us2 on follow.followerId = us2.userId
        where us1.userId = \'' . intval($_GET["userId"]).'\'';

$result = mysqli_query($connection, $sql);

if ($r = mysqli_fetch_assoc($result)) {
    print json_encode($r);
}
else {
    print json_encode(null);
}

