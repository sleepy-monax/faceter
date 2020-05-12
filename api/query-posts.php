<?php
$connection = include 'connection.php';

$sql = 'select
            postId
        from
            Post
        where
            postAuthor in (
                select
                    us2.userId as idUser
                from
                    Follow
                    inner join User as us1 on Follow.followerId = us1.userId
                    inner join User as us2 on Follow.followedId = us2.userId
                where
                    us1.userId = '. intval($_GET["userId"]).'
                )
            or postAuthor = '. intval($_GET["userId"]).'
        order by postDate desc';

$result = mysqli_query($connection, $sql);

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);
