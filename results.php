<?php
// Load votes
$votesFile = 'votes.txt';
$votes = json_decode(file_get_contents($votesFile), true);
if (!$votes) {
    $votes = [
        'Reading' => 0,
        'Traveling' => 0,
        'Cooking' => 0,
        'Gaming' => 0
    ];
}

// Update votes
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['activities'])) {
    foreach ($_POST['activities'] as $activity) {
        if (array_key_exists($activity, $votes)) {
            $votes[$activity]++;
        }
    }
    // Save votes
    file_put_contents($votesFile, json_encode($votes));
}

// Redirect back to the survey form
header("Location: index.html");
exit();
?>
