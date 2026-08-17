
// ══════════════════════════════════════════════════════════
//  SUGGESTIONS UI
// ══════════════════════════════════════════════════════════

let suggestionResults = [];
let activeSuggIndex = -1;

const showSuggestions = results => {
    suggestionResults = results;
    activeSuggIndex = -1;
    el.suggestionsList.innerHTML = '';

    if (!results.length) { hideSuggestions(); return; }

    results.forEach((r, i) => {
        const li = document.createElement('li');
        li.className = 'suggestion-item';
        li.setAttribute('role', 'option');
        li.setAttribute('id', `sugg-${i}`);
        li.textContent = `📍 ${r.name}${r.admin1 ? ', ' + r.admin1 : ''}, ${r.country || ''}`;

        li.addEventListener('mousedown', e => {
            e.preventDefault(); // keep focus on input
            selectSuggestion(i);
        });
        el.suggestionsList.appendChild(li);
    });

    el.suggestionsList.classList.remove('hidden');
    el.searchInput.setAttribute('aria-activedescendant', '');
};

const hideSuggestions = () => {
    el.suggestionsList.classList.add('hidden');
    el.suggestionsList.innerHTML = '';
    suggestionResults = [];
    activeSuggIndex = -1;
};

const selectSuggestion = idx => {
    const r = suggestionResults[idx];
    const city = { name: r.name, lat: r.latitude, lon: r.longitude, country: r.country_code || r.country || '' };
    hideSuggestions();
    loadWeather(city);
};

/** Navigate suggestions with keyboard arrows */
const navigateSuggestions = dir => {
    const items = el.suggestionsList.querySelectorAll('.suggestion-item');
    if (!items.length) return;

    activeSuggIndex += dir;
    if (activeSuggIndex < 0) activeSuggIndex = items.length - 1;
    if (activeSuggIndex >= items.length) activeSuggIndex = 0;

    items.forEach((item, i) => {
        item.classList.toggle('active-option', i === activeSuggIndex);
        if (i === activeSuggIndex) {
            item.scrollIntoView({ block: 'nearest' });
            el.searchInput.setAttribute('aria-activedescendant', `sugg-${i}`);
        }
    });
};

const fetchSuggestions = debounce(async query => {
    if (query.length < 2) { hideSuggestions(); return; }
    try {
        const results = await geocodeSearch(query);
        showSuggestions(results);
    } catch { hideSuggestions(); }
}, 350);
