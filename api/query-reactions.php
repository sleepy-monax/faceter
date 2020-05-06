<?php
    $connection = include 'connection.php';

    $sql = 'select reactionType, count(*) as reactionCount from Reaction where postID = ' . intval($_GET["postId"]). ' group by reactionType;' ;
    $result = mysqli_query($connection, $sql);

    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    print json_encode($rows);
?>
