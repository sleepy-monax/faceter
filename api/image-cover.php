<?php

$imgProfile = "../res/cover/" . strval($_GET["profileId"]) . ".jpg";

if (file_exists($imgProfile))
    print json_encode("/res/cover/" . strval($_GET["profileId"]) . ".jpg");
else
    print json_encode("/res/cover/default-cover.jpg");
