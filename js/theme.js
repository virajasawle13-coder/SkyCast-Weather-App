
// ══════════════════════════════════════════════════════════
//  THEME
// ══════════════════════════════════════════════════════════

/** Apply current theme to <html> and update button icon */
const applyTheme = () => {
    el.html.setAttribute('data-theme', state.theme);
    el.themeIcon.textContent = state.theme === 'dark' ? '🌙' : '☀️';
    el.themeToggle.setAttribute('aria-label', `Switch to ${state.theme === 'dark' ? 'light' : 'dark'} mode`);
};

const toggleTheme = () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('skycast_theme', state.theme);
    applyTheme();
};


// ══════════════════════════════════════════════════════════
//  TEMPERATURE UNIT
// ══════════════════════════════════════════════════════════

const applyUnit = () => {
    const isCelsius = state.unit === 'C';
    el.btnCelsius.classList.toggle('active', isCelsius);
    el.btnFahrenheit.classList.toggle('active', !isCelsius);
    el.btnCelsius.setAttribute('aria-pressed', String(isCelsius));
    el.btnFahrenheit.setAttribute('aria-pressed', String(!isCelsius));
};

const setUnit = unit => {
    state.unit = unit;
    localStorage.setItem('skycast_unit', unit);
    applyUnit();
    if (state.weatherData) renderAll(state.weatherData);
};
