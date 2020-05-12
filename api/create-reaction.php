<?php

include 'utils/authentication.php';
$connection = include 'connection.php';

$supported_image = array(
    'gif',
    'jpg',
    'jpeg',
    'png'
);

$userId = decode_authentication_token($_GET["sessionToken"]);
$postId = $_GET["postId"];
$reaction = mysqli_real_escape_string($connection, $_GET["reaction"]);

if (!$userId){
    print json_encode(Array(
        'success' => false,
        'message' => 'Session expirée',
    ));

    return;
}

$insert = '
insert into Reaction(postId, userId, reactionType)
values (' .
    $postId  .', '.
    $userId . ', \''.
    $reaction. '\')';

if(mysqli_query($connection, $insert)) {
    print json_encode(Array(
        'success' => true,
        'message' => '',
    ));
}
else
{
    error_log(mysqli_error($connection));

    print json_encode(Array(
        'success' => false,
        'message' => 'Impossible de réagir',
    ));
}
