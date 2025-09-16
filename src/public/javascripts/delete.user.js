function deleteFetch(userId, callback) {
    fetch(`/customers/delete/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => callback(null, data))
        .catch(error => callback(error));
}

function deleteButtonClicked(userId, buttonElement) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    deleteFetch(userId, (error, results) => {
        if (error) {
            alert('Error deleting user: ' + error.message);
            return;
        }
        if (results && results.success) {
            const row = buttonElement.closest('tr');
            if (row) row.remove();
        } else {
            alert('Failed to delete user.');
        }
    });
}