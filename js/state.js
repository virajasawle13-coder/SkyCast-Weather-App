// ══════════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════════

const state = {
    unit: localStorage.getItem('skycast_unit') || 'C',   // 'C' | 'F'
    theme: localStorage.getItem('skycast_theme') || 'dark',
    recent: JSON.parse(localStorage.getItem('skycast_recent') || '[]'),
    favorites: JSON.parse(localStorage.getItem('skycast_favs') || '[]'),
    currentCity: null,   // { name, lat, lon, country }
    weatherData: null,   // raw API response
    lastUpdated: null,
};
