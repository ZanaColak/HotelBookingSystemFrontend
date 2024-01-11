const apiUrl = 'http://localhost:8080';

async function createGuest() {
    const createGuestForm = document.getElementById('createGuestForm');
    const userName = document.getElementById('userName').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    try {
        const response = await fetch(apiUrl + '/guest/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, firstName, lastName, email, phoneNumber }),
        });

        if (response.status === 201) {
            console.log('Guest created successfully');
            createGuestForm.reset();
        } else {
            console.error('Error creating guest:', response.status);
        }
    } catch (error) {
        console.error('Error creating guest:', error);
    }
}
