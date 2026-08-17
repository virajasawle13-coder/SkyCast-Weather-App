
// ══════════════════════════════════════════════════════════
//  GEOCODING API
// ══════════════════════════════════════════════════════════

/**
 * Fetch city suggestions from geocoding API
 * @param {string} query
 * @returns {Promise<Array>}
 */
const geocodeSearch = async query => {
    const url = `${GEO_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocoding API error: ${res.status}`);
    const data = await res.json();
    return data.results || [];
};

/**
 * Fetch lat/lon for a city name, return first result
 * @param {string} cityName
 * @returns {Promise<{ name, lat, lon, country }>}
 */
const geocodeCity = async cityName => {
    const results = await geocodeSearch(cityName);
    if (!results.length) throw new Error(`No results found for "${cityName}"`);
    const r = results[0];
    return { name: r.name, lat: r.latitude, lon: r.longitude, country: r.country_code || r.country || '' };
};

// ══════════════════════════════════════════════════════════
//  WEATHER API
// ══════════════════════════════════════════════════════════

/**
 * Fetch weather data from Open-Meteo
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<Object>}
 */
const fetchWeather = async (lat, lon) => {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        // Current variables
        current: [
            'temperature_2m', 'apparent_temperature', 'relative_humidity_2m',
            'weather_code', 'wind_speed_10m', 'surface_pressure', 'visibility',
            'uv_index', 'is_day'
        ].join(','),
        // Hourly variables (next 48h, we'll slice to 24)
        hourly: [
            'temperature_2m', 'weather_code', 'precipitation_probability'
        ].join(','),
        // Daily variables
        daily: [
            'weather_code', 'temperature_2m_max', 'temperature_2m_min',
            'precipitation_probability_max', 'sunrise', 'sunset', 'uv_index_max'
        ].join(','),
        timezone: 'auto',
        wind_speed_unit: 'kmh',
        forecast_days: 7,
    });

    const res = await fetch(`${WEATHER_URL}?${params}`);
    if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
    return res.json();
};
