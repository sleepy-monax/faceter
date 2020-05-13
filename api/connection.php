<?php

$connection = mysqli_connect('localhost:3306', 'root', '', 'faceter');
if (!$connection) {
    die('Could not connect : ' . mysqli_error($connection));
}

mysqli_set_charset($connection, "utf8");
return $connection;