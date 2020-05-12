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

if (!$userId){
    print json_encode(Array(
        'success' => false,
        'message' => 'Session expirée',
    ));

    return;
}

$post = mysqli_real_escape_string($connection, strval($_GET["postContent"]));
$post = htmlspecialchars($post, ENT_HTML5, 'UTF-8');

$type = filter_var($post, FILTER_VALIDATE_URL) ? 'link' : null;

if ($type !== 'link'){
    $ext = strtolower(pathinfo($post, PATHINFO_EXTENSION));
    if (in_array($ext, $supported_image))
        $type = 'image';
    else{
        $type = 'text';

        if (mb_strlen($post) > 320)
        {
            print json_encode(Array(
                'success' => false,
                'message' => 'Le message est trop long',
            ));

            return;
        }
    }
}

if ($type === 'image')
    $post = '/res/images/' . $post;

$insert = '
insert into Post (
    postAuthor,
    postType,
    postContent,
    postDate)
values (' .
    intval($userId) . ', \''.
    $type .'\', \''.
    $post .'\','.
    'now())';

if(mysqli_query($connection, $insert)) {
    print json_encode(Array(
        'success' => true,
        'message' => '',
    ));
}
else
{
    print json_encode(Array(
        'success' => false,
        'message' => 'Impossible de publier',
    ));
}
