<?php
// Load votes
$votes = json_decode(file_get_contents('votes.txt'), true);
if (!$votes) {
    $votes = [
        'Reading' => 0,
        'Traveling' => 0,
        'Cooking' => 0,
        'Gaming' => 0
    ];
}

// Update votes
if (isset($_POST['activities'])) {
    foreach ($_POST['activities'] as $activity) {
        if (array_key_exists($activity, $votes)) {
            $votes[$activity]++;
        }
    }
}

// Save votes
file_put_contents('votes.txt', json_encode($votes));

// Redirect to index
header("Location: index.html");
exit();
?>
