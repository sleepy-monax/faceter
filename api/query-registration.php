<?php

echo 'test';

$connection = include 'connection.php';

$username = mysqli_real_escape_string($connection,strval($_GET["username"]));
$password = mysqli_real_escape_string($connection,strval($_GET["password"]));
$email = mysqli_real_escape_string($connection,strval($_GET["email"]));


$sql = 'insert into User (userName, userPassword, userMail) values (\'' . $username . '\' , \'' . $password . '\' , \'' . $email . '\')';
$result = mysqli_query($connection, $sql);\

print_r($_POST);
print $sql;

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);
?>
