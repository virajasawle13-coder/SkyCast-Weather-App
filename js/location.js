
// ══════════════════════════════════════════════════════════
//  GEOLOCATION
// ══════════════════════════════════════════════════════════

const handleLocationError = err => {
    hideLoading();
    const msgs = {
        1: 'Location access denied. Please allow location permission.',
        2: 'Location unavailable. Try searching by city name.',
        3: 'Location request timed out. Please try again.',
    };
    showError(msgs[err.code] || 'Unable to get your location.');
};

const useMyLocation = () => {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser.');
        return;
    }
    showLoading();
    navigator.geolocation.getCurrentPosition(
        async pos => {
            try {
                const { latitude: lat, longitude: lon } = pos.coords;
                // Reverse geocode: use open-meteo geocoding is forward-only,
                // so we'll label the city as "My Location"
                // Try to get a name via a nominatim fetch (open, no key)
                let cityName = 'My Location';
                try {
                    const rev = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
                        { headers: { 'Accept-Language': 'en' } }
                    );
                    if (rev.ok) {
                        const rData = await rev.json();
                        cityName = rData.address?.city
                            || rData.address?.town
                            || rData.address?.village
                            || rData.address?.county
                            || 'My Location';
                    }
                } catch { /* ignore reverse geocode failure, keep "My Location" */ }

                const city = { name: cityName, lat, lon, country: '' };
                await loadWeather(city);
            } catch (err) {
                hideLoading();
                showError(`Error: ${err.message}`);
            }
        },
        handleLocationError,
        { timeout: 10000, enableHighAccuracy: false }
    );
};
