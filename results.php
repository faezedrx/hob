<?php
header('Content-Type: application/json');

// Load current votes from votes.txt
$votesFile = 'votes.txt';
$votes = json_decode(file_get_contents($votesFile), true);

// Initialize votes if votes.txt is empty or doesn't exist
if (!$votes) {
    $votes = [
        'Reading' => 0,
        'Traveling' => 0,
        'Cooking' => 0,
        'Gaming' => 0
    ];
}

// Update votes based on submitted form data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['activities'])) {
    foreach ($_POST['activities'] as $activity) {
        if (array_key_exists($activity, $votes)) {
            $votes[$activity]++;
        }
    }
    // Save updated votes back to votes.txt
    file_put_contents($votesFile, json_encode($votes));
}

// Return updated votes as JSON response
echo json_encode($votes);
?>
