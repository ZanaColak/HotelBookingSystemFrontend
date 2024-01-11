const apiUrl = 'http://localhost:8080';

async function fetchAllHotels(page = 0, size = 10) {
    const allHotelsTableBody = document.getElementById('allHotelsTableBody');

    try {
        const response = await fetch(`${apiUrl}/hotel?page=${page}&size=${size}`);
        const hotelData = await response.json();

        console.log('Fetched hotel data:', hotelData);

        allHotelsTableBody.innerHTML = '';

        hotelData.content.forEach((hotel) => {
            const row = document.createElement('tr');

            row.innerHTML += `<td>${hotel.id}</td>`;
            row.innerHTML += `<td>${hotel.hotelName}</td>`;
            row.innerHTML += `<td>${hotel.street}</td>`;
            row.innerHTML += `<td>${hotel.numberOfRooms}</td>`;

            allHotelsTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching all hotels:', error);
    }

}
function navigateToPage(page) {
    fetchAllHotels(page);
}

async function viewHotelDetails() {
    const hotelId = document.getElementById('hotelId').value;
    const hotelDetailsDiv = document.getElementById('hotelDetails');

    try {
        const response = await fetch(apiUrl + '/hotel/' + hotelId);
        const hotelDetails = await response.json();

        // Display details in the UI
        hotelDetailsDiv.innerHTML = `<p>ID: ${hotelDetails[0].id}</p>
                                    <p>Hotel Name: ${hotelDetails[0].hotelName}</p>
                                    <p>Street: ${hotelDetails[0].street}</p>
                                    <p>Number of Rooms: ${hotelDetails[0].numberOfRooms}</p>`;
    } catch (error) {
        console.error('Error fetching hotel details:', error);
        hotelDetailsDiv.innerHTML = '<p>Error fetching hotel details</p>';
    }
}

async function createHotel() {
    const createHotelForm = document.getElementById('createHotelForm');
    const hotelName = document.getElementById('hotelName').value;
    const street = document.getElementById('street').value;
    const numberOfRooms = document.getElementById('numberOfRooms').value;

    try {
        const response = await fetch(apiUrl + '/hotel/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({hotelName, street, numberOfRooms}),
        });

        const createdHotel = await response.json();
        console.log('Created Hotel:', createdHotel);

        fetchAllHotels();
    } catch (error) {
        console.error('Error creating hotel:', error);
    }
}

async function updateHotel() {
    const updateHotelForm = document.getElementById('updateHotelForm');
    const updateHotelId = document.getElementById('updateHotelId').value;
    const updatedHotelName = document.getElementById('updatedHotelName').value;
    const updatedStreet = document.getElementById('updatedStreet').value;
    const updatedNumberOfRooms = document.getElementById('updatedNumberOfRooms').value;

    try {
        const response = await fetch(apiUrl + '/hotel/' + updateHotelId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hotelName: updatedHotelName,
                street: updatedStreet,
                numberOfRooms: updatedNumberOfRooms
            }),
        });

        const updatedHotel = await response.json();
        console.log('Updated Hotel:', updatedHotel);

        fetchAllHotels();
    } catch (error) {
        console.error('Error updating hotel:', error);
    }
}

async function deleteHotel() {
    const deleteHotelForm = document.getElementById('deleteHotelForm');
    const deleteHotelId = document.getElementById('deleteHotelId').value;

    try {
        const response = await fetch(apiUrl + '/hotel/' + deleteHotelId, {
            method: 'DELETE',
        });

        if (response.status === 200) {
            console.log('Hotel deleted successfully');

            fetchAllHotels();
        } else {
            console.error('Error deleting hotel:', response.status);
        }
    } catch (error) {
        console.error('Error deleting hotel:', error);
    }
}

fetchAllHotels();
