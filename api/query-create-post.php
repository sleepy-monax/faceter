<?php

$supported_image = array(
    'gif',
    'jpg',
    'jpeg',
    'png'
);

$connection = include 'connection.php';

$post = mysqli_real_escape_string($connection, strval($_GET["newPost"]));

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
    intval($_GET["idUser"]) . ', \''.
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
        'success' => true,
        'message' => 'Impossible de publier',
    ));
}
