
// ══════════════════════════════════════════════════════════
//  CHIP RENDERING (RECENT + FAVORITES)
// ══════════════════════════════════════════════════════════

/** Create a chip element for a city */
const makeChip = (city, type) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.setAttribute('role', 'button');
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('aria-label', `${type === 'fav' ? '⭐ ' : '🕐 '}${city.name}, ${city.country}`);

    const prefix = type === 'fav' ? '⭐ ' : '🕐 ';
    chip.innerHTML = `${escapeHTML(prefix + city.name)}
    <button class="chip-remove" aria-label="Remove ${escapeHTML(city.name)}" data-name="${escapeHTML(city.name)}" data-type="${type}">✕</button>`;

    chip.addEventListener('click', e => {
        if (e.target.classList.contains('chip-remove')) return;
        loadWeather(city);
    });

    chip.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadWeather(city); }
    });

    chip.querySelector('.chip-remove').addEventListener('click', e => {
        e.stopPropagation();
        if (type === 'recent') {
            state.recent = state.recent.filter(r => r.name !== city.name);
            saveRecent();
        } else {
            state.favorites = state.favorites.filter(f => f.name !== city.name);
            saveFavs();
        }
        renderChips();
        // Update fav button if this is the current city
        if (state.currentCity && state.currentCity.name === city.name) updateFavBtn();
    });

    return chip;
};

/** Re-render both chip groups */
const renderChips = () => {
    el.recentSearches.innerHTML = '';
    el.favorites.innerHTML = '';

    if (state.recent.length) {
        const label = document.createElement('span');
        label.className = 'chip';
        label.style.cssText = 'opacity:0.5;cursor:default;pointer-events:none;background:transparent;border-color:transparent;';
        label.textContent = 'Recent:';
        el.recentSearches.appendChild(label);
        state.recent.forEach(c => el.recentSearches.appendChild(makeChip(c, 'recent')));
    }

    if (state.favorites.length) {
        const label = document.createElement('span');
        label.className = 'chip';
        label.style.cssText = 'opacity:0.5;cursor:default;pointer-events:none;background:transparent;border-color:transparent;';
        label.textContent = 'Favorites:';
        el.favorites.appendChild(label);
        state.favorites.forEach(c => el.favorites.appendChild(makeChip(c, 'fav')));
    }
};
