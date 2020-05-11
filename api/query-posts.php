<?php
$connection = include 'connection.php';

$sql = 'select postId
        from Post
        where postAuthor in (select us2.userId as idUser
                             from follow
                                    inner join user as us1 on follow.followerId = us1.userId
                                    inner join user as us2 on follow.followedId = us2.userId
                             where us1.userId = 2)
        order by postDate desc';
$result = mysqli_query($connection, $sql);

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);
