<?php

$connection = include 'connection.php';

$username = mysqli_real_escape_string($connection,strval($_GET["username"]));
$password = mysqli_real_escape_string($connection,strval($_GET["password"]));
$email = mysqli_real_escape_string($connection,strval($_GET["email"]));

$test = 'SELECT * FROM User WHERE userName = \'' . $username . '\' OR userMAIL = \'' . $email . '\'';
$resultTest = mysqli_query($connection, $test);

if ($r = mysqli_fetch_assoc($resultTest)) {
  print json_encode(false);
}
else  {
  $sql = 'insert into User (userName, userPassword, userMail) value (\''.$username.'\', \''. $password.'\', \''. $email .'\')';
  mysqli_query($connection, $sql);
  print json_encode(true);
}
