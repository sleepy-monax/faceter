<?php

$connection = include 'connection.php';

$needle = mysqli_real_escape_string($connection, $_GET["needle"]);
$result = Array(
    "users" => Array(),
    "posts" => Array(),
    "success" => true,
    "message" => "",
);

/* --- Search users ------------------------------------- */

$sql_users = "
select
    userId
from
    User
where
    SOUNDEX(userName)=SOUNDEX('$needle') or
    userName LIKE '%{$needle}%'
limit 16";

$result_users = mysqli_query($connection, $sql_users);

while ($r = mysqli_fetch_assoc($result_users)) {
    $result["users"][] = $r["userId"];
}

/* --- Search posts ------------------------------------- */

$sql_posts = "
select
    postId
from
    Post
where
    postContent like '%{$needle}%'
limit 16";

$result_posts = mysqli_query($connection, $sql_posts);

while ($r = mysqli_fetch_assoc($result_posts)) {
    $result["posts"][] = $r["postId"];
}

print json_encode($result);
