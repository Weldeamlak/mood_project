document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username") || "User";
    document.getElementById("username").textContent = username;

    // Create history section dynamically
    const historyContainer = document.getElementById("history-sidebar");

    // History Header with Toggle
    const historyHeader = document.createElement("div");
    historyHeader.id = "history-header";
    historyHeader.innerHTML = `
        <h2>History</h2>
        <i id="history-toggle" class="fas fa-chevron-down"></i>
    `;
    historyContainer.appendChild(historyHeader);

    // History List (Initially Hidden)
    const historyList = document.createElement("ol");
    historyList.id = "history-list";
    historyList.classList.add("hidden");
    historyContainer.appendChild(historyList);

    // Clear History Button
    const clearHistoryBtn = document.createElement("button");
    clearHistoryBtn.id = "clear-history";
    clearHistoryBtn.textContent = "Clear History";
    historyContainer.appendChild(clearHistoryBtn);

    // Profile dropdown toggle
    document.getElementById("profile-icon").addEventListener("click", () => {
        document.getElementById("profile-dropdown").classList.toggle("hidden");
    });

    // History toggle
    document.getElementById("history-toggle").addEventListener("click", () => {
        historyList.classList.toggle("hidden");
    });

    // Mood selection
    document.querySelectorAll(".mood-circle").forEach(circle => {
        circle.addEventListener("click", () => {
            document.getElementById("comment-box").classList.remove("hidden");
            document.getElementById("save-mood").classList.remove("hidden");
        });
    });

    // Logout button event
    document.getElementById("logout-btn").addEventListener("click", () => {
        showModal("Are you sure you want to logout?", () => {
            localStorage.clear();
            window.location.href = "signup.html";
        });
    });

    // Clear history event
    clearHistoryBtn.addEventListener("click", () => {
        showModal("Do you want to clear all history?", () => {
            historyList.innerHTML = "";
        });
    });

    // Function to create modal dynamically
    function showModal(message, confirmAction) {
        // Create overlay using <ol>
        let modalOverlay = document.createElement("ol");
        modalOverlay.id = "modal-overlay";

        let modalBox = document.createElement("div");
        modalBox.id = "modal-box";
        modalBox.innerHTML = `
            <p>${message}</p>
            <button id="modal-confirm">Yes</button>
            <button id="modal-cancel">Cancel</button>
        `;

        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

        document.getElementById("modal-confirm").onclick = () => {
            confirmAction();
            document.body.removeChild(modalOverlay);
        };

        document.getElementById("modal-cancel").onclick = () => {
            document.body.removeChild(modalOverlay);
        };
    }
});
