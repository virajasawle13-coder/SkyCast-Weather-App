
// ══════════════════════════════════════════════════════════
//  MAIN LOAD WEATHER
// ══════════════════════════════════════════════════════════

/**
 * Load and render weather for a given city object
 * @param {{ name, lat, lon, country }} city
 */
const loadWeather = async city => {
    showLoading();
    hideSuggestions();
    el.searchInput.value = '';

    try {
        const data = await fetchWeather(city.lat, city.lon);
        state.weatherData = data;
        state.currentCity = city;
        state.lastUpdated = new Date();

        addRecent(city);
        updateFavBtn();
        renderAll(data);
        showWeatherContent();
    } catch (err) {
        showError(`Failed to load weather: ${err.message}`);
    } finally {
        hideLoading();
    }
};

/** Search by city name string, geocode first */
const searchCity = async query => {
    if (!query.trim()) { showError('Please enter a city name.'); return; }
    showLoading();
    hideSuggestions();

    try {
        const city = await geocodeCity(query.trim());
        await loadWeather(city);
    } catch (err) {
        hideLoading();
        showError(err.message);
    }
};
