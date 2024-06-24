document.addEventListener('DOMContentLoaded', function() {
    // Fetch current votes from votes.txt and update display
    fetchVotes();

    // Handle form submission
    document.getElementById('surveyForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Serialize form data into URL-encoded format
        const formData = new URLSearchParams(new FormData(this));

        // Send POST request to results.php
        fetch('results.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            // Update vote counts based on response data
            updateVoteCounts(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Function to fetch votes from server
    function fetchVotes() {
        fetch('votes.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            // Update vote counts based on fetched data
            updateVoteCounts(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to update vote counts in the UI
    function updateVoteCounts(votes) {
        // Loop through each activity option
        Object.keys(votes).forEach(activity => {
            const votesElement = document.getElementById(`votes-${activity.toLowerCase()}`);
            if (votesElement) {
                votesElement.textContent = `${votes[activity]} votes`;
            }
        });
    }
});
