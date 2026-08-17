
// ══════════════════════════════════════════════════════════
//  EVENT LISTENERS
// ══════════════════════════════════════════════════════════

// Search button
el.searchBtn.addEventListener('click', () => searchCity(el.searchInput.value));

// Enter key in search
el.searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        if (activeSuggIndex >= 0 && suggestionResults.length) {
            selectSuggestion(activeSuggIndex);
        } else {
            searchCity(el.searchInput.value);
        }
        return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); navigateSuggestions(+1); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); navigateSuggestions(-1); return; }
    if (e.key === 'Escape') { hideSuggestions(); return; }
});

// Debounced input for suggestions
el.searchInput.addEventListener('input', e => fetchSuggestions(e.target.value));

// Hide suggestions on blur (with delay to allow click)
el.searchInput.addEventListener('blur', () => setTimeout(hideSuggestions, 200));

// Location button
el.locationBtn.addEventListener('click', useMyLocation);

// Theme toggle
el.themeToggle.addEventListener('click', toggleTheme);

// Refresh
el.refreshBtn.addEventListener('click', refreshWeather);

// Unit buttons
el.btnCelsius.addEventListener('click', () => setUnit('C'));
el.btnFahrenheit.addEventListener('click', () => setUnit('F'));

// Favorite button
el.favBtn.addEventListener('click', () => {
    if (!state.currentCity) return;
    toggleFav(state.currentCity);
    updateFavBtn();
});

// Error dismiss
el.errorDismiss.addEventListener('click', dismissError);
