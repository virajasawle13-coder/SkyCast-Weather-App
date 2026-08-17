
// ══════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════

const init = () => {
    applyTheme();
    applyUnit();
    renderChips();

    // Auto-load last searched city on start
    if (state.recent.length) {
        loadWeather(state.recent[0]);
    }
};

init();
