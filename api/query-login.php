<?php

$connection = include 'connection.php';

$login = mysqli_real_escape_string($connection,strval($_GET["userName"]));
$password = mysqli_real_escape_string($connection,strval($_GET["password"]));

$field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'userMail': 'userName';

$requestLogin = 'select * from User where '. $field.'= \''. $login . '\' and userPassword= \''
    . $password .'\'';
$result = mysqli_query($connection, $requestLogin);

if ($row = mysqli_fetch_assoc($result)) {
    print json_encode($row['userId']);
}
else {
    print json_encode(false);
}

