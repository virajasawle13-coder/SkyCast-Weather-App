
// ══════════════════════════════════════════════════════════
//  UTILITY HELPERS
// ══════════════════════════════════════════════════════════

/**
 * Convert Celsius to Fahrenheit
 * @param {number} c
 * @returns {number}
 */
const toF = c => Math.round(c * 9 / 5 + 32);

/**
 * Format temperature according to current unit state
 * @param {number} c - temperature in Celsius
 * @returns {string}
 */
const formatTemp = c => state.unit === 'F' ? toF(c) : Math.round(c);

/**
 * Convert wind speed (km/h) based on unit (keep km/h for metric, mph for imperial)
 * @param {number} kmh
 * @returns {string}
 */
const formatWind = kmh =>
    state.unit === 'F'
        ? `${Math.round(kmh * 0.621371)} mph`
        : `${Math.round(kmh)} km/h`;

/**
 * Format an ISO date string into a readable time (HH:MM AM/PM)
 * @param {string} iso
 * @returns {string}
 */
const formatTime = iso => {
    const d = new Date(iso);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

/**
 * Format an ISO date string into short day name (Mon, Tue…)
 * @param {string} iso
 * @returns {string}
 */
const formatDay = iso => {
    const d = new Date(iso + 'T00:00:00');
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return 'Today';
    return d.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Check if a given ISO hour string is "nighttime" using simple rule
 * (before 6am or after 8pm local)
 * @param {string} isoHour
 * @returns {boolean}
 */
const isNightHour = isoHour => {
    const h = new Date(isoHour).getHours();
    return h < 6 || h >= 20;
};

/**
 * Determine background class from WMO code, factoring in night
 * @param {number} code
 * @param {boolean} isNight
 * @returns {string}
 */
const getBgClass = (code, isNight) => {
    if (isNight) return 'weather-night';
    return (WMO[code] || { bg: 'weather-default' }).bg;
};

/**
 * Get weather info from WMO code
 * @param {number} code
 * @returns {{ label: string, emoji: string, bg: string }}
 */
const getWMO = code => WMO[code] || { label: 'Unknown', emoji: '🌡', bg: 'weather-default' };

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} ms
 * @returns {Function}
 */
const debounce = (fn, ms) => {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
};

/**
 * Escape HTML to prevent XSS
 * @param {string} str
 * @returns {string}
 */
const escapeHTML = str => {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
};
