<?php

$connection = include 'connection.php';

$sql= 'select userId
       from user
       where userName=\''. strval($_GET["username"]).'\'';

$result = mysqli_query($connection, $sql);

if ($r = mysqli_fetch_assoc($result))
    print json_encode($r["userId"]);
else
    print json_encode(-1);
