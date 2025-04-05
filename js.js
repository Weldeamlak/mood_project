<>
document.addEventListener("DOMContentLoaded", function () {
    const moodCircles = document.querySelectorAll(".mood-circle");
    const commentBox = document.getElementById("comment-box");
    const saveButton = document.getElementById("save-mood");
    const profileIcon = document.getElementById("profile-icon");
    const logoutButton = document.getElementById("logout-btn");
    const historyToggle = document.getElementById("history-toggle");
    const sidebar = document.querySelector(".sidebar");

    let selectedMood = ""; // To store the selected mood

    // Handle mood selection
    moodCircles.forEach(circle => {
        circle.addEventListener("click", function () {
            moodCircles.forEach(el => el.classList.remove("active"));
            this.classList.add("active");

            selectedMood = this.dataset.mood; // Store selected mood
            commentBox.style.display = "block";
            saveButton.style.display = "block";
        });
    });

    // Save mood to localStorage
    saveButton.addEventListener("click", function () {
        const comment = commentBox.value.trim();
        if (!selectedMood) {
            alert("Please select a mood!");
            return;
        }

        const moodEntry = {
            mood: selectedMood,
            comment: comment,
            date: new Date().toLocaleString(),
        };

        let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
        moodHistory.push(moodEntry);
        localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

        // Clear selection
        moodCircles.forEach(el => el.classList.remove("active"));
        commentBox.value = "";
        commentBox.style.display = "none";
        saveButton.style.display = "none";

        alert("Mood saved!");
    });

    // Display history when clicking the toggle button
    historyToggle.addEventListener("click", function () {
        this.classList.toggle("fa-chevron-right");
        this.classList.toggle("fa-chevron-down");

        let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
        let historyHTML = "<h2>History</h2>";

        if (moodHistory.length === 0) {
            historyHTML += "<p>No history available.</p>";
        } else {
            moodHistory.forEach(entry => {
                historyHTML += `
                    <div class="history-item">
                        <p><strong>${entry.mood}</strong> - ${entry.comment || "No comment"}</p>
                        <small>${entry.date}</small>
                    </div>
                `;
            });
        }

        sidebar.innerHTML = historyHTML;
    });

    // Handle profile icon click (toggle logout button)
    profileIcon.addEventListener("click", function () {
        logoutButton.style.display = logoutButton.style.display === "block" ? "none" : "block";
    });
});
