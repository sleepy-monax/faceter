<?php

$imgProfile = "../res/user/" . strval($_GET["profileId"]) . ".jpg";

if (file_exists($imgProfile))
    print json_encode("/res/user/" . strval($_GET["profileId"]) . ".jpg");
else
    print json_encode("/res/user/default-profile.jpg");
