const apiUrl = 'http://localhost:8080';

async function createReservation() {
    const createReservationForm = document.getElementById('createReservationForm');
    const guestName = document.getElementById('guestName').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;

    const requestBody = {
        guestName: guestName, roomNumber: roomNumber, checkInDate: checkInDate, checkOutDate: checkOutDate,
    };

    console.log('Request Payload:', JSON.stringify(requestBody));

    try {
        const response = await fetch(`${apiUrl}/reservation/create`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            console.log('Reservation created successfully');
            createReservationForm.reset();
        } else {
            const errorText = await response.text();
            console.error(`Error creating reservation: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error('Error creating reservation:', error);
    }
}
