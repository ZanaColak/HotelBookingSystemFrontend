const apiUrl = 'http://localhost:8080';

async function createGuest() {
    const createGuestForm = document.getElementById('createGuestForm');
    const userName = document.getElementById('userName').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    const requestBody = {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
    };

    try {
        const response = await fetch(`${apiUrl}/guest/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            console.log('Guest created successfully');
            createGuestForm.reset();
            window.location.href = 'reservation.html';
        } else {
            const errorText = await response.text();
            console.error(`Error creating guest: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error('Error creating guest:', error);
    }

}
