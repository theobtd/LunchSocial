// events.js
function createEvent() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "block"; // Show the modal
}

function submitEvent() {
    const title = document.getElementById("eventTitle").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;

    if (title && date && time) {
        const currentUserId = auth.currentUser.uid;
        const eventKey = database.ref('users/' + currentUserId + '/events').push().key;

        database.ref('users/' + currentUserId + '/events/' + eventKey).set({
            title: title,
            date: date,
            time: time
        }).then(() => {
            alert("Event created successfully!");
            displayEvents();
            displayFriendsEvents();
            closeModal();
        }).catch(error => {
            console.error("Error creating event:", error);
        });
    } else {
        alert("All fields are required!");
    }
}

function closeModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "none"; // Hide the modal
    document.getElementById("eventTitle").value = '';
    document.getElementById("eventDate").value = '';
    document.getElementById("eventTime").value = '';
}
