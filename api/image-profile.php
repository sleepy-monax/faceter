<?php

$imgProfile = "../res/users/" . strval($_GET["profileId"]) . ".jpg";

if (file_exists($imgProfile))
    print json_encode("/res/users/" . strval($_GET["profileId"]) . ".jpg");
else
    print json_encode("/res/users/default.jpg");
