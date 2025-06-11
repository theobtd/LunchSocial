// user.js
function displayUsers() {
    const currentUserId = auth.currentUser.uid;
    
    database.ref('users').once('value').then(snapshot => {
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Clear previous list

        const currentUserData = snapshot.child(currentUserId).val();
        if (currentUserData) {
            const currentUserItem = document.createElement('div');
            currentUserItem.classList.add('user-item');
            currentUserItem.textContent = currentUserData.userId;
            userList.appendChild(currentUserItem);
        }

        snapshot.forEach(childSnapshot => {
            const userData = childSnapshot.val();
            const userId = userData.userId;
            const targetUserId = childSnapshot.key;

            if (userId === currentUserData?.userId) return;

            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            userItem.textContent = userId;

            const actionButton = document.createElement('button');
            // Check for incoming requests
            database.ref('users/' + currentUserId + '/friendRequests/' + targetUserId).once('value').then(friendSnapshot => {
                if (friendSnapshot.exists()) {
                    if (friendSnapshot.val().status === 'pending') {
                        actionButton.textContent = 'Pending';
                        actionButton.disabled = true;
                    } else if (friendSnapshot.val().status === 'accepted') {
                        actionButton.textContent = 'Friends';
                        actionButton.disabled = true;
                    }
                }

                // Check for outgoing requests
                database.ref('users/' + targetUserId + '/friendRequests/' + currentUserId).once('value').then(requestSnapshot => {
                    if (requestSnapshot.exists()) {
                        if (requestSnapshot.val().status === 'pending') {
                            actionButton.textContent = 'Pending';
                            actionButton.disabled = true;
                        }
                    } else {
                        actionButton.textContent = '+';
                        actionButton.onclick = function() {
                            sendFriendRequest(targetUserId, actionButton);
                        };
                    }
                });
            });

            userItem.appendChild(actionButton);
            userList.appendChild(userItem);
        });
    }).catch(error => {
        console.error("Error fetching users:", error);
    });
}

function sendFriendRequest(targetUserId, button) {
    const currentUserId = auth.currentUser.uid;

    database.ref('users/' + targetUserId + '/friendRequests/' + currentUserId).set({
        requestingUserId: currentUserId,
        status: 'pending'
    }).then(() => {
        button.textContent = 'Pending';
        button.disabled = true;
    }).catch(error => {
        console.error("Error sending friend request:", error);
    });
}
