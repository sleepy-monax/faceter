<?php

$connection = mysqli_connect('localhost:3306', 'root', '', 'Faceter');
if (!$connection) {
    die('Could not connect : ' . mysqli_error($connection));
}
mysqli_select_db('faceter');

$sql = 'Select * from user';
$result = mysqli_query($connection, $sql);

echo "<table>
<tr>
<th>ID</th>
<th>Name</th>
<th>Mail</th>
<th>Password</th>
</tr>";
while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['userId'] . "</td>";
    echo "<td>" . $row['userName'] . "</td>";
    echo "<td>" . $row['userMail'] . "</td>";
    echo "<td>" . $row['userPassword'] . "</td>";
    echo "</tr>";
}
echo "</table>";
?>
