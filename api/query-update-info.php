<?php

$connection = include 'connection.php';

$name = strval($_GET["name"]);
$email = strval($_GET["email"]);
$password = strval($_GET["password"]);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) print json_encode(false);

$checkNameEmail = 'select *
                   from User
                   where userName=\'' .$name .'\' or userMail=\'' . $email . '\' and userId !=' .intval($_GET["id"]);

$result = mysqli_query($connection, $checkNameEmail);

if ($r = mysqli_fetch_assoc($result)) print json_encode(false);
else {
    $sql = 'update User
            set userName = \'' . $name .'\',
            userMail = \'' . $email . '\',
            userPassword = \'' . $password . '\'
            where userId= ' . intval($_GET["id"]);
    mysqli_query($connection,$sql);
    print json_encode(true);
}
