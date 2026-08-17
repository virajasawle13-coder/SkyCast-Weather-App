
// ══════════════════════════════════════════════════════════
//  LOADING & ERROR UI
// ══════════════════════════════════════════════════════════

const showLoading = () => el.loadingOverlay.classList.remove('hidden');
const hideLoading = () => el.loadingOverlay.classList.add('hidden');

/**
 * Show error message card
 * @param {string} msg
 */
const showError = msg => {
    el.errorMessage.textContent = msg;
    el.errorCard.classList.remove('hidden');
    // Auto-dismiss after 6 seconds
    setTimeout(dismissError, 6000);
};

const dismissError = () => el.errorCard.classList.add('hidden');
