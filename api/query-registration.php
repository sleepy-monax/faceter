<?php

$connection = include 'connection.php';

$username = mysqli_real_escape_string($connection,strval($_GET["username"]));
$password = mysqli_real_escape_string($connection,strval($_GET["password"]));
$email = mysqli_real_escape_string($connection,strval($_GET["email"]));

// VERIFICATION DU PSEUDO
$verifPseudo  = 'SELECT COUNT(*) AS nbr FROM User WHERE userName = \'' . $username . '\'';
    $resPseudo  = mysqli_query($connection, $verifPseudo);
    $alorsPseudo  = mysqli_fetch_assoc($resPseudo);

// VERIFICATION DE L'ADRESSE MAIL
$verifEmail  = 'SELECT COUNT(*) AS nbr FROM User WHERE userMail = \'' . $email . '\'';
    $resEmail  = mysqli_query($connection, $verifEmail);
    $alorsEmail  = mysqli_fetch_assoc($resEmail);

/*$sql = 'insert into User (userName, userPassword, userMail) 
    select \'' . $username . '\' , \'' . $password . '\' , \'' . $email . '\' from dual
where not exists (SELECT * FROM User
                    WHERE userName = \'' . $username . '\'
                    OR userMAIL = \'' . $email . '\')';

//$result = mysqli_query($connection, $sql);

if(isset($username)){
  if(!($alorsPseudo['nbr'] == 0)){
      print json_encode(false);
  } 
} elseif(isset($email)) 
{
    if(!($alorsEmail['nbr'] == 0)){
      print json_encode(false);
    } 
} 
if(mysqli_query($connection, $sql)) 
{
    print json_encode(true);
} else 
{
    print json_encode(false);
}*/

$test = 'SELECT * FROM User WHERE userName = \'' . $username . '\' OR userMAIL = \'' . $email . '\')';
$resultTest = mysqli_query($connection, $test);

if ($r = mysqli_fetch_assoc($resultTest)) {
  print json_encode(false);
} else  {
  $sql = 'insert into User (userName, userPassword, userMail) select \'' . $username . '\' , \'' . $password . '\' , \'' . $email . '\'';
  mysqli_query($connection, $sql);
  print json_encode(true);
}

?>
