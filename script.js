document.addEventListener('DOMContentLoaded', function() {
    // Initialize votes object
    let votes = {
        'Reading': 0,
        'Traveling': 0,
        'Cooking': 0,
        'Gaming': 0
    };

    // Fetch current votes from localStorage if available
    if (localStorage.getItem('votes')) {
        votes = JSON.parse(localStorage.getItem('votes'));
        updateVoteCounts(votes);
    }

    // Handle form submission
    document.getElementById('surveyForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Update votes based on form selection
        const formData = new FormData(this);
        formData.getAll('activities').forEach(activity => {
            if (votes.hasOwnProperty(activity)) {
                votes[activity]++;
            }
        });

        // Save updated votes to localStorage
        localStorage.setItem('votes', JSON.stringify(votes));

        // Update vote counts in UI
        updateVoteCounts(votes);
    });

    // Function to update vote counts in the UI
    function updateVoteCounts(votes) {
        Object.keys(votes).forEach(activity => {
            const votesElement = document.getElementById(`votes-${activity.toLowerCase()}`);
            if (votesElement) {
                votesElement.textContent = `${votes[activity]} votes`;
            }
        });
    }
});
