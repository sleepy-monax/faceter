<?php

$connection = mysqli_connect('localhost:3306', 'root', 'toor', 'faceter');
if (!$connection) {
    die('Could not connect : ' . mysqli_error($connection));
}
mysqli_select_db('faceter');

return $connection;