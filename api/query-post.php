<?php
$connection = include 'connection.php';

$sql = 'select * from Post where postId = ' . intval($_GET["postId"]);
$result = mysqli_query($connection, $sql);

if(!($r = mysqli_fetch_assoc($result))) {
    print json_encode(null);
    return;
}

if ($r['postType'] == 'link')
{
    require_once('OpenGraph.php');
    $graph = OpenGraph::fetch($r['postContent']);

    $r['postCard'] = $graph->_values;
    $r['postCard']["link"] = $r['postContent'];
}

print json_encode($r);
?>
