
// ══════════════════════════════════════════════════════════
//  LOCAL STORAGE HELPERS
// ══════════════════════════════════════════════════════════

const saveRecent = () => localStorage.setItem('skycast_recent', JSON.stringify(state.recent));
const saveFavs = () => localStorage.setItem('skycast_favs', JSON.stringify(state.favorites));

/**
 * Add a city to recent searches (deduplicates, max MAX_RECENT)
 * @param {{ name: string, lat: number, lon: number, country: string }} city
 */
const addRecent = city => {
    state.recent = state.recent.filter(r => r.name !== city.name);
    state.recent.unshift(city);
    if (state.recent.length > MAX_RECENT) state.recent.pop();
    saveRecent();
    renderChips();
};

/**
 * Toggle favorite status for a city
 * @param {{ name: string, lat: number, lon: number, country: string }} city
 * @returns {boolean} new isFav state
 */
const toggleFav = city => {
    const idx = state.favorites.findIndex(f => f.name === city.name);
    if (idx === -1) {
        if (state.favorites.length < MAX_FAV) state.favorites.push(city);
    } else {
        state.favorites.splice(idx, 1);
    }
    saveFavs();
    renderChips();
    return state.favorites.some(f => f.name === city.name);
};

const isFav = city => state.favorites.some(f => f.name === city.name);
