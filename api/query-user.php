<?php
$connection = include 'connection.php';

$sql = 'select * from User where userId = ' . intval($_GET["userId"]);
$result = mysqli_query($connection, $sql);

if($r = mysqli_fetch_assoc($result)) {
    $r["coverPic"] = "/res/covers/" . strval($_GET["userId"]) . ".jpg";

    if (!file_exists("../" . $r["coverPic"]))
        $r["coverPic"] = "/res/covers/default.jpg";

    $r["profilePic"] = "/res/users/" . strval($_GET["userId"]) . ".jpg";

    if (!file_exists("../" . $r["profilePic"]))
        $r["profilePic"] = "/res/users/default.jpg";

    print json_encode($r);
} else {
    print json_encode(null);
}

?>