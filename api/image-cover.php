<?php

$imgProfile = "../res/covers/" . strval($_GET["profileId"]) . ".jpg";

if (file_exists($imgProfile))
    print json_encode("/res/covers/" . strval($_GET["profileId"]) . ".jpg");
else
    print json_encode("/res/covers/default.jpg");
