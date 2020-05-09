<?php

$connection = include 'connection.php';

$login = mysqli_real_escape_string($connection,strval($_GET["username"]));
$password = mysqli_real_escape_string($connection,strval($_GET["password"]));

$field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'userMail': 'userName';

$requestLogin = 'select * from User where '. $field.'= \''. $login . '\' and userPassword= \'' . $password .'\'';

$queryResult = mysqli_query($connection, $requestLogin);

$result = Array(
    "userId" => -1,
    "success" => false,
    "message" => "",
    "token" => "",
);

if ($row = mysqli_fetch_assoc($queryResult)) {
    $result["userId"] = $row['userId'];
    $result["success"] = true;
}
else {
    $result["message"] = "Identifiants incorrect";
}

print json_encode($result);
