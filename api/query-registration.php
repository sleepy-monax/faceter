<?php

$connection = include 'connection.php';

$username = mysqli_real_escape_string($connection,strval($_GET["username"]));
$password = mysqli_real_escape_string($connection,strval($_GET["password"]));
$email = mysqli_real_escape_string($connection,strval($_GET["email"]));

$sql = 'insert into User (userName, userPassword, userMail) 
    select \'' . $username . '\' , \'' . $password . '\' , \'' . $email . '\' from dual
where not exists (SELECT * FROM User
                    WHERE userName = \'' . $username . '\'
                    OR userMAIL = \'' . $email . '\')';

$result = mysqli_query($connection, $sql);\

print_r($_POST);
print $sql;

/*$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
//print json_encode($rows);
if ($rows = mysqli_fetch_assoc($result)) {
    print json_encode($rows);
}
else {
    print json_encode(false);
}*/

$verifPseudo  = 'SELECT COUNT(*) AS nbr FROM User WHERE userName = \'' . $username . '\'';
    $res  = mysqli_query($connection, $verifPseudo);
    $alors  = mysqli_fetch_assoc($res);
         
  // BOUCLE POUR INFORMER L'UTLISATEUR
    if(isset($username)){
      if(!($alors['nbr'] == 0)){
        echo "Ce pseudo est déjà utilisé !";
      }
    }
?>
