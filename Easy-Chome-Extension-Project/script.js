async function fetchArtistName(artistId) {
    const url = `https://concerts-artists-events-tracker.p.rapidapi.com/artist/bio?artist_id=${artistId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '8550b319a2msh8a15ab7c9bfcba9p1998f6jsn6d91bf54d1d2',
            'x-rapidapi-host': 'concerts-artists-events-tracker.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('API call failed');
        }
        const result = await response.json();
        return result.name; // Assuming the artist name is in the 'name' property
    } catch (error) {
        console.error(error);
        return 'Unknown Artist';
    }
}

async function fetchData() {
    const url = 'https://concerts-artists-events-tracker.p.rapidapi.com/search?city=New%20York&types=event&starts_at=2025-01-13&ends_at=2025-01-17';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '8550b319a2msh8a15ab7c9bfcba9p1998f6jsn6d91bf54d1d2',
            'x-rapidapi-host': 'concerts-artists-events-tracker.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('API call failed');
        }
        const record = await response.json();
        console.log('record', record);

        if (Array.isArray(record.events)) {
            const artistNames = await Promise.all(record.events.map(async (item) => {
                const artistName = await fetchArtistName(item.artist_id);
                return `<li>${artistName}</li>`;
            }));
            document.getElementById("concerts").innerHTML = artistNames.join('');
        } else {
            console.error('record.events is not an array:', record.events);
        }
    } catch (error) {
        console.error(error);
        document.getElementById("concerts").innerHTML = '<li>Monthly quota has been exceeded</li>';
    }
}

fetchData();