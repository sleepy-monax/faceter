<?php
$connection = include 'connection.php';

$user = Array();

$info_sql = 'select * from User where userId = ' . intval($_GET["userId"]);
$info_result = mysqli_query($connection, $info_sql);

if($r = mysqli_fetch_assoc($info_result)) {
    $user = $r;
}

$sql_followers = 'select followerId from Follow where followedId = '. intval($_GET["userId"]);
$result_followers = mysqli_query($connection, $sql_followers);

$user["followers"] = Array();
while($r = mysqli_fetch_assoc($result_followers)) {
    $user["followers"][] = intval($r['followerId']);
}

$sql_followed = 'select followedId from Follow where followerId = '. intval($_GET["userId"]);
$result_followed = mysqli_query($connection, $sql_followed);

$user["followed"] = Array();
while($r = mysqli_fetch_assoc($result_followed)) {
    $user["followed"][] = intval($r['followedId']);
}


$user["coverPic"] = "/res/covers/" . strval($_GET["userId"]) . ".jpg";

if (!file_exists("../" . $user["coverPic"]))
    $user["coverPic"] = "/res/covers/default.jpg";

$user["profilePic"] = "/res/users/" . strval($_GET["userId"]) . ".jpg";

if (!file_exists("../" . $user["profilePic"]))
    $user["profilePic"] = "/res/users/default.jpg";

print json_encode($user);

?>
