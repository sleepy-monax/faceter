<?php
$connection = include 'connection.php';

$sql = 'select * from Post where postId = ' . intval($_GET["postId"]);
$result = mysqli_query($connection, $sql);

if(!($post = mysqli_fetch_assoc($result))) {
    print json_encode(null);
    return;
}

$sql_reactions = 'select reactionType, count(*) as reactionCount from Reaction where postID = ' . intval($_GET["postId"]). ' group by reactionType;' ;
$result_reactions  = mysqli_query($connection, $sql_reactions );

$reactions = array();
while($r = mysqli_fetch_assoc($result_reactions)) {
    $reactions[] = $r;
}

$post['reactions'] = $reactions;

$sql_nbComment = 'select count(*) as nbComment from Post where postRespond=' . intval($_GET["postId"]);
$result_nbComment = mysqli_query($connection, $sql_nbComment);

if ($nb = mysqli_fetch_assoc($result_nbComment)){
    $post['nbComment'] = $nb["nbComment"];
}

if ($post['postType'] == 'link')
{
    require_once('OpenGraph.php');
    $graph = OpenGraph::fetch($post['postContent']);

    $post['postCard'] = $graph->_values;
    $post['postCard']["link"] = $post['postContent'];
}

print json_encode($post);
?>
